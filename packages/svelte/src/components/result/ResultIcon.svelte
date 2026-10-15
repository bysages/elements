<script lang="ts">
  import { injectComponentStyle } from "@bysages/core/styling";
  import type { HTMLAttributes } from "svelte/elements";

  import { iconBody } from "../../internal/icon";

  injectComponentStyle("result");

  type Props = HTMLAttributes<HTMLDivElement>;

  let { children, ...rest }: Props = $props();

  // The mark carries all four verdicts and lets the root choose, so the
  // icon can never drift from the status the root declares.
  const MARK =
    `<g data-for="success">${iconBody("check")}</g>` +
    `<g data-for="warning">${iconBody("triangle-alert")}</g>` +
    `<g data-for="danger">${iconBody("circle-x")}</g>` +
    `<g data-for="info">${iconBody("info")}</g>`;
</script>

<div {...rest} data-scope="result" data-part="icon">
  {#if children}
    {@render children?.()}
  {:else}
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      {@html MARK}
    </svg>
  {/if}
</div>

