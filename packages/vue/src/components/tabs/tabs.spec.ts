// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from "vite-plus/test";
import { createApp, createSSRApp, defineComponent, h } from "vue";
import { renderToString } from "vue/server-renderer";

import { Tabs } from "./index";

const items = [
  { value: "one", label: "One", content: "First" },
  { value: "two", label: "Two", content: "Second" },
];

beforeEach(() => {
  document.body.replaceChildren();
});

describe("tabs facade", () => {
  function mount(props: Record<string, unknown>, onClose?: (value: string) => void) {
    const host = defineComponent({
      setup() {
        return () =>
          h(
            Tabs as never,
            {
              items,
              ...props,
              ...(onClose ? { onClose: (item: { value: string }) => onClose(item.value) } : {}),
            } as never,
          );
      },
    });
    const container = document.createElement("div");
    document.body.append(container);
    const app = createApp(host);
    app.mount(container);
    return { app, container };
  }

  it("renders its panels and keeps the machine selection", () => {
    const { container, app } = mount({ defaultValue: "two" });

    expect(container.querySelectorAll('[data-part="content"]')).toHaveLength(2);
    const selected = container.querySelector<HTMLButtonElement>(
      '[data-part="trigger"][data-selected]',
    );
    expect(selected?.textContent).toContain("Two");
    app.unmount();
  });

  it("keeps machine ids stable through SSR", async () => {
    const host = defineComponent({
      setup() {
        return () => h(Tabs as never, { items } as never);
      },
    });
    const html = await renderToString(createSSRApp(host));

    expect(html).toContain('id="tabs:bs-tabs-');
    expect(html).toContain(':list"');
    expect(html).toContain(':trigger-one"');
    expect(html).toBe(await renderToString(createSSRApp(host)));
  });

  it("renders a session strip without panels", () => {
    const { container, app } = mount({ contentless: true, scrollable: true });

    expect(container.querySelectorAll('[data-part="content"]')).toHaveLength(0);
    expect(container.querySelector('[data-part="list"]')?.hasAttribute("data-scrollable")).toBe(
      true,
    );
    app.unmount();
  });

  it("uses a sibling close control and reports the closed item", () => {
    const closed: string[] = [];
    const { container, app } = mount({ contentless: true, closable: true }, (value) =>
      closed.push(value),
    );
    const close = container.querySelector<HTMLButtonElement>('[data-part="close"]');
    expect(close?.getAttribute("aria-label")).toBe("Close One");
    expect(close?.closest('[data-part="trigger"]')).toBeNull();
    close?.click();
    expect(closed).toEqual(["one"]);
    app.unmount();
  });
});
