import { useToc } from "@ark-ui/vue/toc";
import { createTreeCollection } from "@ark-ui/vue/tree-view";
import type { Meta } from "@storybook/vue3-vite";
import { defineComponent, h, reactive, ref } from "vue";

import { Toc } from ".";
import { Collapsible } from "../collapsible";
import { TreeView } from "../tree-view";

const meta: Meta = { title: "Components/Navigation/Toc" };
export default meta;

interface Section {
  value: string;
  depth: number;
  label: string;
  lines: number;
}

/** A page of prose sections the rail can walk. The scroller is looked
 * up by id — the machine reads it before any component ref settles. */
function page(sections: Section[]) {
  const id = `toc-scroll-${sections[0]?.value ?? "page"}`;
  const content = ref();
  const scrollEl = () => document.getElementById(id) ?? (content.value?.$el as HTMLElement | null);
  return { id, content, scrollEl };
}

function prose(lines: number) {
  return Array.from({ length: lines }, (_, line) =>
    h("p", { key: line }, "Warm paper, ink that reads, hierarchy carried by light."),
  );
}

function heading(section: Section) {
  return h(
    "h3",
    {
      id: section.value,
      style: {
        margin: "0 0 0.5rem",
        fontFamily: "var(--bs-font-serif)",
        fontSize: section.depth > 2 ? "1rem" : "1.25rem",
      },
    },
    section.label,
  );
}

/** The article body: each section's heading carries the anchor id. The
 * content is the scroller the toc watches, found through its id. */
function article(sections: Section[], pg: { id: string; content: { value: any } }) {
  return h(
    Toc.Content,
    {
      ref: pg.content,
      id: pg.id,
      style: {
        height: "18rem",
        overflowY: "auto",
        paddingRight: "1rem",
        scrollBehavior: "smooth",
      },
    } as any,
    () =>
      sections.map((section) =>
        h("section", { key: section.value, style: { marginBottom: "1.5rem" } }, [
          heading(section),
          ...prose(section.lines),
        ]),
      ),
  );
}

const linkStyle = {
  display: "block",
  padding: "0.25rem 0.5rem",
  fontSize: "var(--bs-font-size-sm)",
  color: "var(--bs-color-text-secondary)",
  textDecoration: "none",
  borderRadius: "var(--bs-radius-sm)",
};

function railList(sections: Section[]) {
  return h(Toc.List, () =>
    sections.map((section) =>
      h(
        Toc.Item,
        {
          key: section.value,
          item: section,
          style: section.depth > 2 ? { paddingInlineStart: "1rem" } : undefined,
        },
        () => h(Toc.Link, { href: `#${section.value}`, style: linkStyle }, () => section.label),
      ),
    ),
  );
}

function nav(sections: Section[], indicator = false) {
  return h(Toc.Nav, () => [
    h(Toc.Title, () => "On this page"),
    indicator
      ? h(Toc.List, () => [
          h(Toc.Indicator),
          ...sections.map((section) =>
            h(Toc.Item, { key: section.value, item: section }, () =>
              h(Toc.Link, { href: `#${section.value}`, style: linkStyle }, () => section.label),
            ),
          ),
        ])
      : railList(sections),
  ]);
}

const BASIC_SECTIONS: Section[] = [
  { value: "intro", depth: 2, label: "Introduction", lines: 12 },
  { value: "getting-started", depth: 2, label: "Getting Started", lines: 10 },
  { value: "installation", depth: 2, label: "Installation", lines: 8 },
  { value: "usage", depth: 2, label: "Usage", lines: 14 },
  { value: "conclusion", depth: 2, label: "Conclusion", lines: 10 },
];

/** A page of prose beside its rail: scroll and the active stroke follows
 * the section under the eye. */
const TocStory = defineComponent({
  name: "TocStory",
  setup() {
    const pg = page(BASIC_SECTIONS);
    return () =>
      h(Toc.Root, { items: BASIC_SECTIONS, scrollEl: pg.scrollEl }, () => [
        article(BASIC_SECTIONS, pg),
        nav(BASIC_SECTIONS),
      ]);
  },
});

export const Basic = {
  render: () => h(TocStory),
};

const NESTED_SECTIONS: Section[] = [
  { value: "importance", depth: 2, label: "Importance", lines: 10 },
  { value: "integrations", depth: 2, label: "Integrations", lines: 12 },
  { value: "free-blocks", depth: 3, label: "Free Blocks", lines: 8 },
  { value: "configuration", depth: 3, label: "Configuration", lines: 14 },
  { value: "api-reference", depth: 2, label: "API Reference", lines: 10 },
  { value: "hooks", depth: 3, label: "Hooks", lines: 8 },
  { value: "components", depth: 3, label: "Components", lines: 12 },
  { value: "examples", depth: 2, label: "Examples", lines: 10 },
];

/** Sub-sections step in: deeper headings carry a deeper indent. */
const NestedStory = defineComponent({
  name: "TocNestedStory",
  setup() {
    const pg = page(NESTED_SECTIONS);
    return () =>
      h(Toc.Root, { items: NESTED_SECTIONS, scrollEl: pg.scrollEl }, () => [
        article(NESTED_SECTIONS, pg),
        nav(NESTED_SECTIONS),
      ]);
  },
});

export const Nested = {
  render: () => h(NestedStory),
};

/** The machine is reachable outside the rail: a plain select jumps the
 * scroll through the context. */
const RootProviderStory = defineComponent({
  name: "TocRootProviderStory",
  setup() {
    const pg = page(BASIC_SECTIONS);
    const toc = useToc({ items: BASIC_SECTIONS, scrollEl: pg.scrollEl });
    return () =>
      h(Toc.RootProvider as any, { value: toc.value }, () => [
        article(BASIC_SECTIONS, pg),
        nav(BASIC_SECTIONS),
      ]);
  },
});

export const RootProvider = {
  render: () => h(RootProviderStory),
};

/** The rail folds into a collapsible tray; the trigger reads the active
 * section while folded. */
const WithCollapsibleStory = defineComponent({
  name: "TocCollapsibleStory",
  setup() {
    const pg = page(BASIC_SECTIONS);
    return () =>
      h(Toc.Root, { items: BASIC_SECTIONS, scrollEl: pg.scrollEl }, () => [
        h(Collapsible.Root, { style: { width: "100%" } }, () => [
          h(Toc.Context as any, null, {
            default: (ctx: { activeItems: any[] }) => {
              const activeIndex = BASIC_SECTIONS.findIndex(
                (i) => i.value === ctx.activeItems[0]?.value,
              );
              const activeLabel = BASIC_SECTIONS[activeIndex]?.label ?? "On this page";
              return h(Collapsible.Trigger, () =>
                h(
                  "span",
                  {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      fontSize: "var(--bs-font-size-sm)",
                    },
                  },
                  [
                    h("span", () =>
                      activeIndex >= 0
                        ? `${String(activeIndex + 1).padStart(2, "0")} — ${activeLabel}`
                        : activeLabel,
                    ),
                    h(Collapsible.Indicator, () => "▸"),
                  ],
                ),
              );
            },
          }),
          h(Collapsible.Content, () =>
            h(Toc.List, () =>
              BASIC_SECTIONS.map((section, index) =>
                h(Toc.Item, { key: section.value, item: section }, () =>
                  h(Toc.Link, { href: `#${section.value}`, style: linkStyle }, () => [
                    h(
                      "span",
                      {
                        style: {
                          color: "var(--bs-color-text-tertiary)",
                          marginInlineEnd: "0.5rem",
                          fontSize: "var(--bs-font-size-xs)",
                        },
                      },
                      String(index + 1).padStart(2, "0"),
                    ),
                    section.label,
                  ]),
                ),
              ),
            ),
          ),
        ]),
        article(BASIC_SECTIONS, pg),
      ]);
  },
});

export const WithCollapsible = {
  render: () => h(WithCollapsibleStory),
};

/** On a narrow column the rail sleeps as bare strokes until the reader
 * hovers — then it wakes into labels. */
const WithHoverStory = defineComponent({
  name: "TocHoverStory",
  setup() {
    const state = reactive({ hovered: false });
    const HOVER_SECTIONS: Section[] = [
      { value: "analytics", depth: 2, label: "Real-time Analytics", lines: 55 },
      { value: "cloud-storage", depth: 2, label: "S3 Cloud Storage", lines: 14 },
      { value: "automation", depth: 2, label: "Workflow Automation", lines: 32 },
      { value: "crm", depth: 2, label: "Salesforce Sync", lines: 45 },
      { value: "reports", depth: 2, label: "Custom PDF Reports", lines: 20 },
    ];
    const pg = page(HOVER_SECTIONS);
    return () =>
      h(Toc.Root, { items: HOVER_SECTIONS, scrollEl: pg.scrollEl }, () => [
        article(HOVER_SECTIONS, pg),
        h(
          Toc.Nav,
          {
            "data-expanded": state.hovered || undefined,
            onMouseEnter: () => (state.hovered = true),
            onMouseLeave: () => (state.hovered = false),
            style: {
              minWidth: state.hovered ? "10rem" : "2rem",
              transition: "min-width var(--bs-duration-base) var(--bs-ease-default)",
            },
          },
          () =>
            state.hovered
              ? h(Toc.List, () =>
                  HOVER_SECTIONS.map((section) =>
                    h(Toc.Item, { key: section.value, item: section }, () =>
                      h(
                        Toc.Link,
                        { href: `#${section.value}`, style: linkStyle },
                        () => section.label,
                      ),
                    ),
                  ),
                )
              : h(Toc.List, () =>
                  HOVER_SECTIONS.map((section) =>
                    h("div", {
                      key: section.value,
                      style: {
                        height: "0.375rem",
                        margin: "0.375rem 0",
                        borderRadius: "var(--bs-radius-sm)",
                        background: "var(--bs-color-border)",
                      },
                    }),
                  ),
                ),
        ),
      ]);
  },
});

export const WithHover = {
  render: () => h(WithHoverStory),
};

/** A stroke of ink rides the rail: the indicator part tracks the active
 * row's geometry variables. */
const WithIndicatorStory = defineComponent({
  name: "TocIndicatorStory",
  setup() {
    const INDICATOR_SECTIONS: Section[] = [
      { value: "validation", depth: 2, label: "Validation Pending", lines: 5 },
      { value: "upload", depth: 2, label: "Asset Uploading", lines: 90 },
      { value: "sync", depth: 2, label: "Server Sync Active", lines: 12 },
      { value: "pipeline", depth: 2, label: "CI/CD Running", lines: 105 },
      { value: "database", depth: 2, label: "DB Connection Stable", lines: 3 },
    ];
    const pg = page(INDICATOR_SECTIONS);
    return () =>
      h(Toc.Root, { items: INDICATOR_SECTIONS, scrollEl: pg.scrollEl }, () => [
        article(INDICATOR_SECTIONS, pg),
        nav(INDICATOR_SECTIONS, true),
      ]);
  },
});

export const WithIndicator = {
  render: () => h(WithIndicatorStory),
};

const RAIL_SECTIONS: Section[] = [
  { value: "overview", depth: 2, label: "Overview", lines: 10 },
  { value: "installation", depth: 2, label: "Installation", lines: 8 },
  { value: "package-manager", depth: 3, label: "Package Manager", lines: 12 },
  { value: "peer-dependencies", depth: 3, label: "Peer Dependencies", lines: 6 },
  { value: "usage", depth: 2, label: "Usage", lines: 14 },
  { value: "server-components", depth: 3, label: "Server Components", lines: 9 },
  { value: "styling", depth: 3, label: "Styling", lines: 11 },
  { value: "theming", depth: 4, label: "Theming", lines: 7 },
  { value: "api-reference", depth: 2, label: "API Reference", lines: 12 },
];

// h2 sits at level 0; deeper headings step in, clamped so h5+ share h4's indent
const RAIL_BASE = 8;
const RAIL_STEP = 8;
const TEXT_STEP = 12;
const RAIL_MAX_LEVEL = 2;
// the rail overlaps the row above by BRIDGE px so the turn can straddle the boundary
const RAIL_BRIDGE = 6;

const levelOf = (depth: number) => Math.min(Math.max(depth - 2, 0), RAIL_MAX_LEVEL);
const lineOffset = (depth: number) => RAIL_BASE + levelOf(depth) * RAIL_STEP;
const textOffset = (depth: number) => RAIL_BASE + (levelOf(depth) + 1) * TEXT_STEP;

/** The rail turns with the outline: an SVG line per row that bends
 * where the depth changes. */
function railRow(section: Section, index: number, sections: Section[]) {
  const depth = section.depth;
  const prevDepth = sections[index - 1]?.depth ?? depth;
  const nextDepth = sections[index + 1]?.depth ?? depth;
  const line = lineOffset(depth);
  const prevLine = lineOffset(prevDepth);
  const nextLine = lineOffset(nextDepth);
  const turns = prevLine !== line;
  return h(Toc.Item, { key: section.value, item: section, style: { position: "relative" } }, () => [
    h(
      "svg",
      {
        style: {
          position: "absolute",
          top: `${-RAIL_BRIDGE}px`,
          left: 0,
          width: `${Math.max(prevLine, line) + 9}px`,
          height: line === nextLine ? `calc(100% + ${RAIL_BRIDGE}px)` : "100%",
        },
        "aria-hidden": true,
      },
      [
        ...(turns
          ? [
              h("path", {
                d: `M ${prevLine + 0.5} 0 C ${prevLine + 0.5} 8 ${line + 0.5} 4 ${line + 0.5} ${RAIL_BRIDGE * 2}`,
                fill: "none",
                stroke: "var(--bs-color-border-strong)",
                "stroke-width": 1,
              }),
            ]
          : []),
        h("line", {
          x1: line + 0.5,
          y1: turns ? RAIL_BRIDGE * 2 : RAIL_BRIDGE,
          x2: line + 0.5,
          y2: "100%",
          stroke: "var(--bs-color-border-strong)",
          "stroke-width": 1,
        }),
      ],
    ),
    h(
      Toc.Link,
      {
        href: `#${section.value}`,
        style: { ...linkStyle, paddingInlineStart: `${textOffset(depth)}px` },
      },
      () => section.label,
    ),
  ]);
}

/** The quiet rail of turns: depth changes draw a bending line down the
 * margin. */
const WithRailStory = defineComponent({
  name: "TocRailStory",
  setup() {
    const pg = page(RAIL_SECTIONS);
    return () =>
      h(Toc.Root, { items: RAIL_SECTIONS, scrollEl: pg.scrollEl }, () => [
        article(RAIL_SECTIONS, pg),
        h(Toc.Nav, () => [
          h(Toc.Title, () => "On this page"),
          h(Toc.List, () =>
            RAIL_SECTIONS.map((section, index) => railRow(section, index, RAIL_SECTIONS)),
          ),
        ]),
      ]);
  },
});

export const WithRail = {
  render: () => h(WithRailStory),
};

/** Narrow columns read the page through a select: the context reports
 * the active section and jumps on change. */
const WithSelectStory = defineComponent({
  name: "TocSelectStory",
  setup() {
    const pg = page(BASIC_SECTIONS);
    return () =>
      h(Toc.Root, { items: BASIC_SECTIONS, scrollEl: pg.scrollEl }, () => [
        h(Toc.Context as any, null, {
          default: (ctx: { activeItems: any[]; scrollTo: (value: string) => void }) =>
            h(
              "select",
              {
                value: ctx.activeItems[0]?.value ?? BASIC_SECTIONS[0].value,
                onChange: (e: Event) => ctx.scrollTo((e.target as HTMLSelectElement).value),
                style: {
                  width: "100%",
                  marginBottom: "1rem",
                  padding: "0.375rem 0.5rem",
                  border: "1px solid var(--bs-color-border)",
                  borderRadius: "var(--bs-radius-sm)",
                  background: "var(--bs-color-surface-2)",
                  font: "inherit",
                  fontSize: "var(--bs-font-size-sm)",
                },
              },
              BASIC_SECTIONS.map((section) =>
                h("option", { key: section.value, value: section.value }, section.label),
              ),
            ),
        }),
        article(BASIC_SECTIONS, pg),
        nav(BASIC_SECTIONS),
      ]);
  },
});

export const WithSelect = {
  render: () => h(WithSelectStory),
};

interface TocNode {
  id: string;
  name: string;
  depth: number;
  lines: number;
  children?: TocNode[];
}

const TREE_SECTIONS: TocNode[] = [
  {
    id: "guides",
    name: "Guides",
    depth: 2,
    lines: 10,
    children: [
      { id: "quick-start", name: "Quick Start", depth: 3, lines: 6 },
      { id: "manual-setup", name: "Manual Setup", depth: 3, lines: 5 },
    ],
  },
  {
    id: "core-concepts",
    name: "Core Concepts",
    depth: 2,
    lines: 9,
    children: [
      { id: "props", name: "Props", depth: 3, lines: 7 },
      { id: "events", name: "Events", depth: 3, lines: 6 },
      { id: "context", name: "Context", depth: 3, lines: 8 },
    ],
  },
  {
    id: "advanced",
    name: "Advanced",
    depth: 2,
    lines: 11,
    children: [
      { id: "root-api", name: "Root Provider", depth: 3, lines: 7 },
      { id: "custom-rendering", name: "Custom Rendering", depth: 3, lines: 6 },
    ],
  },
];

/** The rail grows branches: a tree-view whose leaves deep-link the
 * page, active state read from the toc context. */
const WithTreeViewStory = defineComponent({
  name: "TocTreeViewStory",
  setup() {
    const collection = createTreeCollection<TocNode>({
      nodeToValue: (node: TocNode) => node.id,
      nodeToString: (node: TocNode) => node.name,
      rootNode: { id: "ROOT", name: "", depth: 0, lines: 0, children: TREE_SECTIONS },
    });
    const flat = TREE_SECTIONS.flatMap((section) => [
      { value: section.id, depth: section.depth, label: section.name, lines: section.lines },
      ...(section.children ?? []).map((child) => ({
        value: child.id,
        depth: child.depth,
        label: child.name,
        lines: child.lines,
      })),
    ]);
    const pg = page(flat);
    const leafRow = (node: any) =>
      h(Toc.Item, { key: node.id, item: node, style: { paddingInlineStart: "1rem" } }, () =>
        h(Toc.Link, { href: `#${node.id}`, style: linkStyle }, () => node.name),
      );
    const branchRow = (node: any, indexPath: number[]) =>
      h(TreeView.NodeProvider, { node, indexPath }, () => [
        h(TreeView.Branch, () => [
          h(TreeView.BranchControl, () => [
            h(TreeView.BranchTrigger, () => node.name),
            h(TreeView.BranchIndicator, () => "▸"),
          ]),
          h(TreeView.BranchContent, () =>
            (node.children ?? []).map((child: any, index: number) =>
              child.children?.length
                ? branchRow(collection.findNode(child.id), [...indexPath, index])
                : leafRow(child),
            ),
          ),
        ]),
      ]);
    return () =>
      h(Toc.Root, { items: flat, scrollEl: pg.scrollEl }, () => [
        article(flat, pg),
        h(Toc.Nav, () => [
          h(Toc.Title, () => "On this page"),
          h(
            TreeView.Root,
            { collection, defaultExpandedValue: TREE_SECTIONS.map((s) => s.id) } as any,
            () =>
              h(TreeView.Tree, () =>
                TREE_SECTIONS.map((s, index) => branchRow(collection.findNode(s.id), [index])),
              ),
          ),
        ]),
      ]);
  },
});

export const WithTreeView = {
  render: () => h(WithTreeViewStory),
};
