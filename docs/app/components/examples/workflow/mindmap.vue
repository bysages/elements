<script setup lang="ts">
import { Button } from "@bysages/vue";
import type { WorkflowCanvas } from "@bysages/workflow";
import { onBeforeUnmount, onMounted, ref } from "vue";

// The outline is the whole input: headings and nested lists become the
// tree, and a json fence rides along as its section's payload.
const outline = `
# Paper & Ink

## Design language
- Surfaces rest in ambient shade
- Ink is the only hierarchy

## Tokens
- Spacing
  - Semantic tiers
  - Raw ramp
- Elevation

\`\`\`json
{ "spacing": 8, "elevation": 5 }
\`\`\`

## Lighting
- Source model
- Pigment bleed
`.trim();

const host = ref<HTMLElement | null>(null);
const mapHost = ref<HTMLElement | null>(null);
const zoom = ref(100);
const outlineText = ref("");
const showOutline = ref(false);
let canvas: WorkflowCanvas | null = null;
let disposed = false;
let grown = 0;

// X6 is browser-only, so the engine is pulled in from the client only —
// a static import here would drag it into the server module graph.
onMounted(async () => {
  if (!host.value) return;
  const { createWorkflowCanvas, createWorkflowStore, outlineToGraph } =
    await import("@bysages/workflow");
  // The chunk load may outlive the visit — never mount onto a departed host.
  if (disposed || !host.value) return;
  canvas = createWorkflowCanvas(host.value, createWorkflowStore(outlineToGraph(outline)), {
    renderNode: (card, node) => {
      const label = document.createElement("span");
      label.textContent = typeof node.data.label === "string" ? node.data.label : node.id;
      card.append(label);
      if (node.data.payload !== undefined) {
        const note = document.createElement("span");
        note.className = "text-xs text-tertiary";
        note.textContent = JSON.stringify(node.data.payload);
        card.append(note);
      }
    },
    orientation: "LR",
    minimap: { container: mapHost.value! },
  });
  canvas.graph.on("scale", () => {
    zoom.value = Math.round(canvas.graph.zoom() * 100);
  });
  // Double-click grows a branch: the store's own primitives carry the
  // whole edit, and the tree sweep re-hands out the geometry.
  canvas.graph.on("node:dblclick", ({ node }) => {
    if (!canvas) return;
    grown += 1;
    const id = `grown-${grown}`;
    canvas.store.addNode({
      id,
      type: "mindmap",
      position: { x: 0, y: 0 },
      ports: [
        { id: "in", dir: "in" },
        { id: "out", dir: "out" },
      ],
      data: { label: "New branch" },
    });
    canvas.store.connect({
      source: { node: node.id, port: "out" },
      target: { node: id, port: "in" },
    });
    void canvas.layout({ algorithm: "org.eclipse.elk.mrtree", direction: "LR" });
  });
  // The tree sweep hands out the geometry the outline implies — root on
  // the left, branches growing right.
  await canvas.layout({ algorithm: "org.eclipse.elk.mrtree", direction: "LR" });
  canvas.fitView();
});

onBeforeUnmount(() => {
  disposed = true;
  canvas?.destroy();
});

const zoomTo = (factor: number) => canvas?.zoomBy(factor);
const fit = () => canvas?.fitView();
const sweep = () => void canvas?.layout({ algorithm: "org.eclipse.elk.mrtree", direction: "LR" });
const toggleOutline = async () => {
  if (!canvas) return;
  showOutline.value = !showOutline.value;
  if (showOutline.value) {
    // The module is already in the client by now — this hits the cache.
    const { graphToOutline } = await import("@bysages/workflow");
    outlineText.value = graphToOutline(canvas.store.getGraph());
  }
};
const copyOutline = () => void navigator.clipboard.writeText(outlineText.value);
</script>

<template>
  <div class="relative w-full h-144">
    <div ref="host" class="absolute inset-0"></div>
    <div
      class="absolute bottom-3 start-3 flex items-center gap-1 rounded-md border border-border bg-surface-2 p-1 shadow-xs"
    >
      <Button variant="outline" size="sm" square aria-label="Zoom out" @click="zoomTo(1 / 1.2)">
        −
      </Button>
      <span class="min-w-[3em] text-center text-xs text-secondary"> {{ zoom }}% </span>
      <Button variant="outline" size="sm" square aria-label="Zoom in" @click="zoomTo(1.2)"
        >+</Button
      >
      <Button variant="outline" size="sm" square aria-label="Fit view" @click="fit">⤢</Button>
      <Button
        variant="outline"
        size="sm"
        aria-label="Re-sweep the tree"
        class="ms-1"
        @click="sweep"
      >
        Re-sweep
      </Button>
      <Button
        variant="outline"
        size="sm"
        aria-label="Show the outline markdown"
        class="ms-1"
        @click="toggleOutline"
      >
        Outline
      </Button>
      <Button
        v-if="showOutline"
        variant="outline"
        size="sm"
        aria-label="Copy the outline markdown"
        @click="copyOutline"
      >
        Copy
      </Button>
    </div>
    <pre
      v-if="showOutline"
      class="absolute inset-x-3 top-3 z-10 max-h-60 overflow-auto rounded-md border border-border bg-surface-1 p-3 text-xs text-secondary"
      >{{ outlineText }}</pre>
    <div ref="mapHost" class="absolute bottom-3 end-3 h-36 w-52"></div>
  </div>
</template>
