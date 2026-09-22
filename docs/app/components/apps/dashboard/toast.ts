import { createToaster } from "@bysages/vue";

/** One toaster per example app — the components import this instance,
 * the page renders the single <Toaster> host. */
export const toaster = createToaster({ placement: "bottom-end", max: 3 });
