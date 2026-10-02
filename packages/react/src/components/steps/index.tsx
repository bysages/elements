import { Steps as ArkSteps } from "@ark-ui/react/steps";
import { injectComponentStyle } from "@bysages/core";
import type { ComponentProps } from "react";

type StepsRootProps = ComponentProps<typeof ArkSteps.Root> & {
  /** One rung of the control-height ladder every indicator stands on. */
  size?: "sm" | "md" | "lg";
};

function StepsRoot({ size = "md", ...rest }: StepsRootProps) {
  return <ArkSteps.Root {...rest} data-size={size} />;
}

/**
 * Steps — linear progress through a sequence.
 *
 * Parts: Root, List, Item, Trigger, Indicator, Separator, Content,
 * PrevTrigger, NextTrigger, Progress. Indicator and Separator carry
 * data-complete / data-current / data-incomplete.
 */
/** The machine wraps each tab in an item div; presentation keeps the
 * tablist owned children legal while the tab itself keeps its role. */
function StepsItem(props: ComponentProps<typeof ArkSteps.Item>) {
  return <ArkSteps.Item {...props} role="presentation" />;
}

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Steps: Omit<typeof ArkSteps, "Root" | "Item"> & {
  Root: typeof StepsRoot;
  Item: typeof StepsItem;
} = {
  ...ArkSteps,
  Root: StepsRoot,
  Item: StepsItem,
};

injectComponentStyle("steps");
