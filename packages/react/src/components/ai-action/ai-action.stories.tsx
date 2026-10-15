import type { Meta } from "@storybook/react-vite";

import { AiAction } from ".";
import { iconNode } from "../../internal/icon";

const meta: Meta = { title: "Components/AI/AI Action" };
export default meta;

const copyIcon = iconNode("copy");
const retryIcon = iconNode("undo");
const upIcon = iconNode("arrow-up");
const downIcon = iconNode("arrow-down");

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
