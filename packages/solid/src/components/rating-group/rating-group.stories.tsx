import { RatingGroup } from ".";

const meta = { title: "Components/Forms/Rating Group", component: RatingGroup };
export default meta;

/** The facade is the one-tag path; complex composition stays on the anatomy. */
export const Basic = {
  render: () => <RatingGroup defaultValue={3} count={5} label="Rate this entry" />,
};
