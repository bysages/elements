import { Accordion as ArkAccordion } from "@ark-ui/solid/accordion";
import type { AccordionRootProps as ArkAccordionRootProps } from "@ark-ui/solid/accordion";
import { injectComponentStyle } from "@bysages/core";
import { For } from "solid-js";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

/** Ark's Accordion, dressed in the paper-and-ink system: a ruled sheet
 * folded by quiet rows, unfolding with a spring-chevoned dissolve. The
 * API is Ark's own — Root, Item, ItemTrigger, ItemContent, ItemIndicator. */
function AccordionRoot(props: ArkAccordionRootProps) {
  const id = useElementId("accordion", () => props.id);
  return <ArkAccordion.Root {...props} id={id()} />;
}

export type AccordionItem = {
  value: string;
  title: string;
  content: string;
};

export interface AccordionFacadeProps {
  value?: string[];
  defaultValue?: string[];
  items: AccordionItem[];
  multiple?: boolean;
  collapsible?: boolean;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  onValueChange?: (value: string[]) => void;
}

function AccordionFacade(props: AccordionFacadeProps) {
  injectComponentStyle("accordion");

  return (
    <AccordionRoot
      disabled={props.disabled}
      multiple={props.multiple}
      collapsible={props.collapsible}
      orientation={props.orientation ?? "vertical"}
      defaultValue={props.defaultValue}
      {...(props.value === undefined ? {} : { value: props.value })}
      onValueChange={(details: { value: string[] }) => props.onValueChange?.(details.value)}
    >
      <For each={props.items}>
        {(item) => (
          <ArkAccordion.Item value={item.value}>
            <ArkAccordion.ItemTrigger>
              {item.title}
              <ArkAccordion.ItemIndicator>{iconNode("chevron-down")}</ArkAccordion.ItemIndicator>
            </ArkAccordion.ItemTrigger>
            <ArkAccordion.ItemContent>
              <p>{item.content}</p>
            </ArkAccordion.ItemContent>
          </ArkAccordion.Item>
        )}
      </For>
    </AccordionRoot>
  );
}

type AccordionParts = Omit<typeof ArkAccordion, "Root"> & { Root: typeof AccordionRoot };

export const Accordion: typeof AccordionFacade & AccordionParts = defineFamily(AccordionFacade, {
  ...ArkAccordion,
  Root: AccordionRoot,
});

injectComponentStyle("accordion");
