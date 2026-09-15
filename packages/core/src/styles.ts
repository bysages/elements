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

let injected = false;

/** True when an SSR integration already delivered the whole layer (the
 * Nuxt module ships it as one build-time stylesheet and plants this
 * marker in the head). The marker parses before any module script, so
 * the wrappers' import-time injection stands down at any load order. */
const stylesShipped = () =>
  typeof document !== "undefined" &&
  !!document.querySelector("meta[name='bs-styles-shipped']");

/** Inject the token layer into the document head once — the inheritance
 * root that carries themes, density, and the motion grammar. SSR is a
 * no-op; for SSR pass `tokensCss` to a head tag instead. */
export function injectTokens(): void {
  if (injected || stylesShipped() || typeof document === "undefined") return;

  const style = document.createElement("style");
  style.dataset.bsStyles = "tokens";
  style.textContent = tokensCss;
  document.head.append(style);
  injected = true;
}

const injectedComponents = new Set<string>();

/** Inject one component stylesheet (plus the token layer on first use).
 * Idempotent per component; SSR is a no-op. */
export function injectComponentStyle(key: string): void {
  if (injectedComponents.has(key) || stylesShipped() || typeof document === "undefined") return;

  injectTokens();

  const style = document.createElement("style");
  style.dataset.bsStyles = key;
  style.textContent = componentStyles[key] ?? "";
  document.head.append(style);
  injectedComponents.add(key);
}
