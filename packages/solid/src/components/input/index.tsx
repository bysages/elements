import { useFieldContext } from "@ark-ui/solid/field";
import { injectComponentStyle } from "@bysages/core";
import { mergeProps, splitProps } from "solid-js";
import type { JSX } from "solid-js";

export interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  value?: string | number;
  onValueChange?: (value: string) => void;
  size?: "sm" | "md" | "lg";
  invalid?: boolean;
}

/** The bare text input: the field recipe — border, surface, focus halo —
 * on a native control. Standing alone it styles itself from the `invalid`
 * prop; inside a `Field.Root` it consumes the field context, picking up
 * the label id, the described-by wiring and the invalid state for free,
 * which is also the seam the Form validation layer will drive. Disabled
 * rides the native attribute. */
export function Input(props: InputProps) {
  const field = useFieldContext();
  const [own, rest] = splitProps(props, ["value", "size", "invalid", "onValueChange"]);
  return (
    <input
      {...mergeProps(() => field?.().getInputProps() ?? {}, rest, {
        get value() {
          return own.value;
        },
        "data-scope": "input",
        "data-part": "root",
        get "data-size"() {
          return own.size ?? "md";
        },
        get "data-invalid"() {
          return own.invalid || field?.().getInputProps()["data-invalid"] != null ? "" : undefined;
        },
        onInput: (event: InputEvent & { currentTarget: HTMLInputElement }) =>
          own.onValueChange?.(event.currentTarget.value),
      })}
    />
  );
}

injectComponentStyle("input");
