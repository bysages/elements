import { Toast as ArkToast, Toaster as ArkToaster, createToaster } from "@ark-ui/react/toast";
import { injectComponentStyle } from "@bysages/core/styling";
import type { ComponentProps } from "react";
import { forwardRef } from "react";

import { withSelfRoot } from "../../internal/family";
import { iconNode } from "../../internal/icon";
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
    const { children, ...rest } = props;

    return (
      <ArkToaster
        ref={ref}
        {...rest}
        children={
          children ??
          ((toast) => (
            <ArkToast.Root key={toast.id}>
              <ArkToast.Title>{toast.title}</ArkToast.Title>
              {toast.description ? (
                <ArkToast.Description>{toast.description}</ArkToast.Description>
              ) : null}
              <ArkToast.CloseTrigger aria-label="Close">
                {iconNode("x", { width: 14, height: 14 })}
              </ArkToast.CloseTrigger>
            </ArkToast.Root>
          ))
        }
      />
    );
  },
);
export const Toaster = withSelfRoot(ToasterRoot as unknown as typeof ArkToaster);

injectComponentStyle("toast");
