import { RadioGroup as ArkRadioGroup } from "@ark-ui/solid/radio-group";
import type { RadioGroupRootProps as ArkRadioGroupRootProps } from "@ark-ui/solid/radio-group";
import { injectComponentStyle } from "@bysages/core/styling";
import { For, Show, splitProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** Ark's RadioGroup, dressed in the paper-and-ink system: a column of
 * full-circle seals that fill flat with primary ink when chosen, the dot
 * punched through as paper. The API is Ark's own — Root, Label, Item,
 * ItemText, ItemControl, Indicator, ItemHiddenInput. */

type RadioGroupOwnProps = {
  /** One rung for the dial; the chosen dot rides it. */
  size?: "sm" | "md" | "lg";
};

function RadioGroupRoot(props: ArkRadioGroupRootProps & RadioGroupOwnProps) {
  const [own, rest] = splitProps(props, ["size"]);
  const id = useElementId("radio-group", () => rest.id);
  return <ArkRadioGroup.Root {...rest} id={id()} data-size={own.size ?? "md"} />;
}

export type RadioGroupItem = {
  value: string;
  label: string;
  disabled?: boolean;
};

/** The complete radio group behind one choice and its named rows. */
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
  onValueChange?: (value: string) => void;
}

function RadioGroupFacade(props: RadioGroupFacadeProps) {
  injectComponentStyle("radio-group");

  return (
    <RadioGroupRoot
      size={props.size ?? "md"}
      disabled={props.disabled}
      invalid={props.invalid}
      readOnly={props.readOnly}
      required={props.required}
      orientation={props.orientation ?? "vertical"}
      defaultValue={props.defaultValue}
      {...(props.value === undefined ? {} : { value: props.value })}
      onValueChange={(details: { value: string | null }) =>
        props.onValueChange?.(details.value ?? "")
      }
    >
      <Show when={props.label}>
        <ArkRadioGroup.Label>{props.label}</ArkRadioGroup.Label>
      </Show>
      <For each={props.items}>
        {(item) => (
          <ArkRadioGroup.Item value={item.value} disabled={item.disabled}>
            <ArkRadioGroup.ItemControl />
            <ArkRadioGroup.ItemText>{item.label}</ArkRadioGroup.ItemText>
            <ArkRadioGroup.ItemHiddenInput />
          </ArkRadioGroup.Item>
        )}
      </For>
    </RadioGroupRoot>
  );
}

type RadioGroupParts = Omit<typeof ArkRadioGroup, "Root"> & {
  Root: typeof RadioGroupRoot;
};

/* Ark's namespace is frozen — spread copies the members so the facade
 * coexists with the anatomy while Root stays the sized wrapper. */
export const RadioGroup: typeof RadioGroupFacade & RadioGroupParts = defineFamily(
  RadioGroupFacade,
  {
    ...ArkRadioGroup,
    Root: RadioGroupRoot,
  },
);

injectComponentStyle("radio-group");
