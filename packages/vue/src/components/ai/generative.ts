import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Ai } from "./index";

/** A small assistant face: prompt input above a response pane. */
export default defineEntry({
  AiPanel: {
    props: z.object({ placeholder: z.string().optional(), content: z.string().optional() }),
    description: "A small assistant face: prompt input above a response pane.",
    component: ({ props }) =>
      h(Ai.Conversation, { style: { gap: "0.75rem" } }, () => [
        props.content != null
          ? h(Ai.Response as never, { content: props.content! } as never)
          : null,
        h(Ai.PromptInput as never, { placeholder: props.placeholder } as never),
      ]),
  },
  AiMessage: {
    props: z.object({
      role: z.enum(["user", "assistant"]).optional(),
      text: z.string().optional(),
    }),
    description: "One turn of an AI conversation.",
    component: ({ props }) =>
      h(Ai.Message as never, { role: props.role ?? "assistant" } as never, () =>
        h(Ai.MessageContent, () => props.text ?? ""),
      ),
  },
  AiSuggestion: {
    props: z.object({ items: z.array(z.string()).optional() }),
    description: "A row of suggested prompts as chips.",
    component: ({ props }) => {
      const prompts = props.items ?? ["Draft a brief", "List tokens"];
      return h("div", { style: { display: "flex", flexWrap: "wrap", gap: "0.5rem" } }, () =>
        prompts.map((prompt: string) =>
          h(Ai.Suggestion as never, { key: prompt, prompt } as never),
        ),
      );
    },
  },
});
