import { Splitter as ArkSplitter } from "@ark-ui/solid/splitter";
import { injectComponentStyle } from "@bysages/core/styling";
import { createComponent, mergeProps, type ComponentProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** Ark's Splitter, dressed in the paper-and-ink system: panels divide on
 * a hairline and a small paper-seal thumb answers the hand. The API is
 * Ark's own — Root, Panel, ResizeTrigger, ResizeTriggerIndicator. */
function SplitterRoot(props: ComponentProps<typeof ArkSplitter.Root>) {
  const id = useElementId("splitter", () => props.id);

  return createComponent(
    ArkSplitter.Root,
    mergeProps(props, {
      get id() {
        return id();
      },
    }),
  );
}

export const Splitter: typeof SplitterRoot &
  Omit<typeof ArkSplitter, "Root"> & { Root: typeof SplitterRoot } = defineFamily(SplitterRoot, {
  ...ArkSplitter,
  Root: SplitterRoot,
});
injectComponentStyle("splitter");
