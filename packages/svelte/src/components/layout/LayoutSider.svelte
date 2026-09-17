<script lang="ts">
import { useLayout } from "./context";
import type { LayoutSiderProps } from "./props";

let {
  collapsed = $bindable(false),
  width = $bindable("16rem"),
  collapsedWidth = "3.5rem",
  resizable = false,
  minWidth = "12rem",
  maxWidth = "24rem",
  children,
  ...rest
}: LayoutSiderProps = $props();

const layout = useLayout();

/** One step of the arrow-key resize, in px. */
const RESIZE_STEP = 16;

let rail: HTMLElement | null = $state(null);
let dragging = $state(false);
let startPointerX = 0;
let startWidth = 0;

const siderStyle = $derived(
  [
    typeof rest.style === "string" ? rest.style : null,
    `--bs-layout-sider-width: ${collapsed ? collapsedWidth : width}`,
    // While folded the clamp collapses onto the folded size — a 3.5rem
    // rail must never be lifted to the 12rem floor.
    `--bs-layout-sider-min: ${collapsed ? collapsedWidth : minWidth}`,
    `--bs-layout-sider-max: ${collapsed ? collapsedWidth : maxWidth}`,
  ]
    .filter(Boolean)
    .join("; "),
);

// Pulling toward the flow widens the rail; the side decides which way
// that is.
const towardFlow = $derived((layout?.siderPlacement() ?? "start") === "end" ? -1 : 1);

function onPointerDown(event: PointerEvent) {
  dragging = true;
  startPointerX = event.clientX;
  startWidth = rail ? rail.getBoundingClientRect().width : 0;
  (event.currentTarget as Element).setPointerCapture(event.pointerId);
}

function onPointerMove(event: PointerEvent) {
  if (!dragging) return;
  const next = Math.round(startWidth + towardFlow * (event.clientX - startPointerX));
  width = `${next}px`;
}

function onPointerUp(event: PointerEvent) {
  dragging = false;
  (event.currentTarget as Element).releasePointerCapture(event.pointerId);
}

function onKeyDown(event: KeyboardEvent) {
  if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
  event.preventDefault();
  const widen =
    (layout?.siderPlacement() ?? "start") === "end"
      ? event.key === "ArrowLeft"
      : event.key === "ArrowRight";
  const current = rail ? rail.getBoundingClientRect().width : 0;
  const next = Math.round(current + (widen ? RESIZE_STEP : -RESIZE_STEP));
  width = `${next}px`;
}
</script>

<aside
  {...rest}
  bind:this={rail}
  style={siderStyle}
  data-scope="layout"
  data-part="sider"
  data-collapsed={collapsed ? "" : undefined}
  data-dragging={dragging ? "" : undefined}
  data-resizable={resizable ? "" : undefined}
>
  <!-- The snippet receives the fold state, so a rail can swap its
  labels for icons instead of being clipped mid-word by the narrowing
  edge. -->
  {@render children?.({ collapsed })}
  {#if resizable && !collapsed}
    <div
      data-scope="layout"
      data-part="sider-resize"
      data-dragging={dragging ? "" : undefined}
      role="separator"
      aria-orientation="vertical"
      tabindex={0}
      aria-label="Resize sidebar"
      aria-valuenow={rail ? Math.round(rail.getBoundingClientRect().width) : 0}
      onpointerdown={onPointerDown}
      onpointermove={onPointerMove}
      onpointerup={onPointerUp}
      onkeydown={onKeyDown}
    ></div>
  {/if}
</aside>
