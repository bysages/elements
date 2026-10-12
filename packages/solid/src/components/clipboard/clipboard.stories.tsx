import { Clipboard } from ".";

const meta = { title: "Components/Actions/Clipboard", component: Clipboard };
export default meta;

/** The complete copy field: label, read-only value, and confirmed seal. */
export const Basic = {
  render: () => (
    <Clipboard
      defaultValue="pnpm add @bysages/solid"
      label="Install command"
      placeholder="Command"
    />
  ),
};
