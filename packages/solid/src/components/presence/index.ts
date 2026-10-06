/** Mount/unmount children in step with CSS presence animations — the
 * engine behind Ark's "postpone unmounting so exit animations finish"
 * contract, exposed for composites of our own. */
import {
  Presence as ArkPresence,
  PresenceProvider as ArkPresenceProvider,
} from "@ark-ui/solid/presence";

import { withSelfRoot } from "../../internal/family";

export const Presence = withSelfRoot(ArkPresence);
export const PresenceProvider = withSelfRoot(ArkPresenceProvider);

export { usePresence, usePresenceContext } from "@ark-ui/solid/presence";
export type {
  PresenceProps,
  UsePresenceContext,
  UsePresenceProps,
  UsePresenceReturn,
} from "@ark-ui/solid/presence";
