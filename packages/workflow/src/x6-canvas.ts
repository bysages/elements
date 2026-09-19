import { Graph, History, Keyboard, MiniMap, Selection, Shape } from "@antv/x6";
import type { Cell, EdgeMetadata, NodeMetadata } from "@antv/x6";
import { injectComponentStyle } from "@bysages/core";

import { createWorkflowStore } from "./store";
import type { WorkflowChange, WorkflowStore } from "./store";
import type { NodeState, WorkflowEdge, WorkflowGraph, WorkflowNode } from "./types";

/** How the layered engine should sweep the graph. Top-to-bottom suits
 * the node anatomy — out handles on the bottom, in handles on top. */
export interface WorkflowAutoLayoutOptions {
  direction?: "TB" | "LR" | "BT" | "RL";
  /** The gap between layers, in px. */
  rankSep?: number;
  /** The gap between siblings on one layer, in px. */
  nodeSep?: number;
}

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
  /** Sweeps the graph with the ELK layered algorithm and writes every
   * node's new position back through the store. Async: the layout
   * engine is heavy, so it's pulled in only when this runs. */
  layout(options?: WorkflowAutoLayoutOptions): Promise<void>;
  destroy(): void;
}

// Roomy enough that a prompt line or a tool trigger rests on one line
// at the default width — node content shouldn't fight its vessel.
const NODE_WIDTH = 256;
const NODE_HEIGHT = 88;
const HANDLE = 12;

/** The html() callback resolves its canvas from the cell's graph, so one
 * registration serves every canvas: X6's module-private html registry has
 * no unregister, and a per-canvas closure there would pin the whole dead
 * canvas for the page's lifetime. */
interface CanvasContext {
  store: WorkflowStore;
  cleanups: Map<string, () => void>;
  renderNode?: WorkflowCanvasOptions["renderNode"];
}
const canvasContexts = new WeakMap<Graph, CanvasContext>();
const SHAPE_NAME = "workflow-html-node";

Shape.HTML.register({
  shape: SHAPE_NAME,
  // `effect: []` pins the html() callback to the initial render — X6's
  // html view otherwise re-runs it on every cell change, drag frames
  // included, tearing down the host's mounted content (a prompt draft,
  // an input focus) each time. State travels through a data attribute.
  effect: [],
  width: NODE_WIDTH,
  height: NODE_HEIGHT,
  html(cell: Cell) {
    const model = cell.model;
    const context = model ? canvasContexts.get(model.graph) : undefined;
    if (!context) return document.createElement("div");
    const node = context.store.getNode(cell.id);
    if (!node) return document.createElement("div");

    const host = document.createElement("div");
    host.dataset.scope = "workflow";
    host.dataset.part = "node";
    const card = document.createElement("div");
    card.className = "workflow-node-card";
    card.dataset.state = node.state ?? "idle";
    host.append(card);

    const dispose = context.renderNode?.(card, node);
    if (dispose) context.cleanups.set(cell.id, dispose);

    cell.on("change:data", ({ current }) => {
      const data = (current ?? {}) as { workflowState?: NodeState };
      card.dataset.state = data.workflowState ?? "idle";
    });
    return host;
  },
});

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
    shape: SHAPE_NAME,
    x: node.position.x,
    y: node.position.y,
    // The X6 copy carries everything an undo restore needs to rebuild the
    // protocol node. The reserved workflow* keys can't collide with a
    // host's own data fields.
    data: {
      ...node.data,
      workflowType: node.type,
      workflowState: node.state ?? "idle",
    },
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
    attrs: {
      line: {
        ...edgeAttrs.line,
        ...(edge.state ? { "data-state": edge.state } : {}),
      },
    },
  });

  // The annotation breaks the inference cycle: connecting.createEdge
  // closes over the graph, so without it every handler below degrades
  // to implicit any.
  const graph: Graph = new Graph({
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

  canvasContexts.set(graph, { store, cleanups, renderNode: options.renderNode });

  container.dataset.scope = "workflow";
  container.dataset.part = "canvas";
  // The handle geometry is the adapter's; publish it so the stylesheet's
  // inward padding derives from the same number instead of a comment.
  container.style.setProperty("--bs-workflow-handle", `${HANDLE}px`);

  // The rubberband yields the bare blank drag to panning — it rides
  // shift instead, as canvas editors conventionally do. X6's own
  // selection boxes stay hidden (they'd sit over the HTML nodes and
  // swallow input events); selection lights our anatomy through the
  // x6-*-selected view classes, styled from the stylesheet.
  graph.use(
    new Selection({ enabled: true, rubberband: true, modifiers: ["shift"], multiple: true }),
  );
  // Execution states ride data changes and the edge's data-state attr —
  // runtime truth from the server, not user edits — so neither enters
  // the undo stack. History hands this check the wildcard event name
  // (the per-key rewrite happens after it), so the exclusion reads the
  // change key off the args; position changes must stay undoable.
  graph.use(
    new History({
      enabled: true,
      beforeAddCommand: (event, args) => {
        if (event !== "cell:change:*") return true;
        const key = (args as { key?: string }).key;
        return key !== "data" && key !== "attrs";
      },
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

  // The canvas follows the host's box: observe the container, size the
  // SVG, never write the container back. A container that changes size
  // without a window resize (a sidebar toggle) still reaches us.
  const followHost = () => graph.resize(container.clientWidth, container.clientHeight);
  followHost();
  const hostResize = new ResizeObserver(followHost);
  hostResize.observe(container);

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
  // Undo, redo, and programmatic moves bypass the drag pipeline: they
  // land as plain position changes without the ui flag a drag sets.
  graph.on("node:change:position", ({ node, options }) => {
    if (options?.ui) return;
    guard(() => store.moveNode(node.id, node.getPosition()));
  });
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
        workflowType?: string;
        workflowState?: NodeState;
      };
      const { workflowType, workflowState, ...rest } = data;
      store.addNode({
        id: node.id,
        type: workflowType ?? "unknown",
        position: node.getPosition(),
        ports: node.getPorts().map((p) => ({
          id: p.id ?? "",
          dir: (String(p.group ?? "").startsWith("out") ? "out" : "in") as "in" | "out",
        })),
        state: workflowState,
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
          graph.getCellById(change.id)?.setData({ workflowState: change.state });
          break;
        case "node:data":
          // Content is the host's business; the canvas only carries
          // state. The patch still lands in the X6 copy — that copy is
          // what an undo restore rebuilds the protocol node from.
          graph.getCellById(change.id)?.setData({ ...change.patch });
          break;
        case "edge:connect":
          graph.addEdge(toEdgeConfig(change.edge));
          break;
        case "edge:state":
          graph.getCellById(change.id)?.attr("line/data-state", change.state);
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

  // The layout engine is heavy — one shared instance for the process,
  // not one worker per sweep. Sweeps also queue behind each other: two
  // overlapping runs would interleave their coordinates.
  let elkLoader: Promise<import("elkjs").ELK> | undefined;
  let layoutRun: Promise<void> = Promise.resolve();

  const doLayout = async (options?: WorkflowAutoLayoutOptions) => {
    const direction = options?.direction ?? "TB";
    const rankSep = options?.rankSep ?? 80;
    const nodeSep = options?.nodeSep ?? 40;
    elkLoader ??= import("elkjs").then(({ default: ELK }) => new ELK());
    const elk = await elkLoader;
    const { nodes, edges } = store.getGraph();
    const result = await elk.layout({
      id: "workflow",
      layoutOptions: {
        "elk.algorithm": "layered",
        "elk.direction": { TB: "DOWN", LR: "RIGHT", BT: "UP", RL: "LEFT" }[direction],
        "elk.spacing.nodeNode": String(nodeSep),
        "elk.layered.spacing.nodeNodeBetweenLayers": String(rankSep),
      },
      children: nodes.map((node) => ({
        id: node.id,
        width: NODE_WIDTH,
        height: NODE_HEIGHT,
      })),
      edges: edges.map((edge) => ({
        id: edge.id,
        sources: [edge.source.node],
        targets: [edge.target.node],
      })),
    });
    // ELK hands back top-left corners. Moves go through the store — the
    // single writer — so the canvas replays them like any other change,
    // and one undo takes back the whole sweep. A sweep that lands after
    // destroy() still updates the store; only the dead graph is skipped.
    if (destroyed) return;
    graph.startBatch("workflow-layout");
    try {
      for (const child of result.children ?? []) {
        if (child.x == null || child.y == null) continue;
        store.moveNode(child.id, { x: child.x, y: child.y });
      }
    } finally {
      graph.stopBatch("workflow-layout");
    }
  };

  const layout = (options?: WorkflowAutoLayoutOptions): Promise<void> => {
    const run = layoutRun.catch(() => {}).then(() => doLayout(options));
    layoutRun = run;
    return run;
  };

  let destroyed = false;
  const canvas: WorkflowCanvas = {
    store,
    graph,
    layout,
    destroy() {
      if (destroyed) return;
      destroyed = true;
      live.delete(container);
      // Mute the removal echoes before tearing the model down — the store
      // outlives the canvas.
      replaying = true;
      unsubscribe();
      hostResize.disconnect();
      graph.dispose();
      // X6 leaves its layers behind — sweep them so a re-created canvas
      // on this container starts from clean paper. A snapshot: removing
      // mutates the live collection.
      for (const child of Array.from(container.children)) {
        if (child.classList.value.startsWith("x6-")) child.remove();
      }
      // Drop the html() context — the shared registration outlives us,
      // our graph must not.
      canvasContexts.delete(graph);
      for (const dispose of cleanups.values()) dispose();
      cleanups.clear();
    },
  };
  live.set(container, canvas);
  return canvas;
}
