import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { NavigationMenu } from "./index.js";

const meta: Meta = { title: "Components / Navigation Menu" };
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
  return h(
    "span",
    {
      style: {
        display: "block",
        padding: "var(--bs-space-2) var(--bs-padding-sm) var(--bs-space-1)",
        color: "var(--bs-color-text-tertiary)",
        fontSize: "var(--bs-font-size-xs)",
        letterSpacing: "var(--bs-tracking-label)",
      },
    },
    () => label,
  );
}

function linkCard(link: (typeof columns)[number]["links"][number]) {
  return h(NavigationMenu.Link, { key: link.href, href: link.href }, () => [
    h("span", { style: { display: "flex", flexDirection: "column", gap: "var(--bs-space-1)" } }, [
      h("strong", () => link.title),
      h(
        "span",
        { style: { color: "var(--bs-color-text-secondary)", fontSize: "var(--bs-font-size-sm)" } },
        () => link.description,
      ),
    ]),
  ]);
}

function menuPanel(value: string, sections: typeof columns) {
  return h(NavigationMenu.Item, { value }, () => [
    h(NavigationMenu.Trigger, () => value[0].toUpperCase() + value.slice(1)),
    h(NavigationMenu.Content, () =>
      sections.map((section) =>
        h("div", { key: section.label }, [
          sectionHeading(section.label),
          section.links.map(linkCard),
        ]),
      ),
    ),
  ]);
}

/** Two menubar triggers sharing one vessel: the panel dissolves in on
 * elevation while the stroke of primary ink slides beneath the open
 * trigger. */
export const Basic = {
  render: () =>
    h(NavigationMenu.Root, () => [
      h(NavigationMenu.List, () => [
        menuPanel("overview", columns),
        h(NavigationMenu.Item, () =>
          h(NavigationMenu.Link, { href: "#guides", current: true }, () => "Guides"),
        ),
        menuPanel("resources", columns.slice().reverse()),
      ]),
      h(NavigationMenu.ViewportPositioner, () => h(NavigationMenu.Viewport)),
    ]),
};
