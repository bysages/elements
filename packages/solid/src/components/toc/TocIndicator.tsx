import { Toc as ArkToc } from "@ark-ui/solid/toc";
import type { ComponentProps } from "solid-js";

/** The active stroke is decoration; hidden so the list reads as links
 * alone. */
function TocIndicator(props: ComponentProps<typeof ArkToc.Indicator>) {
  return <ArkToc.Indicator {...props} aria-hidden="true" />;
}

export default TocIndicator;
