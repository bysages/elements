import { AiPromptInput, AiTool, Button } from "@bysages/react";
import type { Meta } from "@storybook/react-vite";
import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";

import { createWorkflowCanvas, createWorkflowStore } from "../index";
import type {
  NodeState,
  WorkflowCanvas,
  WorkflowGraph,
  WorkflowNode,
  WorkflowNodeData,
} from "../index";

const meta: Meta = { title: "Components/Data/Workflow" };
export default meta;

const fixture = (): WorkflowGraph => ({
  nodes: [
    {
      id: "start",
      type: "start",
      position: { x: 60, y: 40 },
      ports: [
        { id: "out-1", dir: "out" },
        { id: "out-2", dir: "out" },
      ],
      data: { label: "Start" },
    },
    {
      id: "prompt",
      type: "prompt",
      position: { x: 60, y: 210 },
      ports: [
        { id: "in-1", dir: "in" },
        { id: "in-2", dir: "in" },
        { id: "out-1", dir: "out" },
        { id: "out-2", dir: "out" },
      ],
      data: { label: "Draft the reply" },
    },
    {
      id: "tool",
      type: "tool",
      position: { x: 60, y: 400 },
      ports: [
        { id: "in-1", dir: "in" },
        { id: "in-2", dir: "in" },
      ],
      data: { label: "search_web" },
    },
  ],
  edges: [
    {
      id: "e1",
      source: { node: "start", port: "out-1" },
      target: { node: "prompt", port: "in-1" },
    },
    { id: "e2", source: { node: "prompt", port: "out-1" }, target: { node: "tool", port: "in-1" } },
  ],
});

/** NodeState → AiTool's status vocabulary. */
const toolStatus = (state: NodeState): "pending" | "running" | "completed" | "error" =>
  state === "idle" ? "pending" : state === "success" ? "completed" : state;

const labelOf = (data: WorkflowNodeData, fallback: string) =>
  typeof data.label === "string" ? data.label : fallback;

const Demo = ({ run = false }: { run?: boolean }) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<WorkflowCanvas | null>(null);
  const [zoom, setZoom] = useState(100);

  // Each renderer owns one node type. createRoot mounts into the card —
  // content updates stay with the host, driven by the store subscription.
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));

    const renderNode = (card: HTMLElement, node: WorkflowNode): void | (() => void) => {
      const store = canvasRef.current?.store;
      if (!store) return;

      switch (node.type) {
        case "start": {
          const label = document.createElement("span");
          label.textContent = labelOf(node.data, node.id);
          card.append(label);
          return;
        }
        case "prompt": {
          const root = createRoot(card);
          const PromptNode = () => {
            const [draft, setDraft] = useState("");
            return (
              <AiPromptInput
                value={draft}
                onValueChange={setDraft}
                placeholder={labelOf(node.data, "")}
                onSubmit={(value) => {
                  store.setNodeData(node.id, { submitted: value } as WorkflowNodeData);
                }}
              />
            );
          };
          root.render(<PromptNode />);
          // Story teardown runs inside React's own unmount; the root's
          // must wait a tick or React refuses the synchronous unmount.
          return () => setTimeout(() => root.unmount(), 0);
        }
        case "tool": {
          const root = createRoot(card);
          const ToolNode = () => {
            const [state, setState] = useState<NodeState>(node.state ?? "idle");
            useEffect(
              () =>
                store.subscribe((change) => {
                  if (change.kind === "node:state" && change.id === node.id) setState(change.state);
                }),
              [],
            );
            return (
              <AiTool
                name={labelOf(node.data, node.id)}
                status={toolStatus(state)}
                input='{"query": "paper stock"}'
                output='{"hits": 12}'
              />
            );
          };
          root.render(<ToolNode />);
          return () => setTimeout(() => root.unmount(), 0);
        }
      }
    };

    const runSequence = (canvas: WorkflowCanvas) => {
      const { store, graph } = canvas;
      const edgeState = (id: string, state: string) =>
        graph.getCellById(id)?.attr("line/data-state", state);

      at(600, () => {
        store.setNodeState("prompt", "running");
        edgeState("e1", "running");
      });
      at(2000, () => {
        store.setNodeState("prompt", "success");
        edgeState("e1", "success");
      });
      at(2400, () => {
        store.setNodeState("tool", "running");
        edgeState("e2", "running");
      });
      at(4200, () => {
        store.setNodeState("tool", "success");
        edgeState("e2", "success");
      });
    };

    const canvas = createWorkflowCanvas(host, createWorkflowStore(fixture()), {
      renderNode,
      ...(mapRef.current ? { minimap: { container: mapRef.current } } : {}),
    });
    canvasRef.current = canvas;
    canvas.graph.on("scale", () => setZoom(Math.round(canvas.graph.zoom() * 100)));
    if (run) runSequence(canvas);

    return () => {
      for (const t of timers) clearTimeout(t);
      canvas.destroy();
      canvasRef.current = null;
    };
  }, [run]);

  const stepZoom = (factor: number) => {
    const canvas = canvasRef.current;
    if (canvas) canvas.graph.zoomTo(canvas.graph.zoom() * factor);
  };
  const fit = () => canvasRef.current?.graph.zoomToFit({ padding: 24, maxScale: 1 });

  // The chrome echoes the workflow editors people know: the minimap and
  // the zoom controls anchored inside the canvas, bottom right.
  const zoomButton = (label: string, name: string, step: () => void) => (
    <Button variant="outline" size="sm" square aria-label={name} onClick={step}>
      {label}
    </Button>
  );

  return (
    <div style={{ position: "relative", inlineSize: "100%", blockSize: "36rem" }}>
      <div ref={hostRef} style={{ position: "absolute", inset: 0 }} />
      <div
        style={{
          position: "absolute",
          insetBlockEnd: "0.75rem",
          insetInlineStart: "0.75rem",
          display: "flex",
          alignItems: "center",
          gap: "0.25rem",
          padding: "0.25rem",
          background: "var(--bs-color-surface-2)",
          border: "1px solid var(--bs-color-border)",
          borderRadius: "var(--bs-radius-md)",
          boxShadow: "var(--bs-shadow-xs)",
        }}
      >
        {zoomButton("−", "Zoom out", () => stepZoom(1 / 1.2))}
        <span
          style={{
            minInlineSize: "3em",
            textAlign: "center",
            fontSize: "0.75rem",
            color: "var(--bs-color-text-secondary)",
          }}
        >
          {zoom}%
        </span>
        {zoomButton("+", "Zoom in", () => stepZoom(1.2))}
        {zoomButton("⤢", "Fit view", fit)}
        <Button
          variant="outline"
          size="sm"
          aria-label="Auto layout"
          style={{ marginInlineStart: "0.25rem" }}
          onClick={() => void canvasRef.current?.layout()}
        >
          Auto layout
        </Button>
      </div>
      <div
        ref={mapRef}
        style={{
          position: "absolute",
          insetBlockEnd: "0.75rem",
          insetInlineEnd: "0.75rem",
          inlineSize: "13rem",
          blockSize: "9rem",
        }}
      />
    </div>
  );
};

/** Three nodes on paper: the vessel rounds, the seals square, the ink
 * flows. Drag nodes, pull new edges from an out handle, drag the blank
 * to pan, wheel to zoom, shift-drag the blank to rubberband-select,
 * undo with ctrl+z, delete with the delete key. */
export const Basic = {
  render: () => <Demo />,
};

/** The executor's view from the outside: states are written back through
 * the store and the canvas lights up node by node. Data writes never
 * enter the undo stack. */
export const Run = {
  render: () => <Demo run />,
};
