import { Steps as ArkSteps } from "@ark-ui/solid/steps";
import type { StepsRootProps as ArkStepsRootProps } from "@ark-ui/solid/steps";
import { injectComponentStyle } from "@bysages/core";
import { For, splitProps, type ComponentProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/**
 * Steps — linear progress through a sequence.
 *
 * Parts: Root, List, Item, Trigger, Indicator, Separator, Content,
 * PrevTrigger, NextTrigger, Progress. Indicator and Separator carry
 * data-complete / data-current / data-incomplete.
 */

type StepsRootProps = ArkStepsRootProps & StepsOwnProps;

type StepsOwnProps = {
  /** One rung of the control-height ladder every indicator stands on. */
  size?: "sm" | "md" | "lg";
};

function StepsRoot(props: StepsRootProps) {
  const [own, rest] = splitProps(props, ["size"]);
  const id = useElementId("steps", () => rest.id);
  return <ArkSteps.Root {...rest} id={id()} data-size={own.size ?? "md"} />;
}

export type StepsItem = {
  title: string;
};

export interface StepsFacadeProps {
  items: StepsItem[];
  step?: number;
  defaultStep?: number;
  linear?: boolean;
  orientation?: "horizontal" | "vertical";
  /** One rung of the control-height ladder every indicator stands on. */
  size?: "sm" | "md" | "lg";
  class?: string;
  onStepChange?: (step: number) => void;
}

function StepsFacade(props: StepsFacadeProps) {
  injectComponentStyle("steps");

  return (
    <StepsRoot
      class={props.class}
      size={props.size ?? "md"}
      count={props.items.length}
      linear={props.linear ?? false}
      orientation={props.orientation ?? "horizontal"}
      defaultStep={props.defaultStep ?? 0}
      {...(props.step === undefined ? {} : { step: props.step })}
      onStepChange={(details: { step: number }) => props.onStepChange?.(details.step)}
    >
      <ArkSteps.List>
        <For each={props.items}>
          {(item, index) => (
            <ArkSteps.Item index={index()} role="presentation">
              <ArkSteps.Trigger>
                <ArkSteps.Indicator>{String(index() + 1)}</ArkSteps.Indicator>
                {item.title}
              </ArkSteps.Trigger>
              <ArkSteps.Separator />
            </ArkSteps.Item>
          )}
        </For>
      </ArkSteps.List>
    </StepsRoot>
  );
}

/** The machine wraps each tab in an item div; presentation keeps the
 * tablist owned children legal while the tab itself keeps its role. */
function StepsItem(props: ComponentProps<typeof ArkSteps.Item>) {
  return <ArkSteps.Item {...props} role="presentation" />;
}

/* Ark's namespace is frozen — spread copies the members so the facade
 * coexists with the anatomy while Root stays the sized wrapper. */
export const Steps: typeof StepsFacade &
  Omit<typeof ArkSteps, "Root" | "Item"> & {
    Root: typeof StepsRoot;
    Item: typeof StepsItem;
  } = defineFamily(StepsFacade, {
  ...ArkSteps,
  Root: StepsRoot,
  Item: StepsItem,
});

injectComponentStyle("steps");
