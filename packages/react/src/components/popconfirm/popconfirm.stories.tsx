import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { Popconfirm } from ".";
import { Button } from "../button";

const meta: Meta = { title: "Components/Overlay/Popconfirm" };
export default meta;

/** The question and its two answers; the panel closes on either. */
export const Basic = {
  render: () => {
    const [status, setStatus] = useState("Idle");
    return (
      <>
        <Popconfirm
          message="Delete this entry? The action cannot be undone."
          confirmText="Delete"
          cancelText="Keep"
          onConfirm={() => setStatus("Deleted.")}
          onCancel={() => setStatus("Kept.")}
        >
          <Button>Delete entry</Button>
        </Popconfirm>
        <p
          role="status"
          style={{
            marginBlockStart: "var(--bs-space-4)",
            fontSize: "var(--bs-font-size-sm)",
            color: "var(--bs-color-text-tertiary)",
          }}
        >
          {status}
        </p>
      </>
    );
  },
};

/** Default answer labels when the caller has nothing local to say. */
export const DefaultLabels = {
  render: () => (
    <Popconfirm message="Publish this change for review?">
      <Button variant="outline">Publish</Button>
    </Popconfirm>
  ),
};
