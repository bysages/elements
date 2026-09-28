/** Ark's TagsInput, dressed in the paper-and-ink system: one field vessel
 * whose chips rest as quiet ink and lift only a tone when edited. The API
 * is Ark's own — Root, Label, Control, Input, ClearTrigger, Item,
 * ItemPreview, ItemText, ItemInput, ItemDeleteTrigger, HiddenInput,
 * Context. */
import { TagsInput as ArkTagsInput } from "@ark-ui/svelte/tags-input";

import TagsInputRoot from "./TagsInputRoot.svelte";

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const TagsInput: Omit<typeof ArkTagsInput, "Root"> & { Root: typeof TagsInputRoot } = {
  ...ArkTagsInput,
  Root: TagsInputRoot,
};
