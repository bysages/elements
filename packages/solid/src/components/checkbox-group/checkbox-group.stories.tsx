import { createSignal } from "solid-js";

import { CheckboxGroup } from ".";

const meta = {
  title: "Components/Forms/Checkbox Group",
  component: CheckboxGroup,
};
export default meta;

const options = [
  { label: "Ship the register", value: "ship" },
  { label: "Outline the story", value: "outline" },
  { label: "Archived", value: "archived", disabled: true },
];

/** One bound array; toggling a seal adds or removes its value. */
export const Basic = {
  render: () => {
    const [picked, setPicked] = createSignal(["ship"]);
    return (
      <>
        <CheckboxGroup value={picked()} onValueChange={setPicked} options={options} />
        <p
          style={{
            "font-size": "var(--bs-font-size-sm)",
            color: "var(--bs-color-text-tertiary)",
          }}
        >
          value: {JSON.stringify(picked())}
        </p>
      </>
    );
  },
};

/** The horizontal layout reads as one row and wraps when narrow. */
export const Horizontal = {
  render: () => {
    const [picked, setPicked] = createSignal<string[]>([]);
    return (
      <CheckboxGroup
        value={picked()}
        onValueChange={setPicked}
        options={options.slice(0, 2)}
        layout="horizontal"
      />
    );
  },
};

/** The whole group can go quiet at once. */
export const Disabled = {
  render: () => <CheckboxGroup value={["ship"]} options={options} disabled />,
};
