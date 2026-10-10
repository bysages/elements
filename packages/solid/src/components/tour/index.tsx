import {
  Tour as ArkTour,
  useTour as useArkTour,
  type UseTourProps,
  type UseTourReturn,
} from "@ark-ui/solid/tour";
import { injectComponentStyle } from "@bysages/core/styling";
import { Show, mergeProps, type JSX } from "solid-js";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";
import { Button } from "../button";

export type {
  TourInteractOutsideEvent,
  TourPointerDownOutsideEvent,
  TourStepDetails,
} from "@ark-ui/solid/tour";

/** Ark's Tour, dressed in the paper-and-ink system: a dimmed page where
 * the spotlight alone keeps the focus halo, and the anchored card rides
 * the shared popup vessel. The API is Ark's own — Root, Backdrop,
 * Spotlight, Positioner, Content, Arrow, ArrowTip, Title, Description,
 * ProgressText, Control, Actions, ActionTrigger, CloseTrigger, plus
 * useTour. */

export interface TourFacadeProps {
  tour: UseTourReturn;
  trigger?: string;
  /** Replaces the standard card body when supplied. */
  content?: JSX.Element;
  children?: JSX.Element;
}

function TourFacade(props: TourFacadeProps) {
  injectComponentStyle("tour");

  return (
    <ArkTour.Root tour={props.tour}>
      <Button size="sm" onClick={() => props.tour().start()}>
        {props.trigger ?? "Start tour"}
      </Button>
      {props.children}
      <ArkTour.Backdrop />
      <ArkTour.Spotlight />
      <ArkTour.Positioner>
        <ArkTour.Content>
          <Show when={props.content} fallback={<TourCardBody />}>
            {props.content}
          </Show>
        </ArkTour.Content>
      </ArkTour.Positioner>
    </ArkTour.Root>
  );
}

function TourCardBody() {
  return (
    <>
      <ArkTour.ProgressText />
      <ArkTour.Title />
      <ArkTour.Description />
      <ArkTour.Control>
        <ArkTour.Actions>
          {(actions) => (
            <>
              {actions().map((action) => (
                <ArkTour.ActionTrigger action={action}>{action.label}</ArkTour.ActionTrigger>
              ))}
            </>
          )}
        </ArkTour.Actions>
      </ArkTour.Control>
    </>
  );
}

export const Tour: typeof TourFacade &
  Omit<typeof ArkTour, "Root"> & { Root: typeof ArkTour.Root } = defineFamily(TourFacade, {
  ...ArkTour,
  Root: ArkTour.Root,
});

/** Tour machines are created by useTour, so the stable id belongs there. */
export function useTour(props: UseTourProps = {}): UseTourReturn {
  const id = useElementId("tour", () => props.id);
  return useArkTour(
    mergeProps(props, {
      get id() {
        return id();
      },
    }),
  );
}

injectComponentStyle("tour");
