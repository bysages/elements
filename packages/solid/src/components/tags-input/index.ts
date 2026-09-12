import { TagsInput as ArkTagsInput } from "@ark-ui/solid/tags-input";
import { injectComponentStyle } from "@bysages/core";

/** Ark's TagsInput, dressed in the paper-and-ink system: one field vessel
 * whose chips rest as quiet ink and lift only a tone when edited. The API
 * is Ark's own — Root, Label, Control, Input, ClearTrigger, Item,
 * ItemPreview, ItemText, ItemInput, ItemDeleteTrigger, HiddenInput,
 * Context. */
export const TagsInput = ArkTagsInput;

injectComponentStyle("tags-input");
