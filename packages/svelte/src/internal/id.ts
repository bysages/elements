/** Generates an SSR-stable machine base id while honoring an explicit id. */
export function useElementId(scope: string, generatedId: string, explicitId: unknown) {
  return typeof explicitId === "string" && explicitId ? explicitId : `bs-${scope}-${generatedId}`;
}
