// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from "vite-plus/test";
import { createApp, defineComponent, h } from "vue";

import { Dialog } from "./index";

beforeEach(() => {
  document.body.replaceChildren();
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
