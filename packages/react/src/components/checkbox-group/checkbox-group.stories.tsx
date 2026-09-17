import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { CheckboxGroup } from ".";

const meta: Meta = { title: "Components/Forms/Checkbox Group" };
export default meta;

const OPTIONS = [
  { label: "Ship the register", value: "ship" },
  { label: "Outline the story", value: "outline" },
  { label: "Archived", value: "archived", disabled: true },
];

/** One bound array; toggling a seal adds or removes its value. */
export const Basic = {
  render: () => {
    const [picked, setPicked] = useState(["ship"]);
    return (
      <>
        <CheckboxGroup value={picked} onValueChange={setPicked} options={OPTIONS} />
        <p style={{ fontSize: "var(--bs-font-size-sm)", color: "var(--bs-color-text-tertiary)" }}>
          value: {JSON.stringify(picked)}
        </p>
      </>
    );
  },
};

/** The horizontal layout reads as one row and wraps when narrow. */
export const Horizontal = {
  render: () => {
    const [picked, setPicked] = useState<string[]>([]);
    return (
      <CheckboxGroup
        value={picked}
        onValueChange={setPicked}
        options={OPTIONS.slice(0, 2)}
        layout="horizontal"
      />
    );
  },
};

/** The whole group can go quiet at once. */
export const Disabled = {
  render: () => <CheckboxGroup value={["ship"]} options={OPTIONS} disabled />,
};
