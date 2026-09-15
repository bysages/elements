import { Frame as ArkFrame } from "@ark-ui/vue/frame";

/** Frame, dressed in the paper-and-ink system: a sandboxed iframe
 * whose body teleports the default slot and whose head accepts a `head`
 * slot — styles the child renders must travel through that slot. The
 * frame measures its content and grows to fit; the vessel's border and
 * paper belong to the consumer, since an iframe carries no anatomy
 * attributes for the core stylesheet to hook. The parts. */
export const Frame = ArkFrame;
