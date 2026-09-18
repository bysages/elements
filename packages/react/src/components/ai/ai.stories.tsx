import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { Ai } from ".";

const meta: Meta = { title: "Components/AI/AI" };
export default meta;

const icon = (d: string) => (
  <svg
    viewBox="0 0 16 16"
    width={14}
    height={14}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="square"
    aria-hidden="true"
  >
    <path d={d} />
  </svg>
);

const copyIcon = icon("M5.5 5.5h8v8h-8zM10.5 5.5v-3h-8v8h3");
const retryIcon = icon("M13 8a5 5 0 1 1-1.5-3.5M13 2v3h-3");

const reply =
  "**Ink 0.4 is out.** The release folds three additions into the paper:\n\n" +
  "- Hairline breadcrumbs for the way back\n" +
  "- A timeline that hangs its dots on one thread\n" +
  "- Charts painted straight from tokens\n\n" +
  "> Light needs time — shadows now trail their fills.\n\n" +
  "| Package | Change |\n| --- | --- |\n| core | hairline register |\n| charts | new |";

const reasoningText =
  "The note should read like a colophon, not a changelog: one line of " +
  "welcome, the three additions as short strokes, and the shadow motion " +
  "note last, where it lands quietly.";

/** A full turn of conversation: the user's words in a recessed bubble,
 * the assistant's ink flat on the paper — thought, tool, sources, and
 * the quiet action row beneath. */
export const Basic = {
  render: () => {
    const [prompt, setPrompt] = useState("");
    const [pending, setPending] = useState(false);
    const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; text: string }>>([
      { role: "user", text: "Draft a short note announcing the ink release." },
      { role: "assistant", text: reply },
    ]);

    const send = (value: string) => {
      if (!value.trim() || pending) return;
      setMessages((all) => [...all, { role: "user", text: value }]);
      setPrompt("");
      setPending(true);
      setTimeout(() => {
        setMessages((all) => [
          ...all,
          { role: "assistant", text: "Noted — the colophon is filed with the release." },
        ]);
        setPending(false);
      }, 900);
    };

    return (
      <div style={{ display: "grid", gap: "2rem", maxWidth: "46rem" }}>
        <Ai.Conversation>
          {messages.map((message, i) => (
            <Ai.Message key={i} role={message.role}>
              {message.role === "user" ? (
                <Ai.MessageContent>{message.text}</Ai.MessageContent>
              ) : (
                <>
                  <Ai.Response content={message.text} />
                  <Ai.Reasoning label="Thought for 2s">{reasoningText}</Ai.Reasoning>
                  <Ai.Tool
                    name="search_web"
                    status="completed"
                    input='{"query": "ink release notes"}'
                    output='{"hits": 3}'
                  />
                  <Ai.Sources>
                    <Ai.Source href="https://example.com/ink">Ink release notes</Ai.Source>
                    <Ai.Source href="https://example.com/paper">The paper-and-ink system</Ai.Source>
                  </Ai.Sources>
                  <Ai.Actions>
                    <Ai.Action label="Copy">{copyIcon}</Ai.Action>
                    <Ai.Action label="Retry">{retryIcon}</Ai.Action>
                  </Ai.Actions>
                </>
              )}
            </Ai.Message>
          ))}
          {pending ? <Ai.Loader /> : null}
        </Ai.Conversation>
        <Ai.PromptInput
          value={prompt}
          onValueChange={setPrompt}
          onSubmit={send}
          placeholder="Ask the paper…"
        />
      </div>
    );
  },
};

/** Every prose register the response may be asked to set — headings,
 * code, quote, table — each in its hairline dress. */
export const Markdown = {
  render: () => (
    <div style={{ maxWidth: "46rem" }}>
      <Ai.Response
        content={
          "## The paper-and-ink system\n\n" +
          "Interfaces are warm paper; content is ink. A `hairline` divides, " +
          "light elevates, and nothing pops.\n\n" +
          "1. Ground in ambient shade\n" +
          "2. Ink carries hierarchy\n" +
          "3. Pigment only where it means\n\n" +
          "```css\n.token { color: var(--bs-color-text-primary); }\n```\n\n" +
          "> 方寸为章，器物为圆 — controls are seal-cut; vessels stay round.\n\n" +
          "Read the full spec in [DESIGN.md](https://example.com/design)."
        }
      />
    </div>
  ),
};

/** A tool call in each state; the dot pairs color with the word. */
export const ToolCall = {
  render: () => (
    <div style={{ display: "grid", gap: "0.75rem", maxWidth: "34rem" }}>
      <Ai.Tool name="search_web" status="running" input='{"query": "paper stock"}' />
      <Ai.Tool
        name="search_web"
        status="completed"
        defaultOpen
        input='{"query": "paper stock"}'
        output='{"hits": 12}'
      />
      <Ai.Tool name="send_fax" status="error" input='{"to": "+86 …"}' output="Error: line busy" />
      <Ai.Tool name="read_file" output='{"path": "/etc/colophon"}' />
    </div>
  ),
};

/** Chips proposing the next stroke; selecting one drafts it into the
 * prompt vessel below. */
export const Suggestions = {
  render: () => {
    const [prompt, setPrompt] = useState("");
    const prompts = ["Summarize the release", "What changed in core?", "Draft the changelog entry"];
    return (
      <div style={{ display: "grid", gap: "1rem", maxWidth: "34rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {prompts.map((p) => (
            <Ai.Suggestion key={p} prompt={p} onSelect={setPrompt} />
          ))}
        </div>
        <Ai.PromptInput value={prompt} onValueChange={setPrompt} />
      </div>
    );
  },
};

/** Two beads of ink breathing while the answer is on its way. */
export const Loader = {
  render: () => <Ai.Loader />,
};
