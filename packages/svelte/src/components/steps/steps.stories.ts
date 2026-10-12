import type { Component } from "svelte";

import { Steps } from ".";

type Story = {
  render?: () => { Component: Component<any>; props?: Record<string, unknown> };
};

const meta = { title: "Components/Navigation/Steps", component: Steps };

export default meta;

/** The dot register drops the numbers: beads on the road carry the
 * progress, labels keep the meaning. */
export const Dot: Story = {
  render: () => ({
    Component: Steps,
    props: {
      items: [{ title: "Account" }, { title: "Profile" }, { title: "Confirm" }],
      defaultStep: 1,
      variant: "dot",
    },
  }),
};
