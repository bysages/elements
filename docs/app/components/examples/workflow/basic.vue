<script setup lang="ts">
import { Button } from "@bysages/vue";
import type { WorkflowCanvas, WorkflowGraph } from "@bysages/workflow";
import { onBeforeUnmount, onMounted, ref } from "vue";

// Three nodes on paper. Ports carry the direction the protocol validates
// against: connections run out → in, ins take the top (or left), outs
// the bottom (or right).
const fixture = (): WorkflowGraph => ({
  nodes: [
    {
      id: "start",
      type: "start",
      position: { x: 60, y: 40 },
      ports: [{ id: "out-1", dir: "out" }],
      data: { label: "Start" },
    },
    {
      id: "prompt",
      type: "prompt",
      position: { x: 60, y: 210 },
      ports: [
        { id: "in-1", dir: "in" },
        { id: "out-1", dir: "out" },
      ],
      data: { label: "Draft the reply" },
    },
    {
      id: "tool",
      type: "tool",
      position: { x: 60, y: 400 },
      ports: [{ id: "in-1", dir: "in" }],
      data: { label: "search_web" },
    },
  ],
  edges: [
    {
      id: "e1",
      source: { node: "start", port: "out-1" },
      target: { node: "prompt", port: "in-1" },
    },
    {
      id: "e2",
      source: { node: "prompt", port: "out-1" },
      target: { node: "tool", port: "in-1" },
    },
  ],
});

const host = ref<HTMLElement | null>(null);
const mapHost = ref<HTMLElement | null>(null);
const zoom = ref(100);
let canvas: WorkflowCanvas | null = null;
let disposed = false;

// X6 is browser-only, so the engine is pulled in from the client only —
// a static import here would drag it into the server module graph.
onMounted(async () => {
  if (!host.value) return;
  const { createWorkflowCanvas, createWorkflowStore } = await import("@bysages/workflow");
  // The chunk load may outlive the visit — never mount onto a departed host.
  if (disposed || !host.value) return;
  canvas = createWorkflowCanvas(host.value, createWorkflowStore(fixture()), {
    // The host mounts its own content into each card — a plain label
    // here; any component works through this one hook.
    renderNode: (card, node) => {
      const label = document.createElement("span");
      label.textContent = String(node.data.label ?? node.id);
      card.append(label);
    },
    minimap: { container: mapHost.value! },
  });
  canvas.graph.on("scale", () => {
    zoom.value = Math.round(canvas.graph.zoom() * 100);
  });
});

onBeforeUnmount(() => {
  disposed = true;
  canvas?.destroy();
});

const zoomTo = (factor: number) => canvas?.zoomBy(factor);
const fit = () => canvas?.fitView();
</script>

<template>
  <div style="position: relative; inline-size: 100%; block-size: 36rem">
    <div ref="host" style="position: absolute; inset: 0"></div>
    <div
      style="
        position: absolute;
        inset-block-end: 0.75rem;
        inset-inline-start: 0.75rem;
        display: flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0.25rem;
        background: var(--bs-color-surface-2);
        border: 1px solid var(--bs-color-border);
        border-radius: var(--bs-radius-md);
        box-shadow: var(--bs-shadow-xs);
      "
    >
      <Button variant="outline" size="sm" square aria-label="Zoom out" @click="zoomTo(1 / 1.2)">
        −
      </Button>
      <span
        style="
          min-inline-size: 3em;
          text-align: center;
          font-size: 0.75rem;
          color: var(--bs-color-text-secondary);
        "
      >
        {{ zoom }}%
      </span>
      <Button variant="outline" size="sm" square aria-label="Zoom in" @click="zoomTo(1.2)"
        >+</Button
      >
      <Button variant="outline" size="sm" square aria-label="Fit view" @click="fit">⤢</Button>
      <Button
        variant="outline"
        size="sm"
        aria-label="Auto layout"
        style="margin-inline-start: 0.25rem"
        @click="canvas?.layout()"
      >
        Auto layout
      </Button>
    </div>
    <div
      ref="mapHost"
      style="
        position: absolute;
        inset-block-end: 0.75rem;
        inset-inline-end: 0.75rem;
        inline-size: 13rem;
        block-size: 9rem;
      "
    ></div>
  </div>
</template>
