import { Frame as ArkFrame } from "@ark-ui/vue/frame";
import type { Ref } from "vue";
import { defineComponent, h, onMounted, ref } from "vue";

import { withSelfRoot } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** Frame, dressed in the paper-and-ink system: a sandboxed iframe whose
 * body renders the default slot and whose `head` slot teleports style
 * and link elements into the frame's document — styles the child renders
 * must travel through it. The frame measures its content and grows to
 * fit; the vessel's border and paper
 * belong to the consumer, since an iframe carries no anatomy attributes
 * for the core stylesheet to hook. */
const FrameRoot = defineComponent({
  name: "SFrameRoot",
  inheritAttrs: false,
  setup(_, { attrs, slots, expose }) {
    const id = useElementId("frame", attrs);
    const frame = ref<{ frameRef?: Ref<HTMLIFrameElement | null> } | null>(null);
    // Ark's frame writes its teleports only after the iframe exists, so a
    // static SSR shell keeps hydration exact; the live frame takes over
    // once the client has mounted.
    const mounted = ref(false);
    onMounted(() => {
      mounted.value = true;
    });

    // The inner frame hands over its document element; forwarding it keeps
    // the imperative escape hatch consumers already use.
    expose({
      get frameRef() {
        return frame.value?.frameRef ?? null;
      },
    });

    return () =>
      mounted.value
        ? h(ArkFrame, { ref: frame, ...attrs, id: id.value }, slots)
        : h("iframe", { ...attrs, id: id.value });
  },
}) as unknown as typeof ArkFrame;

export const Frame = withSelfRoot(FrameRoot);
