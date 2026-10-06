/** Mount/unmount children in step with CSS presence animations — the
 * engine behind Ark's "postpone unmounting so exit animations finish"
 * contract, exposed for composites of our own. */
import {
  Presence as ArkPresence,
  PresenceProvider as ArkPresenceProvider,
  splitPresenceProps,
  usePresence,
  usePresenceContext,
  type PresenceProps,
  type UsePresenceContext,
  type UsePresenceProps,
  type UsePresenceReturn,
} from "@ark-ui/svelte/presence";

import { withSelfRoot } from "../../internal/family";

export const Presence = withSelfRoot(ArkPresence);
export const PresenceProvider = ArkPresenceProvider;

export { splitPresenceProps, usePresence, usePresenceContext };
export type { PresenceProps, UsePresenceContext, UsePresenceProps, UsePresenceReturn };
