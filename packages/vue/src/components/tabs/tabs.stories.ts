import type { Meta } from "@storybook/vue3-vite";
import { h, reactive } from "vue";

import { Tabs } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Navigation/Tabs" };
export default meta;

const PANELS = [
  {
    value: "account",
    label: "Account",
    body: "Manage your profile and contact details.",
  },
  {
    value: "security",
    label: "Security",
    body: "Change your password and two-step settings.",
  },
  {
    value: "billing",
    label: "Billing",
    body: "Review invoices and payment methods.",
  },
];

/** The facade is the one-tag path; complex composition stays on the anatomy. */
export const Basic = {
  render: () => {
    const items = [
      {
        value: "ink",
        label: "Ink",
        content: "Content is ink — the marks that carry the words.",
      },
      {
        value: "paper",
        label: "Paper",
        content: "The ground is warm paper, never pure white.",
      },
      {
        value: "light",
        label: "Light",
        content: "Hierarchy is light — shadow answers to the source.",
      },
    ];
    return h(Tabs, { items, defaultValue: "ink" });
  },
};

/** The anatomy is the composition path: Ark's parts stay available when the facade is not enough. */
export const Anatomy = {
  render: () => {
    const items = [
      { value: "ink", label: "Ink", content: "Content is ink." },
      { value: "paper", label: "Paper", content: "The ground is warm paper." },
    ];
    return h(Tabs.Root, { defaultValue: "ink" }, () => [
      h(Tabs.List, () => [
        ...items.map((item) =>
          h(Tabs.Trigger, { key: item.value, value: item.value }, () => item.label),
        ),
        h(Tabs.Indicator),
      ]),
      ...items.map((item) =>
        h(Tabs.Content, { key: item.value, value: item.value }, () => item.content),
      ),
    ]);
  },
};

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

/** The card register: each tab its own chip, the selected one lifted —
 * the ruled line retires and the cards carry the state. */
export const Card = {
  render: () =>
    h(Tabs.Root, { variant: "card" }, () => [
      h(Tabs.List, () => [
        h(Tabs.Trigger, { value: "brush" }, () => "Brush"),
        h(Tabs.Trigger, { value: "ink" }, () => "Ink"),
        h(Tabs.Trigger, { value: "paper" }, () => "Paper"),
      ]),
      h(Tabs.Content, { value: "brush" }, () => "The brush answers the hand."),
      h(Tabs.Content, { value: "ink" }, () => "The ink remembers the grinding."),
      h(Tabs.Content, { value: "paper" }, () => "The paper holds its breath."),
    ]),
};
