import type { Meta } from "@storybook/react-vite";

import { AiAction } from ".";

const meta: Meta = { title: "Components/AI/AI Action" };
export default meta;

const icon = (d: string) => (
  <svg
    viewBox="0 0 16 16"
    width={14}
    height={14}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="square"
    aria-hidden="true"
  >
    <path d={d} />
  </svg>
);

const copyIcon = icon("M5.5 5.5h8v8h-8zM10.5 5.5v-3h-8v8h3");
const retryIcon = icon("M13 8a5 5 0 1 1-1.5-3.5M13 2v3h-3");
const upIcon = icon("M8 13V3M8 3 4 7M8 3l4 4");
const downIcon = icon("M8 3v10M8 13 4 9M8 13l4-4");

/** The quiet row under a message: copy, retry, and the two ways a
 * reader can answer. */
export const Basic = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <AiAction label="Copy">{copyIcon}</AiAction>
      <AiAction label="Retry">{retryIcon}</AiAction>
      <AiAction label="Helpful">{upIcon}</AiAction>
      <AiAction label="Not helpful">{downIcon}</AiAction>
    </div>
  ),
};
