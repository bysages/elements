<script lang="ts">
import { Button } from "../button";

import type { BackTopProps } from "./props";

let {
  threshold = 400,
  label = "Back to top",
  scrollEl,
  children,
  ...rest
}: BackTopProps = $props();

let visible = $state(false);

$effect(() => {
  if (typeof window === "undefined") return;
  const el = scrollEl?.() ?? null;
  const onScroll = () => (visible = (el ? el.scrollTop : window.scrollY) > threshold);
  onScroll();
  if (el) el.addEventListener("scroll", onScroll, { passive: true });
  else window.addEventListener("scroll", onScroll, { passive: true });
  return () => {
    if (el) el.removeEventListener("scroll", onScroll);
    else window.removeEventListener("scroll", onScroll);
  };
});

// A moored control has no stylesheet contract for smooth scrolling, so
// the return trip asks the media query itself.
const toTop = () => {
  const el = scrollEl?.();
  if (!el) {
    window.scrollTo({ top: 0 });
    return;
  }
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
};
</script>

<!-- A way home: after the page has scrolled past `threshold`, a small
floating control rises at the page's corner and returns the reader to
the top. The scroll itself stays native — `window.scrollTo` defers to
the stylesheet's `scroll-behavior: smooth`, which reduced motion turns
back into an instant jump (a moored control asks the media query
directly, since a scroller of its own has no stylesheet to defer to).
The button stays mounted either way so the entrance is a transition,
never a pop. -->
<div
  data-scope="back-top"
  data-part="root"
  data-state={visible ? "shown" : "hidden"}
  {...(scrollEl ? { "data-container": "" } : {})}
>
  <Button
    {...rest}
    variant="outline"
    square
    size="lg"
    type="button"
    aria-label={label}
    aria-hidden={visible ? undefined : "true"}
    tabindex={visible ? 0 : -1}
    onclick={toTop}
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
