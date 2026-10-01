import type { Meta } from "@storybook/react-vite";

import { FocusTrap } from ".";
import { Button } from "../button";
import { Input } from "../input";

const meta: Meta = { title: "Components/Overlay/FocusTrap" };
export default meta;

/** Focus stays within the subtree — for containers that live outside
 * the dialog machine but still owe the keyboard a boundary. */
export const Basic = {
  render: () => (
    <FocusTrap>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          padding: "1rem",
          borderRadius: "0.5rem",
          border: "1px solid var(--bs-color-border)",
        }}
      >
        <p style={{ margin: 0, fontSize: "0.875rem" }}>Tab cannot leave this box.</p>
        <Input placeholder="First stop" />
        <Input placeholder="Second stop" />
        <Button size="sm" style={{ alignSelf: "flex-start" }}>
          Cycle back
        </Button>
      </div>
    </FocusTrap>
  ),
};
