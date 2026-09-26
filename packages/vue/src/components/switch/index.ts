import { Switch as ArkSwitch } from "@ark-ui/vue/switch";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, type PropType } from "vue";

/** Switch, dressed in the paper-and-ink system: a track that rests
 * in the inset shade of the paper and fills flat with primary ink when on,
 * the thumb sliding on the spring. The parts — Root, Label,
 * Control, Thumb, HiddenInput. */
const SwitchRoot = defineComponent({
  name: "SSwitchRoot",
  props: {
    /** One rung for the thumb; the track travels with it. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  setup(props, { attrs, slots }) {
    return () => h(ArkSwitch.Root, { ...attrs, "data-size": props.size }, slots);
  },
});

/* Ark's namespace is frozen — spread copies the members as data
 * properties so Root can be the sized wrapper while the rest stay
 * Ark's own parts. */
export const Switch: Omit<typeof ArkSwitch, "Root"> & { Root: typeof SwitchRoot } = {
  ...ArkSwitch,
  Root: SwitchRoot,
};

injectComponentStyle("switch");
