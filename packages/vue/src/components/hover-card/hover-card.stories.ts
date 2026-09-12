import type { Meta } from "@storybook/vue3-vite";
import { h, Teleport } from "vue";

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

export const Basic = {
  render: () =>
    h("p", { style: { margin: 0 } }, [
      "Liked by ",
      h(HoverCard.Root, () => [
        h(HoverCard.Trigger, () => profile.handle),
        h(Teleport, { to: "body" }, () => [
          h(HoverCard.Positioner, () =>
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
          ),
        ]),
      ]),
      " and 3 others.",
    ]),
};
