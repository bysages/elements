import { Toaster as ArkToaster, Toast as ArkToast, createToaster } from "@ark-ui/svelte/toast";
import { injectComponentStyle } from "@bysages/core";

export type { CreateToasterReturn } from "@ark-ui/svelte/toast";
export { createToaster };

/** Ark's Toast, dressed in the paper-and-ink system: each notice rides the
 * popup vessel while a pigment accents the title by type, and the machine's
 * translate variables carry the slide. The API is Ark's own — Toaster,
 * Root, Title, Description, ActionTrigger, CloseTrigger, plus
 * createToaster. */
export const Toast = ArkToast;
export const Toaster = ArkToaster;

injectComponentStyle("toast");
