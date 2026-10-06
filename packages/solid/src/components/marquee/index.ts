import { Marquee as ArkMarquee } from "@ark-ui/solid/marquee";
import { injectComponentStyle } from "@bysages/core";
import { createComponent, mergeProps, type ComponentProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** Ark's Marquee, dressed in the paper-and-ink system: a linear ribbon of
 * seal-cut chips that dissolves into the paper at its edges rather than
 * cutting off. The API is Ark's own — Root, Viewport, Content, Edge, Item. */
function MarqueeRoot(props: ComponentProps<typeof ArkMarquee.Root>) {
  const id = useElementId("marquee", () => props.id);

  return createComponent(
    ArkMarquee.Root,
    mergeProps(props, {
      get id() {
        return id();
      },
    }),
  );
}

export const Marquee: typeof MarqueeRoot &
  Omit<typeof ArkMarquee, "Root"> & { Root: typeof MarqueeRoot } = defineFamily(MarqueeRoot, {
  ...ArkMarquee,
  Root: MarqueeRoot,
});
injectComponentStyle("marquee");
