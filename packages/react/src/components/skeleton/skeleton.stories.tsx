import type { Meta } from "@storybook/react-vite";

import { Skeleton } from ".";

const meta: Meta = { title: "Components/Feedback/Skeleton" };
export default meta;

export const Basic = {
  render: () => <Skeleton style={{ width: "100%", height: "1rem" }} />,
};

export const Card = {
  render: () => (
    <div
      style={{
        display: "grid",
        gap: "0.75rem",
        inlineSize: "18rem",
        padding: "1rem",
        border: "1px solid var(--bs-color-border)",
        borderRadius: "var(--bs-radius-lg)",
      }}
    >
      <Skeleton style={{ blockSize: "7rem", inlineSize: "100%" }} />
      <Skeleton style={{ blockSize: "1.125rem", inlineSize: "55%" }} />
      <Skeleton style={{ blockSize: "0.875rem", inlineSize: "100%" }} />
      <Skeleton style={{ blockSize: "0.875rem", inlineSize: "80%" }} />
    </div>
  ),
};
