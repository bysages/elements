import type { Meta } from "@storybook/react-vite";

import { Result } from ".";
import { Button } from "../button";

const meta: Meta = { title: "Components/Feedback/Result" };
export default meta;

const action = (variant: "solid" | "ghost", label: string) => (
  <Button variant={variant} tone="ink" size="sm">
    {label}
  </Button>
);

/** The verdict after the deed: the mark washes in the fixed pigment,
 * the title rides the serif, and the extra carries the way onward. */
export const Success = {
  render: () => (
    <Result.Root status="success">
      <Result.Icon />
      <Result.Title>The archive holds your letter</Result.Title>
      <Result.Description>
        A copy has been sealed and shelved; you will hear back once it is read.
      </Result.Description>
      <Result.Extra style={{ display: "flex", gap: "0.5rem" }}>
        {action("solid", "Back to the shelf")}
        {action("ghost", "Write another")}
      </Result.Extra>
    </Result.Root>
  ),
};

/** All four fixed pigments, side by side — the same vessel, four
 * verdicts. */
export const Statuses = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
      {(["success", "warning", "danger", "info"] as const).map((status) => (
        <Result.Root key={status} status={status} style={{ flex: "1 1 12rem" }}>
          <Result.Icon />
          <Result.Title>{status.slice(0, 1).toUpperCase() + status.slice(1)}</Result.Title>
          <Result.Description>The fixed pigment speaks the outcome.</Result.Description>
        </Result.Root>
      ))}
    </div>
  ),
};
