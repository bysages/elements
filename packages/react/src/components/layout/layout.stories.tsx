import type { Meta } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { useState } from "react";

import { Layout } from ".";
import { Button } from "../button";

const meta: Meta = { title: "Components/Layout/Layout" };
export default meta;

/** One stroke each: the four stops of the demo rail. */
function railIcon(kind: string): ReactNode {
  const paths: Record<string, ReactNode> = {
    overview: (
      <>
        <rect x={4} y={4} width={7} height={7} />
        <rect x={13} y={4} width={7} height={7} />
        <rect x={4} y={13} width={7} height={7} />
        <rect x={13} y={13} width={7} height={7} />
      </>
    ),
    ledger: <path d="M4 6h16M4 12h16M4 18h10" />,
    archive: (
      <>
        <rect x={4} y={5} width={16} height={4} />
        <path d="M6 9v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V9M10 13h4" />
      </>
    ),
    settings: (
      <>
        <circle cx={12} cy={12} r={3} />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
      </>
    ),
  };
  return (
    <svg
      width={15}
      height={15}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="square"
      aria-hidden="true"
      // The folded rail clips the label away; the glyph itself must
      // never yield its width to the unbreakable words beside it.
      style={{ flex: "none" }}
    >
      {paths[kind]}
    </svg>
  );
}

const stops = [
  { label: "Overview", icon: "overview" },
  { label: "Ledger", icon: "ledger" },
  { label: "Archive", icon: "archive" },
  { label: "Settings", icon: "settings" },
];

/** The rail answers the fold without a single hard cut — every change
 * rides a transition that runs at the same pace as the rail itself:
 * width, padding and label opacity animate in parallel, so nothing
 * snaps while the edge moves. The stops shrink toward a centered seal
 * while their labels fold into nothing. */
const railTransition =
  "inline-size var(--bs-duration-slow) var(--bs-ease-out), padding-inline var(--bs-duration-slow) var(--bs-ease-out)";

const navRail = (collapsed: boolean) => (
  <div
    style={{
      display: "grid",
      gap: "var(--bs-gap-xs)",
      padding: "var(--bs-padding-sm)",
      justifyItems: "center",
    }}
  >
    {stops.map((stop) => (
      <Button
        key={stop.label}
        variant="ghost"
        aria-label={collapsed ? stop.label : undefined}
        style={{
          justifyContent: "flex-start",
          inlineSize: collapsed ? "2rem" : "100%",
          paddingInline: collapsed ? "0.5rem" : "var(--bs-padding-sm)",
          gap: "var(--bs-gap-sm)",
          whiteSpace: "nowrap",
          overflow: "hidden",
          transition: railTransition,
        }}
      >
        {railIcon(stop.icon)}
        <span
          style={{
            maxInlineSize: collapsed ? "0" : "100%",
            opacity: collapsed ? "0" : "1",
            overflow: "hidden",
            transition:
              "max-inline-size var(--bs-duration-slow) var(--bs-ease-out), opacity var(--bs-duration-fast) var(--bs-ease-out)",
          }}
        >
          {stop.label}
        </span>
      </Button>
    ))}
  </div>
);

/** The flow between the rail: one header line, placeholder body copy,
 * and a quiet footer. */
function page(): ReactNode {
  return (
    <>
      <Layout.Header>
        <strong style={{ fontSize: "var(--bs-font-size-lg)" }}>The workbench</strong>
      </Layout.Header>
      <Layout.Content>
        <div style={{ display: "grid", gap: "var(--bs-gap-md)", maxInlineSize: "72ch" }}>
          <p style={{ margin: 0 }}>
            The content area takes the flow's full measure and holds it to a readable column.
            Sections rise onto surfaces; the skeleton only decides where they stand.
          </p>
          <p style={{ margin: 0 }}>
            Below the flow the footer rests at the foot of the grid, however little content there is
            — the middle track stretches, the frame does not collapse.
          </p>
        </div>
      </Layout.Content>
      <Layout.Footer>
        <p style={{ margin: 0, color: "var(--bs-color-text-tertiary)" }}>
          By Sages Elements — the paper-and-ink system.
        </p>
      </Layout.Footer>
    </>
  );
}

/** The admin arrangement: a fixed rail on the start edge, the header on
 * top, the footer at the foot, and the flow stretching between. */
export const Basic = {
  render: () => (
    <Layout.Root sider="start">
      <Layout.Sider>{navRail(false)}</Layout.Sider>
      {page()}
    </Layout.Root>
  ),
};

/** The rail answers to the caller: one external button folds it, and
 * the inline width variable carries the transition. The contents ride
 * the fold through the render prop — same nodes either way, only the
 * stops tighten into their square seals. */
export const ControlledCollapse = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false);
    const [width, setWidth] = useState("16rem");
    return (
      <div style={{ display: "grid", gap: "var(--bs-space-4)" }}>
        <Button
          variant="ghost"
          style={{ justifySelf: "start" }}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? "Expand the rail" : "Fold the rail"}
        </Button>
        <Layout.Root sider="start" style={{ minBlockSize: "32rem" }}>
          <Layout.Sider
            collapsed={collapsed}
            onCollapsedChange={setCollapsed}
            resizable
            width={width}
            onWidthChange={setWidth}
          >
            {({ collapsed: folded }) => navRail(folded)}
          </Layout.Sider>
          {page()}
        </Layout.Root>
      </div>
    );
  },
};
