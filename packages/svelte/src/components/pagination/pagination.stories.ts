import type { Component } from "svelte";

import { Pagination } from ".";

type Story = {
  render?: () => { Component: Component<any>; props?: Record<string, unknown> };
};

const meta = { title: "Components/Navigation/Pagination", component: Pagination };

export default meta;

/** The simple register: prev, the standing count, next — for toolbars
 * and card footers where the ladder will not fit. */
export const Simple: Story = {
  render: () => ({
    Component: Pagination,
    props: {
      defaultValue: 3,
      count: 5000,
      pageSize: 10,
      label: "Archive pages",
      variant: "simple",
    },
  }),
};
