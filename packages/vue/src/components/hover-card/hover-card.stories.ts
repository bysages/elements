import type { Meta } from "@storybook/vue3-vite";
import { h, reactive } from "vue";

import { withState } from "../with-state.js";
import { HoverCard } from "./index.js";

const meta: Meta = { title: "Components / Hover Card" };
export default meta;

const profile = {
  name: "Sarah Chen",
  handle: "@sarah_chen",
  bio: "Design engineer. Building quiet interfaces where the ink settles before the eye arrives.",
  following: "2,456",
  followers: "14.5K",
};

function stat(value: string, label: string) {
  return h("div", { style: { display: "flex", gap: "0.25rem" } }, [
    h("strong", () => value),
    h("span", { style: { color: "var(--bs-color-text-secondary)" } }, () => label),
  ]);
}

/** The card itself: whisker arrow, serif name, quiet handle, bio, and
 * the follow ledger. */
function card() {
  return h(HoverCard.Positioner, () =>
    h(HoverCard.Content, () => [
      h(HoverCard.Arrow, () => h(HoverCard.ArrowTip)),
      h(
        "h3",
        { style: { margin: "0 0 0.25rem", fontFamily: "var(--bs-font-serif)" } },
        () => profile.name,
      ),
      h(
        "p",
        { style: { margin: "0 0 0.5rem", color: "var(--bs-color-text-secondary)" } },
        () => profile.handle,
      ),
      h("p", { style: { margin: "0 0 0.75rem" } }, () => profile.bio),
      h("div", { style: { display: "flex", gap: "1rem" } }, [
        stat(profile.following, "Following"),
        stat(profile.followers, "Followers"),
      ]),
    ]),
  );
}

function mention() {
  return h("p", { style: { margin: 0 } }, [
    "Liked by ",
    h(HoverCard.Trigger, () => profile.handle),
    " and 3 others.",
  ]);
}

/** Resting on the mention, the card rises on hover — identity rendered
 * where the eye already is. */
export const Basic = {
  render: () => h(HoverCard.Root, () => [mention(), card()]),
};

/** The card prefers the right: it rests beside the mention with a
 * custom gutter. */
export const Positioning = {
  render: () =>
    h(HoverCard.Root, { positioning: { placement: "right", gutter: 12 } } as any, () => [
      mention(),
      card(),
    ]),
};

/** Light needs time: the card waits 200ms before arriving and lingers
 * 500ms after the pointer leaves. */
export const Delay = {
  render: () =>
    h(HoverCard.Root, { openDelay: 200, closeDelay: 500 } as any, () => [mention(), card()]),
};

/** Several mentions share one card — the panel re-inks to name the
 * profile under the pointer. */
export const MultipleTriggers = {
  render: () =>
    withState(() => {
      const people = [
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
      const state = reactive({ active: people[0] });
      return () =>
        h(
          HoverCard.Root,
          {
            onTriggerValueChange: (e: { value: string | null }) =>
              (state.active = people.find((p) => p.id === e.value) ?? state.active),
          },
          () => [
            h("p", { style: { margin: 0 } }, [
              "Liked by ",
              h(HoverCard.Trigger, { value: "sarah" }, () => people[0].handle),
              ", ",
              h(HoverCard.Trigger, { value: "wei" }, () => people[1].handle),
              " and ",
              h(HoverCard.Trigger, { value: "lin" }, () => people[2].handle),
              ".",
            ]),
            h(HoverCard.Positioner, () =>
              h(HoverCard.Content, () => [
                h(HoverCard.Arrow, () => h(HoverCard.ArrowTip)),
                h(
                  "h3",
                  { style: { margin: "0 0 0.25rem", fontFamily: "var(--bs-font-serif)" } },
                  () => state.active.name,
                ),
                h(
                  "p",
                  { style: { margin: "0 0 0.5rem", color: "var(--bs-color-text-secondary)" } },
                  () => state.active.handle,
                ),
                h("p", { style: { margin: 0 } }, () => state.active.bio),
              ]),
            ),
          ],
        );
    }),
};

/** The open state answers to the caller — the card only mirrors. */
export const Controlled = {
  render: () =>
    withState(() => {
      const state = reactive({ open: false });
      return () =>
        h("div", { style: { display: "grid", gap: "0.75rem", justifyItems: "start" } }, [
          h(
            "button",
            {
              type: "button",
              onClick: () => (state.open = !state.open),
              style: {
                border: "1px solid var(--bs-color-border)",
                background: "var(--bs-color-surface-2)",
                borderRadius: "var(--bs-radius-sm)",
                padding: "0.25rem 0.625rem",
                font: "inherit",
                fontSize: "var(--bs-font-size-sm)",
                cursor: "pointer",
              },
            },
            "Toggle",
          ),
          h(
            HoverCard.Root,
            { open: state.open, onOpenChange: (e: { open: boolean }) => (state.open = e.open) },
            () => [mention(), card()],
          ),
        ]);
    }),
};

/** The machine's state is readable inside the card itself. */
export const Context = {
  render: () =>
    h(HoverCard.Root, () => [
      mention(),
      h(HoverCard.Positioner, () =>
        h(HoverCard.Content, () =>
          h(HoverCard.Context as any, null, {
            default: (api: { open: boolean }) =>
              h("span", () => `Hover card is ${api.open ? "visible" : "hidden"}`),
          }),
        ),
      ),
    ]),
};
