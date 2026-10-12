import { FloatingPanel as ArkFloatingPanel } from "@ark-ui/solid/floating-panel";
import { injectComponentStyle } from "@bysages/core/styling";
import { For, Show, createComponent, mergeProps, type ComponentProps, type JSX } from "solid-js";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

/** Ark's FloatingPanel, dressed in the paper-and-ink system: the shared
 * popup vessel let loose — a draggable, resizable sheet whose header is the
 * handle. The API is Ark's own — Root, Trigger, Positioner, Content, Header,
 * Title, Control, DragTrigger, StageTrigger, CloseTrigger, ResizeTrigger,
 * Body. */
function FloatingPanelRoot(props: ComponentProps<typeof ArkFloatingPanel.Root>) {
  const id = useElementId("floating-panel", () => props.id);

  return createComponent(
    ArkFloatingPanel.Root,
    mergeProps(props, {
      get id() {
        return id();
      },
    }),
  );
}

const resizeAxes = ["n", "e", "s", "w", "ne", "se", "sw", "nw"] as const;

export interface FloatingPanelFacadeProps {
  open?: boolean;
  defaultOpen?: boolean;
  trigger?: string;
  content?: string;
  label: string;
  description?: string;
  disabled?: boolean;
  children?: JSX.Element;
  onOpenChange?: (open: boolean) => void;
}

function FloatingPanelFacade(props: FloatingPanelFacadeProps) {
  injectComponentStyle("floating-panel");

  return (
    <FloatingPanelRoot
      {...(props.open === undefined ? {} : { open: props.open })}
      {...(props.defaultOpen === undefined ? {} : { defaultOpen: props.defaultOpen })}
      disabled={props.disabled}
      onOpenChange={(details: { open: boolean }) => props.onOpenChange?.(details.open)}
    >
      <ArkFloatingPanel.Trigger>{props.trigger ?? props.label}</ArkFloatingPanel.Trigger>
      <ArkFloatingPanel.Positioner>
        <ArkFloatingPanel.Content>
          <ArkFloatingPanel.DragTrigger>
            <ArkFloatingPanel.Header>
              <ArkFloatingPanel.Title>{props.label}</ArkFloatingPanel.Title>
              <ArkFloatingPanel.Control>
                <ArkFloatingPanel.StageTrigger stage="minimized">
                  {iconNode("minus")}
                </ArkFloatingPanel.StageTrigger>
                <ArkFloatingPanel.StageTrigger stage="maximized">
                  {iconNode("maximize-2")}
                </ArkFloatingPanel.StageTrigger>
                <ArkFloatingPanel.StageTrigger stage="default" aria-label="Restore">
                  {iconNode("minimize-2")}
                </ArkFloatingPanel.StageTrigger>
                <ArkFloatingPanel.CloseTrigger aria-label="Close">
                  {iconNode("x")}
                </ArkFloatingPanel.CloseTrigger>
              </ArkFloatingPanel.Control>
            </ArkFloatingPanel.Header>
          </ArkFloatingPanel.DragTrigger>
          <ArkFloatingPanel.Body>
            <Show when={props.description}>
              <p>{props.description}</p>
            </Show>
            <Show when={props.content}>
              <p>{props.content}</p>
            </Show>
            {props.children}
          </ArkFloatingPanel.Body>
          <For each={[...resizeAxes]}>
            {(axis) => <ArkFloatingPanel.ResizeTrigger axis={axis} />}
          </For>
        </ArkFloatingPanel.Content>
      </ArkFloatingPanel.Positioner>
    </FloatingPanelRoot>
  );
}

export const FloatingPanel: typeof FloatingPanelFacade &
  Omit<typeof ArkFloatingPanel, "Root"> & { Root: typeof FloatingPanelRoot } = defineFamily(
  FloatingPanelFacade,
  {
    ...ArkFloatingPanel,
    Root: FloatingPanelRoot,
  },
);
injectComponentStyle("floating-panel");
