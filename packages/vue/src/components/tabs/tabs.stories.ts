import type { Meta } from "@storybook/vue3-vite";
import { h, reactive } from "vue";

import { withState } from "../with-state.js";
import { Tabs } from "./index.js";

const meta: Meta = { title: "Components / Tabs" };
export default meta;

const PANELS = [
  { value: "account", label: "Account", body: "Manage your profile and contact details." },
  { value: "security", label: "Security", body: "Change your password and two-step settings." },
  { value: "billing", label: "Billing", body: "Review invoices and payment methods." },
];

/** The shared ledger: triggers on a rail, panels beneath, one ink
 * indicator gliding between rungs. */
function ledger(rootProps: any, opts: { indicator?: boolean; disabled?: string } = {}) {
  return h(Tabs.Root, rootProps, () => [
    h(Tabs.List, () =>
      [
        ...PANELS.map((panel) =>
          h(
            Tabs.Trigger,
            { value: panel.value, disabled: opts.disabled === panel.value },
            () => panel.label,
          ),
        ),
        opts.indicator && h(Tabs.Indicator),
      ].filter(Boolean),
    ),
    ...PANELS.map((panel) => h(Tabs.Content, { value: panel.value }, () => panel.body)),
  ]);
}

/** Three ledgers, one showing: the current tab holds the ink and the
 * panel. */
export const Basic = {
  args: {
    orientation: "horizontal",
    activationMode: "auto",
  },
  render: (args: any) =>
    withState(
      () => () =>
        ledger(
          {
            defaultValue: "account",
            orientation: args.orientation,
            activationMode: args.activationMode,
          } as any,
          { indicator: true },
        ),
    ),
};

/** The open tab answers to the caller — the rail only mirrors. */
export const Controlled = {
  render: () =>
    withState(() => {
      const state = reactive({ value: "account" });
      return () =>
        h(
          Tabs.Root,
          {
            value: state.value,
            onValueChange: (e: { value: string }) => (state.value = e.value),
          },
          () => [
            h(Tabs.List, () =>
              PANELS.map((panel) =>
                h(Tabs.Trigger, { key: panel.value, value: panel.value }, () => panel.label),
              ),
            ),
            ...PANELS.map((panel) =>
              h(Tabs.Content, { key: panel.value, value: panel.value }, () => panel.body),
            ),
          ],
        );
    }),
};

/** One rung rests behind glass: the password tab will not answer. */
export const DisabledTab = {
  render: () => ledger({ defaultValue: "account" }, { indicator: true, disabled: "security" }),
};

/** The ink underline travels on its own rail — the indicator part rides
 * the machine's geometry variables. */
export const Indicator = {
  render: () => ledger({ defaultValue: "account" }, { indicator: true }),
};

/** Panels mount only on first open and leave on exit — nothing of the
 * closed tab rests in the page. */
export const LazyMount = {
  render: () => ledger({ defaultValue: "account", lazyMount: true, unmountOnExit: true }),
};

/** Triggers render as links: tabs that read as anchors, machine state
 * intact. */
export const Links = {
  render: () =>
    h(Tabs.Root, { defaultValue: "account" }, () => [
      h(Tabs.List, () =>
        PANELS.map((panel) =>
          h(Tabs.Trigger, { key: panel.value, value: panel.value, asChild: true }, () =>
            h("a", { href: `#${panel.value}` }, () => panel.label),
          ),
        ),
      ),
      ...PANELS.map((panel) => h(Tabs.Content, { value: panel.value }, () => panel.body)),
    ]),
};

/** Arrow keys wait for Enter: activation follows intent, not focus. */
export const ManualActivation = {
  render: () => ledger({ defaultValue: "account", activationMode: "manual" } as any),
};

/** The rail climbs: tabs stack along the inline start, panels to the
 * side. */
export const Vertical = {
  render: () =>
    h(Tabs.Root, { defaultValue: "account", orientation: "vertical" }, () => [
      h(Tabs.List, () =>
        PANELS.map((panel) =>
          h(Tabs.Trigger, { key: panel.value, value: panel.value }, () => panel.label),
        ),
      ),
      ...PANELS.map((panel) => h(Tabs.Content, { value: panel.value }, () => panel.body)),
    ]),
};
