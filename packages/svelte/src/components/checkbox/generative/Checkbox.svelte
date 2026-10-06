<script lang="ts">
  import { Checkbox } from "../index";
  import InternalIcon from "../../../internal/InternalIcon.svelte";
  import type { BaseComponentProps } from "@json-render/svelte";

  let { props }: BaseComponentProps<any> = $props();
</script>

<Checkbox.Root defaultChecked={props.checked ?? false} disabled={props.disabled}>
  <Checkbox.Control>
    <Checkbox.Indicator>
      <InternalIcon name="check" />
    </Checkbox.Indicator>
  </Checkbox.Control>
  <Checkbox.Label>{props.label}</Checkbox.Label>
  <Checkbox.HiddenInput />
</Checkbox.Root>
