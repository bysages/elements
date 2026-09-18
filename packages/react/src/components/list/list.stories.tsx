import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { List } from ".";
import { Avatar } from "../avatar";
import { Button } from "../button";

const meta: Meta = { title: "Components/Data/List" };
export default meta;

const initials = (text: string) => (
  <Avatar.Root>
    <Avatar.Fallback>{text}</Avatar.Fallback>
  </Avatar.Root>
);

/** The full row: the mark before the words, the title and its quiet
 * echo, the way out on the right. */
export const Basic = {
  render: () => (
    <List.Root style={{ maxInlineSize: "28rem" }}>
      <List.Item>
        <List.Leading>{initials("SW")}</List.Leading>
        <List.Content title="Seal registry" description="Who pressed which seal, and when." />
        <List.Actions>
          <Button variant="ghost" size="sm">
            Open
          </Button>
        </List.Actions>
      </List.Item>
      <List.Item>
        <List.Leading>{initials("LW")}</List.Leading>
        <List.Content title="Letter room" description="Correspondence awaiting the registrar." />
        <List.Actions>
          <Button variant="ghost" size="sm">
            Open
          </Button>
        </List.Actions>
      </List.Item>
      <List.Item>
        <List.Leading>{initials("AB")}</List.Leading>
        <List.Content
          title="Archive annex"
          description="Shelved records, fourth row, eastern cabinet."
        />
        <List.Actions>
          <Button variant="ghost" size="sm">
            Open
          </Button>
        </List.Actions>
      </List.Item>
    </List.Root>
  ),
};

/** The bordered ledger with the hoverable wash: a row the caller makes
 * clickable (role="button") answers the pointer and takes the inset
 * focus halo on its own. */
export const Interactive = {
  render: () => {
    const [, setOpened] = useState("");
    return (
      <List.Root bordered hoverable style={{ maxInlineSize: "28rem" }}>
        {(
          [
            ["Morning readings", "Barometer steady, ink flows well."],
            ["Noon deliveries", "Two crates of paper from the mill."],
            ["Evening closings", "The lamps are trimmed at dusk."],
          ] as const
        ).map(([title, description]) => (
          <List.Item
            key={title}
            role="button"
            tabIndex={0}
            onClick={() => setOpened(title)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") setOpened(title);
            }}
          >
            <List.Content title={title} description={description} />
          </List.Item>
        ))}
      </List.Root>
    );
  },
};
