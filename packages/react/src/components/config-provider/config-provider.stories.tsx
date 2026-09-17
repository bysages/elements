import type { Meta } from "@storybook/react-vite";
import type { ReactNode } from "react";

import { ConfigProvider } from ".";
import { Button } from "../button";
import { Card } from "../card";

const meta: Meta = { title: "Components/Elements/Config Provider" };
export default meta;

/** The same furniture in every tier, so the density step and the
 * pigment read against each other. */
function demo(label: string): ReactNode {
  return (
    <Card.Root style={{ inlineSize: "26rem" }}>
      <Card.Header>
        <Card.Title>{label}</Card.Title>
        <Card.Description>
          Brush, ink, paper, and the inkstone — the same furniture, retiered.
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--bs-gap-sm)" }}>
          <Button>Primary</Button>
          <Button variant="ghost">Secondary</Button>
        </div>
      </Card.Content>
    </Card.Root>
  );
}

/** Compact controls under the qinghua pigment, set against the page's
 * own defaults — the provider carries both attributes at once. */
export const Basic = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--bs-space-4)", justifyItems: "start" }}>
      {demo("Outside — the page's own density and ink")}
      <ConfigProvider density="compact" accent="qinghua">
        {demo("Inside — compact controls under the qinghua accent")}
      </ConfigProvider>
    </div>
  ),
};

/** A provider inside a provider: the inner one retiers its own subtree
 * and leaves the outer scope untouched — density and accent are local
 * to the host element and its descendants. */
export const Nested = {
  render: () => (
    <ConfigProvider density="comfortable">
      <div style={{ display: "grid", gap: "var(--bs-space-4)", justifyItems: "start" }}>
        {demo("Comfortable — the outer provider's tier")}
        <ConfigProvider density="compact">
          {demo("Compact — the inner provider, its own scope only")}
        </ConfigProvider>
      </div>
    </ConfigProvider>
  ),
};
