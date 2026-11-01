export interface MarkdownRenderOptions {
  /** Optional code-highlighting function re-inking fenced blocks. */
  highlighter?: (code: string, lang?: string) => string;
  /** Render fenced `mermaid` blocks as diagrams; invalid diagrams fall
   * back to their ordinary code block. */
  mermaid?: boolean;
}
