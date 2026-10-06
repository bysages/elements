import { Steps as ArkSteps } from "@ark-ui/solid/steps";
import type { StepsRootProps as ArkStepsRootProps } from "@ark-ui/solid/steps";
import { injectComponentStyle } from "@bysages/core";
import { splitProps } from "solid-js";
import type { ComponentProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

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
  const id = useElementId("steps", () => rest.id);
  return <ArkSteps.Root {...rest} id={id()} data-size={own.size ?? "md"} />;
}

/** The machine wraps each tab in an item div; presentation keeps the
 * tablist owned children legal while the tab itself keeps its role. */
function StepsItem(props: ComponentProps<typeof ArkSteps.Item>) {
  return <ArkSteps.Item {...props} role="presentation" />;
}

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Steps: typeof StepsRoot & Omit<typeof ArkSteps, "Root"> & { Root: typeof StepsRoot } =
  defineFamily(StepsRoot, {
    ...ArkSteps,
    Root: StepsRoot,
    Item: StepsItem,
  });

injectComponentStyle("steps");
