import { AngleSlider } from ".";

const meta = { title: "Components/Forms/Angle Slider", component: AngleSlider };
export default meta;

/** The facade is the one-tag path; complex composition stays on the anatomy. */
export const Basic = {
  render: () => <AngleSlider defaultValue={45} label="Light angle" />,
};
