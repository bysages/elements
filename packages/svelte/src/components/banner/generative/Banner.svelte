<script lang="ts">
  import { Banner } from "../index";
  import type { BaseComponentProps } from "@json-render/svelte";

  let { props }: BaseComponentProps<any> = $props();
</script>

<Banner {...props} dismissible />
