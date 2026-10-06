import { RadioGroup as ArkRadioGroup } from "@ark-ui/react/radio-group";
import { injectComponentStyle } from "@bysages/core";
import type { ComponentProps } from "react";

import { useElementId } from "../../internal/id";

type RadioGroupRootProps = ComponentProps<typeof ArkRadioGroup.Root> & {
  /** One rung for the dial; the chosen dot rides it. */
  size?: "sm" | "md" | "lg";
};

function RadioGroupRoot(props: RadioGroupRootProps) {
  const id = useElementId("radio-group", props);
  const { size = "md", ...rest } = props;

  return <ArkRadioGroup.Root {...rest} id={id} data-size={size} />;
}

export type RadioGroupItem = {
  value: string;
  label: string;
  disabled?: boolean;
};

export interface RadioGroupFacadeProps {
  value?: string;
  defaultValue?: string;
  items: RadioGroupItem[];
  label?: string;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  readOnly?: boolean;
  orientation?: "horizontal" | "vertical";
  /** One rung for the dial; the chosen dot rides it. */
  size?: "sm" | "md" | "lg";
  className?: string;
  onValueChange?: (value: string) => void;
}

function RadioGroupFacade({
  value,
  defaultValue,
  items,
  label,
  disabled = false,
  invalid = false,
  required = false,
  readOnly = false,
  orientation = "vertical",
  size = "md",
  className,
  onValueChange,
}: RadioGroupFacadeProps) {
  return (
    <RadioGroupRoot
      className={className}
      size={size}
      disabled={disabled}
      invalid={invalid}
      readOnly={readOnly}
      required={required}
      orientation={orientation}
      defaultValue={defaultValue}
      {...(value === undefined ? {} : { value })}
      onValueChange={(details: { value: string | null }) => onValueChange?.(details.value ?? "")}
    >
      {label ? <ArkRadioGroup.Label>{label}</ArkRadioGroup.Label> : null}
      {items.map((item) => (
        <ArkRadioGroup.Item key={item.value} value={item.value} disabled={item.disabled}>
          <ArkRadioGroup.ItemControl />
          <ArkRadioGroup.ItemText>{item.label}</ArkRadioGroup.ItemText>
          <ArkRadioGroup.ItemHiddenInput />
        </ArkRadioGroup.Item>
      ))}
    </RadioGroupRoot>
  );
}

RadioGroupFacade.displayName = "SRadioGroup";

/** Ark's RadioGroup, dressed in the paper-and-ink system: a column of
 * full-circle seals that fill flat with primary ink when chosen, the dot
 * punched through as paper. The API is Ark's own — Root, Label, Item,
 * ItemText, ItemControl, Indicator, ItemHiddenInput. */
type RadioGroupParts = Omit<typeof ArkRadioGroup, "Root"> & {
  Root: typeof RadioGroupRoot;
};

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const RadioGroup = Object.assign(RadioGroupFacade, {
  ...ArkRadioGroup,
  Root: RadioGroupRoot,
}) as typeof RadioGroupFacade & RadioGroupParts;

injectComponentStyle("radio-group");
