import { flushSync, mount, tick, unmount } from "svelte";
import { beforeEach, describe, expect, it } from "vite-plus/test";

import { Mentions } from "../mentions";
import type { MentionEntry } from "../mentions";
import { AiPromptInput } from "./index";

const roster: MentionEntry[] = [
  { label: "Agent", value: "agent" },
  { label: "Search", value: "search" },
];

beforeEach(() => {
  document.body.replaceChildren();
});

describe("prompt input mentions", () => {
  it("accepts Tab for a multi-trigger slash command and clears its query", async () => {
    const selected: MentionEntry[] = [];
    const values: string[] = [];
    const container = document.createElement("div");
    document.body.append(container);
    const component = mount(AiPromptInput, {
      target: container,
      props: {
        value: "Before /se after",
        mentions: {
          items: roster,
          triggers: ["@", "/"],
          insertOnSelect: false,
          clearQueryOnSelect: true,
        },
        onSelect: (entry) => selected.push(entry),
        onValueChange: (value) => values.push(value),
      },
    });
    const editor = container.querySelector<HTMLElement>("[data-part='prompt-editor']");
    if (!editor) throw new Error("prompt editor is missing");
    await tick();

    editor.focus();
    const textNode = editor.firstChild;
    if (!textNode) throw new Error("prompt text is missing");
    const selection = window.getSelection();
    const range = document.createRange();
    range.setStart(textNode, 10);
    range.collapse(true);
    selection?.removeAllRanges();
    selection?.addRange(range);

    editor.dispatchEvent(new InputEvent("input", { bubbles: true }));
    await tick();
    editor.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Tab", bubbles: true, cancelable: true }),
    );
    flushSync();

    expect(selected.map((entry) => entry.value)).toEqual(["search"]);
    expect(editor.textContent).toBe("Before  after");
    expect(values).toContain("Before  after");
    void unmount(component);
  });

  it("keeps the live query when clear-on-select is disabled", async () => {
    const selected: MentionEntry[] = [];
    const container = document.createElement("div");
    document.body.append(container);
    const component = mount(AiPromptInput, {
      target: container,
      props: {
        value: "/se",
        mentions: {
          items: roster,
          triggers: ["/"],
          insertOnSelect: false,
          clearQueryOnSelect: false,
        },
        onSelect: (entry) => selected.push(entry),
      },
    });
    const editor = container.querySelector<HTMLElement>("[data-part='prompt-editor']");
    if (!editor) throw new Error("prompt editor is missing");
    await tick();

    editor.dispatchEvent(new InputEvent("input", { bubbles: true }));
    await tick();
    editor.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true }),
    );
    flushSync();

    expect(selected.map((entry) => entry.value)).toEqual(["search"]);
    expect(editor.textContent).toBe("/se");
    void unmount(component);
  });
});

describe("standalone mentions composer", () => {
  it("supports Tab as an explicit commit key", () => {
    const values: string[] = [];
    const container = document.createElement("div");
    document.body.append(container);
    const component = mount(Mentions, {
      target: container,
      props: {
        value: "/se",
        triggers: ["/"],
        items: roster,
        commitKeys: ["Tab"],
        onValueChange: (value) => values.push(value),
      },
    });
    const textarea = container.querySelector<HTMLTextAreaElement>("[data-part='textarea']");
    if (!textarea) throw new Error("mentions field is missing");

    textarea.dispatchEvent(new InputEvent("input", { bubbles: true }));
    textarea.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Tab", bubbles: true, cancelable: true }),
    );
    flushSync();

    expect(values).toContain("/Search ");
    expect(textarea.value).toBe("/Search ");
    void unmount(component);
  });
});
