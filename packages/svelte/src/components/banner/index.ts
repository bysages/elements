import { defineFamily } from "../../internal/family";
import BannerRoot from "./Banner.svelte";
import BannerActions from "./BannerActions.svelte";
import BannerBody from "./BannerBody.svelte";
import BannerClose from "./BannerClose.svelte";
import BannerDescription from "./BannerDescription.svelte";
import BannerFacade from "./BannerFacade.svelte";
import BannerIcon from "./BannerIcon.svelte";
import BannerTitle from "./BannerTitle.svelte";

/** A page-level notice, spoken across the full measure: a wash of the
 * status pigment, one heavier hairline on the leading edge, and room
 * for actions and a quiet close. Ink is the neutral register; the four
 * semantic pigments are fixed. */
export const Banner: typeof BannerFacade & {
  Root: typeof BannerRoot;
  Icon: typeof BannerIcon;
  Body: typeof BannerBody;
  Title: typeof BannerTitle;
  Description: typeof BannerDescription;
  Actions: typeof BannerActions;
  Close: typeof BannerClose;
} = defineFamily(BannerFacade, {
  Root: BannerRoot,
  Icon: BannerIcon,
  Body: BannerBody,
  Title: BannerTitle,
  Description: BannerDescription,
  Actions: BannerActions,
  Close: BannerClose,
});

export type {
  BannerCloseProps,
  BannerFacadeProps,
  BannerPartProps,
  BannerProps,
  BannerStatus,
} from "./props";
