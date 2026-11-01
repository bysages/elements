import { describe, expect, it } from "vite-plus/test";

import { renderMarkdown } from "./index";

const diagram = ["flowchart LR", "  accTitle: Ink", "  Ink --> Paper"].join("\n");

function mermaidBlock(source: string): string {
  return ["```mermaid", source, "```"].join("\n");
}

describe("renderMarkdown", () => {
  it("renders valid Mermaid as themed diagram output", () => {
    const html = renderMarkdown(mermaidBlock(diagram));

    expect(html).toContain('class="bs-mermaid"');
    expect(html).toContain('data-diagram="flowchart"');
    expect(html).toContain("<svg");
  });

  it("falls back to a code block for invalid and half-finished diagrams", () => {
    for (const source of ["flowchart LR\n  Ink ->", "flowchart LR\n  Ink -->"]) {
      const html = renderMarkdown(mermaidBlock(source));

      expect(html).toContain("<pre");
      expect(html).not.toContain("bs-mermaid");
    }
  });

  it("uses deterministic ids and separates repeated diagrams", () => {
    const source = [mermaidBlock(diagram), "", mermaidBlock(diagram), ""].join("\n");
    const first = renderMarkdown(source);
    const second = renderMarkdown(source);
    const prefixes = [...first.matchAll(/bs-mermaid-[a-z0-9]+-\d+/g)].map(([value]) => value);

    expect(first).toBe(second);
    expect(new Set(prefixes).size).toBe(2);
  });

  it("keeps Mermaid off when the caller disables it", () => {
    const html = renderMarkdown(mermaidBlock(diagram), { mermaid: false });

    expect(html).toContain("<pre");
    expect(html).not.toContain("bs-mermaid");
  });

  it("keeps links, images and scripts inert in diagram output", () => {
    const source = ["flowchart LR", "  Ink[Node]", '  click Ink "https://example.com"'].join("\n");
    const html = renderMarkdown(mermaidBlock(source));

    expect(html).toContain("bs-mermaid");
    expect(html).not.toContain("<a ");
    expect(html).not.toContain("<img ");
    expect(html).not.toContain("<script");
    expect(html).not.toMatch(/\son[a-z]+\s*=/i);
    expect(html).not.toContain("javascript:");
  });

  it("still highlights ordinary fenced blocks", () => {
    const html = renderMarkdown("```css\n.token {}\n```", {
      highlighter: (code, lang) => '<span data-lang="' + lang + '">' + code + "</span>",
    });

    expect(html).toContain('<span data-lang="css">.token {}</span>');
  });
});
