import { mount, unmount } from "svelte";
import type { ComponentProps } from "svelte";
// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from "vite-plus/test";

import { Tabs } from "./index";

const items = [
  { value: "one", label: "One", icon: "file" },
  { value: "two", label: "Two", disabled: true },
];

beforeEach(() => {
  document.body.replaceChildren();
});

describe("tabs facade", () => {
  function mountTabs(props: Partial<ComponentProps<typeof Tabs>>) {
    const container = document.createElement("div");
    document.body.append(container);
    const component = mount(Tabs, {
      target: container,
      props: { items, ...props } as ComponentProps<typeof Tabs>,
    });
    return { component, container };
  }

  it("renders disabled tabs, icons, and its panels", () => {
    const { component, container } = mountTabs({ defaultValue: "one" });

    const disabled = container.querySelector<HTMLButtonElement>(
      '[data-part="trigger"][data-disabled]',
    );
    expect(disabled?.textContent).toContain("Two");
    expect(container.querySelector('[data-part="trigger"] [data-scope="icon"]')).not.toBeNull();
    expect(container.querySelectorAll('[data-part="content"]')).toHaveLength(2);
    const selected = container.querySelector<HTMLButtonElement>(
      '[data-part="trigger"][data-selected]',
    );
    expect(selected?.textContent).toContain("One");
    void unmount(component);
  });

  it("renders a session strip without panels", () => {
    const { component, container } = mountTabs({ contentless: true, scrollable: true });

    expect(container.querySelectorAll('[data-part="content"]')).toHaveLength(0);
    expect(container.querySelector('[data-part="list"]')?.hasAttribute("data-scrollable")).toBe(
      true,
    );
    void unmount(component);
  });

  it("uses a sibling close control and reports the closed item", () => {
    const closed: string[] = [];
    const { component, container } = mountTabs({
      contentless: true,
      closable: true,
      onClose: (item) => closed.push(item.value),
    });
    const close = container.querySelector<HTMLButtonElement>('[data-part="close"]');
    expect(close?.getAttribute("aria-label")).toBe("Close One");
    expect(close?.closest('[data-part="trigger"]')).toBeNull();
    close?.click();
    expect(closed).toEqual(["one"]);
    void unmount(component);
  });
});
