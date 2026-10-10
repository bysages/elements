import { TagsInput as ArkTagsInput } from "@ark-ui/react/tags-input";
import { injectComponentStyle } from "@bysages/core/styling";
import type { ComponentProps, ReactNode } from "react";

import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

type TagsInputRootProps = ComponentProps<typeof ArkTagsInput.Root> & {
  /** One rung of the control-height ladder for the vessel at rest. */
  size?: "sm" | "md" | "lg";
};

function TagsInputRoot(props: TagsInputRootProps) {
  const id = useElementId("tags-input", props);
  const { size = "md", ...rest } = props;

  return <ArkTagsInput.Root {...rest} id={id} data-size={size} />;
}

const closeIcon = iconNode("x", { width: 14, height: 14 });

interface TagsInputFacadeProps {
  value?: string[];
  defaultValue?: string[];
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  /** Show the clear-all control when values exist. */
  clearable?: boolean;
  size?: "sm" | "md" | "lg";
  onValueChange?: (value: string[]) => void;
  children?: ReactNode;
}

/** The one-tag path: one labelled vessel whose values become editable
 * chips. Delimiters, limits, and custom validation stay on the anatomy. */
function TagsInputFacade({
  value,
  defaultValue,
  label,
  placeholder,
  disabled = false,
  invalid = false,
  required = false,
  clearable = true,
  size = "md",
  onValueChange,
}: TagsInputFacadeProps) {
  return (
    <TagsInputRoot
      size={size}
      disabled={disabled}
      invalid={invalid}
      required={required}
      defaultValue={defaultValue}
      {...(value === undefined
        ? {}
        : {
            value,
            onValueChange: (details: { value: string[] }) => onValueChange?.(details.value),
          })}
    >
      {label ? <ArkTagsInput.Label>{label}</ArkTagsInput.Label> : null}
      <ArkTagsInput.Control>
        <ArkTagsInput.Context>
          {(tagsInput: { value: string[] }) =>
            tagsInput.value.map((tag, index) => (
              <ArkTagsInput.Item key={`${tag}-${index}`} index={index} value={tag}>
                <ArkTagsInput.ItemPreview>
                  <ArkTagsInput.ItemText>{tag}</ArkTagsInput.ItemText>
                  <ArkTagsInput.ItemDeleteTrigger>{closeIcon}</ArkTagsInput.ItemDeleteTrigger>
                </ArkTagsInput.ItemPreview>
                <ArkTagsInput.ItemInput />
              </ArkTagsInput.Item>
            ))
          }
        </ArkTagsInput.Context>
        <ArkTagsInput.Input placeholder={placeholder} />
        {clearable ? <ArkTagsInput.ClearTrigger>{closeIcon}</ArkTagsInput.ClearTrigger> : null}
      </ArkTagsInput.Control>
      <ArkTagsInput.HiddenInput />
    </TagsInputRoot>
  );
}

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const TagsInput = Object.assign(TagsInputFacade, {
  ...ArkTagsInput,
  Root: TagsInputRoot,
});

injectComponentStyle("tags-input");
