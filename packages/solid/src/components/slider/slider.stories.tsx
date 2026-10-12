import { Slider } from ".";

const meta = { title: "Components/Forms/Slider", component: Slider };
export default meta;

/** The facade is the one-tag path; complex composition stays on the anatomy. */
export const Basic = {
  render: () => <Slider defaultValue={40} label="Volume" min={0} max={100} step={1} />,
};
