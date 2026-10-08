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
  children,
  ...rest
}: {
  step?: number;
  defaultStep?: number;
  items: StepsItem[];
  linear?: boolean;
  orientation?: "horizontal" | "vertical";
  children?: import("svelte").Snippet;
} & import("./props").StepsRootProps = $props();
</script>

<StepsRoot bind:step {defaultStep} count={items.length} {linear} {orientation} {...rest}>
  <ArkSteps.List>
    {#each items as item, index (item.title)}
      <ArkSteps.Item index={index} role="presentation">
        <ArkSteps.Trigger>
          <ArkSteps.Indicator>{index + 1}</ArkSteps.Indicator>
          {item.title}
        </ArkSteps.Trigger>
        <ArkSteps.Separator />
      </ArkSteps.Item>
    {/each}
  </ArkSteps.List>
  {@render children?.()}
</StepsRoot>
