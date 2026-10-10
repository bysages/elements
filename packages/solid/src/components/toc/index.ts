import { Toc as ArkToc } from "@ark-ui/solid/toc";
import { injectComponentStyle } from "@bysages/core/styling";
import { createComponent, mergeProps, type ComponentProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";
import TocIndicator from "./TocIndicator";

/** Ark's Toc, dressed in the paper-and-ink system: a quiet rail of links
 * beside the scroll, one stroke of primary ink marking where the reader
 * stands. The API is Ark's own — Root, Title, List, Item, Link, Indicator. */
function TocRoot(props: ComponentProps<typeof ArkToc.Root>) {
  const id = useElementId("toc", () => props.id);

  return createComponent(
    ArkToc.Root,
    mergeProps(props, {
      get id() {
        return id();
      },
    }),
  );
}

export const Toc: typeof TocRoot & Omit<typeof ArkToc, "Root"> & { Root: typeof TocRoot } =
  defineFamily(TocRoot, {
    ...ArkToc,
    Root: TocRoot,
    Indicator: TocIndicator,
  });

injectComponentStyle("toc");
