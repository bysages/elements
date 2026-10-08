import { beforeEach, describe, expect, it } from "vitest";
// @vitest-environment happy-dom
import { createApp, createSSRApp, defineComponent, h, nextTick } from "vue";
import { renderToString } from "vue/server-renderer";

import { Steps } from "./index";

const items = [{ title: "Account" }, { title: "Profile" }, { title: "Confirm" }];

beforeEach(() => {
  document.body.replaceChildren();
});

describe("steps facade", () => {
  it("presents items as tabs owned by the tablist", async () => {
    const html = await renderToString(
      createSSRApp(defineComponent({ render: () => h(Steps, { items }) })),
    );

    expect(html).toContain('role="presentation"');
  });

  it("lets a trigger move directly to another step by default", async () => {
    const container = document.createElement("div");
    document.body.append(container);
    const app = createApp(defineComponent({ render: () => h(Steps, { items }) }));
    app.mount(container);

    const trigger = () =>
      [...container.querySelectorAll('[data-scope="steps"][data-part="trigger"]')].at(1) as
        | HTMLButtonElement
        | undefined;
    expect(trigger()?.getAttribute("aria-selected")).toBe("false");

    trigger()?.click();
    await nextTick();

    expect(trigger()?.getAttribute("aria-selected")).toBe("true");
    app.unmount();
  });
});
