import type { Meta } from "@storybook/react-vite";

import { Card } from ".";

const meta: Meta = { title: "Components/Elements/Card" };
export default meta;

export const Full = {
  render: () => (
    <Card style={{ maxWidth: "26rem" }}>
      <Card.Header>
        <Card.Title>The four treasures</Card.Title>
        <Card.Description>Brush, ink, paper, and the inkstone.</Card.Description>
      </Card.Header>
      <Card.Content>
        A vessel rests at the first elevation, round where a control is square-cut. Sections compose
        in any subset.
      </Card.Content>
      <Card.Footer style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
        Updated this morning
      </Card.Footer>
    </Card>
  ),
};

/** Only a body: the vessel keeps its hairline and roundness, nothing else. */
export const ContentOnly = {
  render: () => (
    <Card style={{ maxWidth: "26rem" }}>
      <Card.Content>
        A bare sheet of paper with an edge, for whatever needs containing.
      </Card.Content>
    </Card>
  ),
};

/** Footer as actions: a compact register inside the vessel — actions on
 * a card are secondary, so they ride the small control height. */
export const WithActions = {
  render: () => (
    <Card style={{ maxWidth: "26rem" }}>
      <Card.Header>
        <Card.Title>Archive the letter</Card.Title>
        <Card.Description>The seal cannot be undone once pressed.</Card.Description>
      </Card.Header>
      <Card.Footer style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
        <button
          data-scope="button"
          data-part="root"
          data-variant="solid"
          data-tone="ink"
          data-size="sm"
        >
          Archive
        </button>
        <button
          data-scope="button"
          data-part="root"
          data-variant="ghost"
          data-tone="ink"
          data-size="sm"
        >
          Keep
        </button>
      </Card.Footer>
    </Card>
  ),
};
