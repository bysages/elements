import { Checkbox as ArkCheckbox } from "@ark-ui/vue/checkbox";
import { injectComponentStyle } from "@bysages/core";
import { arrow_left, arrow_right, check } from "@bysages/icons";
import type { SetupContext } from "vue";
import { computed, defineComponent, h, ref, type PropType, type Ref } from "vue";

import { glyphNode } from "../../internal/glyph";
import { formatMessage, useComponentMessages } from "../../internal/messages";
import { Button } from "../button";
import { Input } from "../input";

export interface TransferItem {
  label: string;
  value: string;
  disabled?: boolean;
}

function checkGlyph() {
  return glyphNode(check);
}

function arrowGlyph(direction: "right" | "left") {
  return direction === "right" ? glyphNode(arrow_right) : glyphNode(arrow_left);
}

/**
 * Two ledgers and a crossing: items sit in the source column until the
 * reader checks them and walks them across — and back, the same way.
 * `modelValue` is the target column's value list; everything else in
 * `data` stays on the left. `searchable` adds a filter line to each
 * panel.
 */
export const Transfer = defineComponent({
  name: "Transfer",
  props: {
    modelValue: { type: Array as PropType<string[]>, default: () => [] },
    data: { type: Array as PropType<TransferItem[]>, required: true },
    titles: { type: Array as PropType<string[]>, default: () => ["Source", "Target"] },
    searchable: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  emits: ["update:modelValue"],
  setup(props, ctx: SetupContext) {
    injectComponentStyle("transfer");
    injectComponentStyle("checkbox");
    const messages = useComponentMessages();

    const target = computed(() => new Set(props.modelValue));
    const checkedSource = ref(new Set<string>());
    const checkedTarget = ref(new Set<string>());
    const sourceQuery = ref("");
    const targetQuery = ref("");

    function panelItems(values: TransferItem[], inTarget: boolean, query: string) {
      return values.filter(
        (item) =>
          item.label.toLowerCase().includes(query.toLowerCase()) &&
          target.value.has(item.value) === inTarget,
      );
    }

    function toggle(set: Set<string>, value: string) {
      if (set.has(value)) set.delete(value);
      else set.add(value);
    }

    function move(toTarget: boolean) {
      const moving = toTarget ? checkedSource.value : checkedTarget.value;
      if (moving.size === 0) return;
      const next = toTarget
        ? [...props.modelValue, ...moving].filter(
            (value, index, all) => all.indexOf(value) === index,
          )
        : props.modelValue.filter((value) => !moving.has(value));
      moving.clear();
      ctx.emit("update:modelValue", next);
    }

    function panel(
      side: "source" | "target",
      title: string,
      query: Ref<string>,
      checked: Set<string>,
      items: TransferItem[],
    ) {
      return h("div", { "data-scope": "transfer", "data-part": "panel", "data-side": side }, [
        h("div", { "data-scope": "transfer", "data-part": "head" }, [
          h("span", { "data-scope": "transfer", "data-part": "title" }, title),
          h("span", { "data-scope": "transfer", "data-part": "count" }, `${items.length}`),
        ]),
        ...(props.searchable
          ? [
              h("div", { "data-scope": "transfer", "data-part": "search" }, [
                h(Input, {
                  size: "sm",
                  modelValue: query.value,
                  "onUpdate:modelValue": (v: string) => (query.value = v),
                  placeholder: messages.value.command.filter,
                  "aria-label": formatMessage(messages.value.transfer.filter, { name: title }),
                }),
              ]),
            ]
          : []),
        h(
          "div",
          { "data-scope": "transfer", "data-part": "list" },
          items.length === 0
            ? [h("p", { "data-scope": "transfer", "data-part": "empty" }, "Nothing here")]
            : items.map((item) => {
                const locked = props.disabled || item.disabled === true;
                return h(
                  ArkCheckbox.Root as never,
                  {
                    key: item.value,
                    checked: checked.has(item.value),
                    disabled: locked,
                    onCheckedChange: () => toggle(checked, item.value),
                  },
                  () => [
                    h(ArkCheckbox.Control, () => h(ArkCheckbox.Indicator, () => checkGlyph())),
                    h(ArkCheckbox.Label, { "data-part": "label" }, () => item.label),
                    h(ArkCheckbox.HiddenInput as never),
                  ],
                );
              }),
        ),
      ]);
    }

    return () => {
      const items = panelItems(props.data, false, sourceQuery.value);
      const targetItems = panelItems(props.data, true, targetQuery.value);
      const sourcePanel = panel("source", props.titles[0], sourceQuery, checkedSource.value, items);
      const targetPanel = panel(
        "target",
        props.titles[1],
        targetQuery,
        checkedTarget.value,
        targetItems,
      );

      return h("div", { ...ctx.attrs, "data-scope": "transfer", "data-part": "root" }, [
        sourcePanel,
        h("div", { "data-scope": "transfer", "data-part": "operations" }, [
          h(
            Button,
            {
              variant: "outline",
              size: "sm",
              square: true,
              disabled: checkedSource.value.size === 0 || props.disabled,
              "aria-label": messages.value.transfer.moveRight,
              onClick: () => move(true),
            },
            () => arrowGlyph("right"),
          ),
          h(
            Button,
            {
              variant: "outline",
              size: "sm",
              square: true,
              disabled: checkedTarget.value.size === 0 || props.disabled,
              "aria-label": messages.value.transfer.moveLeft,
              onClick: () => move(false),
            },
            () => arrowGlyph("left"),
          ),
        ]),
        targetPanel,
      ]);
    };
  },
});

// The rows are the checkbox family's own seals — the transfer stylesheet
// only dresses the ledgers around them.
