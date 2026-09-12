import { useAvatar } from "@ark-ui/vue/avatar";
import type { Meta } from "@storybook/vue3-vite";
import { h, reactive } from "vue";

import { withState } from "../with-state.js";
import { Avatar } from "./index.js";

const meta: Meta = { title: "Components / Avatar" };
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
  render: () =>
    h("div", { style: { display: "flex", gap: "0.75rem", alignItems: "center" } }, [
      h(Avatar.Root, { key: "image" }, () => [
        h(Avatar.Fallback, () => "S"),
        h(Avatar.Image, { src: PORTRAIT, alt: "Portrait of Sage" }),
      ]),
      h(Avatar.Root, { key: "initials" }, () => h(Avatar.Fallback, () => "BS")),
    ]),
};

/** The circle reads its own state: the fallback names what it waits for. */
export const Context = {
  render: () =>
    h(Avatar.Root, () => [
      h(Avatar.Context as any, null, {
        default: (api: { loaded: boolean }) => h(Avatar.Fallback, () => (api.loaded ? "S" : "…")),
      }),
      h(Avatar.Image, { src: PORTRAIT, alt: "Portrait of Sage" }),
    ]),
};

/** The load reports home: status changes land in the readout. */
export const Events = {
  render: () =>
    withState(() => {
      const state = reactive({ status: "pending" });
      return () =>
        h("div", { style: { display: "grid", gap: "0.75rem", justifyItems: "start" } }, [
          h(
            "output",
            {
              style: {
                fontSize: "var(--bs-font-size-sm)",
                color: "var(--bs-color-text-secondary)",
              },
            },
            () => `status: ${state.status}`,
          ),
          h(
            Avatar.Root,
            { onStatusChange: (e: { status: string }) => (state.status = e.status) } as any,
            () => [
              h(Avatar.Fallback, () => "PA"),
              h(Avatar.Image, { src: "https://localhost/broken-portrait.png", alt: "Portrait" }),
            ],
          ),
        ]);
    }),
};

/** A broken image falls back to initials: the seal holds the name. */
export const Fallback = {
  render: () =>
    h(Avatar.Root, () => [
      h(Avatar.Fallback, () => "PA"),
      h(Avatar.Image, { src: "https://localhost/broken-portrait.png", alt: "Portrait" }),
    ]),
};

/** The machine answers outside its anatomy: the provider owns the circle,
 * and a button swaps the portrait beneath it. */
export const RootProvider = {
  render: () => {
    const Driver = {
      name: "AvatarRootProvider",
      setup() {
        const avatar = useAvatar();
        const count = reactive({ value: 0 });
        return () =>
          h("div", { style: { display: "grid", gap: "0.75rem", justifyItems: "start" } }, [
            h(
              "button",
              {
                onClick: () => (count.value += 1),
                style: {
                  padding: "0.375rem 0.75rem",
                  border: "1px solid var(--bs-color-border)",
                  borderRadius: "var(--bs-radius-sm)",
                  background: "var(--bs-color-surface-2)",
                  font: "inherit",
                  fontSize: "var(--bs-font-size-sm)",
                },
              },
              "Change Avatar",
            ),
            h(Avatar.RootProvider as any, { value: avatar.value }, () => [
              h(Avatar.Fallback, () => "PA"),
              h(Avatar.Image, {
                src: `https://i.pravatar.cc/144?u=${count.value}`,
                alt: "Portrait",
              }),
            ]),
          ]);
      },
    };
    return () => h(Driver);
  },
};
