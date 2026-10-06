import {
  Tour as ArkTour,
  useTour as useArkTour,
  type UseTourProps,
  type UseTourReturn,
} from "@ark-ui/react/tour";
import { injectComponentStyle } from "@bysages/core";
import type { ComponentProps, ReactNode } from "react";

import { useElementId } from "../../internal/id";
import { Button } from "../button";

export type {
  TourInteractOutsideEvent,
  TourPointerDownOutsideEvent,
  TourStepDetails,
} from "@ark-ui/react/tour";

/** Ark's Tour, dressed in the paper-and-ink system: a dimmed page where
 * the spotlight alone keeps the focus halo, and the anchored card rides
 * the shared popup vessel. The API is Ark's own — Root, Backdrop,
 * Spotlight, Positioner, Content, Arrow, ArrowTip, Title, Description,
 * ProgressText, Control, Actions, ActionTrigger, CloseTrigger, plus
 * useTour. */
function TourRoot(props: ComponentProps<typeof ArkTour.Root>) {
  return <ArkTour.Root {...props} />;
}

export interface TourFacadeProps {
  tour: UseTourReturn;
  trigger?: string;
  /** Replaces the standard card body when supplied. */
  content?: ReactNode;
  children?: ReactNode;
}

function TourFacade({ tour, trigger = "Start tour", content, children }: TourFacadeProps) {
  return (
    <TourRoot tour={tour}>
      <Button size="sm" onClick={() => tour.start()}>
        {trigger}
      </Button>
      {children}
      <ArkTour.Backdrop />
      <ArkTour.Spotlight />
      <ArkTour.Positioner>
        <ArkTour.Content>
          {content ?? (
            <>
              <ArkTour.ProgressText />
              <ArkTour.Title />
              <ArkTour.Description />
              <ArkTour.Control>
                <ArkTour.Actions>
                  {(actions) =>
                    actions.map((action) => (
                      <ArkTour.ActionTrigger key={action.label} action={action}>
                        {action.label}
                      </ArkTour.ActionTrigger>
                    ))
                  }
                </ArkTour.Actions>
              </ArkTour.Control>
            </>
          )}
        </ArkTour.Content>
      </ArkTour.Positioner>
    </TourRoot>
  );
}

TourFacade.displayName = "STour";

type TourParts = typeof ArkTour;

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the wrapper while the rest stay Ark's own parts. */
export const Tour = Object.assign(TourFacade, {
  ...ArkTour,
  Root: TourRoot,
}) as typeof TourFacade & TourParts;

/** Tour machines are created by useTour, so the stable id belongs there. */
export function useTour(props: UseTourProps = {}): UseTourReturn {
  const id = useElementId("tour", props);

  return useArkTour({ id, ...props });
}

injectComponentStyle("tour");
