import { parseMarkdown } from "@tanstack/markdown";
import type { BlockNode, InlineNode, ListNode } from "@tanstack/markdown";

import type { WorkflowEdge, WorkflowGraph, WorkflowNode } from "./types";

/** A section''s payload — a ```json fence placed under its heading rides
 * along parsed into data, so the outline carries both the tree and the
 * machine-readable facts of each branch. */
export interface MindmapNodeData {
  label: string;
  payload?: unknown;
}

/** Where each new level hangs from — tracked alongside the node id so
 * headings and list items can interleave freely. */
interface Level {
  depth: number;
  nodeId: string;
}

const inlineText = (nodes: readonly InlineNode[]): string =>
  nodes
    .map((node) => {
      if (node.type === "text" || node.type === "inlineCode") return node.value;
      if (node.type === "break") return " ";
      if ("children" in node) return inlineText(node.children);
      if (node.type === "footnoteReference") return node.id;
      return "";
    })
    .join("");

const blockText = (block: BlockNode): string => {
  if (block.type === "heading" || block.type === "paragraph") return inlineText(block.children);
  return "";
};

/** Turns a markdown outline into a workflow graph: every heading and
 * every list item becomes a node, the nesting becomes edges, and a json
 * fence deepens its nearest section with parsed payload. An h1 names the
 * root; without one the first entry grows into the trunk. Positions all
 * start at the origin — the canvas sweep (ELK''s mrtree) hands out the
 * real geometry. Every node keeps both handles, so any branch can grow
 * on the canvas later. */
export function outlineToGraph(markdown: string): WorkflowGraph {
  const document = parseMarkdown(markdown);

  const nodes: WorkflowNode[] = [];
  const edges: WorkflowEdge[] = [];
  const stack: Level[] = [];
  let counter = 0;

  const attachPayload = (nodeId: string, block: Extract<BlockNode, { type: "code" }>) => {
    const node = nodes.find((candidate) => candidate.id === nodeId);
    if (!node) return;
    try {
      node.data.payload = JSON.parse(block.value);
    } catch {
      node.data.payload = block.value;
    }
  };

  const grow = (label: string, depth: number): string => {
    counter += 1;
    const id = `m${counter}`;
    while (stack.length > 0 && stack[stack.length - 1].depth >= depth) stack.pop();
    nodes.push({
      id,
      type: "mindmap",
      position: { x: 0, y: 0 },
      ports:
        stack.length === 0
          ? [{ id: "out", dir: "out" }]
          : [
              { id: "in", dir: "in" },
              { id: "out", dir: "out" },
            ],
      data: { label } satisfies MindmapNodeData,
    });
    if (stack.length > 0) {
      edges.push({
        id: `e${counter}`,
        source: { node: stack[stack.length - 1].nodeId, port: "out" },
        target: { node: id, port: "in" },
      });
    }
    stack.push({ depth, nodeId: id });
    return id;
  };

  const walkList = (list: ListNode, depth: number): void => {
    for (const item of list.items) {
      const lead = item.children[0];
      const id = grow(lead ? blockText(lead) || "—" : "—", depth);
      for (const child of item.children) {
        if (child.type === "list") walkList(child, depth + 1);
        else if (child.type === "code" && child.lang === "json") attachPayload(id, child);
      }
    }
  };

  const headings = document.children.filter(
    (block): block is Extract<BlockNode, { type: "heading" }> => block.type === "heading",
  );
  if (headings[0]?.depth === 1) grow(inlineText(headings[0].children), 0);

  for (const block of document.children) {
    if (block.type === "heading") {
      if (!(block === headings[0] && block.depth === 1))
        grow(inlineText(block.children), block.depth - 1);
    } else if (block.type === "list") {
      walkList(block, stack[stack.length - 1].depth + 1);
    } else if (block.type === "code" && block.lang === "json" && stack.length > 0) {
      attachPayload(stack[stack.length - 1].nodeId, block);
    }
  }

  return { nodes, edges };
}

const FENCE = "```";

/** Folds a tree-shaped graph back into the outline the parser accepts:
 * the root as the h1, first-level branches as h2s, deeper nodes as
 * nested list items, and a payload re-entering as a json fence under
 * its section. Extra parents (a node several edges reach) are ignored —
 * the first edge wins, so the fold stays a tree. */
export function graphToOutline(graph: WorkflowGraph): string {
  const dataOf = (id: string): MindmapNodeData => {
    const node = graph.nodes.find((candidate) => candidate.id === id);
    return {
      label: typeof node?.data.label === "string" ? node.data.label : id,
      payload: node?.data.payload,
    };
  };

  const parentOf = new Map<string, string>();
  const childrenOf = new Map<string, string[]>();
  for (const edge of graph.edges) {
    if (parentOf.has(edge.target.node)) continue;
    parentOf.set(edge.target.node, edge.source.node);
    const siblings = childrenOf.get(edge.source.node) ?? [];
    siblings.push(edge.target.node);
    childrenOf.set(edge.source.node, siblings);
  }

  const lines: string[] = [];
  const emitPayload = (indent: number, payload: unknown) => {
    lines.push("");
    const pad = " ".repeat(indent);
    lines.push(pad + FENCE + "json");
    for (const line of JSON.stringify(payload, null, 2).split("\n")) lines.push(pad + line);
    lines.push(pad + FENCE, "");
  };
  const walk = (id: string, depth: number): void => {
    const { label, payload } = dataOf(id);
    if (depth <= 1) {
      if (lines.length > 0 && lines[lines.length - 1] !== "") lines.push("");
      lines.push(depth === 0 ? `# ${label}` : `## ${label}`, "");
    } else {
      lines.push(`${" ".repeat((depth - 2) * 2)}- ${label}`);
    }
    if (payload !== undefined) emitPayload(depth >= 2 ? (depth - 2) * 2 + 2 : 0, payload);
    for (const child of childrenOf.get(id) ?? []) walk(child, depth + 1);
  };
  for (const node of graph.nodes) {
    if (!parentOf.has(node.id)) walk(node.id, 0);
  }
  return (
    lines
      .join("\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim() + "\n"
  );
}
