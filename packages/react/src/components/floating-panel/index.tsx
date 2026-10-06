import { FloatingPanel as ArkFloatingPanel } from "@ark-ui/react/floating-panel";
import { injectComponentStyle } from "@bysages/core";
import type { ComponentProps, ReactNode } from "react";

import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

/** Ark's FloatingPanel, dressed in the paper-and-ink system: the shared
 * popup vessel let loose — a draggable, resizable sheet whose header is the
 * handle. The API is Ark's own — Root, Trigger, Positioner, Content, Header,
 * Title, Control, DragTrigger, StageTrigger, CloseTrigger, ResizeTrigger,
 * Body. */
function FloatingPanelRoot(props: ComponentProps<typeof ArkFloatingPanel.Root>) {
  const id = useElementId("floating-panel", props);

  return <ArkFloatingPanel.Root {...props} id={id} />;
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
  children?: ReactNode;
  onOpenChange?: (open: boolean) => void;
}

function FloatingPanelFacade({
  open,
  defaultOpen,
  trigger,
  content,
  label,
  description,
  disabled = false,
  children,
  onOpenChange,
}: FloatingPanelFacadeProps) {
  return (
    <FloatingPanelRoot
      disabled={disabled}
      {...(open === undefined ? {} : { open })}
      {...(defaultOpen === undefined ? {} : { defaultOpen })}
      onOpenChange={(details: { open: boolean }) => onOpenChange?.(details.open)}
    >
      <ArkFloatingPanel.Trigger>{trigger ?? label}</ArkFloatingPanel.Trigger>
      <ArkFloatingPanel.Positioner>
        <ArkFloatingPanel.Content>
          <ArkFloatingPanel.DragTrigger>
            <ArkFloatingPanel.Header>
              <ArkFloatingPanel.Title>{label}</ArkFloatingPanel.Title>
              <ArkFloatingPanel.Control>
                <ArkFloatingPanel.StageTrigger stage="minimized">
                  {iconNode("minus")}
                </ArkFloatingPanel.StageTrigger>
                <ArkFloatingPanel.StageTrigger stage="maximized">
                  {iconNode("maximize-2")}
                </ArkFloatingPanel.StageTrigger>
                <ArkFloatingPanel.CloseTrigger aria-label="Close">
                  {iconNode("x")}
                </ArkFloatingPanel.CloseTrigger>
              </ArkFloatingPanel.Control>
            </ArkFloatingPanel.Header>
          </ArkFloatingPanel.DragTrigger>
          <ArkFloatingPanel.Body>
            {description ? <p>{description}</p> : null}
            {content ? <p>{content}</p> : null}
            {children}
          </ArkFloatingPanel.Body>
          {resizeAxes.map((axis) => (
            <ArkFloatingPanel.ResizeTrigger key={axis} axis={axis} />
          ))}
        </ArkFloatingPanel.Content>
      </ArkFloatingPanel.Positioner>
    </FloatingPanelRoot>
  );
}

FloatingPanelFacade.displayName = "SFloatingPanel";

type FloatingPanelParts = typeof ArkFloatingPanel;

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const FloatingPanel = Object.assign(FloatingPanelFacade, {
  ...ArkFloatingPanel,
  Root: FloatingPanelRoot,
}) as typeof FloatingPanelFacade & FloatingPanelParts;

injectComponentStyle("floating-panel");
