import { Tour as ArkTour, useTour } from "@ark-ui/svelte/tour";
import { injectComponentStyle } from "@bysages/core";

export type {
  TourInteractOutsideEvent,
  TourPointerDownOutsideEvent,
  TourStepDetails,
} from "@ark-ui/svelte/tour";

/** Ark's Tour, dressed in the paper-and-ink system: a dimmed page where
 * the spotlight alone keeps the focus halo, and the anchored card rides
 * the shared popup vessel. The API is Ark's own — Root, Backdrop,
 * Spotlight, Positioner, Content, Arrow, ArrowTip, Title, Description,
 * ProgressText, Control, Actions, ActionTrigger, CloseTrigger, plus
 * useTour. */
export const Tour = ArkTour;
export { useTour };

injectComponentStyle("tour");
