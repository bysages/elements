import type { Meta } from "@storybook/vue3-vite";
import { h, Teleport } from "vue";

import { Dialog } from "./index.js";

const meta: Meta = { title: "Components / Dialog" };
export default meta;

export const Basic = {
  render: () =>
    h(Dialog.Root, () => [
      h(Dialog.Trigger, () => "Delete item"),
      h(Teleport, { to: "body" }, () => [
        h(Dialog.Backdrop),
        h(Dialog.Positioner, () => [
          h(Dialog.Content, () => [
            h(Dialog.Title, () => "Delete item"),
            h(Dialog.Description, () => "This action cannot be undone."),
            h("p", () => "Removed items stay recoverable for 30 days."),
            h(Dialog.CloseTrigger, () => "×"),
          ]),
        ]),
      ]),
    ]),
};
