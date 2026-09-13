import { usePinInput } from "@ark-ui/vue/pin-input";
import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { Field } from "../field/index.js";
import { PinInput } from "./index.js";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components / Pin Input" };
export default meta;

function pin(extraProps: Record<string, any> = {}, count = 4) {
  return h(PinInput.Root, { placeholder: "·", ...extraProps }, () => [
    h(PinInput.Label, () => "Verification code"),
    h(PinInput.Control, () =>
      Array.from({ length: count }, (_, index) => h(PinInput.Input as any, { key: index, index })),
    ),
    h(PinInput.HiddenInput),
  ]);
}

/** A six-digit code: one character per seal, the caret hopping forward on
 * each keystroke. */
export const Basic = {
  args: {
    placeholder: "·",
    length: 6,
  },
  render: (args: any) =>
    withState(
      () => () =>
        h("div", { style: { maxWidth: "20rem" } }, [
          pin({ placeholder: args.placeholder }, args.length),
        ]),
    ),
};

/** The last seal filled lets go of the focus: the form is ready. */
export const BlurOnComplete = {
  render: () => h("div", { style: { maxWidth: "20rem" } }, [pin({ blurOnComplete: true })]),
};

/** A bolder vacancy: each empty seal shows a custom placeholder. */
export const CustomPlaceholder = {
  render: () => h("div", { style: { maxWidth: "20rem" } }, [pin({ placeholder: "*" })]),
};

/** What is typed stays secret: every seal reads as a dot. */
export const Mask = {
  render: () => h("div", { style: { maxWidth: "20rem" } }, [pin({ mask: true })]),
};

/** One-time-code mode: a paste lands whole in the first seal, then the
 * machine deals it out. */
export const OtpMode = {
  render: () => h("div", { style: { maxWidth: "20rem" } }, [pin({ otp: true }, 6)]),
};

/** In a field: the helper speaks below, the error waits for invalid. */
export const WithField = {
  render: () =>
    h(Field.Root, { invalid: true } as any, () => [
      pin({}),
      h(Field.HelperText, () => "Four digits from your token"),
      h(Field.ErrorText, () => "The code must be four digits"),
    ]),
};

/** The machine answers outside its anatomy: the provider owns the code. */
export const RootProvider = {
  render: () => {
    const Driver = {
      name: "PinInputRootProvider",
      setup() {
        const pinInput = usePinInput({ placeholder: "·", otp: true });
        return () =>
          h(PinInput.RootProvider as any, { value: pinInput.value }, () => [
            h(PinInput.Label, () => "Verification code"),
            h(PinInput.Control, () =>
              [0, 1, 2, 3, 4, 5].map((index) => h(PinInput.Input as any, { key: index, index })),
            ),
            h(PinInput.HiddenInput),
          ]);
      },
    };
    return () => h(Driver);
  },
};
