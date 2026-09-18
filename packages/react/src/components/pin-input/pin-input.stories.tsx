import { usePinInput } from "@ark-ui/react/pin-input";
import type { Meta } from "@storybook/react-vite";

import { PinInput } from ".";
import { Field } from "../field";

const meta: Meta = { title: "Components/Forms/Pin Input" };
export default meta;

function pin(extraProps: Record<string, any> = {}, count = 4) {
  return (
    <PinInput.Root placeholder="·" {...extraProps}>
      <PinInput.Label>Verification code</PinInput.Label>
      <PinInput.Control>
        {Array.from({ length: count }, (_, index) => (
          <PinInput.Input key={index} index={index} />
        ))}
      </PinInput.Control>
      <PinInput.HiddenInput />
    </PinInput.Root>
  );
}

/** A six-digit code: one character per seal, the caret hopping forward on
 * each keystroke. */
export const Basic = {
  args: {
    placeholder: "·",
    length: 6,
  },
  render: (args: any) => (
    <div style={{ maxWidth: "20rem" }}>{pin({ placeholder: args.placeholder }, args.length)}</div>
  ),
};

/** The last seal filled lets go of the focus: the form is ready. */
export const BlurOnComplete = {
  render: () => <div style={{ maxWidth: "20rem" }}>{pin({ blurOnComplete: true })}</div>,
};

/** A bolder vacancy: each empty seal shows a custom placeholder. */
export const CustomPlaceholder = {
  render: () => <div style={{ maxWidth: "20rem" }}>{pin({ placeholder: "0" })}</div>,
};

/** What is typed stays secret: every seal reads as a dot. */
export const Mask = {
  render: () => <div style={{ maxWidth: "20rem" }}>{pin({ mask: true })}</div>,
};

/** One-time-code mode: a paste lands whole in the first seal, then the
 * machine deals it out. */
export const OtpMode = {
  render: () => <div style={{ maxWidth: "20rem" }}>{pin({ otp: true }, 6)}</div>,
};

/** In a field: the helper speaks below, the error waits for invalid. */
export const WithField = {
  render: () => (
    <Field.Root invalid>
      {pin({})}
      <Field.HelperText>Four digits from your token</Field.HelperText>
      <Field.ErrorText>The code must be four digits</Field.ErrorText>
    </Field.Root>
  ),
};

/** The machine answers outside its anatomy: the provider owns the code. */
export const RootProvider = {
  render: () => {
    const pinInput = usePinInput({ placeholder: "·", otp: true });
    return (
      <PinInput.RootProvider value={pinInput}>
        <PinInput.Label>Verification code</PinInput.Label>
        <PinInput.Control>
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <PinInput.Input key={index} index={index} />
          ))}
        </PinInput.Control>
        <PinInput.HiddenInput />
      </PinInput.RootProvider>
    );
  },
};
