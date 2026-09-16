import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { computed, defineComponent, h, type PropType } from "vue";

/** One figure on the page: the label whispers what it is, the value
 * states it plainly in tabular figures, the delta reads the direction
 * in the fixed semantic pigments. */
function part(name: string, tag: string) {
  return defineComponent({
    name: "Stat" + name,
    setup(_, ctx: SetupContext) {
      return () =>
        h(
          tag,
          { ...ctx.attrs, "data-scope": "stat", "data-part": name.toLowerCase() },
          ctx.slots.default?.(),
        );
    },
  });
}

const Root = part("Root", "div");
const Label = part("Label", "p");
const Value = part("Value", "div");
const Description = part("Description", "p");

/** The delta reads its direction from the `direction` prop (an explicit
 * `data-direction` attribute on the consumer side still wins). */
const Delta = defineComponent({
  name: "StatDelta",
  props: {
    direction: {
      type: String as PropType<"up" | "down" | "flat">,
      default: "flat",
    },
  },
  setup(props, ctx: SetupContext) {
    const direction = computed(() => (ctx.attrs["data-direction"] as string) ?? props.direction);
    return () =>
      h(
        "span",
        {
          ...ctx.attrs,
          "data-scope": "stat",
          "data-part": "delta",
          "data-direction": direction.value,
        },
        ctx.slots.default?.(),
      );
  },
});

export const Stat = Object.assign(Root, {
  Root,
  Label,
  Value,
  Delta,
  Description,
});

injectComponentStyle("stat");
