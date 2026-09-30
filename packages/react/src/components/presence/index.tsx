/** Mount/unmount children in step with CSS presence animations — the
 * engine behind Ark's "postpone unmounting so exit animations finish"
 * contract, exposed for composites of our own. */
export {
  Presence,
  type PresenceBaseProps,
  type PresenceProps,
  PresenceProvider,
  type UsePresenceContext,
  type UsePresenceProps,
  type UsePresenceReturn,
  usePresence,
  usePresenceContext,
} from "@ark-ui/react/presence";
