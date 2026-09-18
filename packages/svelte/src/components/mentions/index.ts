import { injectComponentStyle } from "@bysages/core";

import MentionsComponent from "./Mentions.svelte";
import MentionsVesselComponent from "./MentionsVessel.svelte";

/** @-mentions: a plain textarea that, when the text before the caret
 * ends with the trigger character followed by a token, offers the
 * matching candidates in a small anchored vessel; choosing one replaces
 * the token with `trigger + label` and hands the whole text back
 * through `bind:value`. Arrows move, Enter inserts, Escape dismisses. */
export const Mentions = MentionsComponent;

/** The vessel: the candidates themselves as a floating card. Composers
 * that keep their own field anatomy wire it up with `useMentions`
 * directly. */
export const MentionsVessel = MentionsVesselComponent;

export { useMentions } from "./use-mentions.svelte";

export type {
  MentionEntry,
  MentionsProps,
  MentionsVesselProps,
  UseMentionsHandlers,
  UseMentionsOptions,
} from "./props";

injectComponentStyle("mentions");
