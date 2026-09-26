import { Clipboard as ArkClipboard } from "@ark-ui/vue/clipboard";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, type PropType } from "vue";

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
    return () => h(ArkClipboard.Root, { ...attrs, "data-size": props.size }, slots);
  },
});

/* Ark's namespace is frozen — spread copies the members as data properties
 * so Root can be the sized wrapper while the rest stay Ark's own parts. */
export const Clipboard: Omit<typeof ArkClipboard, "Root"> & { Root: typeof ClipboardRoot } = {
  ...ArkClipboard,
  Root: ClipboardRoot,
};

injectComponentStyle("clipboard");
