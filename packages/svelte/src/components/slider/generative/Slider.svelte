<script lang="ts">
  import { Slider } from "../index";
  import type { BaseComponentProps } from "@json-render/svelte";

  let { props }: BaseComponentProps<any> = $props();
</script>

<Slider.Root value={[props.value ?? 50]} min={props.min} max={props.max} step={props.step}>
  <Slider.Control>
    <Slider.Track><Slider.Range /></Slider.Track>
    <Slider.Thumb index={0} />
  </Slider.Control>
</Slider.Root>
