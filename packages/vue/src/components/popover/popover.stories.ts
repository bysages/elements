import { Dialog } from "@ark-ui/vue/dialog";
import type { Meta } from "@storybook/vue3-vite";
import { h, reactive, ref, Teleport } from "vue";

import { withState } from "../with-state.js";
import { Popover } from "./index.js";

const meta: Meta = { title: "Components / Popover" };
export default meta;

function closeGlyph() {
  return h(
    "svg",
    {
      width: 14,
      height: 14,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.75,
      "aria-hidden": true,
    },
    [h("path", { d: "m6 6 12 12M18 6 6 18" })],
  );
}

/** The vessel: trigger on a hairline, the panel dissolving in on
 * elevation with a serif title and a quiet close whisker. */
function vessel(title: string, ...extra: any[]) {
  return h(Popover.Positioner, () =>
    h(Popover.Content, () => [
      h(Popover.CloseTrigger, () => closeGlyph()),
      h(Popover.Title, () => title),
      ...extra,
    ]),
  );
}

export const Basic = {
  args: {
    trigger: "Notes",
    title: "Reading notes",
    description:
      "Marginalia stay on the paper: this vessel pins to its trigger and dissolves in on elevation.",
  },
  render: (args: any) =>
    withState(
      () => () =>
        h(Popover.Root, () => [
          h(Popover.Trigger, () => args.trigger),
          vessel(
            args.title,
            h(Popover.Description, () => args.description),
          ),
        ]),
    ),
};

/** A whisker of the same paper points from the vessel to its trigger. */
export const Arrow = {
  render: () =>
    h(Popover.Root, () => [
      h(Popover.Trigger, () => "Notifications"),
      vessel(
        "Notifications",
        h(Popover.Description, () => "You have 3 unread messages in your inbox."),
        h(Popover.Arrow, () => h(Popover.ArrowTip)),
      ),
    ]),
};

/** The vessel may anchor anywhere: here it opens to the left with a
 * custom gutter. */
export const Positioning = {
  render: () =>
    h(
      Popover.Root,
      {
        positioning: { placement: "left-start", offset: { mainAxis: 12, crossAxis: 12 } },
      } as any,
      () => [
        h(
          "div",
          { style: { display: "flex", justifyContent: "flex-end", padding: "6rem 1rem" } },
          () => [h(Popover.Trigger, () => "Click me")],
        ),
        vessel(
          "Left placement",
          h(
            Popover.Description,
            () => "This popover appears on the left with custom offset values.",
          ),
        ),
      ],
    ),
};

/** The vessel borrows the trigger's measure: panel and trigger share one
 * width. */
export const SameWidth = {
  render: () =>
    h(Popover.Root, { positioning: { sameWidth: true } } as any, () => [
      h(Popover.Trigger, { style: { minWidth: "14rem" } }, () => "Click me"),
      vessel(
        "Matched width",
        h(Popover.Description, () => "This popover matches the width of its trigger element."),
      ),
    ]),
};

/** Anchored to a witness rather than the trigger: the panel pins to the
 * input while the button stays free. */
export const Anchor = {
  render: () =>
    h(Popover.Root, () => [
      h("div", { style: { display: "flex", gap: "0.75rem", alignItems: "center" } }, () => [
        h(Popover.Trigger, () => "Click me"),
        h(Popover.Anchor, () =>
          h("input", {
            placeholder: "Type here...",
            style: {
              border: "1px solid var(--bs-color-border)",
              background: "var(--bs-color-surface-2)",
              borderRadius: "var(--bs-radius-sm)",
              padding: "0.375rem 0.625rem",
              font: "inherit",
              width: "12rem",
            },
          }),
        ),
      ]),
      h(Popover.Positioner, () =>
        h(Popover.Content, () => [
          h(Popover.CloseTrigger, () => closeGlyph()),
          h(Popover.Title, () => "Anchored"),
          h(Popover.Description, () => "The panel pins to the input, not the button."),
        ]),
      ),
    ]),
};

/** A modal vessel: focus is trapped inside until it is dismissed. */
export const Modal = {
  render: () =>
    h(Popover.Root, { modal: true } as any, () => [
      h(Popover.Trigger, () => "Click me"),
      vessel(
        "Confirm action",
        h(Popover.Description, () => "Focus is trapped inside this modal popover until dismissed."),
      ),
    ]),
};

/** A vessel inside a vessel: the nested panel climbs the same overlay
 * ladder and rests above its parent. */
export const Nested = {
  render: () =>
    h(Popover.Root, () => [
      h(Popover.Trigger, () => "Settings"),
      h(Popover.Positioner, () =>
        h(Popover.Content, () => [
          h(Popover.Title, () => "Settings"),
          h(Popover.Description, () => "Manage your preferences and account settings."),
          h(
            Popover.Root,
            { lazyMount: true, unmountOnExit: true, positioning: { placement: "right" } } as any,
            () => [
              h(Popover.Trigger, () => "Advanced"),
              h(Popover.Positioner, () =>
                h(Popover.Content, () => [
                  h(Popover.Title, () => "Advanced settings"),
                  h(Popover.Description, () => "Configure advanced options for power users."),
                ]),
              ),
            ],
          ),
        ]),
      ),
    ]),
};

/** Each trigger names its own vessel: the panel re-inks to match the
 * door you entered by. */
export const MultipleTriggers = {
  render: () =>
    withState(() => {
      const items = [
        { id: "share", label: "Share", detail: "Share this item with others via link or email." },
        { id: "export", label: "Export", detail: "Export this item as PDF, CSV, or JSON." },
        {
          id: "archive",
          label: "Archive",
          detail: "Move this item to the archive for later reference.",
        },
      ];
      const state = reactive({ active: items[0] });
      return () =>
        h(
          Popover.Root,
          {
            onTriggerValueChange: (e: { value: string | null }) =>
              (state.active = items.find((i) => i.id === e.value) ?? state.active),
          },
          () => [
            h("div", { style: { display: "flex", gap: "0.5rem" } }, () =>
              items.map((item) =>
                h(Popover.Trigger, { key: item.id, value: item.id }, () => item.label),
              ),
            ),
            h(Popover.Positioner, () =>
              h(Popover.Content, () => [
                h(Popover.Title, () => state.active.label),
                h(Popover.Description, () => state.active.detail),
              ]),
            ),
          ],
        );
    }),
};

/** The open state answers to the caller — the vessel only mirrors. */
export const Controlled = {
  render: () =>
    withState(() => {
      const state = reactive({ open: false });
      return () =>
        h(
          Popover.Root,
          { open: state.open, onOpenChange: (e: { open: boolean }) => (state.open = e.open) },
          () => [
            h(Popover.Trigger, () => "Team members"),
            vessel(
              "Team members",
              h(Popover.Description, () => "Invite colleagues to collaborate on this project."),
            ),
          ],
        );
    }),
};

/** Clicking outside leaves the vessel open — only its own close whisker
 * puts it away. */
export const DisableOutsideClick = {
  render: () =>
    h(Popover.Root, { closeOnInteractOutside: false } as any, () => [
      h(Popover.Trigger, () => "Click me"),
      vessel(
        "Important notice",
        h(
          Popover.Description,
          () => "This popover stays open when clicking outside. Use the close button to dismiss.",
        ),
      ),
    ]),
};

/** Focus lands on the named field the moment the vessel opens. */
export const InitialFocusEl = {
  render: () => {
    const nameInput = ref<HTMLInputElement | null>(null);
    return () =>
      h(Popover.Root, { initialFocusEl: () => nameInput.value } as any, () => [
        h(Popover.Trigger, () => "Update profile"),
        h(Popover.Positioner, () =>
          h(Popover.Content, () => [
            h(Popover.CloseTrigger, () => closeGlyph()),
            h(Popover.Title, () => "Enter your name"),
            h(Popover.Description, () => "Make changes to your profile here."),
            h("div", { style: { display: "grid", gap: "0.5rem", marginTop: "0.5rem" } }, () => [
              h("input", {
                placeholder: "First name",
                defaultValue: "John",
                ref: nameInput,
                style: {
                  border: "1px solid var(--bs-color-border)",
                  background: "var(--bs-color-surface-2)",
                  borderRadius: "var(--bs-radius-sm)",
                  padding: "0.375rem 0.625rem",
                  font: "inherit",
                },
              }),
              h("input", {
                placeholder: "Last name",
                style: {
                  border: "1px solid var(--bs-color-border)",
                  background: "var(--bs-color-surface-2)",
                  borderRadius: "var(--bs-radius-sm)",
                  padding: "0.375rem 0.625rem",
                  font: "inherit",
                },
              }),
            ]),
          ]),
        ),
      ]);
  },
};

/** The panel mounts only on first open — nothing of the closed vessel
 * rests in the page. */
export const LazyMount = {
  render: () =>
    h(Popover.Root, { lazyMount: true } as any, () => [
      h(Popover.Trigger, () => "Click me"),
      vessel(
        "Lazy loaded",
        h(Popover.Description, () => "This content is only mounted when the popover opens."),
      ),
    ]),
};

/** The machine's state is readable inside the panel — the description
 * names it as the vessel opens and closes. */
export const Context = {
  render: () =>
    h(Popover.Root, () => [
      h(Popover.Trigger, () => "Click me"),
      h(Popover.Positioner, () =>
        h(Popover.Content, () => [
          h(Popover.CloseTrigger, () => closeGlyph()),
          h(Popover.Title, () => "Status"),
          h(Popover.Description, () =>
            h(Popover.Context as any, null, {
              default: (api: { open: boolean }) =>
                h("span", () => `Popover is ${api.open ? "visible" : "hidden"}`),
            }),
          ),
        ]),
      ),
    ]),
};

/** A vessel over a dialog: nested dismissible layers stack by the shared
 * overlay ladder, the popover resting above the dialog. */
export const WithDialog = {
  render: () =>
    h(Dialog.Root, () => [
      h(Dialog.Trigger, () => "Open dialog"),
      h(Teleport, { to: "body" }, () => [
        h(Dialog.Backdrop),
        h(Dialog.Positioner, () =>
          h(Dialog.Content, () => [
            h(Dialog.CloseTrigger, () => closeGlyph()),
            h(Dialog.Title, () => "Edit profile"),
            h(Dialog.Description, () => "Update your profile information below."),
            h(Popover.Root, { lazyMount: true, unmountOnExit: true } as any, () => [
              h(Popover.Trigger, () => "More options"),
              h(Popover.Positioner, () =>
                h(Popover.Content, () => [
                  h(Popover.Arrow, () => h(Popover.ArrowTip)),
                  h(Popover.CloseTrigger, () => closeGlyph()),
                  h(Popover.Title, () => "Additional settings"),
                  h(Popover.Description, () => "This popover renders correctly above the dialog."),
                ]),
              ),
            ]),
          ]),
        ),
      ]),
    ]),
};
