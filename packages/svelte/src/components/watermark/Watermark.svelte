<script lang="ts">
import type { WatermarkProps } from "./props";

let { content, opacity = 0.06, rotate = -20, fontSize = "0.875rem", children, ...rest }: WatermarkProps = $props();

let host = $state<HTMLElement | null>(null);
let tile = $state("");

/** Font-relative measures ride the root's own measure; absolute units
 * pass through untouched — the canvas needs a number, the prop may
 * speak in CSS. */
function toPx(size: string): number {
  const root = Number.parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
  const value = Number.parseFloat(size) || 0;
  if (size.includes("em")) return value * root;
  return value;
}

// Draw after mount and after every prop turn — never during a server
// render, where there is no canvas. Canvas pixels need concrete
// numbers, so the ink, the weight and the family are sampled from the
// theme's computed styles: the tokens stay the only source; the canvas
// merely reads them.
$effect(() => {
  const node = host;
  if (!node) return;

  const canvas = document.createElement("canvas");
  const paint = canvas.getContext("2d");
  if (!paint) return;

  const styles = getComputedStyle(node);
  const fontSizePx = toPx(fontSize);
  const font = `${styles.fontWeight} ${fontSizePx}px ${styles.fontFamily}`;
  paint.font = font;
  const textWidth = paint.measureText(content).width;

  // The tile is the text's rotated bounding box plus a margin of
  // one em, so the repeat never clips a corner of the mark.
  const margin = fontSizePx;
  const boxWidth = Math.ceil(textWidth + margin * 2);
  const boxHeight = Math.ceil(fontSizePx + margin * 2);
  const radian = (rotate * Math.PI) / 180;
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
  paint.globalAlpha = opacity;
  paint.font = font;
  paint.textAlign = "center";
  paint.textBaseline = "middle";
  paint.fillStyle = styles.getPropertyValue("--bs-color-text-tertiary").trim() || styles.color;
  paint.fillText(content, 0, 0);

  tile = `url(${canvas.toDataURL()})`;
});
</script>

<!-- The paper bears its seal beneath the content: a canvas draws the
text once into a tile (rotated, faint, crisp at the screen's pixel
density) and the marks layer repeats it over the children. The seal
redraws itself when a prop turns — and it never takes a pointer. -->
<div {...rest} bind:this={host} data-scope="watermark" data-part="root">
  <div data-scope="watermark" data-part="content">
    {@render children?.()}
  </div>
  <div
    data-scope="watermark"
    data-part="marks"
    aria-hidden="true"
    style:background-image={tile}
  ></div>
</div>
