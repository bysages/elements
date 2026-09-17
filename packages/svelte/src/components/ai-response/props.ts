import type { HTMLAttributes } from "svelte/elements";

export interface ResponseProps extends HTMLAttributes<HTMLDivElement> {
  /** The markdown text to set on the paper — streamed in freely;
   * raw HTML and executable links stay inert. */
  content: string;
}
