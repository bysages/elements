<script lang="ts">
import { Checkbox as ArkCheckbox } from "@ark-ui/svelte/checkbox";
import type { CheckboxGroupProps } from "./props";

let {
  value = $bindable([]),
  options,
  layout = "vertical",
  disabled = false,
  ...rest
}: CheckboxGroupProps = $props();

const selected = $derived(new Set(value));

function toggle(option: string) {
  const next = new Set(selected);
  if (next.has(option)) next.delete(option);
  else next.add(option);
  value = [...next];
}
</script>

<!-- One question, many answers: a labelled stack (or row) of the
seal-cut checkboxes bound to a single array. The group itself is
semantics (`role="group"`), the boxes stay the machine-driven
originals. -->
<div {...rest} role="group" data-scope="checkbox-group" data-part="root" data-layout={layout}>
  {#each options as option (option.value)}
    <ArkCheckbox.Root
      checked={selected.has(option.value)}
      disabled={disabled || option.disabled === true}
      onCheckedChange={() => toggle(option.value)}
    >
      <ArkCheckbox.Control>
        <ArkCheckbox.Indicator>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="m5 12.5 5 5L19 7" />
          </svg>
        </ArkCheckbox.Indicator>
      </ArkCheckbox.Control>
      <ArkCheckbox.Label>{option.label}</ArkCheckbox.Label>
      <ArkCheckbox.HiddenInput />
    </ArkCheckbox.Root>
  {/each}
</div>
