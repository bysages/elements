import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

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
  render: () =>
    h("div", { style: { display: "flex", gap: "0.5rem" } }, () => [
      h(AiAction, { label: "Copy" }, () => copyIcon),
      h(AiAction, { label: "Retry" }, () => retryIcon),
      h(AiAction, { label: "Helpful" }, () => upIcon),
      h(AiAction, { label: "Not helpful" }, () => downIcon),
    ]),
};
