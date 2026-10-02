import { injectComponentStyle } from "@bysages/core";
import { x } from "@bysages/icons";
import type { SetupContext } from "vue";
import { defineComponent, h, type PropType } from "vue";

import { glyphNode } from "../../internal/glyph";
import { Button } from "../button";
import { Input } from "../input";

/**
 * A column of entry rows: one Input per line, each with a quiet remove
 * seal, and an add row at the tail. The list is controlled — every edit
 * emits a fresh array and the parent's array stays the only truth.
 * Deleting never drops below `min`, adding never grows past `max`, and
 * the group always keeps one row: an entry list that emptied itself
 * would leave the reader no place to type.
 */
export const DynamicInput = defineComponent({
  name: "DynamicInput",
  props: {
    /** The rows' values; the group renders one Input per entry. */
    modelValue: { type: Array as PropType<string[]>, default: () => [""] },
    /** The fewest rows the group keeps; the remove seals yield first. */
    min: { type: Number, default: 0 },
    /** The most rows the group grows to; the add control yields then. */
    max: { type: Number, default: undefined },
    placeholder: { type: String, default: undefined },
    /** The add control's visible words. */
    addLabel: { type: String, default: "Add entry" },
    disabled: { type: Boolean, default: false },
    invalid: { type: Boolean, default: false },
    /** One rung of the ladder, handed to every row's field and seals. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  emits: ["update:modelValue"],
  setup(props, ctx: SetupContext) {
    injectComponentStyle("dynamic-input");

    const update = (index: number, value: string) => {
      const next = props.modelValue.slice();
      next[index] = value;
      ctx.emit("update:modelValue", next);
    };

    const remove = (index: number) => {
      const next = props.modelValue.filter((_, i) => i !== index);
      // Emptied by the last removal, the group resets to one blank row
      // instead of vanishing.
      ctx.emit("update:modelValue", next.length > 0 ? next : [""]);
    };

    const add = () => {
      ctx.emit("update:modelValue", [...props.modelValue, ""]);
    };

    return () => {
      const values = props.modelValue;
      const canRemove = values.length > Math.max(props.min, 1);
      const canAdd = props.max === undefined || values.length < props.max;
      return h("div", { ...ctx.attrs, "data-scope": "dynamic-input", "data-part": "root" }, () => [
        ...values.map((value, index) =>
          h("div", { key: index, "data-scope": "dynamic-input", "data-part": "row" }, () => [
            h(Input, {
              modelValue: value,
              placeholder: props.placeholder,
              disabled: props.disabled,
              invalid: props.invalid,
              size: props.size,
              "onUpdate:modelValue": (next: string) => update(index, next),
            }),
            h(
              Button,
              {
                variant: "ghost",
                square: true,
                size: props.size,
                disabled: props.disabled || !canRemove,
                "aria-label": `Remove entry ${index + 1}`,
                onClick: () => remove(index),
              },
              () => [crossIcon()],
            ),
          ]),
        ),
        h("div", { "data-scope": "dynamic-input", "data-part": "add" }, () => [
          h(
            Button,
            {
              variant: "ghost",
              size: props.size,
              disabled: props.disabled || !canAdd,
              onClick: () => add(),
            },
            () => ["+", props.addLabel],
          ),
        ]),
      ]);
    };
  },
});

/** The one glyph a remove seal needs: a single crossing stroke. */
function crossIcon() {
  return glyphNode(x, { width: 16, height: 16 });
}
