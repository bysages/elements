import { Fieldset as ArkFieldset } from "@ark-ui/svelte/fieldset";
import { injectComponentStyle } from "@bysages/core";

/** Ark's Fieldset, dressed in the paper-and-ink system: a song-serif
 * legend heading a column of fields. The API is Ark's own — Root, Legend,
 * HelperText, ErrorText. */
export const Fieldset = ArkFieldset;

injectComponentStyle("fieldset");
