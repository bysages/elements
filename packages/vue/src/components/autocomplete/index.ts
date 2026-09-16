import { useListCollection } from "@ark-ui/vue/collection";
import { Combobox as ArkCombobox } from "@ark-ui/vue/combobox";
import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { defineComponent, h, type PropType } from "vue";
import { Teleport } from "vue";

/**
 * Free text with suggestions: the reader types anything, the list
 * narrows to help, and both a pick and a custom value end up in the
 * same `modelValue`. A preset of the combobox machinery — same parts,
 * same styling, one job. `items` seeds the suggestion list once;
 * matching is a case-insensitive substring unless `filter` says
 * otherwise.
 */
export const AutoComplete = defineComponent({
  name: "AutoComplete",
  props: {
    modelValue: { type: String, default: "" },
    items: { type: Array as PropType<string[]>, default: () => [] },
    placeholder: { type: String, default: undefined },
    /** Field text to match against; defaults to the item itself. */
    filter: {
      type: Function as PropType<(item: string, input: string) => boolean>,
      default: undefined,
    },
  },
  emits: ["update:modelValue"],
  setup(props, ctx: SetupContext) {
    const { collection, filter } = useListCollection({
      initialItems: props.items,
      filter: (item: string, input: string) =>
        props.filter ? props.filter(item, input) : item.toLowerCase().includes(input.toLowerCase()),
    });

    // `as never` sidesteps TS2590 — the compiler cannot unroll the
    // combobox machine's prop union inside h(); never widens to
    // whichever overload fits, any/unknown would swallow real mistakes.
    return () =>
      h(
        ArkCombobox.Root as never,
        {
          collection: collection.value,
          inputValue: props.modelValue,
          allowCustomValue: true,
          onValueChange: (details: { value: string[] }) => {
            const [first] = details.value;
            if (first != null) ctx.emit("update:modelValue", first);
          },
          onInputValueChange: (details: { inputValue: string }) => {
            filter(details.inputValue);
            ctx.emit("update:modelValue", details.inputValue);
          },
          positioning: { sameWidth: true },
        },
        () => [
          h(ArkCombobox.Control as never, () =>
            h(ArkCombobox.Input as never, { placeholder: props.placeholder }),
          ),
          h(Teleport as never, { to: "body" }, () => [
            h(ArkCombobox.Positioner, () => [
              h(ArkCombobox.Content, () => [
                h(ArkCombobox.Empty, () => "No matches"),
                ...collection.value.items.map((item: string) =>
                  h(ArkCombobox.Item, { key: item, item }, () =>
                    h(ArkCombobox.ItemText, () => item),
                  ),
                ),
              ]),
            ]),
          ]),
        ],
      );
  },
});

injectComponentStyle("combobox");
