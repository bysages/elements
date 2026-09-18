import type { Meta } from "@storybook/react-vite";

import { AiSource, AiSources } from ".";

const meta: Meta = { title: "Components/AI/AI Source" };
export default meta;

/** The reading list under a response: an ordered list of where the
 * ink came from, each opening in its own tab. */
export const Basic = {
  render: () => (
    <div style={{ width: "100%", maxWidth: "46rem" }}>
      <AiSources>
        <AiSource href="https://example.com/ink">Ink release notes</AiSource>
        <AiSource href="https://example.com/paper">The paper-and-ink system</AiSource>
      </AiSources>
    </div>
  ),
};
