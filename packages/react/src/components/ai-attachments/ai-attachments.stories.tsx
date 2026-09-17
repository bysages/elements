import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { AiAttachment as Attachment, AiAttachments as Attachments } from ".";
import { AiPromptInput as PromptInput } from "../ai-prompt-input";

const meta: Meta = { title: "Components/AI/AI Attachments" };
export default meta;

const FILES = [
  { name: "colophon.png", size: 48213, status: "ready" as const },
  { name: "notes.md", size: 1024, status: "ready" as const },
  { name: "wireframe.fig", status: "uploading" as const },
  { name: "denied.exe", size: 65536, status: "error" as const },
  {
    name: "a-very-long-document-name-that-keeps-going-and-going.pdf",
    size: 2_097_152,
    status: "ready" as const,
  },
];

/** Paper chips for the files riding the prompt — every state, and a
 * name long enough to meet the ellipsis. */
export const Basic = {
  render: () => {
    const [removed, setRemoved] = useState("");
    return (
      <div style={{ display: "grid", gap: "1rem", maxWidth: "26rem" }}>
        <Attachments>
          {FILES.map((file) => (
            <Attachment
              key={file.name}
              name={file.name}
              size={file.size}
              status={file.status}
              onRemove={() => setRemoved(file.name)}
            />
          ))}
        </Attachments>
        <p
          style={{
            margin: 0,
            color: "var(--bs-color-text-tertiary)",
            fontSize: "var(--bs-font-size-sm)",
          }}
        >
          {removed ? `Removed: ${removed}` : "Click a chip's × to remove it."}
        </p>
      </div>
    );
  },
};

/** The chips ride the prompt's header slot, above the writing. */
export const InPrompt = {
  render: () => {
    const [files, setFiles] = useState(FILES.slice(0, 2).map((f) => ({ ...f })));
    const [prompt, setPrompt] = useState("");
    return (
      <div style={{ maxWidth: "34rem" }}>
        <PromptInput
          value={prompt}
          onValueChange={setPrompt}
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
        />
      </div>
    );
  },
};
