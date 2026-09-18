import type { Meta } from "@storybook/react-vite";

import { AiMessage } from ".";
import { Ai } from "../ai";

const meta: Meta = { title: "Components/AI/AI Message" };
export default meta;

/** Whose stroke this is: the user's words sit in a recessed bubble,
 * the assistant speaks flat on the paper. */
export const Basic = {
  render: () => (
    <div style={{ display: "grid", gap: "1rem", width: "100%", maxWidth: "46rem" }}>
      <AiMessage role="user">
        <Ai.MessageContent>Draft a short note announcing the ink release.</Ai.MessageContent>
      </AiMessage>
      <AiMessage role="assistant">
        <Ai.MessageContent>The draft is ready — three sections, one summary.</Ai.MessageContent>
      </AiMessage>
    </div>
  ),
};
