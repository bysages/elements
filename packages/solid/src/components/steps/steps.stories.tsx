import { Steps } from ".";

const meta = { title: "Components/Navigation/Steps", component: Steps };
export default meta;

const items = [{ title: "Order" }, { title: "Fire" }, { title: "Glaze" }];

/** Dot trims each seal to a bead; the title carries the meaning. */
export const Dot = {
  render: () => <Steps items={items} variant="dot" defaultStep={1} />,
};
