import type { Meta } from "@storybook/react-vite";

import { AiResponse } from ".";

const meta: Meta = { title: "Components/AI/AI Response" };
export default meta;

/** Every prose register the response may be asked to set — headings,
 * code, quote, table — each in its hairline dress. */
export const Basic = {
  render: () => (
    <div style={{ width: "100%", maxWidth: "46rem" }}>
      <AiResponse
        content={
          "## The paper-and-ink system\n\n" +
          "Interfaces are warm paper; content is ink. A `hairline` divides, " +
          "light elevates, and nothing pops.\n\n" +
          "1. Ground in ambient shade\n" +
          "2. Ink carries hierarchy\n" +
          "3. Pigment only where it means\n\n" +
          "```css\n.token { color: var(--bs-color-text-primary); }\n```\n\n" +
          "> 方寸为章，器物为圆 — controls are seal-cut; vessels stay round.\n\n" +
          "Read the full spec in [DESIGN.md](https://example.com/design)."
        }
      />
    </div>
  ),
};
