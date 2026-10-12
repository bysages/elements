import { Fieldset } from ".";
import { Field } from "../field";

const meta = { title: "Components/Forms/Fieldset", component: Fieldset };
export default meta;

/** The facade is the one-tag path. */
export const Basic = {
  render: () => (
    <Fieldset label="Contact details" description="All fields are required.">
      <Field label="Name" placeholder="John Doe" required />
      <Field label="Email" placeholder="john@example.com" required />
    </Fieldset>
  ),
};
