import type { UIMessage } from "ai";
import { createSignal, For, Show } from "solid-js";

import { Ai } from ".";
import { iconNode } from "../../internal/icon";
import { Layout } from "../layout";

const meta = { title: "Components/AI/AI Conversation" };
export default meta;

const copyIcon = iconNode("copy");
const retryIcon = iconNode("undo");
const upIcon = iconNode("arrow-up");
const downIcon = iconNode("arrow-down");

const reply =
  "**Ink 0.4 is out.** The release folds three additions into the paper:\n\n" +
  "- Hairline breadcrumbs for the way back\n" +
  "- A timeline that hangs its dots on one thread\n" +
  "- Charts painted straight from tokens\n\n" +
  "> Light needs time — shadows now trail their fills.\n\n" +
  "| Package | Change |\n| --- | --- |\n| core | hairline register |\n| charts | new |";

/** A full turn of conversation: the user's words in a recessed bubble,
 * the assistant's ink flat on the paper — thought, tool, sources, and
 * the quiet action row beneath. */
export const Basic = {
  render: () => {
    type ConversationMessage = { role: "user" | "assistant"; text: string };

    const [prompt, setPrompt] = createSignal("");
    const [pending, setPending] = createSignal(false);
    const [messages, setMessages] = createSignal<ConversationMessage[]>([
      { role: "user", text: "Draft a short note announcing the ink release." },
      { role: "assistant", text: reply },
    ]);

    const send = (value: string) => {
      if (!value.trim() || pending()) return;
      setMessages((current) => [...current, { role: "user", text: value }]);
      setPrompt("");
      setPending(true);
      setTimeout(() => {
        setMessages((current) => [
          ...current,
          { role: "assistant", text: "Noted — the colophon is filed with the release." },
        ]);
        setPending(false);
      }, 900);
    };

    return (
      <div
        style={{ display: "grid", gap: "2rem", "inline-size": "100%", "max-inline-size": "46rem" }}
      >
        <Ai.Conversation>
          <For each={messages()}>
            {(message) => (
              <Ai.Message role={message.role}>
                {message.role === "user" ? (
                  <Ai.MessageContent>{message.text}</Ai.MessageContent>
                ) : (
                  <>
                    <Ai.Response content={message.text} />
                    <Ai.Tool
                      name="search_web"
                      status="completed"
                      input={'{"query": "ink release notes"}'}
                      output={'{"hits": 3}'}
                    />
                    <Ai.Sources>
                      <Ai.Source href="https://example.com/ink">Ink release notes</Ai.Source>
                    </Ai.Sources>
                    <Ai.Actions>
                      <Ai.Action label="Copy">{copyIcon}</Ai.Action>
                      <Ai.Action label="Retry">{retryIcon}</Ai.Action>
                      <Ai.Action label="Helpful">{upIcon}</Ai.Action>
                      <Ai.Action label="Not helpful">{downIcon}</Ai.Action>
                    </Ai.Actions>
                  </>
                )}
              </Ai.Message>
            )}
          </For>
          <Show when={pending()}>
            <Ai.Loader />
          </Show>
        </Ai.Conversation>
        <Ai.PromptInput
          value={prompt()}
          onValueChange={setPrompt}
          onSubmit={send}
          placeholder="Ask the paper…"
        />
      </div>
    );
  },
};

/** One typed AI SDK message rendered directly: text, file, approval, and
 * custom data parts all land on the shared conversation anatomy. */
export const TypedParts = {
  render: () => {
    type DemoMessage = UIMessage<
      unknown,
      { status: { label: string } },
      { searchWeb: { input: { query: string }; output: { hits: number } } }
    >;
    const message: DemoMessage = {
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
    const [decision, setDecision] = createSignal("");

    return (
      <div style={{ display: "grid", gap: "1rem", "max-inline-size": "46rem" }}>
        <Ai.Message message={message}>
          <Ai.Parts
            message={message}
            onApprove={() => setDecision("approved")}
            onDeny={() => setDecision("denied")}
          />
        </Ai.Message>
        <p role="status" style={{ margin: "0", color: "var(--bs-color-text-tertiary)" }}>
          {decision() ? `Approval ${decision()}.` : "The tool waits for approval."}
        </p>
      </div>
    );
  },
};

/** Two beads of ink breathing while the answer is on its way. */
export const Loader = {
  render: () => <Ai.Loader />,
};

/** The whole workbench: the layout rail, the conversation log, and
 * the composer stand in one shell — the arrangement the chat app
 * example ships with, at storybook scale. */
export const Workbench = {
  render: () => {
    type ConversationMessage = { role: "user" | "assistant"; text: string };

    const [prompt, setPrompt] = createSignal("");
    const [pending, setPending] = createSignal(false);
    const [messages, setMessages] = createSignal<ConversationMessage[]>([
      { role: "assistant", text: reply },
    ]);

    const send = (value: string) => {
      if (!value.trim() || pending()) return;
      setMessages((current) => [...current, { role: "user", text: value }]);
      setPrompt("");
      setPending(true);
      setTimeout(() => {
        setMessages((current) => [
          ...current,
          { role: "assistant", text: "Noted — the colophon is filed with the release." },
        ]);
        setPending(false);
      }, 900);
    };

    return (
      <Layout.Root sider="start" style={{ "min-block-size": "34rem" }}>
        <Layout.Sider
          style={{
            display: "grid",
            "align-content": "start",
            gap: "var(--bs-gap-xs)",
            padding: "var(--bs-padding-sm)",
          }}
        >
          <For each={["Threads", "Search", "Archive"]}>
            {(label) => (
              <span
                style={{
                  "font-size": "var(--bs-font-size-sm)",
                  color: "var(--bs-color-text-tertiary)",
                }}
              >
                {label}
              </span>
            )}
          </For>
        </Layout.Sider>
        <Layout.Header>
          <strong style={{ "font-size": "var(--bs-font-size-lg)" }}>AI Workbench</strong>
        </Layout.Header>
        <Layout.Content
          style={{ display: "grid", "grid-template-rows": "1fr auto", overflow: "hidden" }}
        >
          <Ai.Conversation
            aria-label="Workbench conversation"
            style={{ padding: "var(--bs-padding-md)" }}
          >
            <For each={messages()}>
              {(message) => (
                <Ai.Message role={message.role}>
                  {message.role === "user" ? (
                    <Ai.MessageContent>{message.text}</Ai.MessageContent>
                  ) : (
                    <Ai.Response content={message.text} />
                  )}
                </Ai.Message>
              )}
            </For>
            <Show when={pending()}>
              <Ai.Loader />
            </Show>
          </Ai.Conversation>
          <Ai.PromptInput
            value={prompt()}
            placeholder="Ask the paper…"
            onValueChange={setPrompt}
            onSubmit={send}
          />
        </Layout.Content>
      </Layout.Root>
    );
  },
};
