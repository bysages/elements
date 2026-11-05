<script lang="ts">
import { Tour as ArkTour, type UseTourReturn } from "@ark-ui/svelte/tour";
import { injectComponentStyle } from "@bysages/core/styling";

import { Button } from "../button";
import TourRoot from "./TourRoot.svelte";

injectComponentStyle("tour");

let {
  tour,
  trigger = "Start tour",
  content,
  portal = true,
  children,
  ...rest
}: {
  tour: UseTourReturn;
  trigger?: string;
  content?: import("svelte").Snippet;
  children?: import("svelte").Snippet;
  /** After hydration, portal the floating vessel to body (`true`) or a CSS selector. */
  portal?: import("../../internal/floating").FloatingPortalTarget;
} & import("@ark-ui/svelte/tour").TourRootProps = $props();
</script>

<TourRoot {tour} {...rest}>
  <Button size="sm" onclick={() => tour().start()}>{trigger}</Button>
  {@render children?.()}
  <ArkTour.Backdrop />
  <ArkTour.Spotlight />
  <ArkTour.Positioner>
    <ArkTour.Content>
      {#if content}
        {@render content()}
      {:else}
        <ArkTour.ProgressText />
        <ArkTour.Title />
        <ArkTour.Description />
        <ArkTour.Control>
          <ArkTour.Actions>
            {#snippet render(actions)}
              {#each actions as action (action.label)}
                <ArkTour.ActionTrigger action={action}>{action.label}</ArkTour.ActionTrigger>
              {/each}
            {/snippet}
          </ArkTour.Actions>
        </ArkTour.Control>
      {/if}
    </ArkTour.Content>
  </ArkTour.Positioner>
</TourRoot>
