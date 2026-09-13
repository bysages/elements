import type { Meta } from "@storybook/vue3-vite";
import { h, reactive, Teleport } from "vue";

import { withState } from "../with-state.js";
import { Dialog } from "./index.js";

const meta: Meta = { title: "Components / Dialog" };
export default meta;

function vessel(title: string, description: string, ...extra: any[]) {
  return h(Teleport, { to: "body" }, () => [
    h(Dialog.Backdrop),
    h(Dialog.Positioner, () =>
      h(Dialog.Content, () => [
        h(Dialog.Title, () => title),
        h(Dialog.Description, () => description),
        ...extra,
        h(Dialog.CloseTrigger, () => "×"),
      ]),
    ),
  ]);
}

function trigger(label: string) {
  return h(Dialog.Trigger, () => label);
}

/** The paper vessel rests above a dimmed page and dissolves away. */
export const Basic = {
  args: {
    title: "Delete item",
    description: "This action cannot be undone.",
    closeOnEscape: true,
    closeOnInteractOutside: true,
  },
  render: (args: any) =>
    withState(
      () => () =>
        h(
          Dialog.Root,
          {
            closeOnEscape: args.closeOnEscape,
            closeOnInteractOutside: args.closeOnInteractOutside,
          },
          () => [
            trigger(args.title),
            vessel(
              args.title,
              args.description,
              h("p", () => "Removed items stay recoverable for 30 days."),
            ),
          ],
        ),
    ),
};

/** The dialog answers to state — open and close belong to the caller. */
export const Controlled = {
  render: () =>
    withState(() => {
      const state = reactive({ open: false });
      return () =>
        h(
          Dialog.Root,
          {
            open: state.open,
            onOpenChange: (e: { open: boolean }) => {
              state.open = e.open;
            },
          },
          () => [
            trigger("Open dialog"),
            vessel("Controlled", "The page decides when this closes."),
          ],
        );
    }),
};

/** An alert dialog: the role sharpens screen-reader urgency and the
 * outside click refuses to dismiss. */
export const AlertDialog = {
  render: () =>
    h(Dialog.Root, { role: "alertdialog" }, () => [
      trigger("Discard draft"),
      vessel("Discard draft?", "Your edits since the last save will be lost."),
    ]),
};

/** Non-modal: no backdrop, the page stays live behind the vessel. */
export const NonModal = {
  render: () =>
    h(Dialog.Root, { modal: false }, () => [
      trigger("Open panel"),
      vessel("Non-modal panel", "You can keep working while this floats."),
    ]),
};

/** The vessel mounts only on first open and leaves on exit. */
export const LazyMount = {
  render: () =>
    h(Dialog.Root, { lazyMount: true, unmountOnExit: true }, () => [
      trigger("Open lazily"),
      vessel("Lazy mount", "Nothing of this dialog rests in the page while closed."),
    ]),
};

/** Several triggers, one dialog: the launched slot remembers which trigger
 * opened it. */
export const MultipleTriggers = {
  render: () =>
    h(Dialog.Root, () => [
      h("div", { style: { display: "flex", gap: "0.75rem" } }, [
        h(Dialog.Trigger, { value: "a" }, () => "Open A"),
        h(Dialog.Trigger, { value: "b" }, () => "Open B"),
      ]),
      vessel("Shared dialog", "Either trigger may summon this vessel."),
    ]),
};

/** A dialog opening another dialog: stacked vessels share the overlay
 * ladder through the layer index. */
export const Nested = {
  render: () =>
    withState(() => {
      const state = reactive({ parent: false, child: false });
      return () =>
        h(
          Dialog.Root,
          {
            open: state.parent,
            onOpenChange: (e: { open: boolean }) => {
              state.parent = e.open;
            },
          },
          () => [
            trigger("Open parent"),
            h(Teleport, { to: "body" }, () => [
              h(Dialog.Backdrop),
              h(Dialog.Positioner, () =>
                h(Dialog.Content, () => [
                  h(Dialog.Title, () => "Parent dialog"),
                  h(Dialog.Description, () => "This vessel opens another above itself."),
                  h(
                    Dialog.Root,
                    {
                      open: state.child,
                      onOpenChange: (e: { open: boolean }) => {
                        state.child = e.open;
                      },
                    },
                    () => [
                      h(Dialog.Trigger, () => "Open child"),
                      h(Teleport, { to: "body" }, () => [
                        h(Dialog.Backdrop),
                        h(Dialog.Positioner, () =>
                          h(Dialog.Content, () => [
                            h(Dialog.Title, () => "Child dialog"),
                            h(Dialog.Description, () => "The upper vessel."),
                            h(Dialog.CloseTrigger, () => "×"),
                          ]),
                        ),
                      ]),
                    ],
                  ),
                  h(Dialog.CloseTrigger, () => "×"),
                ]),
              ),
            ]),
          ],
        );
    }),
};

/** Opening the dialog moves focus to a chosen row; closing hands it back. */
export const InitialFocus = {
  render: () =>
    h(
      Dialog.Root,
      { initialFocusEl: () => document.querySelector("[data-autofocus]") as HTMLElement | null },
      () => [
        trigger("Open form"),
        vessel(
          "Sign in",
          "Focus lands in the first field, not the close button.",
          h("input", {
            "data-autofocus": true,
            placeholder: "Name",
            style: {
              border: "1px solid var(--bs-color-border)",
              borderRadius: "var(--bs-radius-sm)",
              padding: "0.375rem 0.5rem",
              font: "inherit",
              background: "var(--bs-color-surface-2)",
              color: "var(--bs-color-text-primary)",
            },
          }),
        ),
      ],
    ),
};
