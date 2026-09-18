import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { HoverCard } from ".";

const meta: Meta = { title: "Components/Overlay/Hover Card" };
export default meta;

const profile = {
  name: "Sarah Chen",
  handle: "@sarah_chen",
  bio: "Design engineer. Building quiet interfaces where the ink settles before the eye arrives.",
  following: "2,456",
  followers: "14.5K",
};

function stat(value: string, label: string) {
  return (
    <div style={{ display: "flex", gap: "0.25rem" }}>
      <strong>{value}</strong>
      <span style={{ color: "var(--bs-color-text-secondary)" }}>{label}</span>
    </div>
  );
}

/** The card itself: whisker arrow, serif name, quiet handle, bio, and
 * the follow ledger. */
function card() {
  return (
    <HoverCard.Positioner>
      <HoverCard.Content>
        <HoverCard.Arrow>
          <HoverCard.ArrowTip />
        </HoverCard.Arrow>
        <h3 style={{ margin: "0 0 0.25rem", fontFamily: "var(--bs-font-serif)" }}>
          {profile.name}
        </h3>
        <p style={{ margin: "0 0 0.5rem", color: "var(--bs-color-text-secondary)" }}>
          {profile.handle}
        </p>
        <p style={{ margin: "0 0 0.75rem" }}>{profile.bio}</p>
        <div style={{ display: "flex", gap: "1rem" }}>
          {stat(profile.following, "Following")}
          {stat(profile.followers, "Followers")}
        </div>
      </HoverCard.Content>
    </HoverCard.Positioner>
  );
}

function mention(handle = profile.handle) {
  return (
    <p style={{ margin: 0 }}>
      Liked by <HoverCard.Trigger>{handle}</HoverCard.Trigger> and 3 others.
    </p>
  );
}

/** Resting on the mention, the card rises on hover — identity rendered
 * where the eye already is. */
export const Basic = {
  args: {
    triggerText: profile.handle,
  },
  render: (args: any) => (
    <HoverCard.Root>
      {mention(args.triggerText)}
      {card()}
    </HoverCard.Root>
  ),
};

/** The card prefers the right: it rests beside the mention with a
 * custom gutter. */
export const Positioning = {
  render: () => (
    <HoverCard.Root positioning={{ placement: "right", gutter: 12 }}>
      {mention()}
      {card()}
    </HoverCard.Root>
  ),
};

/** Light needs time: the card waits 200ms before arriving and lingers
 * 500ms after the pointer leaves. */
export const Delay = {
  render: () => (
    <HoverCard.Root openDelay={200} closeDelay={500}>
      {mention()}
      {card()}
    </HoverCard.Root>
  ),
};

const PEOPLE = [
  {
    id: "sarah",
    name: "Sarah Chen",
    handle: "@sarah_chen",
    bio: "Design engineer. Quiet interfaces, settled ink.",
  },
  {
    id: "wei",
    name: "Wei Zhang",
    handle: "@wei_zhang",
    bio: "Type setter. Song-serif partisans, hei pragmatists.",
  },
  {
    id: "lin",
    name: "Lin An",
    handle: "@lin_an",
    bio: "Keeper of tokens. Every value has a source.",
  },
];

/** Several mentions share one card — the panel re-inks to name the
 * profile under the pointer. */
export const MultipleTriggers = {
  render: () => {
    const [activeId, setActiveId] = useState("sarah");
    const active = PEOPLE.find((p) => p.id === activeId) ?? PEOPLE[0];
    return (
      <HoverCard.Root
        onTriggerValueChange={(e: { value: string | null }) => setActiveId(e.value ?? "sarah")}
      >
        <p style={{ margin: 0 }}>
          Liked by <HoverCard.Trigger value="sarah">{PEOPLE[0].handle}</HoverCard.Trigger>,{" "}
          <HoverCard.Trigger value="wei">{PEOPLE[1].handle}</HoverCard.Trigger> and{" "}
          <HoverCard.Trigger value="lin">{PEOPLE[2].handle}</HoverCard.Trigger>.
        </p>
        <HoverCard.Positioner>
          <HoverCard.Content>
            <HoverCard.Arrow>
              <HoverCard.ArrowTip />
            </HoverCard.Arrow>
            <h3 style={{ margin: "0 0 0.25rem", fontFamily: "var(--bs-font-serif)" }}>
              {active.name}
            </h3>
            <p style={{ margin: "0 0 0.5rem", color: "var(--bs-color-text-secondary)" }}>
              {active.handle}
            </p>
            <p style={{ margin: 0 }}>{active.bio}</p>
          </HoverCard.Content>
        </HoverCard.Positioner>
      </HoverCard.Root>
    );
  },
};

/** The open state answers to the caller — the card only mirrors. */
export const Controlled = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ display: "grid", gap: "0.75rem", justifyItems: "start" }}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          style={{
            border: "1px solid var(--bs-color-border)",
            background: "var(--bs-color-surface-2)",
            borderRadius: "var(--bs-radius-sm)",
            padding: "0.25rem 0.625rem",
            font: "inherit",
            fontSize: "var(--bs-font-size-sm)",
            cursor: "pointer",
          }}
        >
          Toggle
        </button>
        <HoverCard.Root open={open} onOpenChange={(e: { open: boolean }) => setOpen(e.open)}>
          {mention()}
          {card()}
        </HoverCard.Root>
      </div>
    );
  },
};

/** The machine's state is readable inside the card itself. */
export const Context = {
  render: () => (
    <HoverCard.Root>
      {mention()}
      <HoverCard.Positioner>
        <HoverCard.Content>
          <HoverCard.Context>
            {(api: { open: boolean }) => (
              <span>Hover card is {api.open ? "visible" : "hidden"}</span>
            )}
          </HoverCard.Context>
        </HoverCard.Content>
      </HoverCard.Positioner>
    </HoverCard.Root>
  ),
};
