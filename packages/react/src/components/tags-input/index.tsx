import { TagsInput as ArkTagsInput } from "@ark-ui/react/tags-input";
import { injectComponentStyle } from "@bysages/core";
import type { ComponentProps } from "react";

type TagsInputRootProps = ComponentProps<typeof ArkTagsInput.Root> & {
  /** One rung of the control-height ladder for the vessel at rest. */
  size?: "sm" | "md" | "lg";
};

function TagsInputRoot({ size = "md", ...rest }: TagsInputRootProps) {
  return <ArkTagsInput.Root {...rest} data-size={size} />;
}

/** Ark's TagsInput, dressed in the paper-and-ink system: one field vessel
 * whose chips rest as quiet ink and lift only a tone when edited. The API
 * is Ark's own — Root, Label, Control, Input, ClearTrigger, Item,
 * ItemPreview, ItemText, ItemInput, ItemDeleteTrigger, HiddenInput,
 * Context. */
/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const TagsInput: Omit<typeof ArkTagsInput, "Root"> & { Root: typeof TagsInputRoot } = {
  ...ArkTagsInput,
  Root: TagsInputRoot,
};

injectComponentStyle("tags-input");
