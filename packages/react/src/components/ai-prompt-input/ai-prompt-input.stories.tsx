import { createListCollection } from "@ark-ui/react/collection";
import { Portal } from "@ark-ui/react/portal";
import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { AiPromptInput as PromptInput } from ".";
import { AiAttachment as Attachment, AiAttachments as Attachments } from "../ai-attachments";
import { Button } from "../button";
import { Menu } from "../menu";
import { Select } from "../select";
import { Toggle } from "../toggle";

const meta: Meta = { title: "Components/AI/AI Prompt Input" };
export default meta;

/** The prompt vessel alone: controlled, self-growing, Enter to send. */
export const Basic = {
  render: () => {
    const [prompt, setPrompt] = useState("");
    const [sent, setSent] = useState("");
    return (
      <div style={{ display: "grid", gap: "0.75rem", maxWidth: "46rem" }}>
        <PromptInput
          value={prompt}
          onValueChange={setPrompt}
          onSubmit={(value) => setSent(value)}
        />
        <p
          style={{
            margin: 0,
            color: "var(--bs-color-text-tertiary)",
            fontSize: "var(--bs-font-size-sm)",
          }}
        >
          {sent ? `Sent: ${sent}` : "Type and press Enter."}
        </p>
      </div>
    );
  },
};

const plusGlyph = (
  <svg
    viewBox="0 0 16 16"
    width={14}
    height={14}
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="square"
  >
    <path d="M8 3.5v9M3.5 8h9" />
  </svg>
);

const globeGlyph = (
  <svg
    viewBox="0 0 16 16"
    width={14}
    height={14}
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="square"
  >
    <circle cx={8} cy={8} r={5.5} />
    <path d="M2.5 8h11M8 2.5c-3.2 3.4-3.2 7.6 0 11M8 2.5c3.2 3.4 3.2 7.6 0 11" />
  </svg>
);

const chevronGlyph = (
  <svg
    viewBox="0 0 16 16"
    width={14}
    height={14}
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="square"
  >
    <path d="m4 6 4 4 4-4" />
  </svg>
);

const models = createListCollection({
  items: [
    { label: "Hunyuan", value: "hunyuan" },
    { label: "Qinghua", value: "qinghua" },
    { label: "Celadon", value: "celadon" },
  ],
  itemToString: (item) => item.label,
  itemToValue: (item) => item.value,
});

let attachCount = 0;

/** The composer at full dress: attachments riding the header, and one
 * tool row beneath the text — the plus menu and the web-search toggle
 * at the left, the model picker beside the seal that becomes a stop
 * while the machine works, both closing the row at the right. The
 * other triggers opt out of the form's submit; only the seal sends. */
export const Compose = {
  render: () => {
    const [prompt, setPrompt] = useState("");
    const [busy, setBusy] = useState(false);
    const [model, setModel] = useState("hunyuan");
    const [webSearch, setWebSearch] = useState(false);
    const [files, setFiles] = useState([
      { name: "colophon.png", size: 48213, status: "ready" as const },
      { name: "notes.md", size: 1024, status: "uploading" as const },
    ]);
    const [sent, setSent] = useState("");

    const attach = (name: string) => {
      setFiles((all) => [...all, { name, size: 2048, status: "uploading" as const }]);
      setTimeout(() => {
        setFiles((all) =>
          all.map((file) => (file.name === name ? { ...file, status: "ready" as const } : file)),
        );
      }, 1000);
    };
    const send = () => {
      setBusy(true);
      setSent("");
      setTimeout(() => setBusy(false), 2000);
    };

    return (
      <div style={{ display: "grid", gap: "0.75rem", maxWidth: "46rem" }}>
        <PromptInput
          busy={busy}
          value={prompt}
          onValueChange={setPrompt}
          onSubmit={send}
          onStop={() => setBusy(false)}
          header={
            <Attachments>
              {files.map((file) => (
                <Attachment
                  key={file.name}
                  name={file.name}
                  size={file.size}
                  status={file.status}
                  onRemove={() => setFiles((all) => all.filter((f) => f.name !== file.name))}
                />
              ))}
            </Attachments>
          }
          footer={
            <>
              <Menu.Root>
                <Menu.Trigger asChild>
                  <Button variant="ghost" square aria-label="Attach">
                    {plusGlyph}
                  </Button>
                </Menu.Trigger>
                <Portal>
                  <Menu.Positioner>
                    <Menu.Content>
                      <Menu.Item
                        value="image"
                        onSelect={() => attach(`image-${++attachCount}.png`)}
                      >
                        <Menu.ItemText>Upload image</Menu.ItemText>
                      </Menu.Item>
                      <Menu.Item value="file" onSelect={() => attach(`notes-${++attachCount}.md`)}>
                        <Menu.ItemText>Upload file</Menu.ItemText>
                      </Menu.Item>
                    </Menu.Content>
                  </Menu.Positioner>
                </Portal>
              </Menu.Root>
              <Toggle.Root pressed={webSearch} onPressedChange={(pressed) => setWebSearch(pressed)}>
                {globeGlyph}
                <span>Web search</span>
              </Toggle.Root>
            </>
          }
          footerEnd={
            <Select.Root
              collection={models}
              value={[model]}
              onValueChange={(e) => {
                const first = e.value[0];
                if (first != null) setModel(first);
              }}
            >
              <Select.Control>
                <Select.Trigger type="button" aria-label="Model">
                  <Select.ValueText placeholder="Model" />
                  <Select.Indicator>{chevronGlyph}</Select.Indicator>
                </Select.Trigger>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {models.items.map((item) => (
                      <Select.Item key={item.value} item={item}>
                        <Select.ItemText>{item.label}</Select.ItemText>
                        <Select.ItemIndicator>✓</Select.ItemIndicator>
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
          }
        />
        <p
          style={{
            margin: 0,
            color: "var(--bs-color-text-tertiary)",
            fontSize: "var(--bs-font-size-sm)",
          }}
        >
          {busy
            ? "Working — the seal is a stop now; Enter holds its breath."
            : sent
              ? `Sent: ${sent}`
              : "Attach, pick a model, type and press Enter."}
        </p>
      </div>
    );
  },
};
