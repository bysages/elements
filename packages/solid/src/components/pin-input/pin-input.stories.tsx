import { PinInput } from ".";

const meta = { title: "Components/Forms/Pin Input", component: PinInput };
export default meta;

/** The facade is the one-tag path. */
export const Basic = {
  render: () => <PinInput label="Verification code" placeholder="·" length={4} />,
};
