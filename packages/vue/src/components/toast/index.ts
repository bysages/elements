import {
  Toaster as ArkToaster,
  Toast as ArkToast,
  createToaster,
  type CreateToasterReturn,
} from "@ark-ui/vue/toast";
import { injectComponentStyle } from "@bysages/core/styling";
import { defineComponent, h, type DefineComponent, type PropType, type SetupContext } from "vue";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";

export type { CreateToasterReturn } from "@ark-ui/vue/toast";
export { createToaster };

/** Toast, dressed in the paper-and-ink system: each notice rides the
 * popup vessel while a pigment accents the title by type, and the machine's
 * translate variables carry the slide. The parts — Toaster,
 * Root, Title, Description, ActionTrigger, CloseTrigger, plus
 * createToaster. */
export const Toast = {
  ...ArkToast,
  Root: ArkToast.Root,
};

/** The common path: a toaster needs no repeated card markup. Machine data
 * supplies the heading and lead; the default slot still replaces the card. */
const ToasterFacade = defineComponent({
  name: "SToaster",
  inheritAttrs: false,
  props: {
    toaster: { type: Object as PropType<CreateToasterReturn>, required: true },
  },
  setup(props, ctx: SetupContext) {
    injectComponentStyle("toast");

    return () => {
      const defaultSlot =
        ctx.slots.default ??
        ((toast: { id?: string | number; title?: string; description?: string }) =>
          h(ArkToast.Root, { key: toast.id }, () => [
            h(ArkToast.Title, () => toast.title),
            toast.description ? h(ArkToast.Description, () => toast.description) : null,
            h(ArkToast.CloseTrigger, { "aria-label": "Close" }, () =>
              iconNode("x", { width: 14, height: 14 }),
            ),
          ]));

      return h(ArkToaster as never, { ...ctx.attrs, toaster: props.toaster }, defaultSlot as never);
    };
  },
});

// The inferred type reaches into @zag-js/toast through a pnpm-internal
// path, which is not portable in a declaration file — name it explicitly
// (the loose generics accept Ark's inferred component shape).
const ToasterComponent: DefineComponent<any, any, any> = ArkToaster;
export const Toaster = defineFamily(ToasterFacade, {
  Root: ToasterComponent,
});

injectComponentStyle("toast");
