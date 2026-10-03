import { injectComponentStyle } from "@bysages/core";
import type { InjectionKey, SetupContext } from "vue";
import {
  computed,
  defineComponent,
  h,
  inject,
  provide,
  ref,
  type ComputedRef,
  type PropType,
  type Ref,
} from "vue";

import { useComponentMessages } from "../../internal/messages";
import { Button } from "../button";

export type FloatButtonPlacement = "bottom-end" | "bottom-start" | "top-end" | "top-start";

export type FloatButtonSize = "sm" | "md" | "lg";

/** The group's openness, shared from the mooring to its parts. */
export interface FloatButtonContext {
  open: Ref<boolean>;
  /** The group's button rung; the trigger takes it whole, the items
   * step down one. */
  size: ComputedRef<FloatButtonSize>;
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
    /** One rung of the button ladder for the whole group. */
    size: { type: String as PropType<FloatButtonSize>, default: "lg" },
  },
  emits: {
    "update:open": (value: boolean) => typeof value === "boolean",
  },
  setup(props, ctx: SetupContext) {
    injectComponentStyle("float-button");

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
      size: computed(() => props.size),
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
    const messages = useComponentMessages();
    const consumerLabel = ctx.attrs["aria-label"] as string | undefined;

    return () =>
      h(
        Button,
        {
          variant: "solid",
          square: true,
          size: context?.size.value ?? "lg",
          onClick: () => context?.toggle(),
          "aria-label": consumerLabel ?? props.label ?? messages.value.floatButton.actions,
          "aria-expanded": context ? context.open.value : false,
        },
        () => ctx.slots.default?.(),
      );
  },
});

const STEP_DOWN: Record<FloatButtonSize, "sm" | "md"> = { lg: "md", md: "sm", sm: "sm" };

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
            size: context ? STEP_DOWN[context.size.value] : "md",
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
