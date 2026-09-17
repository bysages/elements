import type { Meta } from "@storybook/react-vite";

import { Textarea } from ".";
import { Field } from "../field";

const meta: Meta = { title: "Components/Forms/Textarea" };
export default meta;

/** The resting state: paper surface, one hairline, room to grow. */
export const Basic = {
  render: () => <Textarea placeholder="Leave a note" rows={3} />,
};

/** Invalid and disabled — the standard register shifts. */
export const States = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--bs-space-3)", maxWidth: "24rem" }}>
      <Textarea invalid defaultValue="Too short" rows={2} />
      <Textarea disabled defaultValue="Sealed" rows={2} />
    </div>
  ),
};

/** Under the Field family the textarea answers to the field's invalid
 * state and carries its label. */
export const WithField = {
  render: () => (
    <Field.Root invalid>
      <Field.Label>Abstract</Field.Label>
      <Textarea rows={4} placeholder="Summarize the paper in 150 words" />
      <Field.ErrorText>The abstract is required for submission.</Field.ErrorText>
    </Field.Root>
  ),
};
