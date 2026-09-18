import { parseDate } from "@ark-ui/react/date-picker";
import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { Calendar } from ".";

const meta: Meta = { title: "Components/Forms/Calendar" };
export default meta;

/** The month grid on the page: the popup gone, the vessel a quiet card,
 * the machinery entirely the shared date-picker's. */
export const Basic = {
  render: () => <Calendar style={{ maxWidth: "20rem" }} />,
};

/** A controlled selection: the chosen day reports back through the
 * binding and reads in the line below. */
export const Controlled = {
  render: () => {
    const [value, setValue] = useState([parseDate("2026-09-15")]);
    return (
      <div style={{ display: "grid", gap: "var(--bs-space-3)", justifyItems: "start" }}>
        <Calendar value={value} onValueChange={(v) => setValue(v)} style={{ maxWidth: "20rem" }} />
        <p style={{ color: "var(--bs-color-text-secondary)", margin: 0 }}>
          Selected: {value[0]?.toString() ?? "nothing yet"}
        </p>
      </div>
    );
  },
};
