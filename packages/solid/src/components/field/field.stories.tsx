import { Field } from ".";

const meta = { title: "Components/Forms/Field", component: Field };
export default meta;

/** The facade is the one-tag path. */
export const Basic = {
  render: () => (
    <Field
      label="Email"
      description="We only write about your orders."
      placeholder="lin@example.com"
      required
    />
  ),
};
