import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { Checkbox } from ".";

const meta: Meta = { title: "Components/Forms/Checkbox" };
export default meta;

const checkGlyph = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={3}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m5 12.5 5 5L19 7" />
  </svg>
);

const minusGlyph = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={3}
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M6 12h12" />
  </svg>
);

function box(checked: boolean | "indeterminate", label: string, disabled = false) {
  return (
    <Checkbox.Root checked={checked} disabled={disabled}>
      <Checkbox.Control>
        <Checkbox.Indicator>
          {checked === "indeterminate" ? minusGlyph : checkGlyph}
        </Checkbox.Indicator>
      </Checkbox.Control>
      <Checkbox.Label>{label}</Checkbox.Label>
      <Checkbox.HiddenInput />
    </Checkbox.Root>
  );
}

/** The three resting postures: checked, unchecked, and a disabled row. */
export const Basic = {
  render: () => (
    <div style={{ display: "grid", gap: "0.75rem", maxWidth: "20rem" }}>
      {box(true, "Ship the register")}
      {box(false, "Outline the story")}
      {box(false, "Archived", true)}
    </div>
  ),
};

/** The state answers to the caller: the box only mirrors. */
export const Controlled = {
  render: () => {
    const [checked, setChecked] = useState(true);
    return (
      <Checkbox.Root
        checked={checked}
        onCheckedChange={(e: { checked: boolean | "indeterminate" }) => setChecked(!!e.checked)}
      >
        <Checkbox.Control>
          <Checkbox.Indicator>{checkGlyph}</Checkbox.Indicator>
        </Checkbox.Control>
        <Checkbox.Label>Controlled</Checkbox.Label>
        <Checkbox.HiddenInput />
      </Checkbox.Root>
    );
  },
};

/** The dash posture: some, not all, of the rows below are checked. */
export const Indeterminate = {
  render: () => (
    <div style={{ display: "grid", gap: "0.75rem", maxWidth: "20rem" }}>
      {box("indeterminate", "All chapters")}
      {box(true, "Part one")}
      {box(false, "Part two")}
    </div>
  ),
};

/** Under a form name the accepted value rides the hidden input. */
export const WithForm = {
  render: () => (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{ display: "grid", gap: "0.75rem", maxWidth: "20rem" }}
    >
      <Checkbox.Root name="terms" value="accepted">
        <Checkbox.Control>
          <Checkbox.Indicator>{checkGlyph}</Checkbox.Indicator>
        </Checkbox.Control>
        <Checkbox.Label>Accept the terms</Checkbox.Label>
        <Checkbox.HiddenInput />
      </Checkbox.Root>
      <button type="submit">Submit</button>
    </form>
  ),
};

const frameworks = [
  { label: "React", value: "react" },
  { label: "Solid", value: "solid" },
  { label: "Vue", value: "vue" },
];

function groupRow(item: { label: string; value: string }) {
  return (
    <Checkbox.Root key={item.value} value={item.value}>
      <Checkbox.Control>
        <Checkbox.Indicator>{checkGlyph}</Checkbox.Indicator>
      </Checkbox.Control>
      <Checkbox.Label>{item.label}</Checkbox.Label>
      <Checkbox.HiddenInput />
    </Checkbox.Root>
  );
}

/** One group, one form name: rows join and leave the submitted value. */
export const Group = {
  render: () => (
    <Checkbox.Group name="framework" defaultValue={["react"]}>
      {frameworks.map(groupRow)}
    </Checkbox.Group>
  ),
};

/** The parent row summarizes its children: checked when all, dashed when
 * some, and its click sweeps the whole group. */
export const GroupWithSelectAll = {
  render: () => {
    const [value, setValue] = useState(["react"]);
    const all = value.length === frameworks.length;
    const some = value.length > 0 && !all;
    return (
      <div style={{ display: "grid", gap: "0.75rem", maxWidth: "20rem" }}>
        <Checkbox.Root
          checked={all ? true : some ? "indeterminate" : false}
          onCheckedChange={(e: { checked: boolean | "indeterminate" }) =>
            setValue(e.checked ? frameworks.map((f) => f.value) : [])
          }
        >
          <Checkbox.Control>
            <Checkbox.Indicator>{all ? checkGlyph : minusGlyph}</Checkbox.Indicator>
          </Checkbox.Control>
          <Checkbox.Label>All frameworks</Checkbox.Label>
          <Checkbox.HiddenInput />
        </Checkbox.Root>
        <Checkbox.Group value={value} onValueChange={setValue}>
          {frameworks.map(groupRow)}
        </Checkbox.Group>
      </div>
    );
  },
};

/** Past two picks the group refuses a third. */
export const GroupWithMaxSelected = {
  render: () => (
    <Checkbox.Group name="framework" maxSelectedValues={2}>
      {frameworks.map(groupRow)}
    </Checkbox.Group>
  ),
};

/** The invalid group bleeds cinnabar onto every row. */
export const GroupWithInvalid = {
  render: () => (
    <Checkbox.Group name="framework" invalid>
      {frameworks.map(groupRow)}
    </Checkbox.Group>
  ),
};
