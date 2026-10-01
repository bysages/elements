<script lang="ts">
  import { Typography } from "../index";
  import { headingClass } from "../../../generative/shared";
  import type { BaseComponentProps } from "@json-render/svelte";

  let { props }: BaseComponentProps<any> = $props();
</script>

<Typography.Heading class={headingClass[props.level ?? "2"]}>{props.text}</Typography.Heading>
