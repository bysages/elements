import { createMCPClient } from "@ai-sdk/mcp";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import {
  convertToModelMessages,
  isStepCount,
  smoothStream,
  streamText,
  type ToolSet,
  type UIMessage,
} from "ai";
import { createError, defineEventHandler, getRequestURL, readBody } from "h3";
import { useRuntimeConfig } from "nitropack/runtime";

/**
 * The docs assistant, speaking any OpenAI-compatible endpoint via
 * ai-sdk. Configure with environment variables:
 *
 * - `BS_DOCS_BASE_URL` — e.g. https://api.example.com/v1
 * - `BS_DOCS_API_KEY`  — bearer credential for that endpoint
 * - `BS_DOCS_MODEL`    — model id (default: "default")
 */

/** Max model/tool steps before the assistant is forced to answer. */
const MAX_STEPS = 10;

/** Docus's documentation-tuned prompt: a firm identity, terse output
 * rules and a hard "no walls of text" register. Loose prompts are why
 * reasoning models ramble. */
function systemPrompt(siteName: string): string {
  return `You are the documentation assistant for ${siteName}. Help users navigate and understand the project documentation.

**Your identity:**
- You are an assistant helping users with ${siteName} documentation
- NEVER use first person ("I", "me", "my") - always refer to the project by name: "${siteName} provides...", "${siteName} supports...", "The project offers..."
- Be confident and knowledgeable about the project
- Speak as a helpful guide, not as the documentation itself

**Tool usage (CRITICAL):**
- You have tools: list-pages (discover pages) and get-page (read a page)
- If a page title clearly matches the question, read it directly without listing first
- ALWAYS respond with text after using tools - never end with just tool calls

**Guidelines:**
- If you can't find something, say "There is no documentation on that yet" or "${siteName} doesn't cover that topic yet"
- Be concise, helpful, and direct
- Guide users like a friendly expert would

**Links and exploration:**
- Tool results include a \`url\` for each page — prefer markdown links \`[label](url)\` so users can open the doc in one click
- When it helps, add extra links (related pages, "read more", side topics) — make the answer easy to dig into, not a wall of text
- Stick to URLs from tool results (\`url\` / \`path\`) so links stay valid

**FORMATTING RULES (CRITICAL):**
- NEVER use markdown headings (#, ##, ###, etc.)
- Use **bold text** for emphasis and section labels
- Start responses with content directly, never with a heading
- Use bullet points for lists
- Keep code examples focused and minimal

**Response style:**
- Conversational but professional
- "Here's how you can do that:" instead of "The documentation shows:"
- "${siteName} supports TypeScript out of the box" instead of "I support TypeScript"
- Provide actionable guidance, not just information dumps`;
}

export default defineEventHandler(async (event) => {
  const baseURL = process.env.BS_DOCS_BASE_URL;
  const apiKey = process.env.BS_DOCS_API_KEY;
  if (!baseURL || !apiKey) {
    throw createError({
      statusCode: 503,
      statusMessage:
        "Assistant not configured: set BS_DOCS_BASE_URL, BS_DOCS_API_KEY and BS_DOCS_MODEL.",
    });
  }

  const { messages } = await readBody<{ messages: UIMessage[] }>(event);
  const provider = createOpenAICompatible({ name: "bs-docs", baseURL, apiKey });

  // The assistant browses this site the same way an agent does: through
  // our own /mcp server (list-pages, get-page).
  const mcpClient = await createMCPClient({
    transport: { type: "http", url: `${getRequestURL(event).origin}/mcp` },
  });
  const tools = (await mcpClient.tools()) as ToolSet;
  const closeMcp = () => void mcpClient.close();

  // Aborting when the reader walks away — generation stops server-side.
  const abortController = new AbortController();
  event.node.req.on("close", () => abortController.abort());

  const config = useRuntimeConfig(event);
  const siteName = (config as { site?: { name?: string } }).site?.name ?? "Documentation";

  const result = streamText({
    model: provider(process.env.BS_DOCS_MODEL ?? "default"),
    system: systemPrompt(siteName),
    tools,
    // Convergence, in docus's register: a step ceiling, tool calls denied
    // on the final step, and an output budget — reasoning models cannot
    // think forever.
    stopWhen: isStepCount(MAX_STEPS),
    prepareStep: ({ stepNumber }) => (stepNumber >= MAX_STEPS - 1 ? { toolChoice: "none" } : {}),
    maxOutputTokens: 8000,
    maxRetries: 2,
    onEnd: closeMcp,
    onAbort: closeMcp,
    onError: ({ error }) => {
      console.error("[docs-theme] assistant error:", error);
      closeMcp();
    },
    abortSignal: abortController.signal,
    // Chars arrive in readable pulses, not in awkward chunk boundaries.
    experimental_transform: smoothStream(),
    messages: await convertToModelMessages(messages ?? []),
  });

  return result.toUIMessageStreamResponse();
});
