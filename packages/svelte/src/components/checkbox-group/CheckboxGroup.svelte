<script lang="ts">
import { Checkbox as ArkCheckbox } from "@ark-ui/svelte/checkbox";
import { useFieldContext } from "@ark-ui/svelte/field";
import type { CheckboxGroupProps } from "./props";

let {
  value = $bindable([]),
  options,
  layout = "vertical",
  invalid = false,
  disabled = false,
  ...rest
}: CheckboxGroupProps = $props();

const field = useFieldContext();

const selected = $derived(new Set(value));
const isInvalid = $derived(invalid || field?.()?.invalid === true);
const isDisabled = $derived(disabled || field?.()?.disabled === true);

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
originals. Inside a Field.Root the group picks up the field context,
so the invalid and disabled states a Form routes to its name dress
every box at once. -->
<div
  {...rest}
  role="group"
  data-scope="checkbox-group"
  data-part="root"
  data-layout={layout}
  data-invalid={isInvalid ? "" : undefined}
>
  {#each options as option (option.value)}
    <ArkCheckbox.Root
      checked={selected.has(option.value)}
      invalid={isInvalid}
      disabled={isDisabled || option.disabled === true}
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
