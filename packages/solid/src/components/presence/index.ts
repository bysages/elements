/** Mount/unmount children in step with CSS presence animations — the
 * engine behind Ark's "postpone unmounting so exit animations finish"
 * contract, exposed for composites of our own. */
export {
  Presence,
  PresenceProvider,
  usePresence,
  usePresenceContext,
} from "@ark-ui/solid/presence";
export type {
  PresenceProps,
  UsePresenceContext,
  UsePresenceProps,
  UsePresenceReturn,
} from "@ark-ui/solid/presence";
