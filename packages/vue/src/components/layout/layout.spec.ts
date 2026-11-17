import { describe, expect, it } from "vite-plus/test";
import { createSSRApp, defineComponent, h } from "vue";
import { renderToString } from "vue/server-renderer";

import { Layout } from "./index";

describe("Layout SSR", () => {
  it("renders a resizable sider without mutating readonly attrs", async () => {
    const page = defineComponent({
      render: () =>
        h(Layout.Root, { sider: "start", class: "h-dvh", style: { overflow: "hidden" } }, () => [
          h(Layout.Sider, { resizable: true }, () => "Navigation"),
          h(Layout.Content, () => "Dashboard"),
        ]),
    });
    const app = createSSRApp(page);
    const warnings: string[] = [];
    app.config.warnHandler = (message) => warnings.push(String(message));

    const html = await renderToString(app);
    expect(html).toContain('class="h-dvh"');
    expect(html).toContain('data-part="sider"');
    expect(html).toContain("data-resizable");
    expect(html).toContain("Dashboard");
    expect(warnings.some((message) => message.includes("Proxy object"))).toBe(false);

    app.unmount();
  });
});
