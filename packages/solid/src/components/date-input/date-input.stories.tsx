import { DateInput } from ".";

const meta = { title: "Components/Forms/Date Input", component: DateInput };
export default meta;

/** The facade is the one-tag path for the common completion. */
export const Basic = {
  render: () => <DateInput label="Publication date" />,
};
