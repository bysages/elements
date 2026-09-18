import { injectComponentStyle } from "@bysages/core";

import IconComponent from "./Icon.svelte";

/** The inkwell: a standard box that keeps any inline svg at its optical
 * measure and in the text's own ink — the icon carries no pigment and
 * no size of its own. Bring the glyph; it ships no set. */
export const Icon = IconComponent;

export type { IconProps } from "./props";

injectComponentStyle("icon");
