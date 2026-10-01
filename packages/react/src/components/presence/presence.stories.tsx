import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { Presence } from ".";
import { Button } from "../button";

const meta: Meta = { title: "Components/Elements/Presence" };
export default meta;

/** Mount and unmount in step with the CSS presence animations — the
 * exit always finishes before the node leaves. */
export const Toggle = {
  render: () => {
    const [present, setPresent] = useState(true);
    return (
      <>
        <Button
          size="sm"
          onClick={() => setPresent((current) => !current)}
          style={{ marginBlockEnd: "1rem" }}
        >
          {present ? "Unmount" : "Mount"}
        </Button>
        <Presence present={present}>
          <div
            style={{
              padding: "1rem",
              borderRadius: "0.5rem",
              border: "1px solid var(--bs-color-border)",
            }}
          >
            The node and its exit animation share one clock.
          </div>
        </Presence>
      </>
    );
  },
};
