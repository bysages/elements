import type { Meta } from "@storybook/react-vite";

import { InputGroup } from ".";
import { Button } from "../button";
import { Input } from "../input";

const meta: Meta = { title: "Components/Forms/InputGroup" };
export default meta;

/** Fixed words ride ahead of the ink: the scheme lives in a recessed
 * addon, the hairline and the halo belong to the group. */
export const Basic = {
  render: () => (
    <InputGroup>
      <InputGroup.Addon>https://</InputGroup.Addon>
      <Input placeholder="example.com" />
    </InputGroup>
  ),
};

/** Attachments on both sides: a quiet ghost button opens the seal, a
 * fixed tail closes it — one merged control, three parts. */
export const WithActions = {
  render: () => (
    <InputGroup>
      <InputGroup.Addon>
        <Button variant="ghost" square aria-label="Insert handle">
          {atIcon()}
        </Button>
      </InputGroup.Addon>
      <Input placeholder="username" />
      <InputGroup.Addon>.com</InputGroup.Addon>
    </InputGroup>
  ),
};

/** The one glyph the handle trigger needs: the at sign, one stroke. */
function atIcon() {
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
      <circle cx={12} cy={12} r={4} />
      <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
    </svg>
  );
}
