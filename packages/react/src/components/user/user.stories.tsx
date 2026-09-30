import type { Meta } from "@storybook/react-vite";

import { User } from ".";

const meta: Meta = { title: "Components/Elements/User" };
export default meta;

/** The plain row: initials on the seal until an image is supplied. */
export const Basic = {
  render: () => <User name="Shen Wenzheng" description="Keeper of seals" />,
};

/** The quiet echo beneath the name is optional. */
export const NameOnly = {
  render: () => <User name="Lin Wan" />,
};

/** The seal borrows each control-height rung. */
export const Sizes = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--bs-gap-md)" }}>
      <User name="Chen Yu" description="Small rung" size="sm" />
      <User name="Chen Yu" description="Medium rung" size="md" />
      <User name="Chen Yu" description="Large rung" size="lg" />
    </div>
  ),
};

/** The square cut: a stamp beside a round portrait. */
export const Square = {
  render: () => <User name="Zhou Ping" shape="square" size="md" />,
};
