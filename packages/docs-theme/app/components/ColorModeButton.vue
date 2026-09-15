<script setup lang="ts">
import { getTheme, applyTheme } from "@bysages/core";
import { Button } from "@bysages/vue";

// The header and the footer each render a toggle; a per-instance ref
// would let them drift apart, so the mode lives in shared app state.
const mode = useState<"light" | "dark" | "system">("color-mode", () => getTheme().mode);

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { ready: Promise<void> };
};

/** Light as shadow: the next theme spreads out of the button as a circular
 * reveal (view transitions) instead of a flat crossfade. Falls back to an
 * instant swap where the API is missing or motion is reduced. */
function toggle(event: MouseEvent) {
  const apply = () => {
    const resolved = mode.value === "system" ? getTheme().mode : mode.value;
    const next = resolved === "dark" ? "light" : "dark";
    mode.value = applyTheme({ mode: next }).mode;
  };

  const doc = document as ViewTransitionDocument;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!doc.startViewTransition || reduced) {
    apply();
    return;
  }

  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
  // Keyboard activation reports (0, 0); anchor the circle on the button.
  const x = event.clientX || rect.left + rect.width / 2;
  const y = event.clientY || rect.top + rect.height / 2;

  const transition = doc.startViewTransition(apply);
  transition.ready.then(() => {
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      { duration: 450, easing: "ease-in-out", pseudoElement: "::view-transition-new(root)" },
    );
  });
}

onMounted(() => {
  // "system" tracks the OS; keep the toggle's resting state honest.
  if (getTheme().mode === "system") {
    matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
      if (mode.value === "system") mode.value = "system";
    });
  }
});
</script>

<template>
  <Button
    variant="ghost"
    size="sm"
    square
    :aria-label="`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`"
    :title="`Mode: ${mode}`"
    @click="toggle"
  >
    <Icon :name="mode === 'dark' ? 'i-lucide-moon' : 'i-lucide-sun'" class="bs-docs-rail-icon" />
  </Button>
</template>
