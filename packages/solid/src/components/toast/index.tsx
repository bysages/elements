import { Toaster as ArkToaster, Toast as ArkToast, createToaster } from "@ark-ui/solid/toast";
import type { ToastOptions } from "@ark-ui/solid/toast";
import { injectComponentStyle } from "@bysages/core/styling";
import {
  Show,
  createComponent,
  mergeProps,
  splitProps,
  type Accessor,
  type ComponentProps,
  type JSX,
} from "solid-js";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
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

export interface ToasterFacadeProps extends Omit<ComponentProps<typeof ArkToaster>, "children"> {
  /** A custom notice card; it receives the machine's toast options. */
  children?: (toast: Accessor<ToastOptions>) => JSX.Element;
}

function ToasterFacade(props: ToasterFacadeProps) {
  injectComponentStyle("toast");
  const [own, rest] = splitProps(props, ["children"]);

  return (
    <ArkToaster {...rest}>
      {(toast) =>
        own.children ? (
          own.children(toast)
        ) : (
          <ArkToast.Root>
            <ArkToast.Title>{toast().title}</ArkToast.Title>
            <Show when={toast().description}>
              <ArkToast.Description>{toast().description}</ArkToast.Description>
            </Show>
            <ArkToast.CloseTrigger aria-label="Close">
              {iconNode("x", { width: "14", height: "14" })}
            </ArkToast.CloseTrigger>
          </ArkToast.Root>
        )
      }
    </ArkToaster>
  );
}

export const Toast: typeof ToastRoot & Omit<typeof ArkToast, "Root"> & { Root: typeof ToastRoot } =
  defineFamily(ToastRoot, {
    ...ArkToast,
    Root: ToastRoot,
  });
export const Toaster: typeof ToasterFacade & { Root: typeof ArkToaster } = defineFamily(
  ToasterFacade,
  { Root: ArkToaster },
);

injectComponentStyle("toast");
