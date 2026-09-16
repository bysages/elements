import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { AiSource, AiSources } from ".";

const meta: Meta = { title: "Components/AI/AI Source" };
export default meta;

/** The reading list under a response: an ordered list of where the
 * ink came from, each opening in its own tab. */
export const Basic = {
  render: () =>
    h("div", { style: { inlineSize: "100%", inlineSize: "100%", maxInlineSize: "46rem" } }, [
      h(AiSources, () => [
        h(AiSource, { href: "https://example.com/ink" }, () => "Ink release notes"),
        h(AiSource, { href: "https://example.com/paper" }, () => "The paper-and-ink system"),
      ]),
    ]),
};
