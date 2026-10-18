<script lang="ts">
  import { FloatButton } from "../index";
  import type { BaseComponentProps } from "@json-render/svelte";

  let { props }: BaseComponentProps<any> = $props();

  const actions = $derived(
    (props.actions ?? [{ label: "Edit" }]).map((action) => ({
      ...action,
      icon: action.icon ?? "pencil",
    })),
  );
</script>

<FloatButton {...props} {actions} defaultOpen />
