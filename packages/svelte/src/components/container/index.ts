import { injectComponentStyle } from "@bysages/core";

import ContainerComponent from "./Container.svelte";

/** The reading frame: content held to a measure and centered on the
 * page. The sizes name typographic measures, not breakpoints — the page
 * owns its edges, the container only owns how long a line of ink runs. */
export const Container = ContainerComponent;

export type { ContainerProps } from "./props";

injectComponentStyle("container");
