import { createSignal } from "solid-js";

import { Mentions } from ".";
import { Field } from "../field";

const meta = { title: "Components/Forms/Mentions" };
export default meta;

const teammates = [
  { label: "Lin Hua", value: "lin" },
  { label: "Mei Chen", value: "mei" },
  { label: "Hong Wei", value: "hong" },
  { label: "Yan Wu", value: "yan" },
  { label: "Zhou Lan", value: "zhou" },
];

/** Type @ and the first letters: the vessel offers the teammates whose
 * name answers; Enter or a click inserts, Escape dismisses. */
export const Basic = {
  render: () => {
    const [text, setText] = createSignal("");

    return (
      <>
        <Mentions
          items={teammates}
          placeholder="Describe the task and @who should read it…"
          value={text()}
          onValueChange={setText}
        />
        <p
          role="status"
          style={{
            "margin-block-start": "var(--bs-space-4)",
            "font-size": "var(--bs-font-size-sm)",
            color: "var(--bs-color-text-tertiary)",
          }}
        >
          {text() ? `Field holds: ${text()}` : "The field is empty."}
        </p>
      </>
    );
  },
};

/** A different trigger character, for systems where @ already means
 * something else. */
export const CustomTrigger = {
  render: () => {
    const [text, setText] = createSignal("Review with #");

    return (
      <Mentions
        items={[
          { label: "Design review", value: "design-review" },
          { label: "Editorial review", value: "editorial-review" },
          { label: "Civic review", value: "civic-review" },
        ]}
        trigger="#"
        placeholder="Tag a review…"
        value={text()}
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
    const [text, setText] = createSignal("");

    return (
      <Field.Root invalid={true} style={{ "max-inline-size": "28rem" }}>
        <Field.Label>Describe the task</Field.Label>
        <Mentions
          items={teammates}
          placeholder="Describe the task and @who should read it…"
          value={text()}
          onValueChange={setText}
        />
        <Field.ErrorText>Every task needs a body before it files.</Field.ErrorText>
      </Field.Root>
    );
  },
};

/** Several triggers and rich rows: `@` finds people, `/` finds commands,
 * and grouping gives the vessel a stable reading order. */
export const Groups = {
  render: () => {
    const [text, setText] = createSignal("");

    return (
      <>
        <Mentions
          items={[
            {
              label: "Lin Hua",
              value: "lin",
              group: "People",
              description: "Design systems",
              icon: "pencil",
            },
            {
              label: "Mei Chen",
              value: "mei",
              group: "People",
              description: "Editorial",
              icon: "pencil",
            },
            {
              label: "Search web",
              value: "search-web",
              group: "Commands",
              description: "Find current sources",
              icon: "file",
              insertText: "/search-web ",
            },
          ]}
          triggers={["@", "/"]}
          placeholder="Mention @Lin or run /Search…"
          value={text()}
          onValueChange={setText}
        />
        <p
          role="status"
          style={{
            "margin-block-start": "var(--bs-space-4)",
            "font-size": "var(--bs-font-size-sm)",
            color: "var(--bs-color-text-tertiary)",
          }}
        >
          {text() ? `Field holds: ${text()}` : "Type @ or / to see groups."}
        </p>
      </>
    );
  },
};
