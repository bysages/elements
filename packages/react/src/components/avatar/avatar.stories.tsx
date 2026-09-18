import { useAvatar } from "@ark-ui/react/avatar";
import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { Avatar } from ".";

const meta: Meta = { title: "Components/Elements/Avatar" };
export default meta;

/** A tiny inline portrait: loads instantly, keeps the story offline. */
const PORTRAIT =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="144" height="144"><rect width="144" height="144" fill="#b9b2a4"/><circle cx="72" cy="56" r="26" fill="#3a3733"/><path d="M24 132c6-30 26-44 48-44s42 14 48 44" fill="#3a3733"/></svg>`,
  );

/** Initials stand in until the image arrives; the image loads over the
 * fallback in the same circle. */
export const Basic = {
  args: {
    fallback: "S",
    initials: "BS",
  },
  render: (args: any) => (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
      <Avatar.Root>
        <Avatar.Fallback>{args.fallback}</Avatar.Fallback>
        <Avatar.Image src={PORTRAIT} alt="Portrait of Sage" />
      </Avatar.Root>
      <Avatar.Root>
        <Avatar.Fallback>{args.initials}</Avatar.Fallback>
      </Avatar.Root>
    </div>
  ),
};

/** The circle reads its own state: the fallback names what it waits for. */
export const Context = {
  render: () => (
    <Avatar.Root>
      <Avatar.Context>
        {(api: { loaded: boolean }) => <Avatar.Fallback>{api.loaded ? "S" : "…"}</Avatar.Fallback>}
      </Avatar.Context>
      <Avatar.Image src={PORTRAIT} alt="Portrait of Sage" />
    </Avatar.Root>
  ),
};

/** The load reports home: status changes land in the readout. */
export const Events = {
  render: () => {
    const [status, setStatus] = useState("pending");
    return (
      <div style={{ display: "grid", gap: "0.75rem", justifyItems: "start" }}>
        <output
          style={{ fontSize: "var(--bs-font-size-sm)", color: "var(--bs-color-text-secondary)" }}
        >
          status: {status}
        </output>
        <Avatar.Root onStatusChange={(e: { status: any }) => setStatus(e.status)}>
          <Avatar.Fallback>PA</Avatar.Fallback>
          <Avatar.Image src="https://localhost/broken-portrait.png" alt="Portrait" />
        </Avatar.Root>
      </div>
    );
  },
};

/** A broken image falls back to initials: the seal holds the name. */
export const Fallback = {
  render: () => (
    <Avatar.Root>
      <Avatar.Fallback>PA</Avatar.Fallback>
      <Avatar.Image src="https://localhost/broken-portrait.png" alt="Portrait" />
    </Avatar.Root>
  ),
};

/** The machine answers outside its anatomy: the provider owns the circle,
 * and a button swaps the portrait beneath it. */
function RootProviderDriver() {
  const avatar = useAvatar();
  const [count, setCount] = useState(0);
  return (
    <div style={{ display: "grid", gap: "0.75rem", justifyItems: "start" }}>
      <button
        onClick={() => setCount((value) => value + 1)}
        style={{
          padding: "0.375rem 0.75rem",
          border: "1px solid var(--bs-color-border)",
          borderRadius: "var(--bs-radius-sm)",
          background: "var(--bs-color-surface-2)",
          font: "inherit",
          fontSize: "var(--bs-font-size-sm)",
        }}
      >
        Change Avatar
      </button>
      <Avatar.RootProvider value={avatar}>
        <Avatar.Fallback>PA</Avatar.Fallback>
        <Avatar.Image src={`https://i.pravatar.cc/144?u=${count}`} alt="Portrait" />
      </Avatar.RootProvider>
    </div>
  );
}

export const RootProvider = {
  render: () => <RootProviderDriver />,
};
