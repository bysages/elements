import type { Meta } from "@storybook/react-vite";

import { Empty } from ".";
import { Button } from "../button";

const meta: Meta = { title: "Components/Layout/Empty" };
export default meta;

const tray = (
  <svg
    viewBox="0 0 24 24"
    width={56}
    height={56}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.25}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M22 12h-6l-2 3h-4l-2-3H2" />
    <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </svg>
);

export const Basic = {
  render: () => (
    <Empty.Root>
      <Empty.Visual>{tray}</Empty.Visual>
      <Empty.Title>The tray is empty</Empty.Title>
      <Empty.Description>Nothing has been filed here yet.</Empty.Description>
      <Empty.Actions>
        <Button size="sm">File the first page</Button>
      </Empty.Actions>
    </Empty.Root>
  ),
};

export const WithoutAction = {
  render: () => (
    <Empty.Root>
      <Empty.Visual>{tray}</Empty.Visual>
      <Empty.Title>Nothing to show</Empty.Title>
      <Empty.Description>The search returned no pages.</Empty.Description>
    </Empty.Root>
  ),
};
