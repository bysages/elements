// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from "vite-plus/test";
import { createApp, defineComponent, h, nextTick, type Component } from "vue";

import { Mentions } from "./index";

const items = [
  { label: "Lin Hua", value: "lin" },
  { label: "Mei Chen", value: "mei" },
];

beforeEach(() => {
  document.body.replaceChildren();
});

describe("mentions", () => {
  it("inserts the active option and keeps the vessel id connected", async () => {
    let value = "";
    const host = defineComponent({
      setup() {
        return () =>
          h(Mentions as Component, {
            items,
            "onUpdate:modelValue": (next: string) => {
              value = next;
            },
          });
      },
    });
    const container = document.createElement("div");
    document.body.append(container);
    const app = createApp(host);
    app.mount(container);
    const textarea = container.querySelector("textarea");
    if (!textarea) throw new Error("mentions textarea is missing");

    textarea.value = "@Li";
    textarea.setSelectionRange(3, 3);
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
    await nextTick();
    await new Promise((resolve) => setTimeout(resolve, 20));

    const popup = document.querySelector<HTMLElement>('[data-part="popup"]');
    if (!popup) throw new Error("mention popup is missing");
    expect(textarea.getAttribute("aria-controls")).toBe(popup.id);
    expect(textarea.getAttribute("aria-expanded")).toBe("true");

    textarea.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true }),
    );
    await nextTick();

    expect(value).toBe("@Lin Hua ");
    app.unmount();
  });

  it("inserts from a pointer press without moving focus into the popup", async () => {
    let value = "";
    const host = defineComponent({
      setup() {
        return () =>
          h(Mentions as Component, {
            items,
            "onUpdate:modelValue": (next: string) => {
              value = next;
            },
          });
      },
    });
    const container = document.createElement("div");
    document.body.append(container);
    const app = createApp(host);
    app.mount(container);
    const textarea = container.querySelector("textarea");
    if (!textarea) throw new Error("mentions textarea is missing");

    textarea.value = "@Me";
    textarea.setSelectionRange(3, 3);
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
    await nextTick();
    await new Promise((resolve) => setTimeout(resolve, 20));

    const option = document.querySelector<HTMLElement>('[data-part="option"]');
    if (!option) throw new Error("mention option is missing");
    option.dispatchEvent(
      new MouseEvent("mousedown", { button: 0, bubbles: true, cancelable: true }),
    );
    await nextTick();

    expect(value).toBe("@Mei Chen ");
    app.unmount();
  });
  it("renders disabled candidates but skips them for insertion", async () => {
    let selected: unknown;
    const host = defineComponent({
      setup() {
        return () =>
          h(Mentions as Component, {
            items: [
              { label: "Alpha", value: "alpha", group: "Team One", disabled: true },
              { label: "Aria", value: "aria", group: "Team Two" },
            ],
            onSelect: (entry: unknown) => {
              selected = entry;
            },
          });
      },
    });
    const container = document.createElement("div");
    document.body.append(container);
    const app = createApp(host);
    app.mount(container);
    const textarea = container.querySelector("textarea");
    if (!textarea) throw new Error("mentions textarea is missing");

    textarea.value = "@A";
    textarea.setSelectionRange(2, 2);
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
    await nextTick();
    await new Promise((resolve) => setTimeout(resolve, 20));

    expect(document.querySelector('[data-part="option"][data-disabled]')).not.toBeNull();
    const label = document.querySelector<HTMLElement>('[data-part="group-label"]');
    expect(label?.id).toMatch(/:group-[0-9]+$/);
    expect(label?.id).not.toContain(" ");

    textarea.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true }),
    );
    await nextTick();

    expect(selected).toEqual({ label: "Aria", value: "aria", group: "Team Two" });
    app.unmount();
  });
});
