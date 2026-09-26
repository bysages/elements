import { RadioGroup as ArkRadioGroup } from "@ark-ui/react/radio-group";
import { injectComponentStyle } from "@bysages/core";
import type { ComponentProps } from "react";

type RadioGroupRootProps = ComponentProps<typeof ArkRadioGroup.Root> & {
  /** One rung for the dial; the chosen dot rides it. */
  size?: "sm" | "md" | "lg";
};

function RadioGroupRoot({ size = "md", ...rest }: RadioGroupRootProps) {
  return <ArkRadioGroup.Root {...rest} data-size={size} />;
}

/** Ark's RadioGroup, dressed in the paper-and-ink system: a column of
 * full-circle seals that fill flat with primary ink when chosen, the dot
 * punched through as paper. The API is Ark's own — Root, Label, Item,
 * ItemText, ItemControl, Indicator, ItemHiddenInput. */
/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const RadioGroup: Omit<typeof ArkRadioGroup, "Root"> & { Root: typeof RadioGroupRoot } = {
  ...ArkRadioGroup,
  Root: RadioGroupRoot,
};

injectComponentStyle("radio-group");
