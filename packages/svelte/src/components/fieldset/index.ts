import { Fieldset as ArkFieldset } from "@ark-ui/svelte/fieldset";

import { defineFamily } from "../../internal/family";
import FieldsetFacade from "./Fieldset.svelte";
import FieldsetRoot from "./FieldsetRoot.svelte";

/** Ark's Fieldset, dressed in the paper-and-ink system: a song-serif
 * legend heading a column of fields. The API is Ark's own — Root, Legend,
 * HelperText, ErrorText. */
export const Fieldset: typeof FieldsetFacade &
  Omit<typeof ArkFieldset, "Root"> & {
    Root: typeof FieldsetRoot;
  } = defineFamily(FieldsetFacade, {
  ...ArkFieldset,
  Root: FieldsetRoot,
});
