import {
  Presence as ArkPresence,
  PresenceProvider as ArkPresenceProvider,
} from "@ark-ui/vue/presence";
import { defineComponent, h } from "vue";

import { withSelfRoot } from "../../internal/family";

/** Forward presence callbacks through the thin wrapper so consumers keep
 * Vue's declared-event contract instead of relying on an attrs fallthrough. */
const PresenceRoot = defineComponent({
  name: "SPresenceRoot",
  inheritAttrs: false,
  emits: ["enterComplete", "exitComplete"],
  setup(_, { attrs, emit, slots }) {
    return () =>
      h(
        ArkPresence,
        {
          ...attrs,
          onEnterComplete: () => emit("enterComplete"),
          onExitComplete: () => emit("exitComplete"),
        },
        slots,
      );
  },
}) as unknown as typeof ArkPresence;

/** Mount/unmount children in step with CSS presence animations — the
 * contract that postpones unmounting until exit animations finish,
 * exposed for composites of our own. */
export const Presence = withSelfRoot(PresenceRoot);
export const PresenceProvider = withSelfRoot(ArkPresenceProvider);
export type { PresenceEmits, PresenceProps } from "@ark-ui/vue/presence";
export {
  usePresence,
  usePresenceContext,
  type UsePresenceContext,
  type UsePresenceProps,
  type UsePresenceReturn,
} from "@ark-ui/vue/presence";
