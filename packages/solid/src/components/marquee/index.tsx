import { Marquee as ArkMarquee } from "@ark-ui/solid/marquee";
import { injectComponentStyle } from "@bysages/core/styling";
import { Index, createComponent, createMemo, mergeProps, type ComponentProps } from "solid-js";

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

type MarqueeItem = string | { label: string };

export interface MarqueeFacadeProps {
  items: MarqueeItem[];
  spacing?: string;
  speed?: number;
  label?: string;
}

/** The complete ribbon behind a list of short marks. */
function MarqueeFacade(props: MarqueeFacadeProps) {
  injectComponentStyle("marquee");
  const items = createMemo(() =>
    props.items.map((item) => (typeof item === "string" ? item : item.label)),
  );

  return (
    <MarqueeRoot aria-label={props.label} spacing={props.spacing} speed={props.speed}>
      <ArkMarquee.Viewport>
        <ArkMarquee.Content>
          <Index each={items()}>
            {(item) => (
              <ArkMarquee.Item>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  innerHTML='<path d="M12 3 3 9l9 12 9-12-9-6Z" />'
                />
                <span>{item()}</span>
              </ArkMarquee.Item>
            )}
          </Index>
        </ArkMarquee.Content>
      </ArkMarquee.Viewport>
    </MarqueeRoot>
  );
}

export const Marquee: typeof MarqueeFacade &
  Omit<typeof ArkMarquee, "Root"> & { Root: typeof MarqueeRoot } = defineFamily(MarqueeFacade, {
  ...ArkMarquee,
  Root: MarqueeRoot,
});
injectComponentStyle("marquee");
