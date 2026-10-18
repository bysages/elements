import { injectComponentStyle } from "@bysages/core/styling";
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

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
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
  inheritAttrs: false,
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

/** One entry on the speed dial: a named, optionally disabled action. */
export type FloatButtonAction = {
  label: string;
  /** A curated core icon; pencil is the fallback mark. */
  icon?: string;
  disabled?: boolean;
  /** The action fires before the fan folds. */
  onClick?: () => void;
};

/** The one-tag dial: a trigger label and its fanned actions are enough
 * for the common speed dial; custom dials stay on the anatomy. */
const FloatButtonFacade = defineComponent({
  name: "SFloatButton",
  inheritAttrs: false,
  props: {
    /** The trigger's accessible name; the icon-only control falls back
     * to the shared label when it is not given. */
    label: { type: String, default: undefined },
    /** The actions surfaced beside the trigger while the dial is open. */
    actions: { type: Array as PropType<FloatButtonAction[]>, default: () => [] },
    /** Which corner the group moors at. */
    placement: { type: String as PropType<FloatButtonPlacement>, default: "bottom-end" },
    /** One rung of the button ladder for the whole group. */
    size: { type: String as PropType<FloatButtonSize>, default: "lg" },
    /** Whether the dial starts open. */
    defaultOpen: { type: Boolean, default: false },
    /** Controlled openness; leave unset for the facade to hold it. */
    open: { type: Boolean, default: undefined },
  },
  emits: {
    "update:open": (_open: boolean) => true,
  },
  setup(props, ctx: SetupContext) {
    injectComponentStyle("float-button");
    const innerOpen = ref(props.defaultOpen);
    const open = computed({
      get: () => (props.open !== undefined ? props.open : innerOpen.value),
      set: (value: boolean) => {
        innerOpen.value = value;
        ctx.emit("update:open", value);
      },
    });

    return () =>
      h(
        Root,
        {
          ...ctx.attrs,
          open: open.value,
          placement: props.placement,
          size: props.size,
          "onUpdate:open": (value: boolean) => {
            open.value = value;
          },
        },
        () =>
          ctx.slots.default
            ? ctx.slots.default()
            : [
                h(Trigger, { label: props.label }, () => iconNode("plus")),
                ...props.actions.map((action, index) =>
                  h(
                    Item,
                    {
                      key: `${index}:${action.label}`,
                      label: action.label,
                      disabled: action.disabled ?? false,
                      onClick: action.onClick,
                    },
                    () => iconNode(action.icon ?? "pencil"),
                  ),
                ),
              ],
      );
  },
});

/** A floating action and its fanned alternatives — FAB and speed
 * dial in one family. Root moors the group, Trigger flips it, and each
 * Item is one action. */
export const FloatButton = defineFamily(FloatButtonFacade, { Root, Trigger, Item });
