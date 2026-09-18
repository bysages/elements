/** Mount/unmount children in step with CSS presence animations — the
 * engine behind Ark's "postpone unmounting so exit animations finish"
 * contract, exposed for composites of our own. */
export { Presence, type PresenceProps } from "@ark-ui/svelte/presence";

export {
  PresenceProvider,
  splitPresenceProps,
  usePresence,
  usePresenceContext,
  type UsePresenceContext,
  type UsePresenceProps,
  type UsePresenceReturn,
} from "@ark-ui/svelte/presence";
