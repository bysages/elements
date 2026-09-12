import type { Meta } from "@storybook/react-vite";

import { Dialog } from "./index.js";

const meta: Meta = {
  title: "Components / Dialog",
};

export default meta;

export function Basic() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>Delete item</Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Delete item</Dialog.Title>
          <Dialog.Description>This action cannot be undone.</Dialog.Description>
          <p>Removed items stay recoverable for 30 days.</p>
          <Dialog.CloseTrigger>×</Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
