import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { Terminal } from ".";

const meta: Meta = { title: "Components/Data/Terminal" };
export default meta;

/** The console at rest: each entered line leaves as an event and
 * returns through the lines prop, so the transcript stays the
 * caller's to shape. */
export const Basic = {
  render: () => {
    const [lines, setLines] = useState([
      "paper 0.1.0",
      "Type `help` to see what the console knows.",
    ]);
    return (
      <Terminal
        lines={lines}
        prompt="❯"
        placeholder="Type a command…"
        label="Paper console"
        style={{ maxInlineSize: "34rem" }}
        onCommand={(text) => {
          setLines((current) => [
            ...current,
            `❯ ${text}`,
            text === "help" ? "Commands: help, clear" : `unknown command: ${text}`,
          ]);
          if (text === "clear") setLines([]);
        }}
      />
    );
  },
};
