<script lang="ts">
  import { Separator } from "../index";
  import type { BaseComponentProps } from "@json-render/svelte";

  let { props }: BaseComponentProps<any> = $props();
</script>

<Separator orientation={props.orientation ?? "horizontal"} decorative />
