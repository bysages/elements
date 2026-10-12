import { createSignal } from "solid-js";

import { Popconfirm } from ".";
import { Button } from "../button";

const meta = { title: "Components/Overlay/Popconfirm", component: Popconfirm };
export default meta;

/** The question and its two answers; the panel closes on either. */
export const Basic = {
  render: () => {
    const [status, setStatus] = createSignal("Idle");
    return (
      <div>
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
            "margin-block-start": "var(--bs-space-4)",
            "font-size": "var(--bs-font-size-sm)",
            color: "var(--bs-color-text-tertiary)",
          }}
        >
          {status()}
        </p>
      </div>
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
