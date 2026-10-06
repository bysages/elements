import { useId } from "react";

/** Zag composes owned-part ids with separators, so React's generated id
 * is narrowed to characters that survive both markup and selectors. */
const UNSAFE_ID_CHARACTERS = /[^a-zA-Z0-9_-]/g;

/** Generates an SSR-stable machine base id while honoring an explicit id. */
export function useElementId(scope: string, props: { id?: string | undefined } = {}): string {
  const generated = useId();
  const explicit = props.id;

  return typeof explicit === "string" && explicit
    ? explicit
    : `bs-${scope}-${generated.replace(UNSAFE_ID_CHARACTERS, "-")}`;
}
