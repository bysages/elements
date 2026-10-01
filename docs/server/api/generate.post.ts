import { createError, defineEventHandler, readBody } from "h3";

import { pickSpecFixture } from "../utils/spec-fixtures";

/**
 * The generative endpoint replays recorded streams now: the prompt
 * picks a fixture, and the JSONL patches land one by one so the
 * studio keeps its streaming log. No gateway credential rides in the
 * deployment, and no visitor can spend ours.
 */

/** One patch every beat keeps the log alive without stalling the render. */
const TICK_MS = 90;

export default defineEventHandler(async (event) => {
  const { prompt } = await readBody<{ prompt?: string }>(event);
  if (!prompt?.trim()) {
    throw createError({ statusCode: 400, message: "A prompt is required." });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      for (const patch of pickSpecFixture(prompt)) {
        controller.enqueue(encoder.encode(`${JSON.stringify(patch)}\n`));
        await new Promise((resolve) => setTimeout(resolve, TICK_MS));
      }
      controller.close();
    },
  });

  // Same shape the AI SDK's text stream had — the client only reads the body.
  return new Response(stream, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
});
