import { NumberInput as ArkNumberInput } from "@ark-ui/react/number-input";
import { injectComponentStyle } from "@bysages/core";
import type { ComponentProps } from "react";

type NumberInputRootProps = ComponentProps<typeof ArkNumberInput.Root> & {
  /** One rung of the control-height ladder for the field and its stepper. */
  size?: "sm" | "md" | "lg";
};

function NumberInputRoot({ size = "md", ...rest }: NumberInputRootProps) {
  return <ArkNumberInput.Root {...rest} data-size={size} />;
}

/** Ark's NumberInput, dressed in the paper-and-ink system: the stepper
 * rides inside the field as one seal split by a hairline, numbers set in
 * tabular figures. The API is Ark's own — Root, Label, Control, Input,
 * ValueText, IncrementTrigger, DecrementTrigger, Scrubber. */
/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const NumberInput: Omit<typeof ArkNumberInput, "Root"> & { Root: typeof NumberInputRoot } = {
  ...ArkNumberInput,
  Root: NumberInputRoot,
};

injectComponentStyle("number-input");
