import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { Mentions } from ".";
import { Field } from "../field";

const meta: Meta = { title: "Components/Forms/Mentions" };
export default meta;

const teammates = [
  { label: "Lin Hua", value: "lin" },
  { label: "Mei Chen", value: "mei" },
  { label: "Hong Wei", value: "hong" },
  { label: "Yan Wu", value: "yan" },
  { label: "Zhou Lan", value: "zhou" },
];

const statusStyle = {
  marginBlockStart: "var(--bs-space-4)",
  fontSize: "var(--bs-font-size-sm)",
  color: "var(--bs-color-text-tertiary)",
} as const;

/** Type @ and the first letters: the vessel offers the teammates whose
 * name answers; Enter or a click inserts, Escape dismisses. */
export const Basic = {
  render: () => {
    const [text, setText] = useState("");
    return (
      <div>
        <Mentions
          items={teammates}
          placeholder="Describe the task and @who should read it…"
          value={text}
          onValueChange={setText}
        />
        <p role="status" style={statusStyle}>
          {text ? `Field holds: ${text}` : "The field is empty."}
        </p>
      </div>
    );
  },
};

/** A different trigger character, for systems where @ already means
 * something else. */
export const CustomTrigger = {
  render: () => {
    const [text, setText] = useState("Review with #");
    return (
      <Mentions
        items={[
          { label: "Design review", value: "design-review" },
          { label: "Editorial review", value: "editorial-review" },
          { label: "Civic review", value: "civic-review" },
        ]}
        trigger="#"
        placeholder="Tag a review…"
        value={text}
        onValueChange={setText}
      />
    );
  },
};

/** Inside a `Field.Root` the field picks up the label wiring and the
 * invalid state on its own — mark the field invalid and the hairline
 * turns cinnabar. */
export const WithField = {
  render: () => {
    const [text, setText] = useState("");
    return (
      <Field.Root invalid style={{ maxInlineSize: "28rem" }}>
        <Field.Label>Describe the task</Field.Label>
        <Mentions
          items={teammates}
          placeholder="Describe the task and @who should read it…"
          value={text}
          onValueChange={setText}
        />
        <Field.ErrorText>Every task needs a body before it files.</Field.ErrorText>
      </Field.Root>
    );
  },
};
