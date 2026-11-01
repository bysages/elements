import type {
  BlockNode,
  CodeBlockNode,
  InlineNode,
  MarkdownDocument,
  MarkdownExtension,
} from "@tanstack/markdown";
import { render } from "pele";

import { metricsMeasurer } from "./text-measurer";

/** The transform marks the exact nodes that survived this pass, so the
 * renderer never guesses from `lang` alone and duplicate blocks can
 * receive distinct deterministic ids. */
type MermaidCodeBlock = CodeBlockNode & { mermaidOccurrence?: number };

function isMermaidBlock(node: BlockNode | InlineNode): node is MermaidCodeBlock {
  return node.type === "code" && node.lang?.toLowerCase() === "mermaid";
}

function walkBlocks(nodes: BlockNode[], visit: (node: BlockNode) => void): void {
  for (const node of nodes) {
    visit(node);
    if (node.type === "list") {
      for (const item of node.items) walkBlocks(item.children, visit);
    } else if (node.type === "blockquote" || node.type === "callout" || node.type === "component") {
      walkBlocks(node.children, visit);
    } else if (node.type === "footnotes") {
      for (const item of node.items) walkBlocks(item.children, visit);
    }
  }
}

/** FNV-1a keeps stream renders and the hydration that follows them on
 * the same id without introducing a mutable renderer-side counter. */
function sourceHash(source: string): string {
  let hash = 0x811c9dc5;
  for (let index = 0; index < source.length; index += 1) {
    hash ^= source.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash.toString(36);
}

function renderMermaid(source: string, occurrence: number): string | undefined {
  try {
    const diagram = render(source, {
      measurer: metricsMeasurer,
      idPrefix: `bs-mermaid-${sourceHash(source)}-${occurrence}`,
      links: false,
      images: false,
      responsive: true,
    });

    return [
      `<figure class="bs-mermaid" data-lang="mermaid" data-diagram="${diagram.type}">`,
      diagram.svg,
      "</figure>",
    ].join("");
  } catch {
    // A streaming document often passes through incomplete diagrams;
    // TanStack Markdown renders the fallback code block for this pass.
    return undefined;
  }
}

/** A safe, deterministic bridge from fenced Mermaid to Pele. Callers
 * cannot reach Pele options: links, remote images and nondeterministic
 * measurement are intentionally not part of the Markdown API. */
export function mermaidExtension(): MarkdownExtension {
  let occurrence = 0;

  return {
    name: "bysages-mermaid",
    transformDocument(document: MarkdownDocument) {
      walkBlocks(document.children, (node) => {
        if (!isMermaidBlock(node)) return;
        node.mermaidOccurrence = occurrence;
        occurrence += 1;
      });
    },
    renderHtml(node) {
      if (!isMermaidBlock(node)) return undefined;
      const block = node;
      if (block.mermaidOccurrence === undefined) return undefined;
      return renderMermaid(block.value, block.mermaidOccurrence);
    },
  };
}
