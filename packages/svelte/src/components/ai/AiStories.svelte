<script lang="ts">
  import type { UIMessage } from "ai";

  import { iconHtml } from "../../internal/icon";
  import { Layout } from "../layout";
  import { Ai } from "./index";

  let { story = "basic" }:
    { story?: "basic" | "typed-parts" | "loader" | "workbench" } = $props();

  type DemoMessage = UIMessage<
    unknown,
    { status: { label: string } },
    { searchWeb: { input: { query: string }; output: { hits: number } } }
  >;

  const reply =
    "**Ink 0.4 is out.** The release folds three additions into the paper:\n\n" +
    "- Hairline breadcrumbs for the way back\n" +
    "- A timeline that hangs its dots on one thread\n" +
    "- Charts painted straight from tokens\n\n" +
    "> Light needs time — shadows now trail their fills.\n\n" +
    "| Package | Change |\n| --- | --- |\n| core | hairline register |\n| charts | new |";

  let prompt = $state("");
  let pending = $state(false);
  let messages = $state<Array<{ role: "user" | "assistant"; text: string }>>([
    { role: "user", text: "Draft a short note announcing the ink release." },
    { role: "assistant", text: reply },
  ]);

  function send(value: string) {
    if (!value.trim() || pending) return;
    messages = [...messages, { role: "user", text: value }];
    prompt = "";
    pending = true;
    setTimeout(() => {
      messages = [
        ...messages,
        { role: "assistant", text: "Noted — the colophon is filed with the release." },
      ];
      pending = false;
    }, 900);
  }

  let workbenchPrompt = $state("");
  let workbenchPending = $state(false);
  let workbenchMessages = $state<Array<{ role: "user" | "assistant"; text: string }>>([
    { role: "assistant", text: reply },
  ]);

  function sendWorkbench(value: string) {
    if (!value.trim() || workbenchPending) return;
    workbenchMessages = [...workbenchMessages, { role: "user", text: value }];
    workbenchPrompt = "";
    workbenchPending = true;
    setTimeout(() => {
      workbenchMessages = [
        ...workbenchMessages,
        { role: "assistant", text: "Noted — the colophon is filed with the release." },
      ];
      workbenchPending = false;
    }, 900);
  }

  const sdkMessage: DemoMessage = {
    id: "sdk-message",
    role: "assistant",
    parts: [
      { type: "text", text: "Here is the sampled ink, with the search waiting on approval." },
      {
        type: "file",
        mediaType: "image/svg+xml",
        filename: "ink-sample.svg",
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 72' width='240' height='144'%3E%3Crect width='120' height='72' fill='%23f8f4ec'/%3E%3Cpath d='M18 52C36 22 82 20 102 34' stroke='%23221f1a' stroke-width='3' fill='none'/%3E%3C/svg%3E",
      },
      {
        type: "tool-searchWeb",
        toolCallId: "call-sample",
        state: "approval-requested",
        input: { query: "paper and ink release" },
        approval: { id: "approval-sample" },
      },
      { type: "step-start" },
      { type: "data-status", data: { label: "Writing" } },
    ],
  };
  let decision = $state("");
</script>

{#if story === "typed-parts"}
  <div style="display: grid; gap: 1rem; max-inline-size: 46rem;">
    <Ai.Message message={sdkMessage}>
      <Ai.Parts
        message={sdkMessage}
        onApprove={() => (decision = "approved")}
        onDeny={() => (decision = "denied")}
      />
    </Ai.Message>
    <p role="status" style="margin: 0; color: var(--bs-color-text-tertiary);">
      {decision ? `Approval ${decision}.` : "The tool waits for approval."}
    </p>
  </div>
{:else if story === "loader"}
  <Ai.Loader />
{:else if story === "workbench"}
  <Layout.Root sider="start" style="min-block-size: 34rem;">
    <Layout.Sider
      style="display: grid; align-content: start; gap: var(--bs-gap-xs); padding: var(--bs-padding-sm);"
    >
      {#each ["Threads", "Search", "Archive"] as label (label)}
        <span style="font-size: var(--bs-font-size-sm); color: var(--bs-color-text-tertiary);">
          {label}
        </span>
      {/each}
    </Layout.Sider>
    <Layout.Header>
      <strong style="font-size: var(--bs-font-size-lg);">AI Workbench</strong>
    </Layout.Header>
    <Layout.Content style="display: grid; grid-template-rows: 1fr auto; overflow: hidden;">
      <Ai.Conversation
        aria-label="Workbench conversation"
        style="padding: var(--bs-padding-md);"
      >
        {#each workbenchMessages as message, index (index)}
          <Ai.Message role={message.role}>
            {#if message.role === "user"}
              <Ai.MessageContent>{message.text}</Ai.MessageContent>
            {:else}
              <Ai.Response content={message.text} />
            {/if}
          </Ai.Message>
        {/each}
        {#if workbenchPending}
          <Ai.Loader />
        {/if}
      </Ai.Conversation>
      <Ai.PromptInput
        bind:value={workbenchPrompt}
        placeholder="Ask the paper…"
        onSubmit={sendWorkbench}
      />
    </Layout.Content>
  </Layout.Root>
{:else}
  <div style="display: grid; gap: 2rem; inline-size: 100%; max-inline-size: 46rem;">
    <Ai.Conversation>
      {#each messages as message, index (index)}
        <Ai.Message role={message.role}>
          {#if message.role === "user"}
            <Ai.MessageContent>{message.text}</Ai.MessageContent>
          {:else}
            <Ai.Response content={message.text} />
            <Ai.Tool name="search_web" status="completed">
              {#snippet input()}{'{"query": "ink release notes"}'}{/snippet}
              {#snippet output()}{'{"hits": 3}'}{/snippet}
            </Ai.Tool>
            <Ai.Sources>
              <Ai.Source href="https://example.com/ink">Ink release notes</Ai.Source>
            </Ai.Sources>
            <Ai.Actions>
              <Ai.Action label="Copy">{@html iconHtml("copy")}</Ai.Action>
              <Ai.Action label="Retry">{@html iconHtml("undo")}</Ai.Action>
              <Ai.Action label="Helpful">{@html iconHtml("arrow-up")}</Ai.Action>
              <Ai.Action label="Not helpful">{@html iconHtml("arrow-down")}</Ai.Action>
            </Ai.Actions>
          {/if}
        </Ai.Message>
      {/each}
      {#if pending}
        <Ai.Loader />
      {/if}
    </Ai.Conversation>
    <Ai.PromptInput bind:value={prompt} onSubmit={send} placeholder="Ask the paper…" />
  </div>
{/if}