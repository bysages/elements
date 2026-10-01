<script lang="ts">
  import { injectComponentStyle } from "@bysages/core";
  import type { HTMLAttributes } from "svelte/elements";

  injectComponentStyle("result");

  type Props = HTMLAttributes<HTMLDivElement>;

  let { children, ...rest }: Props = $props();

  // The mark carries all four verdicts and lets the root choose, so the
  // icon can never drift from the status the root declares.
  const MARK = '<g data-for="success"><path d="M20 6 9 17l-5-5"/></g><g data-for="warning"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></g><g data-for="danger"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></g><g data-for="info"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></g>';
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
