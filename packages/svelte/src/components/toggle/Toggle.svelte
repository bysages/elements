<script lang="ts">
import { Toggle as ArkToggle } from "@ark-ui/svelte/toggle";

import ToggleRoot from "./ToggleRoot.svelte";

let {
  pressed = $bindable(false),
  label,
  disabled = false,
  children,
  ...rest
}: {
  pressed?: boolean;
  label?: string;
  disabled?: boolean;
  children?: import("svelte").Snippet;
} & import("./props").ToggleRootProps = $props();
</script>

<ToggleRoot bind:pressed aria-label={label} {disabled} {...rest}>
  <ArkToggle.Indicator>{@render children?.()}</ArkToggle.Indicator>
</ToggleRoot>
