<script lang="ts">
  import { Checkbox } from "../index";
  import type { BaseComponentProps } from "@json-render/svelte";

  let { props }: BaseComponentProps<any> = $props();
</script>

<Checkbox.Root defaultChecked={props.checked ?? false} disabled={props.disabled}>
  <Checkbox.Control>
    <Checkbox.Indicator>
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M4 8.5l2.5 2.5L12 5.5"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </Checkbox.Indicator>
  </Checkbox.Control>
  <Checkbox.Label>{props.label}</Checkbox.Label>
  <Checkbox.HiddenInput />
</Checkbox.Root>
