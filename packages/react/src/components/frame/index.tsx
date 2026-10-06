import { Frame as ArkFrame, type FrameProps } from "@ark-ui/react/frame";
import { forwardRef } from "react";

import { withSelfRoot } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** Ark's Frame, dressed in the paper-and-ink system: a sandboxed
 * iframe whose body teleports the children and whose `head` prop
 * carries extra <head> nodes — styles the child renders must travel
 * through that prop. The frame measures its content and grows to
 * fit; the vessel's border and paper belong to the consumer, since
 * an iframe carries no anatomy attributes for the core stylesheet
 * to hook. The API is Ark's own. */
const FrameRoot = forwardRef<HTMLIFrameElement, FrameProps>(function FrameRoot(props, ref) {
  const id = useElementId("frame", props);

  return <ArkFrame ref={ref} {...props} id={id} />;
});

export const Frame = withSelfRoot(FrameRoot as unknown as typeof ArkFrame);
