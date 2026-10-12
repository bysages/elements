import { PasswordInput } from ".";

const meta = { title: "Components/Forms/Password Input", component: PasswordInput };
export default meta;

/** The facade is the one-tag path. */
export const Basic = {
  render: () => (
    <PasswordInput
      label="Password"
      placeholder="Enter a password"
      autoComplete="new-password"
      required
    />
  ),
};
