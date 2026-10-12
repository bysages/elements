import { NumberInput } from ".";

const meta = { title: "Components/Forms/Number Input", component: NumberInput };
export default meta;

/** The facade is the one-tag path. */
export const Basic = {
  render: () => <NumberInput label="Quantity" placeholder="1" min={1} max={12} step={1} />,
};
