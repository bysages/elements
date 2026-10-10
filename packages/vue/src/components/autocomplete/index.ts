import { useListCollection } from "@ark-ui/vue/collection";
import { Combobox as ArkCombobox } from "@ark-ui/vue/combobox";
import { injectComponentStyle } from "@bysages/core/styling";
import type { SetupContext } from "vue";
import { defineComponent, h, ref, watch, type PropType } from "vue";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";
import { withPresenceEnter, withPresenceRoot } from "../../internal/presence";
import { Combobox } from "../combobox";

/**
 * Free text with suggestions: the reader types anything, the list
 * narrows to help, and both a pick and a custom value end up in the
 * same `modelValue`. A preset of the combobox machinery — same parts,
 * same styling, one job. `items` seeds the suggestion list once;
 * matching is a case-insensitive substring unless `filter` says
 * otherwise.
 */
const AutoCompleteFacade = defineComponent({
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
    /** One rung of the control-height ladder for the field row. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  emits: {
    "update:modelValue": (_value: string) => true,
  },
  setup(props, ctx: SetupContext) {
    injectComponentStyle("combobox");

    const hostId = useElementId("autocomplete", ctx.attrs);

    const { collection, set, filter } = useListCollection({
      initialItems: props.items,
      filter: (item: string, input: string) =>
        props.filter ? props.filter(item, input) : item.toLowerCase().includes(input.toLowerCase()),
    });

    // The field's live text, kept so a caller's new list can be
    // re-narrowed against it (the collection's `set` clears the filter).
    const fieldText = ref("");

    // The caller's list is live — an index landing after mount or a
    // search that re-ranks per keystroke must reach the collection
    // without a remount.
    watch(
      () => props.items,
      (items) => {
        set(items);
        filter(fieldText.value);
      },
    );

    // `as never` sidesteps TS2590 — the compiler cannot unroll the
    // combobox machine's prop union inside h(); never widens to
    // whichever overload fits, any/unknown would swallow real mistakes.
    return () =>
      h(
        withPresenceRoot(ArkCombobox.Root as never),
        withPresenceEnter({
          id: `${hostId.value}:combobox`,
          collection: collection.value,
          inputValue: props.modelValue,
          allowCustomValue: true,
          "data-size": props.size,
          onValueChange: (details: { value: string[] }) => {
            const [first] = details.value;
            if (first != null) ctx.emit("update:modelValue", first);
          },
          onInputValueChange: (details: { inputValue: string }) => {
            fieldText.value = details.inputValue;
            filter(details.inputValue);
            ctx.emit("update:modelValue", details.inputValue);
          },
          positioning: { sameWidth: true },
        }),
        () => [
          h(ArkCombobox.Control as never, () =>
            h(ArkCombobox.Input as never, { placeholder: props.placeholder }),
          ),
          h(ArkCombobox.Positioner, () => [
            h(ArkCombobox.Content, () => [
              h(ArkCombobox.Empty, () => "No matches"),
              ...collection.value.items.map((item: string) =>
                h(ArkCombobox.Item, { key: item, item }, () => h(ArkCombobox.ItemText, () => item)),
              ),
            ]),
          ]),
        ],
      );
  },
});

export const AutoComplete = defineFamily(
  AutoCompleteFacade,
  Combobox,
) as typeof AutoCompleteFacade & typeof Combobox;
