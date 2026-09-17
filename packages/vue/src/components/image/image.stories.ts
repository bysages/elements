import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";

import { Image } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Media/Image" };
export default meta;
type Story = StoryObj<typeof Image>;

const SAMPLE = "https://picsum.photos/seed/elements-image/800/500";

/** The frame is the consumer's to size; the picture dissolves in over
 * the skeleton's breath. */
export const Basic: Story = {
  render: () =>
    h(Image, {
      src: SAMPLE,
      alt: "A photograph from the archive",
      style: { inlineSize: "100%", aspectRatio: "8 / 5" },
    }),
};

/** The fit chooses how the picture meets its frame; the letterbox of a
 * contained picture rests on the inset surface. */
export const Fits: Story = {
  render: () =>
    withState(
      () => () =>
        h(
          "div",
          { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" } },
          (
            [
              ["cover", "Cover crops to fill"],
              ["contain", "Contain keeps the whole"],
              ["fill", "Fill stretches"],
            ] as const
          ).map(([fit, caption]) =>
            h("figure", { style: { margin: "0" } }, [
              h(Image, {
                key: fit,
                src: SAMPLE,
                alt: caption,
                fit,
                style: { inlineSize: "100%", aspectRatio: "1 / 1" },
              }),
              h(
                "figcaption",
                {
                  style: {
                    marginBlockStart: "0.5rem",
                    fontSize: "var(--bs-font-size-sm)",
                    color: "var(--bs-color-text-secondary)",
                  },
                },
                caption,
              ),
            ]),
          ),
        ),
    ),
};

/** A broken source falls back — to the caller's words when they have
 * them, to the quiet glyph when they do not. */
export const Error: Story = {
  render: () =>
    withState(
      () => () =>
        h("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" } }, [
          h(
            Image,
            {
              key: "slot",
              src: "https://localhost/missing.png",
              alt: "A missing photograph",
              style: { inlineSize: "100%", aspectRatio: "16 / 9" },
            },
            () =>
              h(
                "span",
                {
                  style: {
                    fontSize: "var(--bs-font-size-sm)",
                    color: "var(--bs-color-text-tertiary)",
                  },
                },
                "The negative could not be developed.",
              ),
          ),
          h(Image, {
            key: "glyph",
            src: "https://localhost/missing.png",
            alt: "A missing photograph",
            style: { inlineSize: "100%", aspectRatio: "16 / 9" },
          }),
        ]),
    ),
};
