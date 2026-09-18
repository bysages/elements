import { attachDynamicLight, attachInkRipple, attachSketchWobble, initTheme } from "@bysages/vue";
import { defineNuxtPlugin } from "nuxt/app";

/** The client half of the theme engine: restore the persisted theme, let
 * the pointer carry the light, let presses ripple the ink, and mount the
 * sketch scene's wobble filters. */
export default defineNuxtPlugin(() => {
  initTheme();
  attachDynamicLight();
  attachInkRipple();
  attachSketchWobble();
});
