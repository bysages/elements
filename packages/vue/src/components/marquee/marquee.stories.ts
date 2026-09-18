import { useMarquee } from "@ark-ui/vue/marquee";
import type { Meta } from "@storybook/vue3-vite";
import { defineComponent, h } from "vue";

import { Marquee } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Media/Marquee" };
export default meta;

const entries = ["Qinghua", "Celadon", "Zhusha", "Ultramarine", "Gamboge", "Indigo"];

/** The ribbon of seal-cut chips: content duplicated so the loop never
 * shows its seam. */
export const Basic = {
  args: {
    spacing: "1.5rem",
    speed: undefined,
  },
  render: (args: any) =>
    withState(() => () => ribbon({ spacing: args.spacing, speed: args.speed } as any)),
};

/** The paper fades the ribbon in and out at both ends of the viewport. */
export const WithEdges = {
  render: () =>
    h(Marquee.Root, { spacing: "1.5rem" }, () => [
      h(Marquee.Edge, { side: "start" }),
      h(Marquee.Viewport, () => stream()),
      h(Marquee.Edge, { side: "end" }),
    ]),
};

/** The loop repeats a fixed number of times, then the ribbon rests. */
export const FiniteLoops = {
  render: () => ribbon({ spacing: "1.5rem", loopCount: 3 } as any),
};

/** The current drifts backward. */
export const Reverse = {
  render: () => ribbon({ spacing: "1.5rem", reverse: true } as any),
};

/** A slow gait: light needs time, and so does this ribbon. */
export const SlowSpeed = {
  render: () => ribbon({ spacing: "1.5rem", speed: 25 } as any),
};

/** A brisk gait for when the ribbon must keep pace with the reader. */
export const FastSpeed = {
  render: () => ribbon({ spacing: "1.5rem", speed: 100 } as any),
};

/** The ribbon climbs: a vertical drift along the page's edge. */
export const Vertical = {
  render: () =>
    h(Marquee.Root, { spacing: "1.5rem", side: "bottom" } as any, () => [
      h(Marquee.Viewport, () =>
        h(Marquee.Content, () =>
          entries.map((name) => h(Marquee.Item, { key: name }, () => [seal(), h("span", name)])),
        ),
      ),
    ]),
};

/** The ribbon fills the row however many items it holds. */
export const AutoFill = {
  render: () => ribbon({ spacing: "2rem", autoFill: true } as any),
};

/** Touch the ribbon and it pauses; let go and it drifts on. */
export const PauseOnInteraction = {
  render: () => ribbon({ spacing: "1.5rem", pauseOnInteraction: true } as any),
};

/** The drift answers to the caller: pause and resume from outside the
 * viewport. */
export const ProgrammaticControl = {
  render: () => {
    const Driver = defineComponent({
      name: "MarqueeDriver",
      setup() {
        const marquee = useMarquee();
        const btn = (label: string, onClick: () => void) =>
          h(
            "button",
            {
              type: "button",
              onClick,
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
            label,
          );
        return () =>
          h("div", { style: { display: "grid", gap: "0.75rem" } }, [
            h(Marquee.RootProvider, { value: marquee.value } as any, () => [
              h(Marquee.Viewport, () => stream()),
            ]),
            h("div", { style: { display: "flex", gap: "0.5rem" } }, () => [
              btn("Pause", () => marquee.value.pause()),
              btn("Resume", () => marquee.value.resume()),
            ]),
          ]);
      },
    });
    return h(Driver);
  },
};

/** One loop of the stream: a seal-cut chip per pigment. */
function stream() {
  return h(Marquee.Content, { style: { gap: "1.5rem" } } as any, () =>
    entries.map((name) => h(Marquee.Item, { key: name }, () => [seal(), h("span", name)])),
  );
}

function seal() {
  return h(
    "svg",
    {
      width: 16,
      height: 16,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      "aria-hidden": true,
    },
    [h("path", { d: "M12 3 3 9l9 12 9-12-9-6Z" })],
  );
}

function ribbon(rootProps: any) {
  return h(Marquee.Root, rootProps, () => [h(Marquee.Viewport, () => stream())]);
}
