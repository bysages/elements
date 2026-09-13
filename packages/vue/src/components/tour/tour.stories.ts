import { waitForElement, waitForEvent } from "@ark-ui/vue/tour";
import type { Meta } from "@storybook/vue3-vite";
import { defineComponent, h, reactive, Teleport } from "vue";

import { Tour, useTour, type TourStepDetails } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Overlay/Tour" };
export default meta;

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
function card(...extraContent: any[]) {
  return [
    h(Tour.Backdrop),
    h(Tour.Spotlight),
    h(Tour.Positioner, () =>
      h(Tour.Content, () => [
        h(Tour.Arrow, () => h(Tour.ArrowTip)),
        h(Tour.CloseTrigger, { "aria-label": "Close" }, () => "×"),
        h(Tour.ProgressText),
        h(Tour.Title),
        h(Tour.Description),
        h(Tour.Control, () =>
          h(Tour.Actions, null, {
            default: (actions: TourStepDetails["actions"]) =>
              actions?.map((action) =>
                h(Tour.ActionTrigger, { key: action.label, action }, () => action.label),
              ),
          }),
        ),
        ...extraContent,
      ]),
    ),
  ];
}

/** The shared stage: a start button, anchor targets, and the teleported
 * spotlight card that walks between them. Everything lives under
 * Tour.Root — the parts read their context through it. */
function stage(
  name: string,
  options: Record<string, any>,
  steps: TourStepDetails[],
  extras?: (tour: { value: any }) => any[],
) {
  const Host = defineComponent({
    name,
    setup() {
      const tour = useTour({ steps, ...options });
      return () =>
        h(Tour.Root, { tour: tour.value }, () => [
          h(
            "div",
            { style: { display: "flex", gap: "0.75rem", marginBottom: "1.5rem" } },
            extras?.(tour) ?? [
              h(
                "button",
                { type: "button", style: buttonStyle, onClick: () => tour.value.start() },
                () => "Start tour",
              ),
            ],
          ),
          h(Teleport, { to: "body" }, () => card()),
        ]);
    },
  });
  return () => h(Host);
}

const targets = (ids: string[], prefix: string) =>
  h(
    "div",
    { style: { display: "flex", gap: "0.75rem", marginBottom: "1.5rem" } },
    ids.map((id, index) => h("div", { id, style: targetStyle }, () => `${prefix} ${index + 1}`)),
  );

/** A dimmed page where the spotlight alone keeps focus; the card walks
 * from anchor to anchor, dialogs bookending the walk. */
export const Basic = {
  args: {
    startLabel: "Start tour",
  },
  render: (args: any) =>
    withState(
      () => () =>
        stage(
          "TourBasic",
          {},
          [
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
              target: () => document.querySelector<HTMLElement>("#tour-basic-1"),
              actions: [
                { label: "Back", action: "prev" },
                { label: "Next", action: "next" },
              ],
            },
            {
              id: "second",
              type: "tooltip",
              title: "The second seal",
              description: "Everything stays on the paper; nothing leaves the page.",
              target: () => document.querySelector<HTMLElement>("#tour-basic-2"),
              actions: [
                { label: "Back", action: "prev" },
                { label: "Finish", action: "dismiss" },
              ],
            },
            {
              id: "complete",
              type: "dialog",
              title: "You're all set",
              description: "The walk is over; the room is yours.",
              actions: [{ label: "Done", action: "dismiss" }],
            },
          ],
          (tour) => [
            h(
              "button",
              { type: "button", style: buttonStyle, onClick: () => tour.value.start() },
              () => args.startLabel,
            ),
            targets(["tour-basic-1", "tour-basic-2"], "Anchor"),
          ],
        ),
    ),
};

/** Dialog, tooltip, floating: three step kinds in one walk — the
 * floating card needs no anchor at all. */
export const MixedTypes = {
  render: () =>
    stage(
      "TourMixedTypes",
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
      ],
      (tour) => [
        h(
          "button",
          { type: "button", style: buttonStyle, onClick: () => tour.value.start() },
          () => "Start tour",
        ),
        h("div", { id: "tour-mixed-target", style: targetStyle }, () => "Target element"),
      ],
    ),
};

/** The step waits for the reader to act: click each button in turn to
 * walk the tour forward. */
export const WaitForClick = {
  render: () =>
    stage(
      "TourWaitForClick",
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
            promise.then(() => next());
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
      ],
      (tour) => [
        h(
          "button",
          { type: "button", style: buttonStyle, onClick: () => tour.value.start() },
          () => "Start tour",
        ),
        h(
          "div",
          { style: { display: "flex", gap: "0.75rem", marginBottom: "1.5rem" } },
          ["add", "edit", "delete"].map((kind) =>
            h(
              "button",
              { id: `tour-click-${kind}`, type: "button", style: buttonStyle },
              () => kind[0].toUpperCase() + kind.slice(1),
            ),
          ),
        ),
      ],
    ),
};

/** The tour waits for the input to be worthy: two characters for the
 * name, a well-formed address for the email, a tick for the terms. */
export const WaitForInput = {
  render: () =>
    stage(
      "TourWaitForInput",
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
            promise.then(() => next());
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
            promise.then(() => next());
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
            promise.then(() => next());
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
      ],
      (tour) => [
        h(
          "button",
          {
            type: "button",
            style: { ...buttonStyle, marginBottom: "1.5rem" },
            onClick: () => tour.value.start(),
          },
          () => "Start tour",
        ),
        h(
          "div",
          {
            style: {
              display: "grid",
              gap: "0.75rem",
              justifyItems: "start",
              marginBottom: "1.5rem",
            },
          },
          [
            h("input", {
              id: "tour-input-name",
              placeholder: "Name",
              style: buttonStyle,
              "aria-label": "Name",
            }),
            h("input", {
              id: "tour-input-email",
              placeholder: "Email",
              style: buttonStyle,
              "aria-label": "Email",
            }),
            h(
              "label",
              { style: { display: "flex", gap: "0.375rem", fontSize: "var(--bs-font-size-sm)" } },
              [h("input", { id: "tour-input-terms", type: "checkbox" }), "I accept the terms"],
            ),
          ],
        ),
      ],
    ),
};

/** The step loads before it speaks: data arrives, then the card
 * updates in place. */
export const AsyncStep = {
  render: () =>
    stage(
      "TourAsyncStep",
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
      ],
      (tour) => [
        h(
          "button",
          { type: "button", style: buttonStyle, onClick: () => tour.value.start() },
          () => "Start tour",
        ),
        h("div", { id: "tour-async-card", style: targetStyle }, () => "Account card"),
      ],
    ),
};

/** The machine reports as it walks: every step and status change lands
 * in the log below. */
export const Events = {
  render: () => {
    const Host = defineComponent({
      name: "TourEvents",
      setup() {
        const logs = reactive({ entries: [] as string[] });
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
          ],
          onStepChange: (details: { stepId: string | null }) => {
            logs.entries.push(`Step changed: ${details.stepId}`);
          },
          onStatusChange: (details: { status: string | null }) => {
            logs.entries.push(`Status: ${details.status}`);
          },
        });
        return () =>
          h(Tour.Root, { tour: tour.value }, () => [
            h("div", { style: { display: "flex", gap: "0.75rem", marginBottom: "1.5rem" } }, [
              h(
                "button",
                { type: "button", style: buttonStyle, onClick: () => tour.value.start() },
                () => "Start tour",
              ),
              targets(["tour-event-1", "tour-event-2"], "Step"),
            ]),
            h(
              "pre",
              {
                style: {
                  fontSize: "var(--bs-font-size-xs)",
                  color: "var(--bs-color-text-tertiary)",
                  margin: 0,
                  minHeight: "3rem",
                },
              },
              logs.entries.join("\n"),
            ),
            h(Teleport, { to: "body" }, () => card()),
          ]);
      },
    });
    return () => h(Host);
  },
};

/** Arrow keys walk, Escape leaves — the keyboard carries the tour. */
export const KeyboardNavigation = {
  render: () =>
    stage(
      "TourKeyboardNavigation",
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
      ],
      (tour) => [
        h(
          "button",
          { type: "button", style: buttonStyle, onClick: () => tour.value.start() },
          () => "Start tour",
        ),
        targets(["tour-key-1", "tour-key-2"], "Step"),
        h(
          "p",
          {
            style: {
              fontSize: "var(--bs-font-size-xs)",
              color: "var(--bs-color-text-tertiary)",
              margin: 0,
            },
          },
          "Use arrow keys to navigate, Escape to close",
        ),
      ],
    ),
};

/** A quiet measure of the walk: the fill widens with every step. */
export const ProgressBar = {
  render: () => {
    const Host = defineComponent({
      name: "TourProgressBar",
      setup() {
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
          ],
        });
        return () =>
          h(Tour.Root, { tour: tour.value }, () => [
            h("div", { style: { display: "flex", gap: "0.75rem", marginBottom: "1.5rem" } }, [
              h(
                "button",
                { type: "button", style: buttonStyle, onClick: () => tour.value.start() },
                () => "Start tour",
              ),
              targets(["tour-progress-1", "tour-progress-2"], "Step"),
            ]),
            h(Teleport, { to: "body" }, () =>
              card(
                h(
                  "div",
                  {
                    style: {
                      height: "0.25rem",
                      borderRadius: "var(--bs-radius-sm)",
                      background: "var(--bs-color-border)",
                      overflow: "hidden",
                    },
                  },
                  () =>
                    h("div", {
                      style: {
                        height: "100%",
                        width: `${tour.value.getProgressPercent()}%`,
                        background: "var(--bs-color-primary)",
                        transition: "width var(--bs-duration-normal) var(--bs-ease-default)",
                      },
                    }),
                ),
              ),
            ),
          ]);
      },
    });
    return () => h(Host);
  },
};

/** Every step offers the exit: skip ends the walk early, no questions. */
export const SkipTour = {
  render: () =>
    stage(
      "TourSkipTour",
      {},
      [
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
      ],
      (tour) => [
        h(
          "button",
          { type: "button", style: buttonStyle, onClick: () => tour.value.start() },
          () => "Start tour",
        ),
        targets(["tour-skip-1", "tour-skip-2", "tour-skip-3"], "Item"),
      ],
    ),
};

/** The walk waits for the paper to change: add an item and the tour
 * finds the new element before speaking. */
export const WaitForElement = {
  render: () => {
    const Host = defineComponent({
      name: "TourWaitForElement",
      setup() {
        const state = reactive({ items: ["Item 1", "Item 2"] });
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
                promise.then(() => next());
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
                promise.then(() => show());
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
          ],
        });
        return () =>
          h(Tour.Root, { tour: tour.value }, () => [
            h("div", { style: { display: "flex", gap: "0.75rem", marginBottom: "1.5rem" } }, [
              h(
                "button",
                { type: "button", style: buttonStyle, onClick: () => tour.value.start() },
                () => "Start tour",
              ),
              h(
                "button",
                {
                  id: "tour-add-item",
                  type: "button",
                  style: buttonStyle,
                  onClick: () => state.items.push(`Item ${state.items.length + 1}`),
                },
                () => "Add item",
              ),
            ]),
            h(
              "ul",
              {
                style: {
                  display: "grid",
                  gap: "0.375rem",
                  margin: 0,
                  padding: 0,
                  listStyle: "none",
                },
              },
              state.items.map((item, index) =>
                h(
                  "li",
                  {
                    key: item,
                    "data-item": index === state.items.length - 1 && index >= 2 ? "new" : undefined,
                    style: targetStyle,
                  },
                  () => item,
                ),
              ),
            ),
            h(Teleport, { to: "body" }, () => card()),
          ]);
      },
    });
    return () => h(Host);
  },
};
