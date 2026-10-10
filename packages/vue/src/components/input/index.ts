import { useFieldContext } from "@ark-ui/vue/field";
import { injectComponentStyle } from "@bysages/core/styling";
import type { SetupContext } from "vue";
import { defineComponent, h, type PropType } from "vue";

import { withSelfRoot } from "../../internal/family";

function accepts(slot: string, ch: string) {
  if (slot === "9") return /\d/.test(ch);
  if (slot === "a") return /[a-zA-Z]/.test(ch);
  return /[\da-zA-Z]/.test(ch);
}

/** Apply the entry mask: `9` takes a digit, `a` a letter, `*` either;
 * every other character is literal. A literal already typed is consumed,
 * not duplicated; a literal met out of place holds the walk and lets its
 * own slot claim it — so deleting through the middle reflows the shape
 * instead of corrupting it. */
function applyMask(raw: string, mask: string) {
  const literals = new Set(mask.split("").filter((s) => s !== "9" && s !== "a" && s !== "*"));
  let out = "";
  let at = 0;
  slots: for (const slot of mask) {
    if (at >= raw.length) break;
    if (slot === "9" || slot === "a" || slot === "*") {
      let ch = raw[at];
      while (ch !== undefined && !accepts(slot, ch)) {
        if (literals.has(ch)) continue slots;
        at += 1;
        ch = raw[at];
      }
      if (ch === undefined) break;
      out += ch;
      at += 1;
    } else if (raw[at] === slot) {
      at += 1;
      out += slot;
    } else {
      out += slot;
    }
  }
  return out;
}

/** The bare text input: the field recipe — border, surface, focus halo —
 * on a native control. Standing alone it styles itself from the `invalid`
 * prop; inside a `Field.Root` it consumes the field context, picking up
 * the label id, the described-by wiring and the invalid state for free,
 * which is also the seam the Form validation layer will drive. Disabled
 * rides the native attribute. */
export const Input = withSelfRoot(
  defineComponent({
    name: "Input",
    props: {
      modelValue: { type: [String, Number] as PropType<string | number>, default: undefined },
      /** One rung of the control-height ladder for the field. */
      size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
      invalid: { type: Boolean, default: false },
      /** Entry mask — `9` digit, `a` letter, `*` either, anything else is
       * literal. e.g. `"999-99-9999"`, `"(999) 999-9999"`. */
      mask: { type: String, default: undefined },
    },
    emits: ["update:modelValue"],
    setup(props, ctx: SetupContext) {
      injectComponentStyle("input");

      const field = useFieldContext();
      return () => {
        const fieldProps = field?.value?.getInputProps() ?? {};
        return h("input", {
          ...fieldProps,
          ...ctx.attrs,
          ...(props.modelValue !== undefined ? { value: props.modelValue } : null),
          "data-scope": "input",
          "data-part": "root",
          "data-size": props.size,
          "data-invalid": props.invalid || fieldProps["data-invalid"] != null ? "" : undefined,
          onInput: (event: InputEvent) => {
            const value = (event.target as HTMLInputElement).value;
            ctx.emit("update:modelValue", props.mask ? applyMask(value, props.mask) : value);
          },
        });
      };
    },
  }),
);
