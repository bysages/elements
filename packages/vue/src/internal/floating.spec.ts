// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from "vite-plus/test";
import { createApp, defineComponent, h, nextTick } from "vue";

import { FloatingPortal } from "./floating";

beforeEach(() => {
  document.body.replaceChildren();
});

describe("floating portal", () => {
  it("mounts on body by default and stays inline when asked", async () => {
    async function render(portal: boolean) {
      const host = defineComponent({
        render: () => h(FloatingPortal, { portal }, () => h("div", { "data-part": "vessel" })),
      });
      const container = document.createElement("div");
      document.body.append(container);
      const app = createApp(host);
      app.mount(container);
      await nextTick();
      return { container, app };
    }

    const portalPage = await render(true);
    const inlinePage = await render(false);
    const vessel = document.querySelector('[data-part="vessel"]');

    expect(vessel).toBeTruthy();
    expect(portalPage.container.contains(vessel!)).toBe(false);
    expect(inlinePage.container.querySelector('[data-part="vessel"]')).toBeTruthy();

    portalPage.app.unmount();
    inlinePage.app.unmount();
  });
});
