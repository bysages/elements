<script lang="ts">
import { PasswordInput as ArkPasswordInput } from "@ark-ui/svelte/password-input";

import PasswordInputRoot from "./PasswordInputRoot.svelte";
import InternalIcon from "../../internal/InternalIcon.svelte";

let {
  value = $bindable(),
  defaultValue,
  label,
  placeholder,
  autoComplete,
  disabled = false,
  invalid = false,
  required = false,
  children,
  ...rest
}: {
  value?: string;
  defaultValue?: string;
  label?: string;
  placeholder?: string;
  autoComplete?: "current-password" | "new-password";
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  children?: import("svelte").Snippet;
} & import("./props").PasswordInputRootProps = $props();
</script>

{#snippet eyeOpen()}
  <InternalIcon name="eye" />
{/snippet}

{#snippet eyeClosed()}
  <InternalIcon name="eye-off" />
{/snippet}

<PasswordInputRoot {autoComplete} {disabled} {invalid} {required} {...rest}>
  {#if label}<ArkPasswordInput.Label>{label}</ArkPasswordInput.Label>{/if}
  <ArkPasswordInput.Control>
    <ArkPasswordInput.Input bind:value {placeholder} {defaultValue} />
    <ArkPasswordInput.VisibilityTrigger>
      <ArkPasswordInput.Indicator fallback={eyeClosed}>
        {#snippet children()}{@render eyeOpen()}{/snippet}
      </ArkPasswordInput.Indicator>
    </ArkPasswordInput.VisibilityTrigger>
  </ArkPasswordInput.Control>
  {@render children?.()}
</PasswordInputRoot>
