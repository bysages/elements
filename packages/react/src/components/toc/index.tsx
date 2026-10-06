import { Toc as ArkToc } from "@ark-ui/react/toc";
import type { TocItemData } from "@ark-ui/react/toc";
import { injectComponentStyle } from "@bysages/core";
import type { ComponentProps, CSSProperties } from "react";

import { useElementId } from "../../internal/id";

/** Toc, dressed in the paper-and-ink system: a quiet rail of links
 * beside the scroll, one stroke of primary ink marking where the reader
 * stands. The parts — Root, Title, List, Item, Link, Indicator. */
function TocRoot(props: ComponentProps<typeof ArkToc.Root>) {
  const id = useElementId("toc", props);

  return <ArkToc.Root {...props} id={id} />;
}

/** The active stroke is decoration; hidden so the list reads as links
 * alone. */
function TocIndicator(props: ComponentProps<typeof ArkToc.Indicator>) {
  return <ArkToc.Indicator {...props} aria-hidden="true" />;
}

export interface TocFacadeProps {
  items: Array<TocItemData & { label: string }>;
  scrollEl?: () => HTMLElement | null;
  title?: string;
  className?: string;
  style?: CSSProperties;
}

/** The complete rail behind one page: items become anchor rows, the
 * title names the list, and the active stroke follows the scroller. */
function TocFacade({ items, scrollEl, title = "On this page", className, style }: TocFacadeProps) {
  return (
    <TocRoot className={className} style={style} items={items} scrollEl={scrollEl}>
      <ArkToc.Nav>
        {title ? <ArkToc.Title>{title}</ArkToc.Title> : null}
        <ArkToc.List>
          <TocIndicator />
          {items.map((item) => (
            <ArkToc.Item
              key={item.value}
              item={item}
              style={
                item.depth && item.depth > 2
                  ? { paddingInlineStart: `${item.depth - 2}rem` }
                  : undefined
              }
            >
              <ArkToc.Link href={`#${item.value}`}>{item.label}</ArkToc.Link>
            </ArkToc.Item>
          ))}
        </ArkToc.List>
      </ArkToc.Nav>
    </TocRoot>
  );
}

export const Toc = Object.assign(TocFacade, {
  ...ArkToc,
  Root: TocRoot,
  Indicator: TocIndicator,
}) as typeof TocFacade &
  Omit<typeof ArkToc, "Root" | "Indicator"> & {
    Root: typeof TocRoot;
    Indicator: typeof TocIndicator;
  };

injectComponentStyle("toc");
