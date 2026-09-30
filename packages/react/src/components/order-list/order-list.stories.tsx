import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { OrderList } from ".";

const meta: Meta = { title: "Components/Data/Order List" };
export default meta;

const OPTIONS = [
  { label: "Prelude", value: "prelude" },
  { label: "Fugue", value: "fugue" },
  { label: "Interlude", value: "interlude" },
  { label: "Coda", value: "coda" },
];

/** The ledger at rest: hover a row and the arrow stack arrives; drag
 * by the grip and a hairline of ink marks the landing seam. */
export const Basic = {
  render: () => {
    const [value, setValue] = useState(OPTIONS.map((option) => option.value));
    return (
      <div style={{ maxInlineSize: "22rem" }}>
        <OrderList value={value} onValueChange={setValue} options={OPTIONS} label="Movements" />
        <output
          style={{
            display: "block",
            marginTop: "var(--bs-space-2)",
            fontSize: "var(--bs-font-size-sm)",
            color: "var(--bs-color-text-tertiary)",
          }}
        >
          {value.join(" → ")}
        </output>
      </div>
    );
  },
};
