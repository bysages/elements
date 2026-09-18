import { useNavigationMenu } from "@ark-ui/react/navigation-menu";
import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { NavigationMenu } from ".";

const meta: Meta = { title: "Components/Navigation/Navigation Menu" };
export default meta;

const columns = [
  {
    label: "Get started",
    links: [
      { href: "#quick-start", title: "Quick start", description: "Install and assemble" },
      { href: "#styling", title: "Styling", description: "Tokens, hairlines, light" },
    ],
  },
  {
    label: "Learn",
    links: [
      { href: "#accessibility", title: "Accessibility", description: "Contrast and density tiers" },
      { href: "#releases", title: "Releases", description: "What settled into the paper" },
    ],
  },
];

function sectionHeading(label: string) {
  return (
    <span
      style={{
        display: "block",
        // The heading's text lines up with the card text beside it: both
        // sit one card padding in from the panel edge.
        padding: "var(--bs-space-2) var(--bs-padding-md) var(--bs-space-1)",
        color: "var(--bs-color-text-tertiary)",
        fontSize: "var(--bs-font-size-xs)",
        letterSpacing: "var(--bs-tracking-label)",
      }}
    >
      {label}
    </span>
  );
}

function linkCard(link: (typeof columns)[number]["links"][number]) {
  return (
    <NavigationMenu.Link key={link.href} href={link.href}>
      <span style={{ display: "flex", flexDirection: "column", gap: "var(--bs-space-1)" }}>
        <strong>{link.title}</strong>
        <span
          style={{ color: "var(--bs-color-text-secondary)", fontSize: "var(--bs-font-size-sm)" }}
        >
          {link.description}
        </span>
      </span>
    </NavigationMenu.Link>
  );
}

function menuPanel(value: string, sections: typeof columns) {
  return (
    <NavigationMenu.Item value={value}>
      <NavigationMenu.Trigger>{value[0].toUpperCase() + value.slice(1)}</NavigationMenu.Trigger>
      <NavigationMenu.Content>
        {sections.map((section) => (
          <div key={section.label}>
            {sectionHeading(section.label)}
            {section.links.map(linkCard)}
          </div>
        ))}
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  );
}

function plainPanel(value: string, links: string[]) {
  return (
    <NavigationMenu.Item value={value}>
      <NavigationMenu.Trigger>{value[0].toUpperCase() + value.slice(1)}</NavigationMenu.Trigger>
      <NavigationMenu.Content>
        {links.map((link) => (
          <NavigationMenu.Link key={link} href={`#${link.toLowerCase()}`}>
            {link}
          </NavigationMenu.Link>
        ))}
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  );
}

function flatLink(label: string, current = false) {
  return (
    <NavigationMenu.Item key={label} value={label.toLowerCase()}>
      <NavigationMenu.Link href={`#${label.toLowerCase()}`} current={current}>
        {label}
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  );
}

function readout(api: { value: string | null }) {
  return (
    <output
      style={{ display: "block", fontSize: "var(--bs-font-size-sm)", marginBottom: "0.5rem" }}
    >
      {`value: ${api.value || "none"}`}
    </output>
  );
}

const viewport = () => (
  <NavigationMenu.ViewportPositioner>
    <NavigationMenu.Viewport />
  </NavigationMenu.ViewportPositioner>
);

/** Two menubar triggers sharing one vessel: the panel dissolves in on
 * elevation while the stroke of primary ink slides beneath the open
 * trigger. */
export const Basic = {
  args: {
    guidesLink: "Guides",
  },
  render: (args: any) => (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        {menuPanel("overview", columns)}
        <NavigationMenu.Item value="guides">
          <NavigationMenu.Link href="#guides" current>
            {args.guidesLink}
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        {menuPanel("resources", columns.slice().reverse())}
      </NavigationMenu.List>
      {viewport()}
    </NavigationMenu.Root>
  ),
};

/** The bar reads its own state: the context reports which trigger holds
 * the ink, or none. */
export const Context = {
  render: () => (
    <NavigationMenu.Root>
      <NavigationMenu.Context>
        {(api: { value: string | null }) => readout(api)}
      </NavigationMenu.Context>
      <NavigationMenu.List>
        {plainPanel("features", ["Overview", "Features"])}
        {plainPanel("docs", ["Introduction", "Installation"])}
        {flatLink("About")}
      </NavigationMenu.List>
      {viewport()}
    </NavigationMenu.Root>
  ),
};

/** The open panel answers to the caller — the bar only mirrors. */
export const Controlled = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <NavigationMenu.Root
        value={value}
        onValueChange={(e: { value: string }) => setValue(e.value)}
      >
        {readout({ value })}
        <NavigationMenu.List>
          {plainPanel("features", ["Overview", "Features"])}
          {plainPanel("docs", ["Introduction", "Installation"])}
          {flatLink("About")}
        </NavigationMenu.List>
        {viewport()}
      </NavigationMenu.Root>
    );
  },
};

/** Where the reader stands: the current link keeps the ink while its
 * neighbours stay quiet. */
export const CurrentLink = {
  render: () => (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        {flatLink("Home", true)}
        {plainPanel("Products", ["Analytics", "Commerce", "Payments"])}
        {flatLink("About")}
      </NavigationMenu.List>
      {viewport()}
    </NavigationMenu.Root>
  ),
};

/** One stroke under the bar: the indicator part rides the machine's
 * geometry variables from trigger to trigger. */
export const Indicator = {
  render: () => (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        {plainPanel("products", ["Analytics", "Commerce", "Payments"])}
        {plainPanel("resources", ["Blog", "Changelog", "Support"])}
        {flatLink("Documentation")}
        <NavigationMenu.Indicator />
      </NavigationMenu.List>
      {viewport()}
    </NavigationMenu.Root>
  ),
};

/** The machine answers outside its anatomy: the provider owns it, and
 * the readout sits outside the bar. */
export const RootProvider = {
  render: () => {
    const navigationMenu = useNavigationMenu();
    return (
      <>
        {readout({ value: navigationMenu.value })}
        <NavigationMenu.RootProvider value={navigationMenu}>
          <NavigationMenu.List>
            {plainPanel("features", ["Overview", "Features"])}
            {plainPanel("docs", ["Introduction", "Installation"])}
            {flatLink("About")}
          </NavigationMenu.List>
          {viewport()}
        </NavigationMenu.RootProvider>
      </>
    );
  },
};

/** The bar stands on its side: triggers stack and panels open beside
 * them. */
export const Vertical = {
  render: () => (
    <NavigationMenu.Root orientation="vertical" style={{ width: "max-content" }}>
      <NavigationMenu.List>
        {plainPanel("products", ["Analytics", "Commerce", "Payments"])}
        {plainPanel("resources", ["Blog", "Changelog", "Support"])}
        {flatLink("About")}
      </NavigationMenu.List>
      {viewport()}
    </NavigationMenu.Root>
  ),
};

/** The shared stage: both triggers render into one vessel, so the panel
 * holds its width while the ink travels. */
export const Viewport = {
  render: () => (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        {menuPanel("overview", columns)}
        {menuPanel("learn", columns.slice().reverse())}
        {flatLink("Pricing")}
      </NavigationMenu.List>
      {viewport()}
    </NavigationMenu.Root>
  ),
};
