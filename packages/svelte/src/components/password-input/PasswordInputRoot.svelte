<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("password-input");

import { PasswordInput as ArkPasswordInput } from "@ark-ui/svelte/password-input";
import { useElementId } from "../../internal/id";
import type { PasswordInputRootProps } from "./props";

let { size = "md", children, ...rest }: PasswordInputRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("password-input", generatedId, rest.id));
</script>

<ArkPasswordInput.Root {...rest} {id} data-size={size}>
  {@render children?.()}
</ArkPasswordInput.Root>
