import { Tour as ArkTour } from "@ark-ui/svelte/tour";
import { injectComponentStyle } from "@bysages/core";

import { defineFamily } from "../../internal/family";
import TourFacade from "./Tour.svelte";
import TourRoot from "./TourRoot.svelte";
import { useTour } from "./use-tour.svelte";

export type {
  TourInteractOutsideEvent,
  TourPointerDownOutsideEvent,
  TourStepDetails,
} from "@ark-ui/svelte/tour";

/** Tour, dressed in the paper-and-ink system: a dimmed page where the
 * spotlight alone keeps the focus halo, and the anchored card rides the
 * shared popup vessel. The API is Ark's own — Root, Backdrop, Spotlight,
 * Positioner, Content, Arrow, ArrowTip, Title, Description, ProgressText,
 * Control, Actions, ActionTrigger, CloseTrigger, plus useTour. */
export const Tour: typeof TourFacade &
  Omit<typeof ArkTour, "Root"> & {
    Root: typeof TourRoot;
  } = defineFamily(TourFacade, {
  ...ArkTour,
  Root: TourRoot,
});
export { useTour };

injectComponentStyle("tour");
