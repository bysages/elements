import type { Meta } from "@storybook/react-vite";

import { ButtonGroup } from ".";
import { Button } from "../button";

const meta: Meta = { title: "Components/Actions/Button Group" };
export default meta;

function chevronDown() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function chevronUp() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 14 6-6 6 6" />
    </svg>
  );
}

/** Variants keep their own registers inside the group: solid speaks,
 * outline draws, ghost floats — the seam reads across all three. */
export const Basic = {
  render: () => (
    <ButtonGroup>
      <Button variant="solid">Save</Button>
      <Button variant="outline">Save as</Button>
      <Button variant="ghost">Discard</Button>
    </ButtonGroup>
  ),
};

/** Text and icon-only buttons share the seam; the icon-only members
 * square to the control height and carry accessible names. */
export const WithIconButtons = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Layers</Button>
      <Button variant="outline" square aria-label="Move up">
        {chevronUp()}
      </Button>
      <Button variant="outline" square aria-label="Move down">
        {chevronDown()}
      </Button>
    </ButtonGroup>
  ),
};

/** One register for every member: the group's size retunes the
 * buttons' heights. */
export const GroupSize = {
  render: () => (
    <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
      <ButtonGroup size="sm">
        <Button>Left</Button>
        <Button>Center</Button>
        <Button>Right</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button>Left</Button>
        <Button>Center</Button>
        <Button>Right</Button>
      </ButtonGroup>
      <ButtonGroup size="lg">
        <Button>Left</Button>
        <Button>Center</Button>
        <Button>Right</Button>
      </ButtonGroup>
    </div>
  ),
};

/** Down a column: the seam runs block-wise, members fill to the
 * widest, and the corner trim turns with the orientation. */
export const Vertical = {
  render: () => (
    <ButtonGroup orientation="vertical">
      <Button variant="outline">Align left</Button>
      <Button variant="outline">Align center</Button>
      <Button variant="outline">Align right</Button>
    </ButtonGroup>
  ),
};
