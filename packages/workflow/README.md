# @bysages/workflow

![npm version](https://img.shields.io/npm/v/@bysages/workflow)
![npm downloads](https://img.shields.io/npm/dw/@bysages/workflow)
![npm license](https://img.shields.io/npm/l/@bysages/workflow)

> The workflow canvas for By Sages Elements — a headless graph protocol (store, change stream, versioned serialization) with an [AntV X6](https://x6.antv.antgroup.com) adapter on top, dressed entirely by the paper-and-ink styles from `@bysages/core`.

## Features

- 🧠 **Headless first** — the protocol layer (`types`, `store`, `serialize`) imports no X6: executors, persistence, and tests run in Node, and the canvas engine stays replaceable
- 🖋 **Visuals live in core** — cards, handles, edges, and the minimap are `data-scope="workflow"` styles driven by tokens; light/dark, accent, contrast, and density tiers come free
- 🧩 **Host-owned nodes** — `renderNode` hands every node card to your framework (Vue, React, or plain DOM); the canvas never mounts content of its own
- 🎛 **Editor-grade defaults** — drag, connect with direction-aware handles, rubberband select, undo/redo, delete, minimap, fit view; the elkjs auto layout reads the edges' ports and sweeps the way the graph flows
- ⛓ **Execution stays out of history** — state writes (`node:state`, `edge:state`) ride a separate change source and never enter the undo stack

## Installation

```bash
# pnpm
pnpm add @bysages/workflow

# npm
npm install @bysages/workflow

# yarn
yarn add @bysages/workflow

# bun
bun add @bysages/workflow
```

X6 is browser-only — import the canvas from client code only (a dynamic import in SSR apps).

## Quick Start

Describe the graph as data, mount a canvas, and hand each card to your framework:

```ts
import { createWorkflowCanvas, createWorkflowStore } from "@bysages/workflow";

const store = createWorkflowStore({
  nodes: [
    {
      id: "start",
      type: "start",
      position: { x: 60, y: 40 },
      ports: [{ id: "out-1", dir: "out" }],
      data: { label: "Start" },
    },
    // …
  ],
  edges: [],
});

const canvas = createWorkflowCanvas(host, store, {
  // Your framework mounts the content of every node card.
  renderNode: (card, node) => {
    card.textContent = String(node.data.label ?? node.id);
  },
  minimap: { container: mapHost },
});

// Execution writes states back through the store — the canvas lights up.
store.setNodeState("start", "running");

// Persist the whole graph with a version envelope.
const saved = serializeWorkflowGraph(store.getGraph());
```

Every write goes through the store and fans out as a change; the canvas applies host changes, and host listeners observe canvas changes — drag a node and your store subscription sees it, write a position and the canvas moves it.

## License

- [MIT](../../LICENSE) © [By Sages](https://www.bysages.com/)
