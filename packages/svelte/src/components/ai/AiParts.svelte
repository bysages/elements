<script lang="ts" generics="MESSAGE extends AiSdkMessage">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("ai");

import AiMediaComponent from "./AiMedia.svelte";
import { AiReasoning } from "../ai-reasoning";
import { AiResponse } from "../ai-response";
import { AiSource } from "../ai-source";
import { AiSources } from "../ai-source";
import { AiTool } from "../ai-tool";
import { toolPartDisplay } from "./parts";
import type {
  AiPartsProps,
  AiSdkDataPart,
  AiSdkMessage,
  AiSdkMessagePart,
  AiSdkToolPart,
} from "./parts";

let {
  message,
  highlighter,
  children,
  text,
  custom,
  reasoning,
  reasoningFile,
  tool,
  sourceUrl,
  sourceDocument,
  file,
  data,
  stepStart,
  fallback,
  onApprove,
  onDeny,
}: AiPartsProps<MESSAGE> = $props();

const isToolPart = (
  part: AiSdkMessagePart<MESSAGE>,
): part is AiSdkToolPart<MESSAGE> =>
  part.type === "dynamic-tool" || part.type.startsWith("tool-");
</script>

<!-- Renders one typed `UIMessage` from AI SDK as the shared conversation
anatomy. SDK state stays authoritative: streaming reasoning opens,
completed reasoning folds, approval state maps to tool actions, and
unknown data parts wait for their application snippet. -->
{#if children}
  {@render children(message)}
{:else}
  {#each message.parts as part, index}
    {#if part.type === "text"}
      {#if text}
        {@render text(part, index)}
      {:else if part.text}
        <AiResponse content={part.text} {highlighter} />
      {/if}
    {:else if part.type === "reasoning"}
      {#if reasoning}
        {@render reasoning(part, index)}
      {:else}
        <AiReasoning defaultOpen={part.state === "streaming"}>{part.text}</AiReasoning>
      {/if}
    {:else if part.type === "reasoning-file"}
      {#if reasoningFile}
        {@render reasoningFile(part, index)}
      {:else}
        <AiMediaComponent {part} />
      {/if}
    {:else if part.type === "file"}
      {#if file}
        {@render file(part, index)}
      {:else}
        <AiMediaComponent {part} />
      {/if}
    {:else if part.type === "source-url"}
      {#if sourceUrl}
        {@render sourceUrl(part, index)}
      {:else}
        <AiSources>
          <AiSource href={part.url}>{part.title ?? part.url}</AiSource>
        </AiSources>
      {/if}
    {:else if part.type === "source-document"}
      {#if sourceDocument}
        {@render sourceDocument(part, index)}
      {:else}
        <li data-scope="ai" data-part="document-source">
          <span>{part.title}</span>
          <span>{part.mediaType}</span>
        </li>
      {/if}
    {:else if isToolPart(part)}
      {#if tool}
        {@render tool(part, index)}
      {:else}
        {@const display = toolPartDisplay(part)}
        <AiTool
          name={display.name}
          status={display.status}
          approval={display.approval}
          inputValue={display.input}
          outputValue={display.output}
          defaultOpen={display.status === "error" || display.approval === "required"}
          onApprove={() => onApprove?.({ part, index })}
          onDeny={() => onDeny?.({ part, index })}
        />
      {/if}
    {:else if part.type === "step-start"}
      {#if stepStart}
        {@render stepStart(part, index)}
      {:else}
        <hr data-scope="ai" data-part="step-start" />
      {/if}
    {:else if part.type.startsWith("data-")}
      {@render data?.(part as AiSdkDataPart<MESSAGE>, index)}
    {:else if part.type === "custom"}
      {@render custom?.(part, index)}
    {:else}
      {@render fallback?.(part, index)}
    {/if}
  {/each}
{/if}
