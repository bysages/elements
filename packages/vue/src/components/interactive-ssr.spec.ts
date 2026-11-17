import { createListCollection } from "@ark-ui/vue/select";
import { describe, expect, it } from "vite-plus/test";
import { createSSRApp, defineComponent, h, type VNode } from "vue";
import { renderToString } from "vue/server-renderer";

import { Dialog } from "./dialog";
import { Select } from "./select";
import { Tabs } from "./tabs";

async function renderSsr(vnode: () => VNode) {
  const warnings: string[] = [];
  const app = createSSRApp(defineComponent({ render: vnode }));
  app.config.warnHandler = (message) => warnings.push(String(message));
  const html = await renderToString(app);
  app.unmount();

  return { html, warnings };
}

function expectSsrSafe(warnings: string[]) {
  const messages = warnings.join("\n");
  expect(messages).not.toContain("currentRenderingInstance");
  expect(messages).not.toContain("Proxy object");
}

describe("interactive anatomy SSR", () => {
  it("renders a closed Dialog.Root without a client boundary", async () => {
    const { html, warnings } = await renderSsr(() =>
      h(Dialog.Root, () => [
        h(Dialog.Trigger, () => "Open"),
        h(Dialog.Backdrop),
        h(Dialog.Positioner, { portal: false }, () =>
          h(Dialog.Content, () => h(Dialog.Title, () => "Edit")),
        ),
      ]),
    );

    expect(html).toContain('data-part="trigger"');
    expect(html).toContain("Open");
    expectSsrSafe(warnings);
  });

  it("renders Tabs.Root and its selected panel", async () => {
    const { html, warnings } = await renderSsr(() =>
      h(Tabs.Root, { defaultValue: "one" }, () => [
        h(Tabs.List, () => [
          h(Tabs.Trigger, { value: "one" }, () => "One"),
          h(Tabs.Trigger, { value: "two" }, () => "Two"),
        ]),
        h(Tabs.Content, { value: "one" }, () => "First"),
      ]),
    );

    expect(html).toContain('data-part="list"');
    expect(html).toContain('data-part="trigger"');
    expect(html).toContain('data-part="content"');
    expect(html).toContain("First");
    expectSsrSafe(warnings);
  });

  it("renders Select.Root with its hidden native select", async () => {
    const collection = createListCollection({
      items: [
        { label: "React", value: "react" },
        { label: "Vue", value: "vue" },
      ],
    });
    const { html, warnings } = await renderSsr(() =>
      h(Select.Root, { collection, defaultValue: ["react"], name: "framework" }, () => [
        h(Select.Label, () => "Framework"),
        h(Select.Control, () => [
          h(Select.Trigger, () => h(Select.ValueText)),
          h(Select.HiddenSelect),
        ]),
        h(Select.Positioner, { portal: false }, () =>
          h(Select.Content, () =>
            h(Select.List, () =>
              collection.items.map((item) =>
                h(Select.Item, { key: item.value, item }, () => [
                  h(Select.ItemText, () => item.label),
                ]),
              ),
            ),
          ),
        ),
      ]),
    );

    expect(html).toContain('data-part="control"');
    expect(html).toContain('data-part="trigger"');
    expect(html).toContain('<select name="framework"');
    expect(html).toContain("React");
    expectSsrSafe(warnings);
  });
});
