<script lang="ts">
import { Steps as ArkSteps } from "@ark-ui/svelte/steps";

import StepsRoot from "./StepsRoot.svelte";

export type StepsItem = { title: string };

let {
  step = $bindable(),
  defaultStep = 0,
  items,
  linear = false,
  orientation = "horizontal",
  variant = "default",
  children,
  ...rest
}: {
  step?: number;
  defaultStep?: number;
  items: StepsItem[];
  linear?: boolean;
  orientation?: "horizontal" | "vertical";
  /** Default renders numbered seals; dot reduces each step to a bead. */
  variant?: "default" | "dot";
  children?: import("svelte").Snippet;
} & import("./props").StepsRootProps = $props();
</script>

<StepsRoot bind:step {defaultStep} count={items.length} {linear} {orientation} {variant} {...rest}>
  <ArkSteps.List>
    {#each items as item, index (item.title)}
      <ArkSteps.Item index={index} role="presentation">
        <ArkSteps.Trigger>
          <ArkSteps.Indicator>{#if variant !== "dot"}{index + 1}{/if}</ArkSteps.Indicator>
          {item.title}
        </ArkSteps.Trigger>
        <ArkSteps.Separator />
      </ArkSteps.Item>
    {/each}
  </ArkSteps.List>
  {@render children?.()}
</StepsRoot>
