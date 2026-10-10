import { TagsInput as ArkTagsInput } from "@ark-ui/solid/tags-input";
import type { TagsInputRootProps as ArkTagsInputRootProps } from "@ark-ui/solid/tags-input";
import { injectComponentStyle } from "@bysages/core/styling";
import { splitProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** Ark's TagsInput, dressed in the paper-and-ink system: one field vessel
 * whose chips rest as quiet ink and lift only a tone when edited. The API
 * is Ark's own — Root, Label, Control, Input, ClearTrigger, Item,
 * ItemPreview, ItemText, ItemInput, ItemDeleteTrigger, HiddenInput,
 * Context. */

type TagsInputOwnProps = {
  /** One rung of the control-height ladder for the vessel at rest. */
  size?: "sm" | "md" | "lg";
};

function TagsInputRoot(props: ArkTagsInputRootProps & TagsInputOwnProps) {
  const [own, rest] = splitProps(props, ["size"]);
  const id = useElementId("tags-input", () => rest.id);
  return <ArkTagsInput.Root {...rest} id={id()} data-size={own.size ?? "md"} />;
}

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const TagsInput: typeof TagsInputRoot &
  Omit<typeof ArkTagsInput, "Root"> & { Root: typeof TagsInputRoot } = defineFamily(TagsInputRoot, {
  ...ArkTagsInput,
  Root: TagsInputRoot,
});

injectComponentStyle("tags-input");
