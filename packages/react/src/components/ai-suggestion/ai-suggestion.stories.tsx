import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { AiSuggestion } from ".";
import { AiPromptInput } from "../ai-prompt-input";

const meta: Meta = { title: "Components/AI/AI Suggestion" };
export default meta;

/** Chips proposing the next stroke; selecting one drafts it into the
 * prompt vessel below. */
export const Basic = {
  render: () => {
    const [prompt, setPrompt] = useState("");
    const prompts = ["Summarize the release", "What changed in core?", "Draft the changelog entry"];
    return (
      <div style={{ display: "grid", gap: "1rem", width: "100%", maxWidth: "46rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {prompts.map((prompt) => (
            <AiSuggestion key={prompt} prompt={prompt} onSelect={(value) => setPrompt(value)} />
          ))}
        </div>
        <AiPromptInput value={prompt} onValueChange={setPrompt} />
      </div>
    );
  },
};
