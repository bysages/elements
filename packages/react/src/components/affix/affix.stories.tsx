import type { Meta } from "@storybook/react-vite";
import type { ReactNode } from "react";

import { Affix } from ".";

const meta: Meta = { title: "Components/Navigation/Affix" };
export default meta;

function toolbar({ label, trailing }: { label: string; trailing: string }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "var(--bs-space-3)",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "var(--bs-space-3) var(--bs-space-4)",
        background: "var(--bs-color-surface-1)",
        border: "1px solid var(--bs-color-border)",
        borderRadius: "var(--bs-radius-sm)",
        fontSize: "var(--bs-font-size-sm)",
        letterSpacing: "var(--bs-tracking-label)",
      }}
    >
      <strong>{label}</strong>
      <span style={{ color: "var(--bs-color-text-tertiary)" }}>{trailing}</span>
    </div>
  );
}

function passage(index: number) {
  return (
    <p
      key={index}
      style={{
        margin: 0,
        color: "var(--bs-color-text-secondary)",
        lineHeight: "var(--bs-line-height-relaxed)",
      }}
    >
      Passage {index} — scroll the panel: the pinned row stays at its edge while this content
      travels.
    </p>
  );
}

function passages() {
  return (
    <div style={{ display: "grid", gap: "var(--bs-space-4)" }}>
      {Array.from({ length: 14 }, (_, index) => passage(index + 1))}
    </div>
  );
}

function Panel({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        height: "20rem",
        overflowY: "auto",
        overscrollBehavior: "contain",
        padding: "var(--bs-space-4)",
        border: "1px solid var(--bs-color-border)",
        borderRadius: "var(--bs-radius-md)",
        background: "var(--bs-color-surface-0)",
      }}
    >
      {children}
    </div>
  );
}

/** A toolbar nailed to the top of its own scroll lane. */
export const Basic = {
  render: () => (
    <Panel>
      <Affix>{toolbar({ label: "Reading tools", trailing: "Contents · Print · Share" })}</Affix>
      <div style={{ paddingBlockStart: "var(--bs-space-4)" }}>{passages()}</div>
    </Panel>
  ),
};

/** A bottom-offset row stays at the lane's lower edge. */
export const OffsetBottom = {
  render: () => (
    <Panel>
      {passages()}
      <Affix offsetBottom="0px" style={{ paddingBlockStart: "var(--bs-space-4)" }}>
        {toolbar({ label: "Review draft", trailing: "Save · Publish" })}
      </Affix>
    </Panel>
  ),
};
