import { useFieldContext } from "@ark-ui/react/field";
import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes, SelectHTMLAttributes } from "react";

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
      <svg data-scope="select" data-part="native-icon" viewBox="0 0 16 16" aria-hidden="true">
        <path
          d="M4 6l4 4 4-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
