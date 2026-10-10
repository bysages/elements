import { injectComponentStyle } from "@bysages/core/styling";
import type { SetupContext } from "vue";
import { defineComponent, h } from "vue";

export interface DockProps {
  /** The tallest an item swells under the hand — 1 stands still. */
  maxScale?: number;
  /** How far the hand reaches, in px, before an item stops answering. */
  radius?: number;
}

const ITEM = '[data-scope="dock"][data-part="item"]';

/** The magnifying dock: a floating rail whose icons swell toward the
 * hand. The wrapper measures per item and writes --bs-dock-scale; CSS
 * eases the chase, so no spring engine rides along. */
const DockRoot = defineComponent({
  name: "SDockRoot",
  inheritAttrs: false,
  props: {
    maxScale: { type: Number, default: 1.5 },
    radius: { type: Number, default: 96 },
  },
  setup(props, ctx: SetupContext) {
    injectComponentStyle("dock");

    const magnify = (event: PointerEvent) => {
      const host = event.currentTarget as HTMLElement;
      for (const item of host.querySelectorAll<HTMLElement>(ITEM)) {
        const rect = item.getBoundingClientRect();
        const dist = Math.abs(event.clientX - (rect.left + rect.width / 2));
        const t = Math.max(0, 1 - dist / props.radius);
        item.style.setProperty("--bs-dock-scale", (1 + (props.maxScale - 1) * t * t).toFixed(4));
      }
    };

    const reset = (event: PointerEvent) => {
      const host = event.currentTarget as HTMLElement;
      for (const item of host.querySelectorAll<HTMLElement>(ITEM)) {
        item.style.removeProperty("--bs-dock-scale");
      }
    };

    return () =>
      h(
        "div",
        {
          ...ctx.attrs,
          "data-scope": "dock",
          "data-part": "root",
          style: [ctx.attrs.style as never, { "--bs-dock-max-scale": String(props.maxScale) }],
          onPointermove: magnify,
          onPointerleave: reset,
        },
        ctx.slots.default?.(),
      );
  },
});

/** One moored place in the rail: whatever slots in grows from the
 * floor, never from its center. */
const DockItem = defineComponent({
  name: "SDockItem",
  inheritAttrs: false,
  setup(_, ctx: SetupContext) {
    injectComponentStyle("dock");

    return () =>
      h("div", { ...ctx.attrs, "data-scope": "dock", "data-part": "item" }, ctx.slots.default?.());
  },
});

export const Dock = Object.assign(DockRoot, { Root: DockRoot, Item: DockItem });
