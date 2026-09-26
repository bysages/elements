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
/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Steps: Omit<typeof ArkSteps, "Root"> & { Root: typeof StepsRoot } = {
  ...ArkSteps,
  Root: StepsRoot,
};

injectComponentStyle("steps");
