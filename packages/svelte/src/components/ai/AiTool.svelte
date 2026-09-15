<script lang="ts">
import { Collapsible } from "../collapsible";
import type { ToolProps } from "./props";

let { name, status, input, output, ...rest }: ToolProps = $props();
</script>

<!-- A tool call: the shared collapsible as the vessel — the name it was
reached by and the state it reached in on the trigger, its input and
output folded inside. -->
<Collapsible.Root {...rest} data-ai="tool" data-status={status}>
  <Collapsible.Trigger>
    <span>{name}</span>
    {#if status}
      <span data-scope="ai" data-part="tool-status">
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    {/if}
    <Collapsible.Indicator>
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M6 4l4 4-4 4"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </Collapsible.Indicator>
  </Collapsible.Trigger>
  <Collapsible.Content>
    <div data-scope="ai" data-part="tool-body">
      {#if input !== undefined}
        <span data-scope="ai" data-part="tool-label">Input</span>
        <pre>{input}</pre>
      {/if}
      {#if output !== undefined}
        <span data-scope="ai" data-part="tool-label">Output</span>
        <pre>{output}</pre>
      {/if}
    </div>
  </Collapsible.Content>
</Collapsible.Root>
