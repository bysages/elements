<script lang="ts">
  import { Spinner } from "../index";
  import type { BaseComponentProps } from "@json-render/svelte";

  let { props }: BaseComponentProps<any> = $props();
</script>

<Spinner size={props.size} aria-label={props.label} />
