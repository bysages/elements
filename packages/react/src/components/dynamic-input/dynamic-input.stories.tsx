import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { DynamicInput } from ".";

const meta: Meta = { title: "Components/Forms/DynamicInput" };
export default meta;

const column = { display: "grid", gap: "var(--bs-space-3)", maxWidth: "24rem" };
const echo = {
  margin: 0,
  fontSize: "var(--bs-font-size-sm)",
  color: "var(--bs-color-text-tertiary)",
};

/** A controlled entry list: add a row, fill it, remove another — the
 * array the caller holds is always the one on the paper. */
export const Basic = {
  render: () => {
    const [emails, setEmails] = useState<string[]>(["lin@example.com", ""]);
    return (
      <div style={column}>
        <DynamicInput value={emails} placeholder="name@example.com" onValueChange={setEmails} />
        <p style={echo}>{`values: ${JSON.stringify(emails)}`}</p>
      </div>
    );
  },
};

/** The limits hold without a word: at `min` the remove seals rest, at
 * `max` the add control does. */
export const MinMax = {
  render: () => {
    const [codes, setCodes] = useState<string[]>(["QH-01", "CL-02"]);
    return (
      <div style={column}>
        <DynamicInput
          value={codes}
          min={1}
          max={3}
          addLabel="Add code"
          placeholder="Code"
          onValueChange={setCodes}
        />
        <p style={echo}>Between 1 and 3 codes</p>
      </div>
    );
  },
};
