import { Toggle as ArkToggle } from "@ark-ui/solid/toggle";
import { createSignal } from "solid-js";

import { Toggle } from ".";

const meta = { title: "Components/Actions/Toggle", component: Toggle };
export default meta;

function icon(d: string, filled = false) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      stroke-width="1.75"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

const boldPath = "M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8";
const heartPath =
  "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z";

/** A pressed seal: the glyph sinks into the ink and holds. */
export const Basic = {
  render: () => <Toggle label="Toggle bold">{icon(boldPath)}</Toggle>,
};

/** The same seal through its parts: the indicator names both faces
 * explicitly. */
export const Anatomy = {
  render: () => <Toggle.Root aria-label="Toggle bold">{icon(boldPath)}</Toggle.Root>,
};

/** The seal reads its own state: the word beside it names the side. */
export const Context = {
  render: () => (
    <Toggle.Root aria-label="Toggle bold">
      {icon(boldPath)}
      <ArkToggle.Context>
        {(context) => (
          <span
            style={{
              "font-size": "var(--bs-font-size-sm)",
              color: "var(--bs-color-text-secondary)",
            }}
          >
            {context().pressed ? "On" : "Off"}
          </span>
        )}
      </ArkToggle.Context>
    </Toggle.Root>
  ),
};

/** The press answers to the caller — the heart fills on command. */
export const Controlled = {
  render: () => {
    const [pressed, setPressed] = createSignal(false);
    return (
      <div style={{ display: "grid", gap: "0.75rem", "justify-items": "start" }}>
        <output
          style={{
            "font-size": "var(--bs-font-size-sm)",
            color: "var(--bs-color-text-secondary)",
          }}
        >
          pressed: {String(pressed())}
        </output>
        <Toggle.Root pressed={pressed()} onPressedChange={setPressed} aria-label="Toggle favourite">
          <ArkToggle.Indicator fallback={icon(heartPath)}>
            {icon(heartPath, true)}
          </ArkToggle.Indicator>
        </Toggle.Root>
      </div>
    );
  },
};

/** Retired from service: the seal takes no impression. */
export const Disabled = {
  render: () => (
    <Toggle.Root disabled aria-label="Toggle bold">
      {icon(boldPath)}
    </Toggle.Root>
  ),
};

/** Two faces, one seal: the indicator swaps glyphs as the state flips. */
export const Indicator = {
  render: () => (
    <Toggle.Root aria-label="Toggle favourite">
      <ArkToggle.Indicator fallback={icon(heartPath)}>{icon(heartPath, true)}</ArkToggle.Indicator>
    </Toggle.Root>
  ),
};
