import { injectComponentStyle } from "@bysages/core";

import TypographyBody from "./TypographyBody.svelte";
import TypographyDisplay from "./TypographyDisplay.svelte";
import TypographyHeading from "./TypographyHeading.svelte";
import TypographyLabel from "./TypographyLabel.svelte";
import TypographyLead from "./TypographyLead.svelte";
import TypographyMuted from "./TypographyMuted.svelte";

/** The typographic voices, named so prose can ask for one: display and
 * heading ride the song-serif, the rest ride the hei. Nothing here is
 * decorative — hierarchy is size, weight, and space. */
export const Typography = Object.assign(TypographyDisplay, {
  Display: TypographyDisplay,
  Heading: TypographyHeading,
  Lead: TypographyLead,
  Body: TypographyBody,
  Muted: TypographyMuted,
  Label: TypographyLabel,
});

export type { TypographyPartProps } from "./props";

injectComponentStyle("typography");
