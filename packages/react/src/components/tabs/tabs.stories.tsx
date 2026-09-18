import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { Tabs } from ".";

const meta: Meta = { title: "Components/Navigation/Tabs" };
export default meta;

const PANELS = [
  { value: "account", label: "Account", body: "Manage your profile and contact details." },
  { value: "security", label: "Security", body: "Change your password and two-step settings." },
  { value: "billing", label: "Billing", body: "Review invoices and payment methods." },
];

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

/** Three ledgers, one showing: the current tab holds the ink and the
 * panel. */
export const Basic = {
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
