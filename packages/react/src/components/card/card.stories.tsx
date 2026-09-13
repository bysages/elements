import type { Meta } from "@storybook/react-vite";

import { Card } from ".";

const meta: Meta = { title: "Components/Elements/Card" };
export default meta;

export const Basic = {
  render: () => (
    <Card style={{ maxWidth: "34rem" }}>
      <Card.Header>
        <Card.Title>The paper-and-ink system</Card.Title>
        <Card.Description>
          Interfaces are warm paper, content is ink, hierarchy is light.
        </Card.Description>
      </Card.Header>
      <Card.Content>
        Surfaces rest in ambient shade — never pure white. Primary actions default to ink; pigment
        only appears where it means something.
      </Card.Content>
      <Card.Footer>Riding the first elevation, one hairline for an edge.</Card.Footer>
    </Card>
  ),
};
