/** Render children on the client only, after hydration — the escape
 * hatch for browser-only widgets inside server-rendered pages. Headless,
 * like the rest of Ark's utilities: no visual layer of our own. */
import { ClientOnly as ArkClientOnly } from "@ark-ui/svelte/client-only";

import { withSelfRoot } from "../../internal/family";

export const ClientOnly = withSelfRoot(ArkClientOnly);

export type { ClientOnlyProps } from "@ark-ui/svelte/client-only";
