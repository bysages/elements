<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("checkbox-group");

import { Checkbox as ArkCheckbox } from "@ark-ui/svelte/checkbox";
import { useFieldContext } from "@ark-ui/svelte/field";
import InternalIcon from "../../internal/InternalIcon.svelte";
import type { CheckboxGroupProps } from "./props";

let {
  value = $bindable(),
  options,
  layout = "vertical",
  size = "md",
  invalid = false,
  disabled = false,
  ...rest
}: CheckboxGroupProps = $props();

const field = useFieldContext();

// A field context bends every box's hidden input onto the field's own
// id, so labels of a multi-box group would all activate the first box —
// each box claims its own ids instead.
const uid = $props.id();

const isInvalid = $derived(invalid || field?.()?.invalid === true);
const isDisabled = $derived(disabled || field?.()?.disabled === true);
</script>

<!-- One question, many answers: a labelled stack (or row) of the
seal-cut checkboxes bound to a single array. Ark's group machine owns
selection; each box joins it by value. Inside a Field.Root the group
picks up the field context, so the invalid and disabled states a Form
routes to its name dress every box at once. -->
<ArkCheckbox.Group
  bind:value
  disabled={isDisabled}
  invalid={isInvalid}
  {...rest}
  data-scope="checkbox-group"
  data-part="root"
  data-layout={layout}
  data-invalid={isInvalid ? "" : undefined}
>
  {#each options as option (option.value)}
    <ArkCheckbox.Root
      ids={{
        label: `${uid}:${option.value}:label`,
        hiddenInput: `${uid}:${option.value}:input`,
      }}
      value={option.value}
      data-size={size}
      disabled={option.disabled === true}
    >
      <ArkCheckbox.Control>
        <ArkCheckbox.Indicator>
          <InternalIcon name="check" />
        </ArkCheckbox.Indicator>
      </ArkCheckbox.Control>
      <ArkCheckbox.Label>{option.label}</ArkCheckbox.Label>
      <ArkCheckbox.HiddenInput />
    </ArkCheckbox.Root>
  {/each}
</ArkCheckbox.Group>
