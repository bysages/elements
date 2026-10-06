import { ClientOnly as ArkClientOnly, type ClientOnlyProps } from "@ark-ui/vue/client-only";

import { withSelfRoot } from "../../internal/family";

/** Render children on the client only, after hydration — the escape
 * hatch for browser-only widgets inside server-rendered pages. Headless:
 * it adds structure, not visuals. */
export const ClientOnly = withSelfRoot(ArkClientOnly);
export type { ClientOnlyProps };
