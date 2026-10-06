import {
  Presence as ArkPresence,
  PresenceProvider as ArkPresenceProvider,
  usePresence,
  usePresenceContext,
} from "@ark-ui/react/presence";

import { withSelfRoot } from "../../internal/family";

/** Mount/unmount children in step with CSS presence animations — the
 * engine behind Ark's "postpone unmounting so exit animations finish"
 * contract, exposed for composites of our own. */
export type {
  PresenceBaseProps,
  PresenceProps,
  UsePresenceContext,
  UsePresenceProps,
  UsePresenceReturn,
} from "@ark-ui/react/presence";
export { usePresence, usePresenceContext };
export const Presence = withSelfRoot(ArkPresence);
export const PresenceProvider = withSelfRoot(ArkPresenceProvider);
