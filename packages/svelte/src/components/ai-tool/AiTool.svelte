<script lang="ts">
import { Collapsible } from "../collapsible";
import ChevronIcon from "../ai/ChevronIcon.svelte";
import type { ToolProps } from "./props";

let { name, label, status, input, output, ...rest }: ToolProps = $props();
</script>

<!-- A tool call: the shared collapsible as the vessel — the name it was
reached by and the state it reached in on the trigger, its input and
output folded inside. -->
<Collapsible.Root {...rest} data-ai="tool" data-status={status}>
  <Collapsible.Trigger>
    <span>{label ?? name}</span>
    {#if status}
      <span data-scope="ai" data-part="tool-status">
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    {/if}
    <Collapsible.Indicator>
      <ChevronIcon />
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
