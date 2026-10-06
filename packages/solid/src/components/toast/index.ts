import { Toaster as ArkToaster, Toast as ArkToast, createToaster } from "@ark-ui/solid/toast";
import { injectComponentStyle } from "@bysages/core";
import { createComponent, mergeProps, type ComponentProps } from "solid-js";

import { defineFamily, withSelfRoot } from "../../internal/family";
import { useElementId } from "../../internal/id";

export type { CreateToasterReturn } from "@ark-ui/solid/toast";
export { createToaster };

/** Ark's Toast, dressed in the paper-and-ink system: each notice rides the
 * popup vessel while a pigment accents the title by type, and the machine's
 * translate variables carry the slide. The API is Ark's own — Toaster,
 * Root, Title, Description, ActionTrigger, CloseTrigger, plus
 * createToaster. */
function ToastRoot(props: ComponentProps<typeof ArkToast.Root>) {
  const id = useElementId("toast", () => props.id);

  return createComponent(
    ArkToast.Root,
    mergeProps(props, {
      get id() {
        return id();
      },
    }),
  );
}

export const Toast: typeof ToastRoot & Omit<typeof ArkToast, "Root"> & { Root: typeof ToastRoot } =
  defineFamily(ToastRoot, {
    ...ArkToast,
    Root: ToastRoot,
  });
export const Toaster = withSelfRoot(ArkToaster);

injectComponentStyle("toast");
