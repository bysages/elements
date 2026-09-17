import { useFieldContext } from "@ark-ui/react/field";
import { injectComponentStyle } from "@bysages/core";
import type { InputHTMLAttributes } from "react";

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
  onValueChange?: (value: string) => void;
}

export function Input({ value, size = "md", invalid = false, onValueChange, ...rest }: InputProps) {
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
      data-invalid={invalid || field?.invalid ? "" : undefined}
      onChange={(event) => onValueChange?.(event.target.value)}
    />
  );
}

injectComponentStyle("input");
