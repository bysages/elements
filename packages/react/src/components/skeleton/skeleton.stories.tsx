import type { Meta } from "@storybook/react-vite";

import { Skeleton } from ".";

const meta: Meta = { title: "Components/Feedback/Skeleton" };
export default meta;

export const Basic = {
  render: () => <Skeleton style={{ width: "100%", height: "1rem" }} />,
};

export const Composition = {
  render: () => (
    <div style={{ display: "grid", gap: "0.75rem", maxWidth: "24rem" }}>
      <Skeleton style={{ width: "40%", height: "1.25rem" }} />
      <Skeleton style={{ width: "100%", height: "1rem" }} />
      <Skeleton style={{ width: "100%", height: "1rem" }} />
      <Skeleton style={{ width: "72%", height: "1rem" }} />
    </div>
  ),
};
