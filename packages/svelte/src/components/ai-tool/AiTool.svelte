<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("ai");

import { Collapsible } from "../collapsible";
import { Button } from "../button";
import ChevronIcon from "../ai/ChevronIcon.svelte";
import { useComponentMessages } from "../config-provider/messages";
import type { ToolProps, ToolValue } from "./props";

let {
  name,
  label,
  status,
  approval,
  input,
  inputValue,
  output,
  outputValue,
  defaultOpen = false,
  onApprove,
  onDeny,
  ...rest
}: ToolProps = $props();

const messages = useComponentMessages();
const approvalState = $derived(typeof approval === "string" ? approval : undefined);

function formatValue(value: ToolValue | undefined) {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean" || value === null)
    return String(value);
  if (value === undefined) return "";
  return JSON.stringify(value, null, 2) ?? "";
}
</script>

<!-- A tool call: the shared collapsible as the vessel — the name it was
reached by and the state it reached in on the trigger, its input and
output folded inside. -->
<Collapsible.Root
  {...rest}
  {defaultOpen}
  data-ai="tool"
  data-status={status}
  data-approval={approvalState}
>
  <Collapsible.Trigger>
    <span>
      {#if typeof label === "function"}{@render label()}{:else}{label ?? name}{/if}
    </span>
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
      {#if input || inputValue !== undefined}
        <span data-scope="ai" data-part="tool-label">{messages().ai.input}</span>
        <pre>{#if input}{@render input()}{:else}{formatValue(inputValue)}{/if}</pre>
      {/if}
      {#if output || outputValue !== undefined}
        <span data-scope="ai" data-part="tool-label">{messages().ai.output}</span>
        <pre>{#if output}{@render output()}{:else}{formatValue(outputValue)}{/if}</pre>
      {/if}
      {#if approvalState === "required"}
        <div data-scope="ai" data-part="tool-actions" data-approval={approvalState}>
          <Button
            variant="outline"
            size="sm"
            tone="danger"
            type="button"
            onclick={() => onDeny?.()}
          >
            {messages().ai.deny}
          </Button>
          <Button
            variant="solid"
            size="sm"
            type="button"
            onclick={() => onApprove?.()}
          >
            {messages().ai.approve}
          </Button>
        </div>
      {/if}
    </div>
  </Collapsible.Content>
</Collapsible.Root>
