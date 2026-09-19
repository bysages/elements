import { AiPromptInput, AiTool, Button } from "@bysages/vue";
import type { Meta } from "@storybook/vue3-vite";
import { createApp, defineComponent, h, onBeforeUnmount, onMounted, ref } from "vue";

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

const Demo = defineComponent({
  name: "WorkflowDemo",
  props: { run: { type: Boolean, default: false } },
  setup(props) {
    const host = ref<HTMLElement | null>(null);
    const mapHost = ref<HTMLElement | null>(null);
    let canvas: WorkflowCanvas | null = null;
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
    const zoom = ref(100);

    // Each renderer owns one node type. createApp runs in its own app
    // context — fine for these self-contained components, but a Menu or
    // Select inside a node would teleport to body, outside the canvas
    // transform.
    const renderNode = (host: HTMLElement, node: WorkflowNode): void | (() => void) => {
      if (!canvas) return;
      const store = canvas.store;

      switch (node.type) {
        case "start": {
          // The host is the card itself — content mounts straight in.
          const label = document.createElement("span");
          label.textContent = labelOf(node.data, node.id);
          host.append(label);
          return;
        }
        case "prompt": {
          const app = createApp(
            defineComponent({
              name: "PromptNode",
              setup() {
                return () =>
                  h(AiPromptInput, {
                    placeholder: labelOf(node.data, ""),
                    onSubmit: (value: string) => {
                      store.setNodeData(node.id, { submitted: value } as WorkflowNodeData);
                    },
                  });
              },
            }),
          );
          app.mount(host);
          return () => app.unmount();
        }
        case "tool": {
          const state = ref(node.state ?? "idle");
          const app = createApp(
            defineComponent({
              name: "ToolNode",
              setup() {
                return () =>
                  h(
                    AiTool,
                    { name: labelOf(node.data, node.id), status: toolStatus(state.value) },
                    {
                      input: () => '{"query": "paper stock"}',
                      output: () => '{"hits": 12}',
                    },
                  );
              },
            }),
          );
          app.mount(host);
          const unsubscribe = store.subscribe((change) => {
            if (change.kind === "node:state" && change.id === node.id) state.value = change.state;
          });
          return () => {
            unsubscribe();
            app.unmount();
          };
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

    onMounted(() => {
      if (!host.value) return;
      canvas = createWorkflowCanvas(host.value, createWorkflowStore(fixture()), {
        renderNode,
        ...(mapHost.value ? { minimap: { container: mapHost.value } } : {}),
      });
      const { graph } = canvas;
      graph.on("scale", () => {
        zoom.value = Math.round(graph.zoom() * 100);
      });
      if (props.run) runSequence(canvas);
    });

    onBeforeUnmount(() => {
      for (const t of timers) clearTimeout(t);
      canvas?.destroy();
    });

    // The chrome echoes the workflow editors people know: the minimap
    // and the zoom controls anchored inside the canvas, bottom right.
    const zoomButton = (label: string, name: string, step: () => void) =>
      h(
        Button,
        { variant: "outline", size: "sm", square: true, "aria-label": name, onClick: step },
        () => label,
      );

    return () =>
      h("div", { style: { position: "relative", inlineSize: "100%", blockSize: "36rem" } }, [
        h("div", { ref: host, style: { position: "absolute", inset: "0" } }),
        h(
          "div",
          {
            style: {
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
            },
          },
          [
            zoomButton("−", "Zoom out", () => canvas?.graph.zoomTo(canvas.graph.zoom() / 1.2)),
            h(
              "span",
              {
                style: {
                  minInlineSize: "3em",
                  textAlign: "center",
                  fontSize: "0.75rem",
                  color: "var(--bs-color-text-secondary)",
                },
              },
              `${zoom.value}%`,
            ),
            zoomButton("+", "Zoom in", () => canvas?.graph.zoomTo(canvas.graph.zoom() * 1.2)),
            zoomButton("⤢", "Fit view", () =>
              canvas?.graph.zoomToFit({ padding: 24, maxScale: 1 }),
            ),
            h(
              Button,
              {
                variant: "outline",
                size: "sm",
                "aria-label": "Auto layout",
                onClick: () => void canvas?.layout(),
              },
              () => "Auto layout",
            ),
          ],
        ),
        h("div", {
          ref: mapHost,
          style: {
            position: "absolute",
            insetBlockEnd: "0.75rem",
            insetInlineEnd: "0.75rem",
            inlineSize: "13rem",
            blockSize: "9rem",
          },
        }),
      ]);
  },
});

/** Three nodes on paper: the vessel rounds, the seals square, the ink
 * flows. Drag nodes, pull new edges from an out handle, drag the blank
 * to pan, wheel to zoom, shift-drag the blank to rubberband-select,
 * undo with ctrl+z, delete with the delete key. */
export const Basic = {
  render: () => h(Demo),
};

/** The executor's view from the outside: states are written back through
 * the store and the canvas lights up node by node. Data writes never
 * enter the undo stack. */
export const Run = {
  render: () => h(Demo, { run: true }),
};
