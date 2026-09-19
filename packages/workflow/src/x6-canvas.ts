import { Graph, History, Keyboard, MiniMap, Selection, Shape } from "@antv/x6";
import type { Cell, EdgeMetadata, NodeMetadata } from "@antv/x6";
import { injectComponentStyle } from "@bysages/core";

import { createWorkflowStore } from "./store";
import type { WorkflowChange, WorkflowStore } from "./store";
import type { NodeState, WorkflowEdge, WorkflowGraph, WorkflowNode } from "./types";

/** The framework mount point: the host mounts its components into the
 * node's card and returns an unmount cleanup (optional). Content updates
 * stay with the host — subscribe to the store in the closure. */
export interface WorkflowCanvasOptions {
  renderNode?: (host: HTMLElement, node: Readonly<WorkflowNode>) => void | (() => void);
  /** Handed the live Graph once it exists — the escape hatch for plugin
   * wiring this adapter doesn't cover. */
  onReady?: (graph: Graph) => void;
  /** Renders a live minimap into the given element. */
  minimap?: { container: HTMLElement };
}

export interface WorkflowCanvas {
  readonly store: WorkflowStore;
  /** Read-only escape hatch; the lifecycle stays with the canvas. */
  readonly graph: Graph;
  destroy(): void;
}

// Roomy enough that a prompt line or a tool trigger rests on one line
// at the default width — node content shouldn't fight its vessel.
const NODE_WIDTH = 256;
const NODE_HEIGHT = 88;
const HANDLE = 12;

let shapeSeq = 0;

/** One live canvas per container — re-creating over an existing canvas
 * (hot reload does this) tears the old one down first. */
const live = new WeakMap<HTMLElement, WorkflowCanvas>();

/** Mounts an X6 canvas onto `container` and keeps it in step with the
 * graph protocol. The store is the single writer; canvas gestures are
 * translated back into store calls, and store changes — from an executor
 * or the host app — are replayed onto the canvas. Every store operation
 * is idempotent, which is what lets those two event streams cross
 * without loops. */
export function createWorkflowCanvas(
  container: HTMLElement,
  source: WorkflowGraph | WorkflowStore,
  options: WorkflowCanvasOptions = {},
): WorkflowCanvas {
  live.get(container)?.destroy();

  injectComponentStyle("workflow");

  const store: WorkflowStore = "getGraph" in source ? source : createWorkflowStore(source);

  const cleanups = new Map<string, () => void>();
  const shape = `workflow-html-node-${++shapeSeq}`;

  // One host per canvas: Shape.HTML.register is global, so every canvas
  // claims its own shape name. The html() callback runs once per cell —
  // never on data changes, or the host's mounted content (a prompt draft,
  // a scroll position) would be torn down on every state write. State
  // travels through a data attribute instead.
  Shape.HTML.register({
    shape,
    width: NODE_WIDTH,
    height: NODE_HEIGHT,
    html(cell: Cell) {
      const node = store.getNode(cell.id);
      if (!node) return document.createElement("div");

      const host = document.createElement("div");
      host.dataset.scope = "workflow";
      host.dataset.part = "node";
      const card = document.createElement("div");
      card.className = "workflow-node-card";
      card.dataset.state = node.state ?? "idle";
      host.append(card);

      const dispose = options.renderNode?.(card, node);
      if (dispose) cleanups.set(cell.id, dispose);

      cell.on("change:data", ({ current }) => {
        const data = (current ?? {}) as { state?: NodeState };
        card.dataset.state = data.state ?? "idle";
      });
      return host;
    },
  });

  // Handles sit at the four edge midpoints, centered on the box edge.
  // X6 anchors a port's layout box at its top-left corner, so the rect
  // pulls back by half its side to land the center on the anchor.
  // Direction is the protocol's: ins take the top, outs the bottom, and
  // the second of either turns to the free side.
  const sideGroup = (position: "top" | "right" | "bottom" | "left", dir: "in" | "out") => ({
    position,
    markup: [{ tagName: "rect", selector: "handle" }],
    attrs: {
      handle: {
        magnet: true,
        x: -HANDLE / 2,
        y: -HANDLE / 2,
        width: HANDLE,
        height: HANDLE,
        "data-part": "handle",
        "data-dir": dir,
      },
    },
  });

  const portGroups = {
    in: sideGroup("top", "in"),
    "in-alt": sideGroup("left", "in"),
    out: sideGroup("bottom", "out"),
    "out-alt": sideGroup("right", "out"),
  };

  const edgeAttrs = {
    line: {
      // Colors and dashes live in CSS (SVG presentation attributes don't
      // resolve var()); the class is the hook. The arrowhead inherits the
      // line's stroke through context-stroke.
      class: "workflow-edge-line",
      targetMarker: { name: "classic", size: 6, fill: "context-stroke" },
    },
  };

  const toNodeConfig = (node: WorkflowNode): NodeMetadata => ({
    id: node.id,
    shape,
    x: node.position.x,
    y: node.position.y,
    // The X6 copy carries everything an undo restore needs to rebuild the
    // protocol node; `type` rides along for the same reason.
    data: { ...node.data, type: node.type, state: node.state ?? "idle" },
    ports: {
      groups: portGroups,
      items: (() => {
        let ins = 0;
        let outs = 0;
        return node.ports.map((p) => ({
          id: p.id,
          group:
            p.dir === "in"
              ? ins++ % 2 === 0
                ? "in"
                : "in-alt"
              : outs++ % 2 === 0
                ? "out"
                : "out-alt",
        }));
      })(),
    },
  });

  const toEdgeConfig = (edge: WorkflowEdge): EdgeMetadata => ({
    id: edge.id,
    source: { cell: edge.source.node, port: edge.source.port },
    target: { cell: edge.target.node, port: edge.target.port },
    attrs: edgeAttrs,
  });

  const graph = new Graph({
    container,
    grid: false,
    // No autoResize: X6 writes its size back onto the container, which
    // feeds back through the container's own growth. The canvas follows
    // the host instead, below.
    connecting: {
      connector: "smooth",
      allowBlank: false,
      allowLoop: false,
      allowNode: false,
      allowMulti: "withPort",
      validateConnection({ sourceCell, sourcePort, targetCell, targetPort }) {
        if (!sourceCell || !targetCell || !sourcePort || !targetPort) return false;
        const dirOf = (cellId: string, portId: string) =>
          store.getNode(cellId)?.ports.find((p) => p.id === portId)?.dir;
        return (
          dirOf(sourceCell.id, sourcePort) === "out" && dirOf(targetCell.id, targetPort) === "in"
        );
      },
      createEdge: () => graph.createEdge({ attrs: edgeAttrs }),
    },
    // Wheel zooms around the pointer; a bare drag on the blank pans.
    // That pairing (pan on drag, zoom on wheel, shift for the rubberband)
    // is the convention the workflow editors people know share.
    mousewheel: {
      enabled: true,
      factor: 1.1,
      minScale: 0.25,
      maxScale: 4,
      zoomAtMousePosition: true,
    },
    panning: { enabled: true },
  });

  container.dataset.scope = "workflow";
  container.dataset.part = "canvas";

  // The rubberband yields the bare blank drag to panning — it rides
  // shift instead, as canvas editors conventionally do. X6's own
  // selection boxes stay hidden (they'd sit over the HTML nodes and
  // swallow input events); selection lights our anatomy through the
  // x6-*-selected view classes, styled from the stylesheet.
  graph.use(
    new Selection({ enabled: true, rubberband: true, modifiers: ["shift"], multiple: true }),
  );
  // Execution states ride data changes — runtime truth from the server,
  // not user edits — so data writes never enter the undo stack.
  graph.use(
    new History({
      enabled: true,
      beforeAddCommand: (event) => event !== "cell:change:data",
    }),
  );
  const keyboard = new Keyboard({ enabled: true });
  graph.use(keyboard);
  keyboard.bindKey(["ctrl+z", "meta+z"], () => graph.undo());
  keyboard.bindKey(["ctrl+shift+z", "meta+shift+z"], () => graph.redo());
  keyboard.bindKey(["delete", "backspace"], () => {
    graph.removeCells(graph.getSelectedCells());
  });

  if (options.minimap) {
    // The minimap box sits outside the canvas container, so it carries
    // the scope itself — that's what the stylesheet styles against.
    options.minimap.container.dataset.scope = "workflow";
    options.minimap.container.dataset.part = "minimap";
    graph.use(
      new MiniMap({
        container: options.minimap.container,
        width: 200,
        height: 140,
        padding: 8,
      }),
    );
  }

  options.onReady?.(graph);

  // The canvas follows the host's box: read the container, size the SVG,
  // never write the container back.
  const followHost = () => graph.resize(container.clientWidth, container.clientHeight);
  followHost();
  window.addEventListener("resize", followHost);

  for (const node of store.getGraph().nodes) graph.addNode(toNodeConfig(node));
  for (const edge of store.getGraph().edges) graph.addEdge(toEdgeConfig(edge));

  // Canvas → protocol. Guarded on two axes: `replaying` mutes the echoes
  // of our own replay, `viaCanvas` mutes the replay of the canvas's own
  // facts back onto it.
  let replaying = false;
  let viaCanvas = false;

  const guard = (fn: () => void) => {
    if (replaying) return;
    viaCanvas = true;
    try {
      fn();
    } finally {
      viaCanvas = false;
    }
  };

  graph.on("node:moved", ({ node }) => guard(() => store.moveNode(node.id, node.getPosition())));
  graph.on("node:removed", ({ node }) => {
    cleanups.get(node.id)?.();
    cleanups.delete(node.id);
    guard(() => store.removeNode(node.id));
  });
  // Undo restores come back as plain additions — keep the protocol in
  // step with them. The X6-generated ids are adopted as the protocol's
  // own so remove/disconnect keep addressing the same cells.
  graph.on("node:added", ({ node }) =>
    guard(() => {
      const data = (node.getData() ?? {}) as Record<string, unknown> & {
        type?: string;
        state?: NodeState;
      };
      const { type, state, ...rest } = data;
      store.addNode({
        id: node.id,
        type: type ?? "unknown",
        position: node.getPosition(),
        ports: node.getPorts().map((p) => ({
          id: p.id ?? "",
          dir: (String(p.group ?? "").startsWith("out") ? "out" : "in") as "in" | "out",
        })),
        state,
        data: rest,
      });
    }),
  );
  graph.on("edge:connected", ({ edge, isNew }) => {
    if (!isNew) return;
    guard(() => {
      store.connect({
        id: edge.id,
        source: {
          node: edge.getSourceCellId(),
          port: edge.getSourcePortId() ?? "",
        },
        target: {
          node: edge.getTargetCellId(),
          port: edge.getTargetPortId() ?? "",
        },
      });
    });
  });
  graph.on("edge:removed", ({ edge }) => guard(() => store.disconnect(edge.id)));
  graph.on("edge:added", ({ edge }) =>
    guard(() => {
      const sourceNode = edge.getSourceCellId();
      const targetNode = edge.getTargetCellId();
      const sourcePort = edge.getSourcePortId();
      const targetPort = edge.getTargetPortId();
      if (!sourceNode || !targetNode || !sourcePort || !targetPort) return;
      store.connect({
        id: edge.id,
        source: { node: sourceNode, port: sourcePort },
        target: { node: targetNode, port: targetPort },
      });
    }),
  );

  // Protocol → canvas. The store is already the fact; the canvas is
  // catching up. Cascaded edge removals echo back through the event
  // translations as idempotent no-ops.
  const apply = (change: WorkflowChange) => {
    replaying = true;
    try {
      switch (change.kind) {
        case "node:add":
          graph.addNode(toNodeConfig(change.node));
          break;
        case "node:remove":
          graph.removeCell(change.id);
          break;
        case "node:move": {
          const cell = graph.getCellById(change.id);
          if (cell?.isNode()) cell.position(change.position.x, change.position.y);
          break;
        }
        case "node:state":
          graph.getCellById(change.id)?.setData({ state: change.state });
          break;
        case "node:data":
          // Content is the host's business; the canvas only carries state.
          break;
        case "edge:connect":
          graph.addEdge(toEdgeConfig(change.edge));
          break;
        case "edge:remove":
          graph.removeCell(change.id);
          break;
      }
    } finally {
      replaying = false;
    }
  };

  const unsubscribe = store.subscribe((change) => {
    if (viaCanvas) return;
    apply(change);
  });

  return {
    store,
    graph,
    destroy() {
      // Mute the removal echoes before tearing the model down — the store
      // outlives the canvas.
      replaying = true;
      unsubscribe();
      window.removeEventListener("resize", followHost);
      graph.dispose();
      // X6 leaves its layers behind — sweep them so a re-created canvas
      // on this container starts from clean paper. A snapshot: removing
      // mutates the live collection.
      for (const child of Array.from(container.children)) {
        if (child.classList.value.startsWith("x6-")) child.remove();
      }
      for (const dispose of cleanups.values()) dispose();
      cleanups.clear();
    },
  };
}
