<script lang="ts">
import { RatingGroup as ArkRatingGroup } from "@ark-ui/svelte/rating-group";

import RatingGroupRoot from "./RatingGroupRoot.svelte";
import InternalIcon from "../../internal/InternalIcon.svelte";

let {
  value = $bindable(),
  defaultValue = 0,
  label,
  count = 5,
  disabled = false,
  readOnly = false,
  children,
  ...rest
}: {
  value?: number;
  defaultValue?: number;
  label?: string;
  count?: number;
  disabled?: boolean;
  readOnly?: boolean;
  children?: import("svelte").Snippet;
} & import("./props").RatingGroupRootProps = $props();
</script>

<RatingGroupRoot bind:value {defaultValue} {count} {disabled} readOnly={readOnly} {...rest}>
  {#if label}<ArkRatingGroup.Label>{label}</ArkRatingGroup.Label>{/if}
  <ArkRatingGroup.Control>
    <ArkRatingGroup.Context>
      {#snippet render(api)}
        {#each api().items as item (item)}
          <ArkRatingGroup.Item index={item}><InternalIcon name="star" /></ArkRatingGroup.Item>
        {/each}
      {/snippet}
    </ArkRatingGroup.Context>
    <ArkRatingGroup.HiddenInput />
  </ArkRatingGroup.Control>
  {@render children?.()}
</RatingGroupRoot>
