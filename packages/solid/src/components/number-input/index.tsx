import { NumberInput as ArkNumberInput } from "@ark-ui/solid/number-input";
import type { NumberInputRootProps as ArkNumberInputRootProps } from "@ark-ui/solid/number-input";
import { injectComponentStyle } from "@bysages/core/styling";
import { splitProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** Ark's NumberInput, dressed in the paper-and-ink system: the stepper
 * rides inside the field as one seal split by a hairline, numbers set in
 * tabular figures. The API is Ark's own — Root, Label, Control, Input,
 * ValueText, IncrementTrigger, DecrementTrigger, Scrubber. */

type NumberInputOwnProps = {
  /** One rung of the control-height ladder for the field and its stepper. */
  size?: "sm" | "md" | "lg";
};

function NumberInputRoot(props: ArkNumberInputRootProps & NumberInputOwnProps) {
  const [own, rest] = splitProps(props, ["size"]);
  const id = useElementId("number-input", () => rest.id);
  return <ArkNumberInput.Root {...rest} id={id()} data-size={own.size ?? "md"} />;
}

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const NumberInput: typeof NumberInputRoot &
  Omit<typeof ArkNumberInput, "Root"> & { Root: typeof NumberInputRoot } = defineFamily(
  NumberInputRoot,
  {
    ...ArkNumberInput,
    Root: NumberInputRoot,
  },
);

injectComponentStyle("number-input");
