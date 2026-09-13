import type { Meta } from "@storybook/react-vite";

import { Dialog } from ".";

const meta: Meta = {
  title: "Components/Overlay/",
};

export default meta;

export const Basic = {
  args: {
    trigger: "Delete item",
    title: "Delete item",
    description: "This action cannot be undone.",
  },
  render: (args: any) => (
    <Dialog.Root>
      <Dialog.Trigger>{args.trigger}</Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>{args.title}</Dialog.Title>
          <Dialog.Description>{args.description}</Dialog.Description>
          <p>Removed items stay recoverable for 30 days.</p>
          <Dialog.CloseTrigger>×</Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  ),
};
