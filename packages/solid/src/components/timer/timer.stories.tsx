import { Timer } from ".";

const meta = { title: "Components/Data/Timer", component: Timer };
export default meta;

/** The complete timer behind one duration: minute and second digits with
 * its four quiet actions. */
export const Basic = {
  render: () => <Timer startMs={18 * 60 * 1000 + 42 * 1000} label="Session timer" />,
};
