import { Steps as ArkSteps } from "@ark-ui/solid/steps";
import type { StepsRootProps as ArkStepsRootProps } from "@ark-ui/solid/steps";
import { injectComponentStyle } from "@bysages/core";
import { splitProps } from "solid-js";

/**
 * Steps — linear progress through a sequence.
 *
 * Parts: Root, List, Item, Trigger, Indicator, Separator, Content,
 * PrevTrigger, NextTrigger, Progress. Indicator and Separator carry
 * data-complete / data-current / data-incomplete.
 */

type StepsOwnProps = {
  /** One rung of the control-height ladder every indicator stands on. */
  size?: "sm" | "md" | "lg";
};

function StepsRoot(props: ArkStepsRootProps & StepsOwnProps) {
  const [own, rest] = splitProps(props, ["size"]);
  return <ArkSteps.Root {...rest} data-size={own.size ?? "md"} />;
}

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Steps: Omit<typeof ArkSteps, "Root"> & { Root: typeof StepsRoot } = {
  ...ArkSteps,
  Root: StepsRoot,
};

injectComponentStyle("steps");
