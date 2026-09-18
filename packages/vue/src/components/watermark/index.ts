import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { defineComponent, h, ref, watchEffect } from "vue";

/** Font-relative measures ride the root's own measure; absolute units
 * pass through untouched — the canvas needs a number, the prop may
 * speak in CSS. */
function toPx(size: string): number {
  const root = Number.parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
  const value = Number.parseFloat(size) || 0;
  if (size.includes("em")) return value * root;
  return value;
}

export interface WatermarkProps {
  content: string;
  opacity?: number;
  rotate?: number;
  fontSize?: string;
}

/**
 * The paper bears its seal beneath the content: a canvas draws the
 * text once into a tile (rotated, faint, crisp at the screen's pixel
 * density) and the marks layer repeats it over the default slot. The
 * seal redraws itself when a prop turns — and it never takes a
 * pointer.
 */
export const Watermark = defineComponent({
  name: "Watermark",
  props: {
    content: { type: String, required: true },
    opacity: { type: Number, default: 0.06 },
    rotate: { type: Number, default: -20 },
    fontSize: { type: String, default: "0.875rem" },
  },
  setup(props, ctx: SetupContext) {
    const root = ref<HTMLElement | null>(null);
    const tile = ref("");

    // Draw after mount and after every prop turn (post flush — never
    // during a server render, where there is no canvas). Canvas pixels
    // need concrete numbers, so the ink, the weight and the family are
    // sampled from the theme's computed styles: the tokens stay the
    // only source; the canvas merely reads them.
    watchEffect(
      () => {
        const host = root.value;
        if (!host) return;

        const canvas = document.createElement("canvas");
        const paint = canvas.getContext("2d");
        if (!paint) return;

        const styles = getComputedStyle(host);
        const fontSizePx = toPx(props.fontSize);
        const font = `${styles.fontWeight} ${fontSizePx}px ${styles.fontFamily}`;
        paint.font = font;
        const textWidth = paint.measureText(props.content).width;

        // The tile is the text's rotated bounding box plus a margin of
        // one em, so the repeat never clips a corner of the mark.
        const margin = fontSizePx;
        const boxWidth = Math.ceil(textWidth + margin * 2);
        const boxHeight = Math.ceil(fontSizePx + margin * 2);
        const radian = (props.rotate * Math.PI) / 180;
        const cos = Math.cos(radian);
        const sin = Math.sin(radian);
        const width = Math.ceil(Math.abs(boxWidth * cos) + Math.abs(boxHeight * sin));
        const height = Math.ceil(Math.abs(boxWidth * sin) + Math.abs(boxHeight * cos));

        // Canvas pixels are device pixels: size the tile at the display's
        // density and draw through the same scale, so the seal stays
        // crisp on a hidpi screen.
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        paint.scale(dpr, dpr);
        paint.translate(width / 2, height / 2);
        paint.rotate(radian);
        paint.globalAlpha = props.opacity;
        paint.font = font;
        paint.textAlign = "center";
        paint.textBaseline = "middle";
        paint.fillStyle =
          styles.getPropertyValue("--bs-color-text-tertiary").trim() || styles.color;
        paint.fillText(props.content, 0, 0);

        tile.value = `url(${canvas.toDataURL()})`;
      },
      { flush: "post" },
    );

    return () =>
      h("div", { ...ctx.attrs, ref: root, "data-scope": "watermark", "data-part": "root" }, [
        h("div", { "data-scope": "watermark", "data-part": "content" }, ctx.slots.default),
        h("div", {
          "data-scope": "watermark",
          "data-part": "marks",
          "aria-hidden": "true",
          style: { backgroundImage: tile.value },
        }),
      ]);
  },
});

injectComponentStyle("watermark");
