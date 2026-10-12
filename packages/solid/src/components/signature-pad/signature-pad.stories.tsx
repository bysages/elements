import { SignaturePad } from ".";

const meta = {
  title: "Components/Forms/Signature Pad",
  component: SignaturePad,
};
export default meta;

/** The facade is the one-tag path. */
export const Basic = {
  render: () => <SignaturePad label="Sign below" />,
};
