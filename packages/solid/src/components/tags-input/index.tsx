import { TagsInput as ArkTagsInput } from "@ark-ui/solid/tags-input";
import type { TagsInputRootProps as ArkTagsInputRootProps } from "@ark-ui/solid/tags-input";
import { injectComponentStyle } from "@bysages/core/styling";
import { For, Show, splitProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
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

function closeIcon() {
  return iconNode("x");
}

export interface TagsInputFacadeProps {
  value?: string[];
  defaultValue?: string[];
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  /** Show the clear-all control when values exist. */
  clearable?: boolean;
  /** One rung of the control-height ladder for the vessel at rest. */
  size?: "sm" | "md" | "lg";
  onValueChange?: (value: string[]) => void;
}

/** The one-tag path: one labelled vessel whose values become editable
 * chips. Delimiters, limits, and custom validation stay on the anatomy. */
function TagsInputFacade(props: TagsInputFacadeProps) {
  injectComponentStyle("tags-input");

  return (
    <TagsInputRoot
      size={props.size ?? "md"}
      disabled={props.disabled}
      invalid={props.invalid}
      required={props.required}
      defaultValue={props.defaultValue}
      {...(props.value === undefined ? {} : { value: props.value })}
      onValueChange={(event: { value: string[] }) => props.onValueChange?.(event.value)}
    >
      <Show when={props.label}>
        <ArkTagsInput.Label>{props.label}</ArkTagsInput.Label>
      </Show>
      <ArkTagsInput.Control>
        <ArkTagsInput.Context>
          {(tagsInput) => (
            <For each={tagsInput().value}>
              {(tag, index) => (
                <ArkTagsInput.Item index={index()} value={tag}>
                  <ArkTagsInput.ItemPreview>
                    <ArkTagsInput.ItemText>{tag}</ArkTagsInput.ItemText>
                    <ArkTagsInput.ItemDeleteTrigger>{closeIcon()}</ArkTagsInput.ItemDeleteTrigger>
                  </ArkTagsInput.ItemPreview>
                  <ArkTagsInput.ItemInput />
                </ArkTagsInput.Item>
              )}
            </For>
          )}
        </ArkTagsInput.Context>
        <ArkTagsInput.Input placeholder={props.placeholder} />
        <Show when={props.clearable !== false}>
          <ArkTagsInput.ClearTrigger>{closeIcon()}</ArkTagsInput.ClearTrigger>
        </Show>
      </ArkTagsInput.Control>
      <ArkTagsInput.HiddenInput />
    </TagsInputRoot>
  );
}

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const TagsInput: typeof TagsInputFacade &
  Omit<typeof ArkTagsInput, "Root"> & { Root: typeof TagsInputRoot } = defineFamily(
  TagsInputFacade,
  {
    ...ArkTagsInput,
    Root: TagsInputRoot,
  },
);

injectComponentStyle("tags-input");
