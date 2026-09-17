import { useFieldContext } from "@ark-ui/react/field";
import { injectComponentStyle } from "@bysages/core";
import type { TextareaHTMLAttributes } from "react";

/** The bare multi-line input: the field recipe on a `<textarea>`, sized
 * by rows and resizable in the block direction. Standing alone it styles
 * itself from the `invalid` prop; inside a `Field.Root` it consumes the
 * field context, picking up the label id, the described-by wiring and
 * the invalid state for free. Disabled rides the native attribute. */
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  value?: string;
  invalid?: boolean;
  onValueChange?: (value: string) => void;
}

export function Textarea({ value, invalid = false, onValueChange, ...rest }: TextareaProps) {
  const field = useFieldContext();
  const fieldProps = field?.getTextareaProps() ?? {};
  return (
    <textarea
      {...fieldProps}
      {...rest}
      {...(value !== undefined ? { value } : {})}
      data-scope="textarea"
      data-part="root"
      data-invalid={invalid || field?.invalid ? "" : undefined}
      onChange={(event) => onValueChange?.(event.target.value)}
    />
  );
}

injectComponentStyle("textarea");
