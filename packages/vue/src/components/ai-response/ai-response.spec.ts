// @vitest-environment happy-dom
import { describe, expect, it } from "vite-plus/test";
import { createApp, defineComponent, h, nextTick } from "vue";

import { AiResponse } from ".";

describe("AiResponse", () => {
  it("renders fenced Mermaid through the shared markdown renderer", async () => {
    const host = defineComponent({
      setup() {
        return () =>
          h(AiResponse, {
            content: [
              "## Architecture",
              "",
              "```mermaid",
              "flowchart LR",
              "  Ink --> Paper",
              "```",
            ].join("\n"),
          });
      },
    });
    const container = document.createElement("div");
    document.body.append(container);
    const app = createApp(host);
    app.mount(container);
    await nextTick();

    const figure = container.querySelector("figure.bs-mermaid");
    expect(figure?.getAttribute("data-diagram")).toBe("flowchart");
    expect(figure?.querySelector("svg.pele")).toBeTruthy();
    app.unmount();
  });
});
