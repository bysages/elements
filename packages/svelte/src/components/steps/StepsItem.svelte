<script lang="ts">
import { Steps as ArkSteps } from "@ark-ui/svelte/steps";
import type { StepsItemProps } from "@ark-ui/svelte/steps";

let { children, ...rest }: StepsItemProps = $props();
</script>

<ArkSteps.Item {...rest} role="presentation">
  {@render children?.()}
</ArkSteps.Item>
