import tokensStyles from "@bysages/tokens/styles";

import { baseCss, inkRippleCss } from "./styles/base";
import { componentStyles } from "./styles/components";

/** Per-component style strings keyed by component name — the single source
 * of truth every framework wrapper injects. Selectors target Ark's anatomy
 * attributes (`data-scope` / `data-part`), which are identical across
 * React, Vue, Solid, and Svelte. */
export { componentStyles };

/** The complete token layer (`@layer bs.tokens`): themes, density, contrast,
 * typography, motion, z-index, plus the document-level base guard and the
 * ink-ripple motion grammar. */
export const tokensCss: string = tokensStyles + baseCss + inkRippleCss;
