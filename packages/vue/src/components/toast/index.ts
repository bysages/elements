import { Toaster as ArkToaster, Toast as ArkToast, createToaster } from "@ark-ui/vue/toast";
import { injectComponentStyle } from "@bysages/core";
import type { DefineComponent } from "vue";

export type { CreateToasterReturn } from "@ark-ui/vue/toast";
export { createToaster };

/** Ark's Toast, dressed in the paper-and-ink system: each notice rides the
 * popup vessel while a pigment accents the title by type, and the machine's
 * translate variables carry the slide. The API is Ark's own — Toaster,
 * Root, Title, Description, ActionTrigger, CloseTrigger, plus
 * createToaster. */
export const Toast = ArkToast;
// The inferred type reaches into @zag-js/toast through a pnpm-internal
// path, which is not portable in a declaration file — name it explicitly
// (the loose generics accept Ark's inferred component shape).
export const Toaster: DefineComponent<any, any, any> = ArkToaster;

injectComponentStyle("toast");
