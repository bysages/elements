<script lang="ts">
import { setContext } from "svelte";
import type { AlertProps, AlertStatus } from "./props";

let { status = "ink", children, ...rest }: AlertProps = $props();

// The status rides the context as a getter so a live status prop
// re-reads on every icon render instead of freezing at mount.
setContext<() => AlertStatus>("alert:status", () => status);
</script>

<div
  {...rest}
  role={status === "ink" || status === "info" ? "status" : "alert"}
  data-scope="alert"
  data-part="root"
  data-status={status}
>
  {@render children?.()}
</div>
