import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { Accordion } from ".";
import { Slider } from "../slider";

const meta: Meta = { title: "Components/Layout/Accordion" };
export default meta;

const chevron = (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M4 6l4 4 4-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const items = [
  {
    value: "paper",
    title: "What is the paper-and-ink system?",
    body: "Interfaces are warm paper, content is ink, hierarchy is light — never pure white, never a hard pop.",
  },
  {
    value: "tokens",
    title: "Where do visual values come from?",
    body: "Every color, spacing, radius, elevation, and duration resolves from design tokens; a hardcoded pixel is a bug.",
  },
  {
    value: "ark",
    title: "Who owns the interaction?",
    body: "Ark UI's machines own state, ARIA, and positioning; our styles dress the anatomy they render.",
  },
];

function leaf(item: (typeof items)[number], itemProps: any = {}) {
  return (
    <Accordion.Item key={item.value} value={item.value} {...itemProps}>
      <Accordion.ItemTrigger>
        {item.title}
        <Accordion.ItemIndicator>{chevron}</Accordion.ItemIndicator>
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>
        <p>{item.body}</p>
      </Accordion.ItemContent>
    </Accordion.Item>
  );
}

/** One row may be open at a time; the open leaf keeps a lit edge while the
 * others rest. */
export const Basic = {
  args: {
    disabled: false,
  },
  render: (args: any) => (
    <Accordion.Root defaultValue={["paper"]} disabled={args.disabled}>
      {items.map((item) => leaf(item))}
    </Accordion.Root>
  ),
};

/** Collapsible: the open leaf may also be folded — at rest, all rows
 * closed. */
export const Collapsible = {
  render: () => (
    <Accordion.Root defaultValue={["paper"]} collapsible>
      {items.map((item) => leaf(item))}
    </Accordion.Root>
  ),
};

/** Multiple: every leaf keeps its own state; several may rest open. */
export const Multiple = {
  render: () => (
    <Accordion.Root defaultValue={["paper", "ark"]} multiple>
      {items.map((item) => leaf(item))}
    </Accordion.Root>
  ),
};

/** One row rests with a disabled leaf: the trigger stays quiet to clicks. */
export const DisabledItem = {
  render: () => (
    <Accordion.Root>
      {items.map((item) => leaf(item, { disabled: item.value === "tokens" } as any))}
    </Accordion.Root>
  ),
};

/** The open state answers to the caller — the rows only mirror. */
export const Controlled = {
  render: () => {
    const [value, setValue] = useState(["paper"]);
    return (
      <Accordion.Root value={value} onValueChange={(e: { value: string[] }) => setValue(e.value)}>
        {items.map((item) => leaf(item))}
      </Accordion.Root>
    );
  },
};

/** The fold runs sideways: panels open along the horizontal axis. */
export const Horizontal = {
  render: () => (
    <Accordion.Root defaultValue={["paper"]} orientation="horizontal">
      {items.map((item) => (
        <Accordion.Item key={item.value} value={item.value}>
          <Accordion.ItemTrigger>{item.title}</Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <p style={{ textAlign: "center" }}>{item.body}</p>
          </Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  ),
};

/** The panel mounts only on first open and leaves on exit — nothing of
 * the closed leaf rests in the page. */
export const LazyMount = {
  render: () => (
    <Accordion.Root lazyMount unmountOnExit>
      {items.map((item) => leaf(item))}
    </Accordion.Root>
  ),
};

/** A leaf's body may hold its own control — here a recessed slider runs
 * inside the open panel. */
export const WithSlider = {
  render: () => (
    <Accordion.Root defaultValue={["paper"]}>
      {items.map((item) => (
        <Accordion.Item key={item.value} value={item.value}>
          <Accordion.ItemTrigger>
            {item.title}
            <Accordion.ItemIndicator>{chevron}</Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            {item.value === "paper" ? (
              <Slider.Root defaultValue={[40]}>
                <Slider.Label>Ink weight</Slider.Label>
                <Slider.Control>
                  <Slider.Track>
                    <Slider.Range />
                  </Slider.Track>
                  <Slider.Thumb index={0}>
                    <Slider.HiddenInput />
                  </Slider.Thumb>
                </Slider.Control>
              </Slider.Root>
            ) : (
              <p>{item.body}</p>
            )}
          </Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  ),
};
