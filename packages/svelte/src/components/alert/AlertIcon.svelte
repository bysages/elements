<script lang="ts">
import { getContext } from "svelte";
import type { AlertPartProps } from "./props";
import type { AlertStatus } from "./props";

let { ...rest }: AlertPartProps = $props();

const readStatus = getContext<() => AlertStatus>("alert:status");

const paths: Record<AlertStatus, string> = {
  info: "M12 8v5m0 3v.01M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z",
  success: "m4 12.5 5 5L20 6.5",
  warning: "M12 4 2.5 20h19L12 4Zm0 6v4m0 3v.01",
  danger: "M6 6l12 12M18 6 6 18",
  ink: "M12 8v5m0 3v.01M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z",
};
</script>

<span {...rest} data-scope="alert" data-part="icon">
  <svg
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.75"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d={paths[readStatus()]} />
  </svg>
</span>
