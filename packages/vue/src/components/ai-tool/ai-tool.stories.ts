import type { Meta } from "@storybook/vue3-vite";
import { h, reactive } from "vue";

import { AiTool } from ".";
import { withState } from "../with-state.js";

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

/** Structured values have a readable default format; custom markup can
 * still replace either side with the `input` or `output` slot. */
export const Structured = {
  render: () =>
    h(
      "div",
      { style: { display: "grid", gap: "0.75rem", inlineSize: "100%", maxInlineSize: "46rem" } },
      [
        h(AiTool, {
          name: "search_web",
          status: "completed",
          defaultOpen: true,
          inputValue: { query: "paper stock", limit: 5 },
          outputValue: { hits: 12, sources: ["catalog", "archive"] },
        }),
      ],
    ),
};

/** A required gate reports its decision through `approve` and `deny`. */
export const Approval = {
  render: () =>
    withState(() => {
      const state = reactive({ approval: "required" as "required" | "approved" | "denied" });
      return () =>
        h(
          "div",
          {
            style: { display: "grid", gap: "0.75rem", inlineSize: "100%", maxInlineSize: "46rem" },
          },
          [
            h(AiTool, {
              name: "write_file",
              status:
                state.approval === "approved"
                  ? "completed"
                  : state.approval === "denied"
                    ? "denied"
                    : "pending",
              approval: state.approval,
              defaultOpen: true,
              inputValue: { path: "/notes/colophon.md" },
              onApprove: () => {
                state.approval = "approved";
              },
              onDeny: () => {
                state.approval = "denied";
              },
            }),
          ],
        );
    }),
};
