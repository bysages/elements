import { Menu as ArkMenu } from "@ark-ui/svelte/menu";

import { defineFamily } from "../../internal/family";
import MenubarComponent from "./Menubar.svelte";

/** A desktop-style menu bar: a row of quiet ghost triggers, each
 * opening the same paper vessel as the menu family. The triggers are
 * our own buttons grafted onto the menu machine's trigger via
 * `asChild` — the machine keeps the trigger element (positioning,
 * focus restore, `data-state`) while the element wears the menubar
 * scope. The popups keep the menu parts untouched, so the menu
 * stylesheet dresses them. */
export const Menubar: typeof MenubarComponent & typeof ArkMenu = defineFamily(
  MenubarComponent,
  ArkMenu,
);

export type { MenubarEntry, MenubarGroup, MenubarProps } from "./props";
