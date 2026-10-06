import { Accordion as ArkAccordion } from "@ark-ui/react/accordion";
import { injectComponentStyle } from "@bysages/core";
import type { ComponentProps } from "react";

import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

/** Ark's Accordion, dressed in the paper-and-ink system: a ruled sheet
 * folded by quiet rows, unfolding with a spring-chevoned dissolve. The
 * API is Ark's own — Root, Item, ItemTrigger, ItemContent, ItemIndicator. */
function AccordionRoot(props: ComponentProps<typeof ArkAccordion.Root>) {
  const id = useElementId("accordion", props);

  return <ArkAccordion.Root {...props} id={id} />;
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
  className?: string;
  onValueChange?: (value: string[]) => void;
}

function AccordionFacade({
  value,
  defaultValue,
  items,
  multiple = false,
  collapsible = true,
  disabled = false,
  orientation = "vertical",
  className,
  onValueChange,
}: AccordionFacadeProps) {
  return (
    <AccordionRoot
      className={className}
      disabled={disabled}
      multiple={multiple}
      collapsible={collapsible}
      orientation={orientation}
      defaultValue={defaultValue}
      {...(value === undefined ? {} : { value })}
      onValueChange={(details: { value: string[] }) => onValueChange?.(details.value)}
    >
      {items.map((item) => (
        <ArkAccordion.Item key={item.value} value={item.value}>
          <ArkAccordion.ItemTrigger>
            {item.title}
            <ArkAccordion.ItemIndicator>{iconNode("chevron-down")}</ArkAccordion.ItemIndicator>
          </ArkAccordion.ItemTrigger>
          <ArkAccordion.ItemContent>
            <p>{item.content}</p>
          </ArkAccordion.ItemContent>
        </ArkAccordion.Item>
      ))}
    </AccordionRoot>
  );
}

AccordionFacade.displayName = "SAccordion";

type AccordionParts = typeof ArkAccordion;

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Accordion = Object.assign(AccordionFacade, {
  ...ArkAccordion,
  Root: AccordionRoot,
}) as typeof AccordionFacade & AccordionParts;

injectComponentStyle("accordion");
