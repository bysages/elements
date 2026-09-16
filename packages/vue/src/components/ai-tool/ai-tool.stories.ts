import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { AiTool } from ".";

const meta: Meta = { title: "Components/AI/AI Tool" };
export default meta;

/** A tool call in each state: reaching, running, answered, refused.
 * The dot pairs color with the word — never color alone. */
export const Basic = {
  render: () =>
    h(
      "div",
      {
        style: {
          display: "grid",
          gap: "0.75rem",
          inlineSize: "100%",
          maxInlineSize: "46rem",
        },
      },
      [
        h(
          AiTool,
          { name: "search_web", status: "running" },
          {
            input: () => '{"query": "paper stock"}',
          },
        ),
        h(
          AiTool,
          { name: "search_web", status: "completed", defaultOpen: true },
          {
            input: () => '{"query": "paper stock"}',
            output: () => '{"hits": 12}',
          },
        ),
        h(
          AiTool,
          { name: "send_fax", status: "error" },
          {
            input: () => '{"to": "+86 …"}',
            output: () => "Error: line busy",
          },
        ),
        h(
          AiTool,
          { name: "read_file" },
          {
            output: () => '{"path": "/etc/colophon"}',
          },
        ),
      ],
    ),
};
