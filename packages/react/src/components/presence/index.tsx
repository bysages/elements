/** Mount/unmount children in step with CSS presence animations — the
 * engine behind Ark's "postpone unmounting so exit animations finish"
 * contract, exposed for composites of our own. */
export { Presence, type PresenceBaseProps, type PresenceProps } from "@ark-ui/react/presence";

export {
  PresenceProvider,
  usePresence,
  usePresenceContext,
  type UsePresenceContext,
  type UsePresenceProps,
  type UsePresenceReturn,
} from "@ark-ui/react/presence";
