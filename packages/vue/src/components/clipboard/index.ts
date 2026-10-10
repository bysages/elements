import { Clipboard as ArkClipboard } from "@ark-ui/vue/clipboard";
import { injectComponentStyle } from "@bysages/core/styling";
import { defineComponent, h, type Component, type PropType, type SetupContext } from "vue";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

/** Clipboard, dressed in the paper-and-ink system: a hairline value
 * field beside an icon-sized copy trigger whose ink turns bamboo while the
 * copy is confirmed. The parts — Root, Label, Control, Input,
 * Trigger, Indicator, Context, HiddenInput. */

const ClipboardRoot = defineComponent({
  name: "SClipboardRoot",
  props: {
    /** One rung of the control-height ladder for the value field and its copy seal. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  setup(props, { attrs, slots }) {
    injectComponentStyle("clipboard");
    const id = useElementId("clipboard", attrs);

    return () => h(ArkClipboard.Root, { ...attrs, id: id.value, "data-size": props.size }, slots);
  },
});

/** The complete copy field behind one value: a labelled read-only input and
 * its confirmed copy trigger. */
const ClipboardFacade = defineComponent({
  name: "SClipboard",
  props: {
    modelValue: { type: String, default: undefined },
    defaultValue: { type: String, default: undefined },
    disabled: { type: Boolean, default: false },
    label: { type: String, default: undefined },
    placeholder: { type: String, default: undefined },
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit }: SetupContext) {
    return () =>
      h(
        ClipboardRoot,
        {
          ...attrs,
          defaultValue: props.defaultValue,
          modelValue: props.modelValue,
          disabled: props.disabled,
          "onUpdate:modelValue": (value: string) => emit("update:modelValue", value),
        } as never,
        () => [
          ...(props.label ? [h(ArkClipboard.Label, () => props.label)] : []),
          h(ArkClipboard.Control, () => [
            h(ArkClipboard.Input as never, { placeholder: props.placeholder }),
            h(ArkClipboard.Trigger, () =>
              h(ArkClipboard.Indicator, null, {
                default: () => iconNode("copy", { width: 14, height: 14 }),
                copied: () => iconNode("check", { width: 14, height: 14 }),
              }),
            ),
          ]),
        ],
      );
  },
});

export const Clipboard = defineFamily(ClipboardFacade, {
  ...ArkClipboard,
  Root: ClipboardRoot,
} as unknown as { Root: Component } & Record<string, Component>) as typeof ClipboardFacade &
  Omit<typeof ArkClipboard, "Root"> & { Root: typeof ClipboardRoot };
