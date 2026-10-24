// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from "vite-plus/test";
import { createApp, defineComponent, h, nextTick } from "vue";

import { Terminal } from "./index";

beforeEach(() => {
  document.body.replaceChildren();
});

function mountTerminal(readonly = false, onCommand?: (command: string) => void) {
  const host = defineComponent({
    render: () => h(Terminal, { lines: ["ready"], readOnly: readonly, onCommand }),
  });
  const container = document.createElement("div");
  document.body.append(container);
  const app = createApp(host);
  app.mount(container);
  return { app, container, input: container.querySelector<HTMLInputElement>("input") };
}

describe("terminal", () => {
  it("keeps an editable command line by default", () => {
    const terminal = mountTerminal();

    expect(terminal.input).toBeInstanceOf(HTMLInputElement);
    terminal.app.unmount();
  });

  it("omits the command line in readonly mode", () => {
    const terminal = mountTerminal(true);

    expect(terminal.container.querySelector("[data-readonly]")).not.toBeNull();
    expect(terminal.input).toBeNull();
    terminal.app.unmount();
  });

  it("emits a submitted command and clears the draft", async () => {
    const commands: string[] = [];
    const terminal = mountTerminal(false, (command) => commands.push(command));
    const input = terminal.input;
    if (!input) throw new Error("terminal input is missing");
    input.value = "help";
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    await nextTick();

    expect(commands).toEqual(["help"]);
    expect(input.value).toBe("");
    terminal.app.unmount();
  });
});
