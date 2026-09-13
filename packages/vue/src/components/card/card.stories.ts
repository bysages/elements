import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";

import { Card } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Elements/Card" };
export default meta;

/** The full vessel: header, serif title, description, body, footer —
 * each section carrying its own whitespace. */
export const Full = {
  render: () =>
    withState(
      () => () =>
        h(Card.Root as any, { style: { inlineSize: "26rem" } }, () => [
          h(Card.Header, () => [
            h(Card.Title, () => "The four treasures"),
            h(Card.Description, () => "Brush, ink, paper, and the inkstone."),
          ]),
          h(Card.Content, () =>
            h(
              "p",
              () =>
                "A vessel rests at the first elevation, round where a control is square-cut. Sections compose in any subset.",
            ),
          ),
          h(
            Card.Footer,
            { style: { display: "flex", gap: "0.5rem", justifyContent: "flex-end" } },
            () => "Updated this morning",
          ),
        ]),
    ),
};

/** Only a body: the vessel keeps its hairline and roundness, nothing else. */
export const ContentOnly = {
  render: () =>
    withState(
      () => () =>
        h(Card.Root as any, { style: { inlineSize: "26rem" } }, () =>
          h(Card.Content, () =>
            h("p", () => "A bare sheet of paper with an edge, for whatever needs containing."),
          ),
        ),
    ),
};

/** Footer as actions: the primary carries the ink. */
export const WithActions = {
  render: () =>
    withState(
      () => () =>
        h(Card.Root as any, { style: { inlineSize: "26rem" } }, () => [
          h(Card.Header, () => [
            h(Card.Title, () => "Archive the letter"),
            h(Card.Description, () => "The seal cannot be undone once pressed."),
          ]),
          h(
            Card.Footer,
            { style: { display: "flex", gap: "0.5rem", justifyContent: "flex-end" } },
            () => [
              h(
                "button",
                {
                  "data-scope": "button",
                  "data-part": "root",
                  "data-variant": "solid",
                  "data-tone": "ink",
                  "data-size": "md",
                },
                () => "Archive",
              ),
              h(
                "button",
                {
                  "data-scope": "button",
                  "data-part": "root",
                  "data-variant": "ghost",
                  "data-tone": "ink",
                  "data-size": "md",
                },
                () => "Keep",
              ),
            ],
          ),
        ]),
    ),
};
