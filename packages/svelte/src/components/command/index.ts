import { injectComponentStyle } from "@bysages/core";

import CommandComponent from "./Command.svelte";

/** The command palette: a modal sheet at the top of the page carrying a
 * search field over the caller's commands, grouped as a ledger with a
 * keycap hint at each row. The shell is the dialog machinery — scrim,
 * focus trap, Escape — and the searching is the combobox machinery
 * driving our own list: the vessel and the list live inside the sheet,
 * so the combobox renders no separate popup and the machine's content
 * grafts onto the sheet's list. */
export const Command = CommandComponent;

export type { CommandEntry, CommandProps } from "./props";

injectComponentStyle("command");
// The scrim is the dialog machinery's backdrop — borrow its stylesheet.
injectComponentStyle("dialog");
