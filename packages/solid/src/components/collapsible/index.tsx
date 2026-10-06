import { Collapsible as ArkCollapsible } from "@ark-ui/solid/collapsible";
import { injectComponentStyle } from "@bysages/core";
import { createComponent, mergeProps, type ComponentProps, type JSX } from "solid-js";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

/** Ark's Collapsible, dressed in the paper-and-ink system: one control on
 * the paper, its panel dissolving open to the machine's measured height.
 * The API is Ark's own — Root, Trigger, Content, Indicator. */
function CollapsibleRoot(props: ComponentProps<typeof ArkCollapsible.Root>) {
  const id = useElementId("collapsible", () => props.id);

  return createComponent(
    ArkCollapsible.Root,
    mergeProps(props, {
      get id() {
        return id();
      },
    }),
  );
}

export interface CollapsibleFacadeProps {
  open?: boolean;
  defaultOpen?: boolean;
  label: string;
  disabled?: boolean;
  children?: JSX.Element;
  onOpenChange?: (open: boolean) => void;
}

function CollapsibleFacade(props: CollapsibleFacadeProps) {
  injectComponentStyle("collapsible");

  return (
    <CollapsibleRoot
      disabled={props.disabled}
      {...(props.open === undefined ? {} : { open: props.open })}
      {...(props.defaultOpen === undefined ? {} : { defaultOpen: props.defaultOpen })}
      onOpenChange={(details: { open: boolean }) => props.onOpenChange?.(details.open)}
    >
      <ArkCollapsible.Trigger>
        {props.label}
        <ArkCollapsible.Indicator>{iconNode("chevron-right")}</ArkCollapsible.Indicator>
      </ArkCollapsible.Trigger>
      <ArkCollapsible.Content>{props.children}</ArkCollapsible.Content>
    </CollapsibleRoot>
  );
}

type CollapsibleParts = Omit<typeof ArkCollapsible, "Root"> & { Root: typeof CollapsibleRoot };

export const Collapsible: typeof CollapsibleFacade & CollapsibleParts = defineFamily(
  CollapsibleFacade,
  {
    ...ArkCollapsible,
    Root: CollapsibleRoot,
  },
);

injectComponentStyle("collapsible");
