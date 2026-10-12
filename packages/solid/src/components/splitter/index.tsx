import { Splitter as ArkSplitter } from "@ark-ui/solid/splitter";
import { injectComponentStyle } from "@bysages/core/styling";
import { For, Show, createComponent, mergeProps, type ComponentProps } from "solid-js";

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

export type SplitterItem = {
  id: string;
  label: string;
};

export interface SplitterFacadeProps {
  items: SplitterItem[];
  defaultValue?: number[];
  value?: number[];
  orientation?: "horizontal" | "vertical";
  onValueChange?: (value: number[]) => void;
}

/** The complete equal-height splitter; collapsed panels and custom panel
 * bodies stay on the anatomy. */
function SplitterFacade(props: SplitterFacadeProps) {
  injectComponentStyle("splitter");
  const panels = () => props.items.map((item) => ({ id: item.id }));

  return (
    <SplitterRoot
      orientation={props.orientation ?? "horizontal"}
      panels={panels()}
      defaultSize={props.defaultValue}
      {...(props.value === undefined ? {} : { size: props.value })}
      onResize={(size: { size: number[] }) => props.onValueChange?.(size.size)}
    >
      <For each={props.items}>
        {(item, index) => {
          const next = () => props.items.at(index() + 1);
          return (
            <>
              <ArkSplitter.Panel id={item.id}>{item.label}</ArkSplitter.Panel>
              <Show when={next()}>
                {(nextItem) => (
                  <ArkSplitter.ResizeTrigger
                    id={`${item.id}:${nextItem().id}`}
                    aria-label="Resize panels"
                  >
                    <ArkSplitter.ResizeTriggerIndicator />
                  </ArkSplitter.ResizeTrigger>
                )}
              </Show>
            </>
          );
        }}
      </For>
    </SplitterRoot>
  );
}

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Splitter: typeof SplitterFacade &
  Omit<typeof ArkSplitter, "Root"> & { Root: typeof SplitterRoot } = defineFamily(SplitterFacade, {
  ...ArkSplitter,
  Root: SplitterRoot,
});
injectComponentStyle("splitter");
