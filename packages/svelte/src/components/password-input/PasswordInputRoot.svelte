<script lang="ts">
import { PasswordInput as ArkPasswordInput } from "@ark-ui/svelte/password-input";
import type { PasswordInputRootProps } from "./props";

let { size = "md", children, ...rest }: PasswordInputRootProps = $props();
</script>

<ArkPasswordInput.Root {...rest} data-size={size}>
  {@render children?.()}
</ArkPasswordInput.Root>
