import { TagsInput as ArkTagsInput } from "@ark-ui/vue/tags-input";
import { injectComponentStyle } from "@bysages/core";

/** TagsInput, dressed in the paper-and-ink system: one field vessel
 * whose chips rest as quiet ink and lift only a tone when edited. The parts — Root, Label, Control, Input, ClearTrigger, Item,
 * ItemPreview, ItemText, ItemInput, ItemDeleteTrigger, HiddenInput,
 * Context. */
export const TagsInput = ArkTagsInput;

injectComponentStyle("tags-input");
