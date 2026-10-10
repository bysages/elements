import { useFieldContext } from "@ark-ui/react/field";
import { injectComponentStyle } from "@bysages/core/styling";
import type { HTMLAttributes, SelectHTMLAttributes } from "react";

import { iconNode } from "../../internal/icon";

/** One row of the platform's own list. */
export interface NativeSelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

/** The native select wearing the field recipe: the platform's own list
 * behind the same hairline shell the framed select wears. The shell is
 * a wrapper so the indicator rides beside the value as a real stroke —
 * the same chevron the framed trigger shows. */
export interface NativeSelectProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  value?: string;
  options: NativeSelectOption[];
  /** One rung of the control-height ladder. */
  size?: "sm" | "md" | "lg";
  invalid?: boolean;
  placeholder?: string;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
}

export function NativeSelect({
  value,
  options,
  size = "md",
  invalid = false,
  placeholder,
  disabled = false,
  onValueChange,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  ...rest
}: NativeSelectProps) {
  injectComponentStyle("select");
  const field = useFieldContext();
  const fieldProps = (field?.getInputProps() ?? {}) as SelectHTMLAttributes<HTMLSelectElement>;
  const empty = value == null || value === "";
  const off = disabled || field?.disabled;
  return (
    <span
      {...rest}
      data-scope="select"
      data-part="native-root"
      data-size={size}
      data-invalid={invalid || field?.invalid ? "" : undefined}
      data-disabled={off ? "" : undefined}
      data-placeholder-shown={empty ? "" : undefined}
    >
      <select
        {...fieldProps}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        value={value ?? ""}
        data-scope="select"
        data-part="native"
        disabled={off || undefined}
        onChange={(event) => onValueChange?.(event.target.value)}
      >
        {placeholder ? (
          <option value="" disabled hidden={empty ? undefined : true}>
            {placeholder}
          </option>
        ) : null}
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
      {iconNode("chevron-down", {
        "data-scope": "select",
        "data-part": "native-icon",
      })}
    </span>
  );
}
