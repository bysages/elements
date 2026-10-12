import { Toc as ArkToc } from "@ark-ui/solid/toc";
import type { TocItemData } from "@ark-ui/solid/toc";
import { injectComponentStyle } from "@bysages/core/styling";
import { For, createComponent, mergeProps, type ComponentProps } from "solid-js";

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

/** The content column is the scroller the rail walks — a keyboard
 * reader needs to reach it like any scroll region. */
function TocContent(props: ComponentProps<typeof ArkToc.Content>) {
  return <ArkToc.Content {...props} tabindex={0} />;
}

type TocItem = { value: string; label: string; depth?: number };

function toTocItems(items: TocItem[]): TocItemData[] {
  return items.map((item) => ({ value: item.value, depth: item.depth ?? 2 }));
}

export interface TocFacadeProps {
  items: TocItem[];
  scrollEl?: () => HTMLElement | null;
  title?: string;
}

/** The complete rail behind one page: items become anchor rows, the
 * title names the list, and the active stroke follows the scroller. */
function TocFacade(props: TocFacadeProps) {
  injectComponentStyle("toc");
  const items = () => toTocItems(props.items);

  return (
    <TocRoot items={items()} scrollEl={props.scrollEl}>
      <ArkToc.Nav>
        <ArkToc.Title>{props.title ?? "On this page"}</ArkToc.Title>
        <ArkToc.List>
          <TocIndicator />
          <For each={props.items}>
            {(item) => (
              <ArkToc.Item item={{ value: item.value, depth: item.depth ?? 2 }}>
                <ArkToc.Link href={`#${item.value}`}>{item.label}</ArkToc.Link>
              </ArkToc.Item>
            )}
          </For>
        </ArkToc.List>
      </ArkToc.Nav>
    </TocRoot>
  );
}

export const Toc: typeof TocFacade &
  Omit<typeof ArkToc, "Root" | "Indicator" | "Content"> & {
    Root: typeof TocRoot;
    Indicator: typeof TocIndicator;
    Content: typeof TocContent;
  } = defineFamily(TocFacade, {
  ...ArkToc,
  Root: TocRoot,
  Indicator: TocIndicator,
  Content: TocContent,
});

injectComponentStyle("toc");
