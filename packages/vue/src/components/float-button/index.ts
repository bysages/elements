import { injectComponentStyle } from "@bysages/core";
import type { InjectionKey, PropType, SetupContext } from "vue";
import { computed, defineComponent, h, inject, provide, ref, type Ref } from "vue";

import { Button } from "../button";

export type FloatButtonPlacement = "bottom-end" | "bottom-start" | "top-end" | "top-start";

/** The group's openness, shared from the mooring to its parts. */
export interface FloatButtonContext {
  open: Ref<boolean>;
  toggle: () => void;
  /** Folds the fan — an Item calls this once its action fires, the way
   * a speed dial closes after a choice. */
  close: () => void;
}

/** Injection key for {@link FloatButtonContext}, exported so a custom
 * part can read the group's state. */
export const FLOAT_BUTTON_CONTEXT: InjectionKey<FloatButtonContext> =
  Symbol("float-button-context");

/**
 * A floating action and its fanned-out alternatives — FAB and speed
 * dial in one family. The Root moors the group at a page corner and
 * holds the openness (mirrored from `open` when controlled); the
 * Trigger flips it; each Item is a round action with its name surfacing
 * beside it while the group is open. The buttons are the shared recipe
 * (vessels here: round); this family owns only the mooring, the fan
 * and the fold.
 */
const Root = defineComponent({
  name: "FloatButtonRoot",
  props: {
    /** Controlled openness: leave unset to let the group hold its own
     * state; while set, the Trigger reports back through
     * `update:open`. */
    open: { type: Boolean, default: undefined },
    /** Which corner the group moors at. */
    placement: { type: String as PropType<FloatButtonPlacement>, default: "bottom-end" },
  },
  emits: {
    "update:open": (value: boolean) => typeof value === "boolean",
  },
  setup(props, ctx: SetupContext) {
    const inner = ref(false);
    const open = computed({
      get: () => (props.open !== undefined ? props.open : inner.value),
      set: (value: boolean) => {
        inner.value = value;
        ctx.emit("update:open", value);
      },
    });
    provide(FLOAT_BUTTON_CONTEXT, {
      open,
      toggle: () => (open.value = !open.value),
      close: () => (open.value = false),
    });
    return () =>
      h(
        "div",
        {
          ...ctx.attrs,
          "data-scope": "float-button",
          "data-part": "root",
          "data-placement": props.placement,
          "data-state": open.value ? "open" : "closed",
        },
        ctx.slots.default?.(),
      );
  },
});

const Trigger = defineComponent({
  name: "FloatButtonTrigger",
  props: {
    /** The accessible name; the control is icon-only. */
    label: { type: String, default: undefined },
  },
  setup(props, ctx: SetupContext) {
    const context = inject(FLOAT_BUTTON_CONTEXT);
    return () =>
      h(
        Button,
        {
          variant: "solid",
          square: true,
          size: "lg",
          onClick: () => context?.toggle(),
          "aria-label": props.label || "Actions",
          "aria-expanded": context ? context.open.value : false,
        },
        () => ctx.slots.default?.(),
      );
  },
});

const Item = defineComponent({
  name: "FloatButtonItem",
  props: {
    /** The action's name: the button's accessible name and the
     * annotation surfaced beside it while the group is open. */
    label: { type: String, required: true },
    disabled: { type: Boolean, default: false },
  },
  emits: {
    click: () => true,
  },
  setup(props, ctx: SetupContext) {
    const context = inject(FLOAT_BUTTON_CONTEXT);
    return () =>
      h("div", { "data-scope": "float-button", "data-part": "item" }, [
        h(
          Button,
          {
            variant: "outline",
            square: true,
            size: "md",
            disabled: props.disabled,
            "aria-label": props.label,
            onClick: () => {
              ctx.emit("click");
              // The dial folds once the action is chosen.
              context?.close();
            },
          },
          () => ctx.slots.default?.(),
        ),
        h(
          "span",
          {
            "data-scope": "float-button",
            "data-part": "item-label",
            // The accessible name rides the button; the annotation is
            // for the eyes only.
            "aria-hidden": "true",
          },
          props.label,
        ),
      ]);
  },
});

export const FloatButton = Object.assign(Root, { Root, Trigger, Item });

injectComponentStyle("float-button");
