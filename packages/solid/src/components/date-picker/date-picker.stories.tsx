import { DatePicker } from ".";

const meta = { title: "Components/Forms/Date Picker", component: DatePicker };
export default meta;

/** The facade is the one-tag path for the common completion. */
export const Basic = {
  render: () => <DatePicker label="Start date" placeholder="yyyy-mm-dd" />,
};
