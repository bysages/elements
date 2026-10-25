import { createSignal, For } from "solid-js";

import { PromptInput } from ".";
import { AiAttachment, AiAttachments } from "../ai-attachments";
import { Button } from "../button";
import { Menu } from "../menu";
import { Select } from "../select";
import { Toggle } from "../toggle";

const meta = { title: "Components/AI/AI Prompt Input" };
export default meta;

/** The prompt vessel alone: controlled, self-growing, Enter to send. */
export const Basic = {
  render: () => {
    const [prompt, setPrompt] = createSignal("");
    const [sent, setSent] = createSignal("");

    return (
      <div
        style={{
          display: "grid",
          gap: "0.75rem",
          "inline-size": "100%",
          "max-inline-size": "46rem",
        }}
      >
        <PromptInput value={prompt()} onValueChange={setPrompt} onSubmit={setSent} />
        <p
          style={{
            margin: "0",
            color: "var(--bs-color-text-tertiary)",
            "font-size": "var(--bs-font-size-sm)",
          }}
        >
          {sent() ? `Sent: ${sent()}` : "Type and press Enter."}
        </p>
      </div>
    );
  },
};

const plusIcon = () => (
  <svg
    viewBox="0 0 16 16"
    width="14"
    height="14"
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="square"
  >
    <path d="M8 3.5v9M3.5 8h9" />
  </svg>
);

const globeIcon = () => (
  <svg
    viewBox="0 0 16 16"
    width="14"
    height="14"
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="square"
  >
    <circle cx="8" cy="8" r="5.5" />
    <path d="M2.5 8h11M8 2.5c-3.2 3.4-3.2 7.6 0 11M8 2.5c3.2 3.4 3.2 7.6 0 11" />
  </svg>
);

const models = [
  { label: "Hunyuan", value: "hunyuan" },
  { label: "Qinghua", value: "qinghua" },
  { label: "Celadon", value: "celadon" },
];

/** The composer at full dress: attachments riding the header, and one
 * tool row beneath the text — the plus menu and the web-search toggle
 * at the left, the model picker beside the seal that becomes a stop
 * while the machine works, both closing the row at the right. The
 * other triggers opt out of the form's submit; only the seal sends. */
export const Compose = {
  render: () => {
    type DemoFile = { name: string; size: number; status: "ready" | "uploading" };

    let attachCount = 0;
    const [prompt, setPrompt] = createSignal("");
    const [busy, setBusy] = createSignal(false);
    const [model, setModel] = createSignal("hunyuan");
    const [webSearch, setWebSearch] = createSignal(false);
    const [files, setFiles] = createSignal<DemoFile[]>([
      { name: "colophon.png", size: 48213, status: "ready" },
      { name: "notes.md", size: 1024, status: "uploading" },
    ]);
    const [sent, setSent] = createSignal("");

    const attach = (name: string, extension: string) => {
      const fullName = `${name}-${++attachCount}.${extension}`;
      setFiles((current) => [...current, { name: fullName, size: 2048, status: "uploading" }]);
      setTimeout(() => {
        setFiles((current) =>
          current.map((file) => (file.name === fullName ? { ...file, status: "ready" } : file)),
        );
      }, 1000);
    };
    const send = () => {
      setBusy(true);
      setSent("");
      setTimeout(() => setBusy(false), 2000);
    };

    return (
      <div
        style={{
          display: "grid",
          gap: "0.75rem",
          "inline-size": "100%",
          "max-inline-size": "46rem",
        }}
      >
        <PromptInput
          busy={busy()}
          value={prompt()}
          onValueChange={setPrompt}
          onSubmit={send}
          onStop={() => setBusy(false)}
          header={
            <AiAttachments>
              <For each={files()}>
                {(file) => (
                  <AiAttachment
                    name={file.name}
                    size={file.size}
                    status={file.status}
                    onRemove={() =>
                      setFiles((current) => current.filter((item) => item.name !== file.name))
                    }
                  />
                )}
              </For>
            </AiAttachments>
          }
          footer={
            <>
              <Menu.Root>
                <Menu.Trigger
                  asChild={(triggerProps) => (
                    <Button {...triggerProps()} variant="ghost" square={true} aria-label="Attach">
                      {plusIcon()}
                    </Button>
                  )}
                />
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item value="image" onSelect={() => attach("image", "png")}>
                      Upload image
                    </Menu.Item>
                    <Menu.Item value="file" onSelect={() => attach("notes", "md")}>
                      Upload file
                    </Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Menu.Root>
              <Toggle.Root pressed={webSearch()} onPressedChange={setWebSearch}>
                {globeIcon()}
                <span>Web search</span>
              </Toggle.Root>
            </>
          }
          footerEnd={
            <Select
              options={models}
              value={model()}
              clearable={false}
              placeholder="Model"
              onValueChange={(value) =>
                setModel(Array.isArray(value) ? (value[0] ?? model()) : value)
              }
            />
          }
        />
        <p
          style={{
            margin: "0",
            color: "var(--bs-color-text-tertiary)",
            "font-size": "var(--bs-font-size-sm)",
          }}
        >
          {busy()
            ? "Working — the seal is a stop now; Enter holds its breath."
            : sent()
              ? `Sent: ${sent()}`
              : "Attach, pick a model, type and press Enter."}
        </p>
      </div>
    );
  },
};

/** The composer mentions: pass a roster and `@` summons the candidates
 * over the field; Enter inserts the chosen name while the vessel is up
 * and only sends once it stands down. */
export const Mentions = {
  render: () => {
    const [prompt, setPrompt] = createSignal("");
    const [sent, setSent] = createSignal("");
    const team = [
      { label: "Lin Hua", value: "lin" },
      { label: "Mei Chen", value: "mei" },
      { label: "Hong Wei", value: "hong" },
    ];

    return (
      <div
        style={{
          display: "grid",
          gap: "0.75rem",
          "inline-size": "100%",
          "max-inline-size": "46rem",
        }}
      >
        <PromptInput
          value={prompt()}
          placeholder="Ask the room — @who should weigh in…"
          mentions={{ items: team }}
          onValueChange={setPrompt}
          onSubmit={(value) => {
            setSent(value);
            setPrompt("");
          }}
        />
        <p
          role="status"
          style={{
            "font-size": "var(--bs-font-size-sm)",
            color: "var(--bs-color-text-tertiary)",
          }}
        >
          {sent()
            ? `Sent: ${sent()}`
            : "Type @ and a name; Enter sends only after the vessel closes."}
        </p>
      </div>
    );
  },
};

/** Slash commands can report selection without rewriting the prompt:
 * the consumer receives the whole entry and owns the next action. */
export const Triggers = {
  render: () => {
    const [prompt, setPrompt] = createSignal("");
    const [chosen, setChosen] = createSignal("");
    const items = [
      { label: "Lin Hua", value: "lin" },
      {
        label: "Search web",
        value: "search-web",
        group: "Commands",
        description: "Find current sources",
      },
    ];

    return (
      <div
        style={{
          display: "grid",
          gap: "0.75rem",
          "inline-size": "100%",
          "max-inline-size": "46rem",
        }}
      >
        <PromptInput
          value={prompt()}
          placeholder="Type @ to mention or / to command…"
          mentions={{ items, triggers: ["@", "/"], insertOnSelect: false }}
          onValueChange={setPrompt}
          onSelect={(entry) => setChosen(entry.label)}
        />
        <p
          role="status"
          style={{
            "font-size": "var(--bs-font-size-sm)",
            color: "var(--bs-color-text-tertiary)",
          }}
        >
          {chosen() ? `Selected: ${chosen()}` : "The text stays untouched after selection."}
        </p>
      </div>
    );
  },
};
