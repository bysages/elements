import { injectComponentStyle } from "@bysages/core/styling";
import type { PropType } from "vue";
import { computed, defineComponent, h, ref } from "vue";

import { withSelfRoot } from "../../internal/family";
import { iconNode } from "../../internal/icon";

/** A small named seal for filtering and cataloguing. The resting shape
 * is a span; `checkable` raises it to a pressed button, and `closable`
 * hangs the removal seal inside — dismissal stays the consumer's state,
 * the way the banner's does. */
export const Tag = withSelfRoot(
  defineComponent({
    name: "Tag",
    inheritAttrs: false,
    props: {
      /** The pigment the tag is inked with; ink is the solemn default,
       * and the fixed pigments speak for their meaning. */
      tone: {
        type: String as PropType<"ink" | "primary" | "success" | "warning" | "danger" | "info">,
        default: "ink",
      },
      /** How the tag rests: a solid fill, an outline shell, a subtle
       * wash. The pressed state always reads as solid. */
      variant: {
        type: String as PropType<"solid" | "outline" | "subtle">,
        default: "solid",
      },
      /** Render the tag as a pressed button the consumer can toggle. */
      checkable: { type: Boolean, default: false },
      /** The pressed state held from outside; omit it and the tag keeps
       * its own state from `defaultValue`. */
      modelValue: { type: Boolean, default: undefined },
      defaultValue: { type: Boolean, default: false },
      /** Render the quiet removal seal. */
      closable: { type: Boolean, default: false },
      disabled: { type: Boolean, default: false },
    },
    emits: {
      "update:modelValue": (_checked: boolean) => true,
      close: () => true,
    },
    setup(props, ctx) {
      injectComponentStyle("tag");

      const internalChecked = ref(props.defaultValue);
      const checked = computed(() => props.modelValue ?? internalChecked.value);

      const toggle = () => {
        if (props.disabled) return;
        const next = !checked.value;
        internalChecked.value = next;
        ctx.emit("update:modelValue", next);
      };

      const dismiss = (event: Event) => {
        // Removal never reaches the checkable root: closing a tag is not
        // pressing it.
        event.stopPropagation();
        if (props.disabled) return;
        ctx.emit("close");
      };

      return () => {
        const pressed = props.checkable && checked.value;
        const partProps = {
          ...ctx.attrs,
          "data-scope": "tag",
          "data-part": "root",
          "data-tone": props.tone,
          "data-variant": props.variant,
          ...(props.checkable ? { "data-checkable": "true" } : {}),
          ...(pressed ? { "data-checked": "true" } : {}),
          ...(props.disabled ? { "data-disabled": "true" } : {}),
        };

        // A control cannot nest in the pressed root, so the seal rides a
        // bare span there and keeps the real button beside the span root.
        const closeControl = props.closable
          ? props.checkable
            ? h(
                "span",
                {
                  "data-scope": "tag",
                  "data-part": "close",
                  "aria-hidden": "true",
                  onClick: dismiss,
                },
                [iconNode("x")],
              )
            : h(
                "button",
                {
                  "data-scope": "tag",
                  "data-part": "close",
                  type: "button",
                  "aria-label": "Remove",
                  disabled: props.disabled,
                  onClick: dismiss,
                },
                [iconNode("x")],
              )
          : null;

        const children = [
          ...(ctx.slots.default?.() ?? []),
          ...(closeControl ? [closeControl] : []),
        ];

        if (props.checkable) {
          return h(
            "button",
            {
              ...partProps,
              type: "button",
              "aria-pressed": checked.value,
              disabled: props.disabled,
              onClick: toggle,
            },
            children,
          );
        }

        return h(
          "span",
          {
            ...partProps,
            ...(props.disabled ? { "aria-disabled": "true" } : {}),
          },
          children,
        );
      };
    },
  }),
);
