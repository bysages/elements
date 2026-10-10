<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("alert");

import InternalIcon from "../../internal/InternalIcon.svelte";
import { getContext } from "svelte";
import type { AlertPartProps } from "./props";
import type { AlertStatus } from "./props";

let { ...rest }: AlertPartProps = $props();

const readStatus = getContext<() => AlertStatus>("alert:status");

const statusIcons: Record<AlertStatus, string> = {
  ink: "info",
  info: "info",
  success: "circle-check",
  warning: "triangle-alert",
  danger: "circle-x",
};
</script>

<span {...rest} data-scope="alert" data-part="icon">
  <InternalIcon name={statusIcons[readStatus()]} />
</span>

