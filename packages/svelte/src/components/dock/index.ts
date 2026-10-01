import DockComponent from "./Dock.svelte";
import DockItemComponent from "./DockItem.svelte";

/** The magnifying dock: a floating rail whose icons swell toward the
 * hand — Dock, Dock.Item. */
export const Dock = Object.assign(DockComponent, { Item: DockItemComponent });

export type { DockProps } from "./props";
