import { Toast as ArkToast, Toaster as ArkToaster, createToaster } from "@ark-ui/react/toast";
import { injectComponentStyle } from "@bysages/core";
import type { ComponentProps } from "react";
import { forwardRef } from "react";

import { withSelfRoot } from "../../internal/family";
import { useElementId } from "../../internal/id";

export type { CreateToasterReturn } from "@ark-ui/react/toast";
export { createToaster };

/** Ark's Toast, dressed in the paper-and-ink system: each notice rides the
 * popup vessel while a pigment accents the title by type, and the machine's
 * translate variables carry the slide. The API is Ark's own — Toaster,
 * Root, Title, Description, ActionTrigger, CloseTrigger, plus
 * createToaster. */
function ToastRoot(props: ComponentProps<typeof ArkToast.Root>) {
  const id = useElementId("toast", props);

  return <ArkToast.Root {...props} id={id} />;
}

export const Toast: typeof ArkToast = {
  ...ArkToast,
  Root: ToastRoot as unknown as typeof ArkToast.Root,
};

const ToasterRoot = forwardRef<HTMLDivElement, ComponentProps<typeof ArkToaster>>(
  function ToasterRoot(props, ref) {
    return <ArkToaster ref={ref} {...props} />;
  },
);
export const Toaster = withSelfRoot(ToasterRoot as unknown as typeof ArkToaster);

injectComponentStyle("toast");
