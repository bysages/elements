import { Splitter as ArkSplitter } from "@ark-ui/react/splitter";
import { injectComponentStyle } from "@bysages/core/styling";
import { Fragment } from "react";
import type { ComponentProps } from "react";

import { useElementId } from "../../internal/id";

/** Ark's Splitter, dressed in the paper-and-ink system: panels divide on
 * a hairline and a small paper-seal thumb answers the hand. The API is
 * Ark's own — Root, Panel, ResizeTrigger, ResizeTriggerIndicator. */
function SplitterRoot(props: ComponentProps<typeof ArkSplitter.Root>) {
  const id = useElementId("splitter", props);

  return <ArkSplitter.Root {...props} id={id} />;
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
  className?: string;
}

function SplitterFacade({
  items,
  defaultValue,
  value,
  orientation = "horizontal",
  className,
}: SplitterFacadeProps) {
  return (
    <SplitterRoot
      className={className}
      orientation={orientation}
      panels={items.map((item) => ({ id: item.id }))}
      {...(defaultValue === undefined ? {} : { defaultSize: defaultValue })}
      {...(value === undefined ? {} : { size: value })}
    >
      {items.map((item, index) => {
        const next = items.at(index + 1);
        return (
          <Fragment key={item.id}>
            <ArkSplitter.Panel id={item.id}>{item.label}</ArkSplitter.Panel>
            {next ? (
              <ArkSplitter.ResizeTrigger id={`${item.id}:${next.id}`} aria-label="Resize panels">
                <ArkSplitter.ResizeTriggerIndicator />
              </ArkSplitter.ResizeTrigger>
            ) : null}
          </Fragment>
        );
      })}
    </SplitterRoot>
  );
}

SplitterFacade.displayName = "SSplitter";

type SplitterParts = typeof ArkSplitter;

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Splitter = Object.assign(SplitterFacade, {
  ...ArkSplitter,
  Root: SplitterRoot,
}) as typeof SplitterFacade & SplitterParts;

injectComponentStyle("splitter");
