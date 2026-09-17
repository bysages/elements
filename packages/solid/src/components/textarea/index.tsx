import { useFieldContext } from "@ark-ui/solid/field";
import { injectComponentStyle } from "@bysages/core";
import { mergeProps, splitProps } from "solid-js";
import type { JSX } from "solid-js";

export interface TextareaProps extends JSX.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value?: string;
  onValueChange?: (value: string) => void;
  invalid?: boolean;
}

/** The bare multi-line input: the field recipe on a `<textarea>`, sized
 * by rows and resizable in the block direction. Standing alone it styles
 * itself from the `invalid` prop; inside a `Field.Root` it consumes the
 * field context, picking up the label id, the described-by wiring and
 * the invalid state for free. Disabled rides the native attribute. */
export function Textarea(props: TextareaProps) {
  const field = useFieldContext();
  const [own, rest] = splitProps(props, ["value", "invalid", "onValueChange"]);
  return (
    <textarea
      {...mergeProps(() => field?.().getTextareaProps() ?? {}, rest, {
        get value() {
          return own.value;
        },
        "data-scope": "textarea",
        "data-part": "root",
        get "data-invalid"() {
          return own.invalid || field?.().getTextareaProps()["data-invalid"] != null
            ? ""
            : undefined;
        },
        onInput: (event: InputEvent & { currentTarget: HTMLTextAreaElement }) =>
          own.onValueChange?.(event.currentTarget.value),
      })}
    />
  );
}

injectComponentStyle("textarea");
