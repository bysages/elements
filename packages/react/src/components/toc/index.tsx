import { Toc as ArkToc } from "@ark-ui/react/toc";
import { injectComponentStyle } from "@bysages/core";
import type { ComponentProps } from "react";

/** Ark's Toc, dressed in the paper-and-ink system: a quiet rail of links
 * beside the scroll, one stroke of primary ink marking where the reader
 * stands. The API is Ark's own — Root, Title, List, Item, Link, Indicator. */
/** The active stroke is decoration; hidden so the list reads as links
 * alone. */
function TocIndicator(props: ComponentProps<typeof ArkToc.Indicator>) {
  return <ArkToc.Indicator {...props} aria-hidden="true" />;
}

export const Toc: Omit<typeof ArkToc, "Indicator"> & { Indicator: typeof TocIndicator } = {
  ...ArkToc,
  Indicator: TocIndicator,
};

injectComponentStyle("toc");
