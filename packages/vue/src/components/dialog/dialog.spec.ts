// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from "vite-plus/test";
import { createApp, defineComponent, h, nextTick } from "vue";

import { Dialog } from "./index";

beforeEach(() => {
  document.body.replaceChildren();
});

describe("dialog content measures", () => {
  it.each(["sm", "lg", "xl"] as const)(
    "names the %s sheet without utility overrides",
    async (size) => {
      const host = defineComponent({
        render: () => h(Dialog, { defaultOpen: true, label: "Edit", size }),
      });
      const app = createApp(host);
      app.mount(document.body);
      await nextTick();

      const content = document.querySelector<HTMLElement>('[data-part="content"]');
      expect(content?.dataset.size).toBe(size);
      app.unmount();
    },
  );
});

describe("dialog floating portal", () => {
  it("keeps a portal=false sheet in the caller tree", async () => {
    const host = defineComponent({
      render: () => h(Dialog, { defaultOpen: true, label: "Edit", content: "Body", portal: false }),
    });
    const container = document.createElement("div");
    document.body.append(container);
    const app = createApp(host);
    app.mount(container);
    await nextTick();

    expect(container.querySelector('[data-part="content"]')).not.toBeNull();
    expect(container.contains(container.querySelector('[data-part="content"]')!)).toBe(true);

    app.unmount();
    container.remove();
  });

  it("moves a default open sheet to body", async () => {
    const host = defineComponent({
      render: () => h(Dialog, { defaultOpen: true, label: "Edit", content: "Body" }),
    });
    const container = document.createElement("div");
    document.body.append(container);
    const app = createApp(host);
    app.mount(container);
    await nextTick();

    expect(container.querySelector('[data-part="content"]')).toBeNull();
    expect(document.body.querySelector('[data-part="content"]')).not.toBeNull();

    app.unmount();
    container.remove();
  });
});

describe("dialog semantic parts", () => {
  it("renders stable header, body and footer anatomy", () => {
    const host = defineComponent({
      render: () => [
        h(Dialog.Header, () => "Title"),
        h(Dialog.Body, () => "Content"),
        h(Dialog.Footer, () => "Actions"),
      ],
    });
    const container = document.createElement("div");
    document.body.append(container);
    createApp(host).mount(container);

    expect(container.querySelector('[data-part="header"]')?.tagName).toBe("HEADER");
    expect(container.querySelector('[data-part="body"]')?.tagName).toBe("DIV");
    expect(container.querySelector('[data-part="footer"]')?.tagName).toBe("FOOTER");
    container.remove();
  });
});
