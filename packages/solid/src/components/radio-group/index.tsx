import { RadioGroup as ArkRadioGroup } from "@ark-ui/solid/radio-group";
import type { RadioGroupRootProps as ArkRadioGroupRootProps } from "@ark-ui/solid/radio-group";
import { injectComponentStyle } from "@bysages/core/styling";
import { splitProps } from "solid-js";

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

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const RadioGroup: typeof RadioGroupRoot &
  Omit<typeof ArkRadioGroup, "Root"> & { Root: typeof RadioGroupRoot } = defineFamily(
  RadioGroupRoot,
  {
    ...ArkRadioGroup,
    Root: RadioGroupRoot,
  },
);

injectComponentStyle("radio-group");
