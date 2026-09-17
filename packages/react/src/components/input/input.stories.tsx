import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { Input } from ".";
import { Field } from "../field";

const meta: Meta = { title: "Components/Forms/Input" };
export default meta;

/** The resting state: paper surface, one hairline, placeholder ink. */
export const Basic = {
  render: () => <Input placeholder="Your name" />,
};

/** Sizes ride the control-height ladder. */
export const Sizes = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--bs-space-3)", maxWidth: "24rem" }}>
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium (default)" />
      <Input size="lg" placeholder="Large" />
    </div>
  ),
};

/** Under the Field family the input answers to the field's invalid
 * state; standing alone it takes the `invalid` prop. */
export const Invalid = {
  render: () => <Input invalid defaultValue="not-an-email" type="email" />,
};

/** Disabled: muted surface, no shadow, no cursor tricks. */
export const Disabled = {
  render: () => <Input disabled value="Read only" />,
};

/** Controlled — the value the parent holds is the value the input
 * shows. */
export const Controlled = {
  render: () => {
    const [text, setText] = useState("");
    return (
      <>
        <Input value={text} onValueChange={setText} placeholder="Type and watch the echo" />
        <p style={{ fontSize: "var(--bs-font-size-sm)", color: "var(--bs-color-text-tertiary)" }}>
          value: {JSON.stringify(text)}
        </p>
      </>
    );
  },
};

/** The full form register: Field provides the label, hint and error
 * channel; the input carries the ink and answers to the field's
 * invalid state through its context. */
export const WithField = {
  render: () => (
    <Field.Root invalid>
      <Field.Label>Email address</Field.Label>
      <Input type="email" placeholder="lin@example.com" />
      <Field.HelperText>We only write about your orders.</Field.HelperText>
      <Field.ErrorText>Enter a valid email address.</Field.ErrorText>
    </Field.Root>
  ),
};
