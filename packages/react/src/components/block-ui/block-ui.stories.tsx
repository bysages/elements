import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { BlockUI } from ".";
import { Button } from "../button";

const meta: Meta = { title: "Components/Feedback/Block UI" };
export default meta;

/** The curtain drawn on command: the ledger keeps its shape under
 * frosted paper while the wheel waits. */
export const Basic = {
  render: () => {
    const [blocked, setBlocked] = useState(true);
    return (
      <div
        style={{
          display: "grid",
          gap: "var(--bs-gap-md)",
          maxInlineSize: "24rem",
        }}
      >
        <Button size="sm" variant="outline" onClick={() => setBlocked(!blocked)}>
          {blocked ? "Lift the curtain" : "Draw the curtain"}
        </Button>
        <BlockUI blocked={blocked}>
          <div
            style={{
              padding: "var(--bs-padding-lg)",
              border: "1px solid var(--bs-color-border)",
              borderRadius: "var(--bs-radius-md)",
            }}
          >
            Invoices settle every quarter. The ledger holds its shape while the curtain is drawn.
          </div>
        </BlockUI>
      </div>
    );
  },
};

/** A quiet curtain: the frost alone says the region is not taking
 * input. */
export const WithoutSpinner = {
  render: () => (
    <BlockUI blocked>
      <p style={{ padding: "var(--bs-padding-lg)" }}>Draft saved a moment ago.</p>
    </BlockUI>
  ),
};
