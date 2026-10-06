import { createUniqueId, type Accessor } from "solid-js";

/** Generates an SSR-stable machine base id while honoring an explicit id. */
export function useElementId(scope: string, explicit?: Accessor<unknown>) {
  const generated = createUniqueId();

  return () => {
    const id = explicit?.();
    return typeof id === "string" && id ? id : `bs-${scope}-${generated}`;
  };
}
