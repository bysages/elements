import type { Meta } from "@storybook/vue3-vite";
import { defineComponent, h, Teleport } from "vue";

import { createToaster, Toast, Toaster } from "./index.js";

const meta: Meta = { title: "Components / Toast" };
export default meta;

function closeGlyph() {
  return h(
    "svg",
    {
      width: 16,
      height: 16,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.75,
      "aria-hidden": true,
    },
    [h("path", { d: "M6 6l12 12M18 6L6 18" })],
  );
}

/** Notices rise from the bottom edge and stack; the type tints the title,
 * the vessel stays paper. */
const ToastStory = defineComponent({
  name: "ToastStory",
  setup() {
    const toaster = createToaster({ placement: "bottom-end", gap: 16 });
    const schedule = () =>
      toaster.create({
        title: "Scheduled for tomorrow",
        description: "Your meeting has been scheduled for tomorrow at ten.",
        type: "info",
        action: { label: "Undo", onClick: () => {} },
      });
    return () => [
      h("button", { type: "button", onClick: schedule }, () => "Schedule meeting"),
      h(Teleport, { to: "body" }, () => [
        h(
          Toaster,
          { toaster },
          {
            default: (toast: any) => [
              h(Toast.Root, { key: toast.id }, () => [
                h(Toast.Title, () => toast.title),
                h(Toast.Description, () => toast.description),
                h(Toast.ActionTrigger, null, {
                  default: () => toast.action?.label,
                }),
                h(Toast.CloseTrigger, () => closeGlyph()),
              ]),
            ],
          },
        ),
      ]),
    ];
  },
});

export const Basic = {
  render: () => h(ToastStory),
};
