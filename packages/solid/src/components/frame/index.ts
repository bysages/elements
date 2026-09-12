import { Frame as ArkFrame } from "@ark-ui/solid/frame";

/** Ark's Frame, dressed in the paper-and-ink system: a sandboxed
 * iframe whose body mounts the children and whose `head` prop
 * carries extra <head> elements — styles the child renders must
 * travel through that prop. The frame measures its content and
 * grows to fit; the vessel's border and paper belong to the
 * consumer, since an iframe carries no anatomy attributes for the
 * core stylesheet to hook. The API is Ark's own. */
export const Frame = ArkFrame;
