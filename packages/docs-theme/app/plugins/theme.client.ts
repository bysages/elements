import { attachDynamicLight, attachInkRipple, initTheme } from "@bysages/core";
import { defineNuxtPlugin } from "nuxt/app";

/** The client half of the theme engine: restore the persisted theme, let
 * the pointer carry the light, and let presses ripple the ink. */
export default defineNuxtPlugin(() => {
  initTheme();
  attachDynamicLight();
  attachInkRipple();
});
