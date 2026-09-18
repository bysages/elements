import { injectComponentStyle } from "@bysages/core";

import MenubarComponent from "./Menubar.svelte";

/** A desktop-style menu bar: a row of quiet ghost triggers, each
 * opening the same paper vessel as the menu family. The triggers are
 * our own buttons grafted onto the menu machine's trigger via
 * `asChild` — the machine keeps the trigger element (positioning,
 * focus restore, `data-state`) while the element wears the menubar
 * scope. The popups keep the menu parts untouched, so the menu
 * stylesheet dresses them. */
export const Menubar = MenubarComponent;

export type { MenubarEntry, MenubarGroup, MenubarProps } from "./props";

injectComponentStyle("menubar");
// The popups keep the menu parts, so the menu stylesheet dresses them.
injectComponentStyle("menu");
