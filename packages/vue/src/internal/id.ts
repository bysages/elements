import { computed, useId, type SetupContext } from "vue";

/** Generates an SSR-stable machine base id while honoring an explicit id. */
export function useElementId(scope: string, attrs: SetupContext["attrs"]) {
  const generated = useId();

  return computed(() => {
    const explicit = attrs.id;
    return typeof explicit === "string" && explicit ? explicit : `bs-${scope}-${generated}`;
  });
}
