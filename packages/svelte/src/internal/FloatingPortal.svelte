<script lang="ts">
  import { getAllContexts, mount, tick, unmount, type Snippet } from "svelte";

  import type { FloatingPortalTarget } from "./floating";

  let { portal = false, children }: {
    /** `true` targets body; a string targets a CSS selector. Omit or pass
     * `false` to keep the vessel inline through SSR and first hydration. */
    portal?: FloatingPortalTarget;
    children: Snippet;
  } = $props();

  const context = getAllContexts();
  let portalled = $state(false);

  function resolvePortal(value: FloatingPortalTarget) {
    if (!value || typeof document === "undefined") return null;
    if (value === true) return document.body;
    return document.querySelector<HTMLElement>(value);
  }

  /* The snippet renders in place first so SSR and hydration agree. Once
   * the client owns the DOM, the same snippet is mounted in the resolved
   * target; Ark machine context travels with it. */
  $effect(() => {
    const target = resolvePortal(portal);
    if (!target) {
      portalled = false;
      return;
    }

    let cancelled = false;
    let instance: ReturnType<typeof mount> | null = null;
    portalled = true;

    void tick().then(() => {
      if (!cancelled) instance = mount(children, { target, context });
    });

    return () => {
      cancelled = true;
      if (instance) {
        void unmount(instance);
        instance = null;
      }
    };
  });
</script>

{#if !portalled}
  {@render children()}
{/if}
