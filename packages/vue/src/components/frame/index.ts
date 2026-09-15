import { Frame as ArkFrame } from "@ark-ui/vue/frame";

/** Frame, dressed in the paper-and-ink system: a sandboxed iframe whose
 * body renders the default slot and whose `head` slot teleports style
 * and link elements into the frame's document — styles the child renders
 * must travel through it. (The React wrapper takes the same content as a
 * `head` prop; the two frameworks disagree, as Ark renders it.) The frame
 * measures its content and grows to fit; the vessel's border and paper
 * belong to the consumer, since an iframe carries no anatomy attributes
 * for the core stylesheet to hook. */
export const Frame = ArkFrame;
