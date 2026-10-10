<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
import type { HTMLAttributes } from "svelte/elements";

injectComponentStyle("spotlight");

type Props = HTMLAttributes<HTMLDivElement> & {
  /** How far the lamp throws before the ink swallows it. */
  radius?: string;
};

let { radius, children, ...rest }: Props = $props();

function track(event: PointerEvent) {
  const host = event.currentTarget as HTMLElement;
  const rect = host.getBoundingClientRect();
  host.style.setProperty("--bs-spot-x", `${event.clientX - rect.left}px`);
  host.style.setProperty("--bs-spot-y", `${event.clientY - rect.top}px`);
}
</script>

<!-- The ink-light card: the wrapper only measures and writes the
     geometry; the lamp itself is the two layers the stylesheet paints. -->
<div
  {...rest}
  style:--bs-spot-radius={radius}
  data-scope="spotlight"
  data-part="root"
  onpointermove={track}
  onpointerenter={(event) => {
    track(event);
    (event.currentTarget as HTMLElement).setAttribute("data-hovered", "");
  }}
  onpointerleave={(event) => (event.currentTarget as HTMLElement).removeAttribute("data-hovered")}
>
  {@render children?.()}
</div>

