<script lang="ts">
import { Button } from "../button";

import type { BackTopProps } from "./props";

let { threshold = 400, label = "Back to top", children, ...rest }: BackTopProps = $props();

let visible = $state(false);

$effect(() => {
  if (typeof window === "undefined") return;
  const onScroll = () => (visible = window.scrollY > threshold);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
});
</script>

<!-- A way home: after the page has scrolled past `threshold`, a small
floating control rises at the page's corner and returns the reader to
the top. The scroll itself stays native — `window.scrollTo` defers to
the stylesheet's `scroll-behavior: smooth`, which reduced motion turns
back into an instant jump. The button stays mounted either way so the
entrance is a transition, never a pop. -->
<div data-scope="back-top" data-part="root" data-state={visible ? "shown" : "hidden"}>
  <Button
    {...rest}
    variant="outline"
    square
    size="lg"
    type="button"
    aria-label={label}
    aria-hidden={visible ? undefined : "true"}
    tabindex={visible ? 0 : -1}
    onclick={() => window.scrollTo({ top: 0 })}
  >
    {#if children}
      {@render children()}
    {:else}
      <!-- The single glyph a way-home control needs: one stroke
      pointing up. -->
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="m6 14 6-6 6 6" />
      </svg>
    {/if}
  </Button>
</div>
