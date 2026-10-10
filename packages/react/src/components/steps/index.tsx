import { Steps as ArkSteps } from "@ark-ui/react/steps";
import { injectComponentStyle } from "@bysages/core/styling";
import type { ComponentProps } from "react";

import { useElementId } from "../../internal/id";

type StepsRootProps = ComponentProps<typeof ArkSteps.Root> & {
  /** One rung of the control-height ladder every indicator stands on. */
  size?: "sm" | "md" | "lg";
};

function StepsRoot(props: StepsRootProps) {
  const id = useElementId("steps", props);
  const { size = "md", ...rest } = props;

  return <ArkSteps.Root {...rest} id={id} data-size={size} />;
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
  className?: string;
  onStepChange?: (step: number) => void;
}

function StepsFacade({
  items,
  step,
  defaultStep = 0,
  linear = false,
  orientation = "horizontal",
  size = "md",
  className,
  onStepChange,
}: StepsFacadeProps) {
  return (
    <StepsRoot
      className={className}
      size={size}
      count={items.length}
      linear={linear}
      orientation={orientation}
      defaultStep={defaultStep}
      {...(step === undefined ? {} : { step })}
      onStepChange={(details: { step: number }) => onStepChange?.(details.step)}
    >
      <ArkSteps.List>
        {items.map((item, index) => (
          <ArkSteps.Item key={item.title} index={index} role="presentation">
            <ArkSteps.Trigger>
              <ArkSteps.Indicator>{String(index + 1)}</ArkSteps.Indicator>
              {item.title}
            </ArkSteps.Trigger>
            <ArkSteps.Separator />
          </ArkSteps.Item>
        ))}
      </ArkSteps.List>
    </StepsRoot>
  );
}

StepsFacade.displayName = "SSteps";

/** The machine wraps each tab in an item div; presentation keeps the
 * tablist owned children legal while the tab itself keeps its role. */
function StepsItem(props: ComponentProps<typeof ArkSteps.Item>) {
  return <ArkSteps.Item {...props} role="presentation" />;
}

/**
 * Steps — linear progress through a sequence.
 *
 * Parts: Root, List, Item, Trigger, Indicator, Separator, Content,
 * PrevTrigger, NextTrigger, Progress. Indicator and Separator carry
 * data-complete / data-current / data-incomplete.
 */
type StepsParts = Omit<typeof ArkSteps, "Root" | "Item"> & {
  Root: typeof StepsRoot;
  Item: typeof StepsItem;
};

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Steps = Object.assign(StepsFacade, {
  ...ArkSteps,
  Root: StepsRoot,
  Item: StepsItem,
}) as typeof StepsFacade & StepsParts;

injectComponentStyle("steps");
