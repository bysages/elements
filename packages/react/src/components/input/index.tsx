import { useFieldContext } from "@ark-ui/react/field";
import { injectComponentStyle } from "@bysages/core";
import { forwardRef, type InputHTMLAttributes } from "react";

import { applyMask } from "./mask";

/** The bare text input: the field recipe — border, surface, focus halo —
 * on a native control. Standing alone it styles itself from the `invalid`
 * prop; inside a `Field.Root` it consumes the field context, picking up
 * the label id, the described-by wiring and the invalid state for free,
 * which is also the seam the Form validation layer will drive. Disabled
 * rides the native attribute. */
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  value?: string | number;
  size?: "sm" | "md" | "lg";
  invalid?: boolean;
  /** Entry mask - `9` digit, `a` letter, `*` either, anything else is
   * literal. e.g. `"999-99-9999"`, `"(999) 999-9999"`. */
  mask?: string;
  onValueChange?: (value: string) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { value, size = "md", invalid = false, mask, onValueChange, ...rest }: InputProps,
  ref,
) {
  injectComponentStyle("input");
  const field = useFieldContext();
  const fieldProps = field?.getInputProps() ?? {};
  return (
    <input
      {...fieldProps}
      {...rest}
      {...(value !== undefined ? { value } : {})}
      data-scope="input"
      data-part="root"
      data-size={size}
      ref={ref}
      data-invalid={invalid || field?.invalid ? "" : undefined}
      onChange={(event) =>
        onValueChange?.(mask ? applyMask(event.target.value, mask) : event.target.value)
      }
    />
  );
});
