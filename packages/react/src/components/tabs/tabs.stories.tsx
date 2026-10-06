import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { Tabs } from ".";

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
  render: () => (
    <Tabs
      defaultValue="ink"
      items={[
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
      ]}
    />
  ),
};

/** The anatomy is the composition path: Ark's parts stay available when the facade is not enough. */
export const Anatomy = {
  args: {
    orientation: "horizontal",
    activationMode: "auto",
  },
  render: (args: any) =>
    ledger(
      {
        defaultValue: "account",
        orientation: args.orientation,
        activationMode: args.activationMode,
      },
      { indicator: true },
    ),
};

/** The shared ledger: triggers on a rail, panels beneath, one ink
 * indicator gliding between rungs. */
function ledger(rootProps: any, opts: { indicator?: boolean; disabled?: string } = {}) {
  return (
    <Tabs.Root {...rootProps}>
      <Tabs.List>
        {PANELS.map((panel) => (
          <Tabs.Trigger
            key={panel.value}
            value={panel.value}
            disabled={opts.disabled === panel.value}
          >
            {panel.label}
          </Tabs.Trigger>
        ))}
        {opts.indicator ? <Tabs.Indicator /> : null}
      </Tabs.List>
      {PANELS.map((panel) => (
        <Tabs.Content key={panel.value} value={panel.value}>
          {panel.body}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}

/** The open tab answers to the caller — the rail only mirrors. */
export const Controlled = {
  render: () => {
    const [value, setValue] = useState("account");
    return (
      <Tabs.Root value={value} onValueChange={(e: { value: string }) => setValue(e.value)}>
        <Tabs.List>
          {PANELS.map((panel) => (
            <Tabs.Trigger key={panel.value} value={panel.value}>
              {panel.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        {PANELS.map((panel) => (
          <Tabs.Content key={panel.value} value={panel.value}>
            {panel.body}
          </Tabs.Content>
        ))}
      </Tabs.Root>
    );
  },
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
  render: () => (
    <Tabs.Root defaultValue="account">
      <Tabs.List>
        {PANELS.map((panel) => (
          <Tabs.Trigger key={panel.value} value={panel.value} asChild>
            <a href={`#${panel.value}`}>{panel.label}</a>
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {PANELS.map((panel) => (
        <Tabs.Content key={panel.value} value={panel.value}>
          {panel.body}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  ),
};

/** Arrow keys wait for Enter: activation follows intent, not focus. */
export const ManualActivation = {
  render: () => ledger({ defaultValue: "account", activationMode: "manual" }),
};

/** The rail climbs: tabs stack along the inline start, panels to the
 * side. */
export const Vertical = {
  render: () => (
    <Tabs.Root defaultValue="account" orientation="vertical">
      <Tabs.List>
        {PANELS.map((panel) => (
          <Tabs.Trigger key={panel.value} value={panel.value}>
            {panel.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {PANELS.map((panel) => (
        <Tabs.Content key={panel.value} value={panel.value}>
          {panel.body}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  ),
};

/** The card register: each tab its own chip, the selected one lifted —
 * the ruled line retires and the cards carry the state. */
export const Card = {
  render: () => (
    <Tabs.Root variant="card">
      <Tabs.List>
        <Tabs.Trigger value="brush">Brush</Tabs.Trigger>
        <Tabs.Trigger value="ink">Ink</Tabs.Trigger>
        <Tabs.Trigger value="paper">Paper</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="brush">The brush answers the hand.</Tabs.Content>
      <Tabs.Content value="ink">The ink remembers the grinding.</Tabs.Content>
      <Tabs.Content value="paper">The paper holds its breath.</Tabs.Content>
    </Tabs.Root>
  ),
};
