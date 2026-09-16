import { injectComponentStyle } from "@bysages/core";

import BannerRoot from "./Banner.svelte";
import BannerActions from "./BannerActions.svelte";
import BannerBody from "./BannerBody.svelte";
import BannerClose from "./BannerClose.svelte";
import BannerDescription from "./BannerDescription.svelte";
import BannerIcon from "./BannerIcon.svelte";
import BannerTitle from "./BannerTitle.svelte";

/** A page-level notice, spoken across the full measure: a wash of the
 * status pigment, one heavier hairline on the leading edge, and room
 * for actions and a quiet close. Ink is the neutral register; the four
 * semantic pigments are fixed. */
export const Banner = Object.assign(BannerRoot, {
  Root: BannerRoot,
  Icon: BannerIcon,
  Body: BannerBody,
  Title: BannerTitle,
  Description: BannerDescription,
  Actions: BannerActions,
  Close: BannerClose,
});

export type { BannerCloseProps, BannerPartProps, BannerProps, BannerStatus } from "./props";

injectComponentStyle("banner");
