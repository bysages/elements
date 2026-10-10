import { Collapsible as ArkCollapsible } from "@ark-ui/react/collapsible";
import { injectComponentStyle } from "@bysages/core/styling";
import type { ComponentProps, ReactNode } from "react";

import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

/** Ark's Collapsible, dressed in the paper-and-ink system: one control on
 * the paper, its panel dissolving open to the machine's measured height.
 * The API is Ark's own — Root, Trigger, Content, Indicator. */
function CollapsibleRoot(props: ComponentProps<typeof ArkCollapsible.Root>) {
  const id = useElementId("collapsible", props);

  return <ArkCollapsible.Root {...props} id={id} />;
}

export interface CollapsibleFacadeProps {
  open?: boolean;
  defaultOpen?: boolean;
  label: string;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
  onOpenChange?: (open: boolean) => void;
}

function CollapsibleFacade({
  open,
  defaultOpen = false,
  label,
  disabled = false,
  className,
  children,
  onOpenChange,
}: CollapsibleFacadeProps) {
  return (
    <CollapsibleRoot
      className={className}
      disabled={disabled}
      defaultOpen={defaultOpen}
      {...(open === undefined ? {} : { open })}
      onOpenChange={(details: { open: boolean }) => onOpenChange?.(details.open)}
    >
      <ArkCollapsible.Trigger>
        {label}
        <ArkCollapsible.Indicator>{iconNode("chevron-right")}</ArkCollapsible.Indicator>
      </ArkCollapsible.Trigger>
      <ArkCollapsible.Content>{children}</ArkCollapsible.Content>
    </CollapsibleRoot>
  );
}

CollapsibleFacade.displayName = "SCollapsible";

type CollapsibleParts = typeof ArkCollapsible;

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Collapsible = Object.assign(CollapsibleFacade, {
  ...ArkCollapsible,
  Root: CollapsibleRoot,
}) as typeof CollapsibleFacade & CollapsibleParts;

injectComponentStyle("collapsible");
