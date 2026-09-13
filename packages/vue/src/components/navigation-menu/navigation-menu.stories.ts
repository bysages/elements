import { useNavigationMenu } from "@ark-ui/vue/navigation-menu";
import type { Meta } from "@storybook/vue3-vite";
import { defineComponent, h, reactive } from "vue";

import { NavigationMenu } from ".";
import { withState } from "../with-state.js";

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

function plainPanel(value: string, links: string[]) {
  return h(NavigationMenu.Item, { value }, () => [
    h(NavigationMenu.Trigger, () => value[0].toUpperCase() + value.slice(1)),
    h(NavigationMenu.Content, () =>
      links.map((link) =>
        h(NavigationMenu.Link, { key: link, href: `#${link.toLowerCase()}` }, () => link),
      ),
    ),
  ]);
}

function flatLink(label: string, current = false) {
  return h(NavigationMenu.Item, { key: label, value: label.toLowerCase() }, () =>
    h(NavigationMenu.Link, { href: `#${label.toLowerCase()}`, current } as any, () => label),
  );
}

function readout(api: { value: string | null }) {
  return h(
    "output",
    { style: { display: "block", fontSize: "var(--bs-font-size-sm)", marginBottom: "0.5rem" } },
    () => `value: ${api.value || "none"}`,
  );
}

const viewport = () => h(NavigationMenu.ViewportPositioner, () => h(NavigationMenu.Viewport));

/** Two menubar triggers sharing one vessel: the panel dissolves in on
 * elevation while the stroke of primary ink slides beneath the open
 * trigger. */
export const Basic = {
  args: {
    guidesLink: "Guides",
  },
  render: (args: any) =>
    withState(
      () => () =>
        h(NavigationMenu.Root, () => [
          h(NavigationMenu.List, () => [
            menuPanel("overview", columns),
            h(NavigationMenu.Item, () =>
              h(NavigationMenu.Link, { href: "#guides", current: true }, () => args.guidesLink),
            ),
            menuPanel("resources", columns.slice().reverse()),
          ]),
          viewport(),
        ]),
    ),
};

/** The bar reads its own state: the context reports which trigger holds
 * the ink, or none. */
export const Context = {
  render: () =>
    h(NavigationMenu.Root, () => [
      h(NavigationMenu.Context as any, null, {
        default: (api: { value: string | null }) => readout(api),
      }),
      h(NavigationMenu.List, () => [
        plainPanel("features", ["Overview", "Features"]),
        plainPanel("docs", ["Introduction", "Installation"]),
        flatLink("About"),
      ]),
      viewport(),
    ]),
};

/** The open panel answers to the caller — the bar only mirrors. */
export const Controlled = {
  render: () =>
    withState(() => {
      const state = reactive({ value: "" });
      return () =>
        h(
          NavigationMenu.Root,
          {
            value: state.value,
            onValueChange: (e: { value: string }) => (state.value = e.value),
          } as any,
          () => [
            readout(state),
            h(NavigationMenu.List, () => [
              plainPanel("features", ["Overview", "Features"]),
              plainPanel("docs", ["Introduction", "Installation"]),
              flatLink("About"),
            ]),
            viewport(),
          ],
        );
    }),
};

/** Where the reader stands: the current link keeps the ink while its
 * neighbours stay quiet. */
export const CurrentLink = {
  render: () =>
    h(NavigationMenu.Root, () => [
      h(NavigationMenu.List, () => [
        flatLink("Home", true),
        plainPanel("Products", ["Analytics", "Commerce", "Payments"]),
        flatLink("About"),
      ]),
      viewport(),
    ]),
};

/** One stroke under the bar: the indicator part rides the machine's
 * geometry variables from trigger to trigger. */
export const Indicator = {
  render: () =>
    h(NavigationMenu.Root, () => [
      h(NavigationMenu.List, () => [
        plainPanel("products", ["Analytics", "Commerce", "Payments"]),
        plainPanel("resources", ["Blog", "Changelog", "Support"]),
        flatLink("Documentation"),
        h(NavigationMenu.Indicator),
      ]),
      viewport(),
    ]),
};

/** The machine answers outside its anatomy: the provider owns it, and
 * the readout sits outside the bar. */
export const RootProvider = {
  render: () => {
    const Driver = defineComponent({
      name: "NavigationMenuRootProvider",
      setup() {
        const navigationMenu = useNavigationMenu();
        return () => [
          readout({ value: navigationMenu.value.value }),
          h(NavigationMenu.RootProvider as any, { value: navigationMenu.value }, () => [
            h(NavigationMenu.List, () => [
              plainPanel("features", ["Overview", "Features"]),
              plainPanel("docs", ["Introduction", "Installation"]),
              flatLink("About"),
            ]),
            viewport(),
          ]),
        ];
      },
    });
    return () => h(Driver);
  },
};

/** The bar stands on its side: triggers stack and panels open beside
 * them. */
export const Vertical = {
  render: () =>
    h(NavigationMenu.Root, { orientation: "vertical", style: { width: "max-content" } }, () => [
      h(NavigationMenu.List, () => [
        plainPanel("products", ["Analytics", "Commerce", "Payments"]),
        plainPanel("resources", ["Blog", "Changelog", "Support"]),
        flatLink("About"),
      ]),
      viewport(),
    ]),
};

/** The shared stage: both triggers render into one vessel, so the panel
 * holds its width while the ink travels. */
export const Viewport = {
  render: () =>
    h(NavigationMenu.Root, () => [
      h(NavigationMenu.List, () => [
        menuPanel("overview", columns),
        menuPanel("learn", columns.slice().reverse()),
        flatLink("Pricing"),
      ]),
      viewport(),
    ]),
};
