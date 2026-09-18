import { waitForElement, waitForEvent } from "@ark-ui/react/tour";
import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { Tour, useTour, type TourStepDetails } from ".";

const meta: Meta = { title: "Components/Overlay/Tour" };
export default meta;

const steps: TourStepDetails[] = [
  {
    id: "welcome",
    type: "dialog",
    title: "Welcome",
    description: "A short walk through the room before the ink settles.",
    actions: [{ label: "Start", action: "next" }],
  },
  {
    id: "first",
    type: "tooltip",
    title: "The first seal",
    description: "Primary actions sit quiet until asked — then they answer.",
    target: () => document.querySelector<HTMLElement>("#tour-anchor-first"),
    actions: [{ label: "Next", action: "next" }],
  },
  {
    id: "second",
    type: "tooltip",
    title: "The second seal",
    description: "Everything stays on the paper; nothing leaves the page.",
    target: () => document.querySelector<HTMLElement>("#tour-anchor-second"),
    actions: [{ label: "Finish", action: "dismiss" }],
  },
];

export function Basic() {
  const tour = useTour({ steps });
  return (
    <Tour.Root tour={tour}>
      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem" }}>
        <button id="tour-anchor-first" type="button" onClick={() => tour.start()}>
          First
        </button>
        <button id="tour-anchor-second" type="button" onClick={() => tour.start("second")}>
          Second
        </button>
      </div>
      <Tour.Backdrop />
      <Tour.Spotlight />
      <Tour.Positioner>
        <Tour.Content>
          <Tour.Arrow>
            <Tour.ArrowTip />
          </Tour.Arrow>
          <Tour.CloseTrigger>×</Tour.CloseTrigger>
          <Tour.ProgressText />
          <Tour.Title />
          <Tour.Description />
          <Tour.Control>
            <Tour.Actions>
              {(actions) =>
                actions.map((action) => <Tour.ActionTrigger key={action.label} action={action} />)
              }
            </Tour.Actions>
          </Tour.Control>
        </Tour.Content>
      </Tour.Positioner>
    </Tour.Root>
  );
}

const buttonStyle = {
  border: "1px solid var(--bs-color-border)",
  background: "var(--bs-color-surface-2)",
  borderRadius: "var(--bs-radius-sm)",
  padding: "0.375rem 0.75rem",
  font: "inherit",
  fontSize: "var(--bs-font-size-sm)",
  cursor: "pointer",
};

const targetStyle = {
  display: "grid",
  placeItems: "center",
  padding: "1rem",
  border: "1px dashed var(--bs-color-border)",
  borderRadius: "var(--bs-radius-md)",
  fontSize: "var(--bs-font-size-sm)",
  color: "var(--bs-color-text-tertiary)",
};

/** The spotlight card: every part the walk needs, plus optional extra
 * children inside the content (progress measures and the like). */
function card(...extraContent: React.ReactNode[]) {
  return (
    <>
      <Tour.Backdrop />
      <Tour.Spotlight />
      <Tour.Positioner>
        <Tour.Content>
          <Tour.Arrow>
            <Tour.ArrowTip />
          </Tour.Arrow>
          <Tour.CloseTrigger aria-label="Close">×</Tour.CloseTrigger>
          <Tour.ProgressText />
          <Tour.Title />
          <Tour.Description />
          <Tour.Control>
            <Tour.Actions>
              {(actions) =>
                actions.map((action) => (
                  <Tour.ActionTrigger key={action.label} action={action}>
                    {action.label}
                  </Tour.ActionTrigger>
                ))
              }
            </Tour.Actions>
          </Tour.Control>
          {extraContent}
        </Tour.Content>
      </Tour.Positioner>
    </>
  );
}

function targets(ids: string[], prefix: string) {
  return (
    <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem" }}>
      {ids.map((id, index) => (
        <div key={id} id={id} style={targetStyle}>
          {`${prefix} ${index + 1}`}
        </div>
      ))}
    </div>
  );
}

/** The shared stage: a start button, anchor targets, and the spotlight
 * card that walks between them. Everything lives under Tour.Root — the
 * parts read their context through it. */
function stage(
  options: Record<string, any>,
  steps: TourStepDetails[],
  extras?: (tour: ReturnType<typeof useTour>) => React.ReactNode,
) {
  return function TourStage() {
    const tour = useTour({ steps, ...options });
    return (
      <Tour.Root tour={tour}>
        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem" }}>
          {extras?.(tour) ?? (
            <button type="button" style={buttonStyle} onClick={() => tour.start()}>
              Start tour
            </button>
          )}
        </div>
        {card()}
      </Tour.Root>
    );
  };
}

/** Dialog, tooltip, floating: three step kinds in one walk — the
 * floating card needs no anchor at all. */
export const MixedTypes = stage(
  {},
  [
    {
      id: "welcome",
      type: "dialog",
      title: "Welcome",
      description: "This walk shows dialog, tooltip, and floating steps.",
      actions: [{ label: "Start", action: "next" }],
    },
    {
      id: "tooltip-step",
      type: "tooltip",
      title: "Tooltip step",
      description: "Anchored to a specific element on the page.",
      target: () => document.querySelector<HTMLElement>("#tour-mixed-target"),
      actions: [
        { label: "Back", action: "prev" },
        { label: "Next", action: "next" },
      ],
    },
    {
      id: "floating-step",
      type: "floating",
      placement: "bottom-end",
      title: "Floating step",
      description: "Fixed on screen, independent of any target.",
      actions: [
        { label: "Back", action: "prev" },
        { label: "Next", action: "next" },
      ],
    },
    {
      id: "complete",
      type: "dialog",
      title: "Tour complete",
      description: "You have seen every step kind.",
      actions: [{ label: "Done", action: "dismiss" }],
    },
  ] as TourStepDetails[],
  (tour) => [
    <button key="start" type="button" style={buttonStyle} onClick={() => tour.start()}>
      Start tour
    </button>,
    <div key="target" id="tour-mixed-target" style={targetStyle}>
      Target element
    </div>,
  ],
);

/** The step waits for the reader to act: click each button in turn to
 * walk the tour forward. */
export const WaitForClick = stage(
  {},
  [
    {
      id: "intro",
      type: "dialog",
      title: "Interactive tutorial",
      description: "You must complete each step to proceed.",
      actions: [{ label: "Begin", action: "next" }],
    },
    ...(["Add", "Edit", "Delete"] as const).map((label) => ({
      id: `click-${label.toLowerCase()}`,
      type: "tooltip" as const,
      title: `Click the ${label} button`,
      description: `Click "${label}" to continue the tour.`,
      target: () => document.querySelector<HTMLElement>(`#tour-click-${label.toLowerCase()}`),
      effect({ next, target, show }: any) {
        show();
        const [promise, cancel] = waitForEvent(target, "click");
        void promise.then(() => next());
        return cancel;
      },
    })),
    {
      id: "complete",
      type: "dialog",
      title: "Well done",
      description: "You completed all the interactive steps.",
      actions: [{ label: "Finish", action: "dismiss" }],
    },
  ] as TourStepDetails[],
  (tour) => [
    <button key="start" type="button" style={buttonStyle} onClick={() => tour.start()}>
      Start tour
    </button>,
    <div key="buttons" style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem" }}>
      {["add", "edit", "delete"].map((kind) => (
        <button key={kind} id={`tour-click-${kind}`} type="button" style={buttonStyle}>
          {kind[0].toUpperCase() + kind.slice(1)}
        </button>
      ))}
    </div>,
  ],
);

/** The tour waits for the input to be worthy: two characters for the
 * name, a well-formed address for the email, a tick for the terms. */
export const WaitForInput = stage(
  {},
  [
    {
      id: "intro",
      type: "dialog",
      title: "Form tutorial",
      description: "Follow the guided steps to fill out the form.",
      actions: [{ label: "Start", action: "next" }],
    },
    {
      id: "enter-name",
      type: "tooltip",
      title: "Enter your name",
      description: "Type at least two characters to continue.",
      target: () => document.querySelector<HTMLInputElement>("#tour-input-name"),
      effect({ next, target, show }: any) {
        show();
        const [promise, cancel] = waitForEvent(target, "input", {
          predicate: (el: HTMLInputElement) => el.value.trim().length >= 2,
        });
        void promise.then(() => next());
        return cancel;
      },
    },
    {
      id: "enter-email",
      type: "tooltip",
      title: "Enter your email",
      description: "Now enter a valid email address.",
      target: () => document.querySelector<HTMLInputElement>("#tour-input-email"),
      effect({ next, target, show }: any) {
        show();
        const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const [promise, cancel] = waitForEvent(target, "input", {
          predicate: (el: HTMLInputElement) => email.test(el.value),
        });
        void promise.then(() => next());
        return cancel;
      },
    },
    {
      id: "accept-terms",
      type: "tooltip",
      title: "Accept the terms",
      description: "Check the box to finish.",
      target: () => document.querySelector<HTMLInputElement>("#tour-input-terms"),
      effect({ next, target, show }: any) {
        show();
        const [promise, cancel] = waitForEvent(target, "change", {
          predicate: (el: HTMLInputElement) => el.checked,
        });
        void promise.then(() => next());
        return cancel;
      },
    },
    {
      id: "complete",
      type: "dialog",
      title: "Form complete",
      description: "The form is filled; the tour is over.",
      actions: [{ label: "Done", action: "dismiss" }],
    },
  ] as TourStepDetails[],
  (tour) => [
    <button
      key="start"
      type="button"
      style={{ ...buttonStyle, marginBottom: "1.5rem" }}
      onClick={() => tour.start()}
    >
      Start tour
    </button>,
    <div
      key="inputs"
      style={{
        display: "grid",
        gap: "0.75rem",
        justifyItems: "start",
        marginBottom: "1.5rem",
      }}
    >
      <input id="tour-input-name" placeholder="Name" style={buttonStyle} aria-label="Name" />
      <input id="tour-input-email" placeholder="Email" style={buttonStyle} aria-label="Email" />
      <label style={{ display: "flex", gap: "0.375rem", fontSize: "var(--bs-font-size-sm)" }}>
        <input id="tour-input-terms" type="checkbox" />
        I accept the terms
      </label>
    </div>,
  ],
);

/** The step loads before it speaks: data arrives, then the card
 * updates in place. */
export const AsyncStep = stage(
  {},
  [
    {
      id: "intro",
      type: "dialog",
      title: "Async loading",
      description: "This step loads its data before showing itself.",
      actions: [{ label: "Next", action: "next" }],
    },
    {
      id: "profile",
      type: "tooltip",
      title: "Loading...",
      description: "Fetching the account...",
      target: () => document.querySelector<HTMLElement>("#tour-async-card"),
      actions: [{ label: "Next", action: "next" }],
      effect({ show, update }: any) {
        const timer = setTimeout(() => {
          update({
            title: "Welcome back, Lin",
            description: "You have 12 drafts and 3 comments waiting.",
          });
          show();
        }, 1200);
        return () => clearTimeout(timer);
      },
    },
    {
      id: "complete",
      type: "dialog",
      title: "Tour complete",
      description: "The async step resolved before it displayed.",
      actions: [{ label: "Done", action: "dismiss" }],
    },
  ] as TourStepDetails[],
  (tour) => [
    <button key="start" type="button" style={buttonStyle} onClick={() => tour.start()}>
      Start tour
    </button>,
    <div key="card" id="tour-async-card" style={targetStyle}>
      Account card
    </div>,
  ],
);

/** The machine reports as it walks: every step and status change lands
 * in the log below. */
export function Events() {
  const [entries, setEntries] = useState<string[]>([]);
  const tour = useTour({
    steps: [
      {
        id: "step-1",
        type: "tooltip",
        title: "First step",
        description: "Watch the log as you navigate.",
        target: () => document.querySelector<HTMLElement>("#tour-event-1"),
        actions: [{ label: "Next", action: "next" }],
      },
      {
        id: "step-2",
        type: "tooltip",
        title: "Second step",
        description: "Each step change fires an event.",
        target: () => document.querySelector<HTMLElement>("#tour-event-2"),
        actions: [
          { label: "Back", action: "prev" },
          { label: "Finish", action: "dismiss" },
        ],
      },
    ] as TourStepDetails[],
    onStepChange: (details: { stepId: string | null }) => {
      setEntries((log) => [...log, `Step changed: ${details.stepId}`]);
    },
    onStatusChange: (details: { status: string | null }) => {
      setEntries((log) => [...log, `Status: ${details.status}`]);
    },
  });
  return (
    <Tour.Root tour={tour}>
      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem" }}>
        <button type="button" style={buttonStyle} onClick={() => tour.start()}>
          Start tour
        </button>
        {targets(["tour-event-1", "tour-event-2"], "Step")}
      </div>
      <pre
        style={{
          fontSize: "var(--bs-font-size-xs)",
          color: "var(--bs-color-text-tertiary)",
          margin: 0,
          minHeight: "3rem",
        }}
      >
        {entries.join("\n")}
      </pre>
      {card()}
    </Tour.Root>
  );
}

/** Arrow keys walk, Escape leaves — the keyboard carries the tour. */
export const KeyboardNavigation = stage(
  { keyboardNavigation: true },
  [
    {
      id: "step-1",
      type: "tooltip",
      title: "Keyboard navigation",
      description: "Press the right arrow key (→) to go to the next step.",
      target: () => document.querySelector<HTMLElement>("#tour-key-1"),
      actions: [{ label: "Next", action: "next" }],
    },
    {
      id: "step-2",
      type: "tooltip",
      title: "Go back",
      description: "Press the left arrow key (←) to return.",
      target: () => document.querySelector<HTMLElement>("#tour-key-2"),
      actions: [
        { label: "Back", action: "prev" },
        { label: "Finish", action: "dismiss" },
      ],
    },
  ] as TourStepDetails[],
  (tour) => [
    <button key="start" type="button" style={buttonStyle} onClick={() => tour.start()}>
      Start tour
    </button>,
    targets(["tour-key-1", "tour-key-2"], "Step"),
    <p
      key="hint"
      style={{
        fontSize: "var(--bs-font-size-xs)",
        color: "var(--bs-color-text-tertiary)",
        margin: 0,
      }}
    >
      Use arrow keys to navigate, Escape to close
    </p>,
  ],
);

/** A quiet measure of the walk: the fill widens with every step. */
export function ProgressBar() {
  const tour = useTour({
    steps: [
      {
        id: "step-1",
        type: "tooltip",
        title: "Progress tracking",
        description: "Watch the bar at the foot of the card.",
        target: () => document.querySelector<HTMLElement>("#tour-progress-1"),
        actions: [{ label: "Next", action: "next" }],
      },
      {
        id: "step-2",
        type: "tooltip",
        title: "Halfway",
        description: "The fill shows how far along you are.",
        target: () => document.querySelector<HTMLElement>("#tour-progress-2"),
        actions: [
          { label: "Back", action: "prev" },
          { label: "Finish", action: "dismiss" },
        ],
      },
    ] as TourStepDetails[],
  });
  return (
    <Tour.Root tour={tour}>
      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem" }}>
        <button type="button" style={buttonStyle} onClick={() => tour.start()}>
          Start tour
        </button>
        {targets(["tour-progress-1", "tour-progress-2"], "Step")}
      </div>
      {card(
        <div
          style={{
            height: "0.25rem",
            borderRadius: "var(--bs-radius-sm)",
            background: "var(--bs-color-border)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${tour.getProgressPercent()}%`,
              background: "var(--bs-color-primary)",
              transition: "width var(--bs-duration-normal) var(--bs-ease-default)",
            }}
          />
        </div>,
      )}
    </Tour.Root>
  );
}

/** Every step offers the exit: skip ends the walk early, no questions. */
export const SkipTour = stage({}, [
  {
    id: "step-1",
    type: "tooltip",
    title: "First feature",
    description: "You can skip the tour at any time.",
    target: () => document.querySelector<HTMLElement>("#tour-skip-1"),
    actions: [
      { label: "Skip", action: "dismiss" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "step-2",
    type: "tooltip",
    title: "Second feature",
    description: "Continue or skip — both are fine.",
    target: () => document.querySelector<HTMLElement>("#tour-skip-2"),
    actions: [
      { label: "Skip", action: "dismiss" },
      { label: "Back", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "step-3",
    type: "tooltip",
    title: "Final feature",
    description: "The last step of the walk.",
    target: () => document.querySelector<HTMLElement>("#tour-skip-3"),
    actions: [
      { label: "Back", action: "prev" },
      { label: "Finish", action: "dismiss" },
    ],
  },
] as TourStepDetails[]);

/** The walk waits for the paper to change: add an item and the tour
 * finds the new element before speaking. */
export function WaitForElement() {
  const [items, setItems] = useState(["Item 1", "Item 2"]);
  const tour = useTour({
    steps: [
      {
        id: "intro",
        type: "dialog",
        title: "Dynamic elements",
        description: "This tour waits for elements that appear on demand.",
        actions: [{ label: "Start", action: "next" }],
      },
      {
        id: "add-item",
        type: "tooltip",
        title: "Add an item",
        description: "Click the button to add a new item to the list.",
        target: () => document.querySelector<HTMLElement>("#tour-add-item"),
        effect({ next, target, show }: any) {
          show();
          const [promise, cancel] = waitForEvent(target, "click");
          void promise.then(() => next());
          return cancel;
        },
      },
      {
        id: "new-item",
        type: "tooltip",
        title: "New item added",
        description: "The tour waited for this element to appear before showing.",
        target: () => document.querySelector<HTMLElement>('[data-item="new"]'),
        effect({ show }: any) {
          const [promise, cancel] = waitForElement(
            () => document.querySelector<HTMLElement>('[data-item="new"]'),
            { timeout: 5000 },
          );
          void promise.then(() => show());
          return () => cancel();
        },
        actions: [{ label: "Next", action: "next" }],
      },
      {
        id: "complete",
        type: "dialog",
        title: "Tour complete",
        description: "You learned how the tour waits for dynamic content.",
        actions: [{ label: "Done", action: "dismiss" }],
      },
    ] as TourStepDetails[],
  });
  return (
    <Tour.Root tour={tour}>
      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem" }}>
        <button type="button" style={buttonStyle} onClick={() => tour.start()}>
          Start tour
        </button>
        <button
          id="tour-add-item"
          type="button"
          style={buttonStyle}
          onClick={() => setItems((list) => [...list, `Item ${list.length + 1}`])}
        >
          Add item
        </button>
      </div>
      <ul
        style={{
          display: "grid",
          gap: "0.375rem",
          margin: 0,
          padding: 0,
          listStyle: "none",
        }}
      >
        {items.map((item, index) => (
          <li
            key={item}
            data-item={index === items.length - 1 && index >= 2 ? "new" : undefined}
            style={targetStyle}
          >
            {item}
          </li>
        ))}
      </ul>
      {card()}
    </Tour.Root>
  );
}
