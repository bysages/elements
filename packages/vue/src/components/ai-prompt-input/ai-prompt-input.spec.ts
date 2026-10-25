// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from "vite-plus/test";
import { createApp, defineComponent, h, nextTick, ref } from "vue";

import type { MentionEntry } from "../mentions";
import { useMentions } from "../mentions/use-mentions";
import { insertEditorToken } from "./editor";
import { AiPromptInput } from "./index";

const mentions: MentionEntry[] = [
  { label: "Agent", value: "agent" },
  { label: "Search", value: "search", group: "Commands" },
];

beforeEach(() => {
  document.body.replaceChildren();
});

describe("ai prompt input", () => {
  function mountPrompt(handlers: {
    submit?: (value: string) => void;
    update?: (value: string) => void;
  }) {
    const host = defineComponent({
      setup() {
        return () =>
          h(AiPromptInput, {
            modelValue: "@ag",
            mentions: { items: mentions, triggers: ["@", "/"] },
            onSubmit: handlers.submit,
            "onUpdate:modelValue": handlers.update,
          });
      },
    });
    const container = document.createElement("div");
    document.body.append(container);
    const app = createApp(host);
    app.mount(container);
    const textarea = container.querySelector<HTMLElement>(`[data-part="prompt-editor"]`);
    if (!textarea) throw new Error("prompt editor is missing");
    return { app, container, textarea };
  }

  it("clears the placeholder, opens candidates and inserts a rich token", async () => {
    const host = defineComponent({
      setup() {
        const value = ref("");
        return () =>
          h(AiPromptInput, {
            modelValue: value.value,
            placeholder: "Ask a teammate",
            mentions: { items: mentions, triggers: ["@", "/"] },
            "onUpdate:modelValue": (next: string) => {
              value.value = next;
            },
          });
      },
    });
    const container = document.createElement("div");
    document.body.append(container);
    const app = createApp(host);
    app.mount(container);
    await nextTick();

    const editor = container.querySelector<HTMLElement>('[data-part="prompt-editor"]');
    if (!editor) throw new Error("prompt editor is missing");
    expect(editor.hasAttribute("data-empty")).toBe(true);

    editor.append(document.createTextNode("@Agent"));
    editor.dispatchEvent(new Event("input", { bubbles: true }));
    await nextTick();
    expect(editor.hasAttribute("data-empty")).toBe(false);
    expect(editor.getAttribute("aria-expanded")).toBe("true");

    editor.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true }),
    );
    await nextTick();

    expect(editor.querySelector('[data-part="prompt-mention"]')).not.toBeNull();
    expect(editor.getAttribute("aria-expanded")).toBe("false");
    app.unmount();
  });
  it("places the caret in editable text after an existing token boundary", () => {
    const editor = document.createElement("div");
    editor.append(document.createTextNode("@Agent world"));

    const value = insertEditorToken(editor, mentions[0]!, "@", 0, 6);
    const selection = window.getSelection();
    const range = selection?.rangeCount ? selection.getRangeAt(0) : null;

    expect(value).toBe("@Agent world");
    expect(range?.startContainer.nodeType).toBe(Node.TEXT_NODE);
    expect(range?.startContainer.textContent).toBe(" world");
    expect(range?.startOffset).toBe(0);
  });
  it("renders a recognized mention as a rich token and keeps plain text", async () => {
    const host = defineComponent({
      setup() {
        return () =>
          h(AiPromptInput, {
            modelValue: "Review with @Agent tomorrow",
            mentions: { items: mentions },
          });
      },
    });
    const container = document.createElement("div");
    document.body.append(container);
    const app = createApp(host);
    app.mount(container);
    await nextTick();

    const token = container.querySelector<HTMLElement>('[data-part="prompt-mention"]');
    expect(token?.dataset.promptValue).toBe("agent");
    expect(token?.textContent).toContain("Agent");
    app.unmount();
  });
  it("does not submit an IME composition Enter", async () => {
    const submitted: string[] = [];
    const prompt = mountPrompt({ submit: (value) => submitted.push(value) });

    prompt.textarea.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Enter", bubbles: true, isComposing: true }),
    );

    expect(submitted).toEqual([]);
    prompt.app.unmount();
  });

  it("submits a native Enter", async () => {
    const submitted: string[] = [];
    const prompt = mountPrompt({ submit: (value) => submitted.push(value) });

    prompt.textarea.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    await nextTick();

    expect(submitted).toEqual(["@ag"]);
    prompt.app.unmount();
  });

  it("clears a command query when selection does not insert", async () => {
    const host = defineComponent({
      setup() {
        const value = ref("/se");
        return () =>
          h(AiPromptInput, {
            modelValue: value.value,
            mentions: {
              items: [mentions[1]!],
              triggers: ["/"],
              insertOnSelect: false,
            },
            "onUpdate:modelValue": (next: string) => {
              value.value = next;
            },
          });
      },
    });
    const container = document.createElement("div");
    document.body.append(container);
    const app = createApp(host);
    app.mount(container);
    await nextTick();

    const editor = container.querySelector<HTMLElement>('[data-part="prompt-editor"]');
    if (!editor) throw new Error("prompt editor is missing");
    editor.dispatchEvent(new Event("input", { bubbles: true }));
    editor.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Tab", bubbles: true, cancelable: true }),
    );
    await nextTick();

    expect(editor.textContent).toBe("");
    app.unmount();
  });
});

describe("useMentions", () => {
  function createMentions(
    select?: (entry: MentionEntry) => boolean | void,
    options: { items?: MentionEntry[]; commitKeys?: Array<"Enter" | "Tab" | " "> } = {},
  ) {
    let text = "/se";
    let updated = "";
    let roster = options.items ?? mentions;
    const field = {
      focus: () => {},
      setSelectionRange: () => {},
      selectionStart: text.length,
    } as unknown as HTMLTextAreaElement;
    const hook = useMentions(
      () => ({ items: roster, triggers: ["@", "/"], commitKeys: options.commitKeys }),
      () => field,
      {
        getText: () => text,
        setText: (value) => {
          updated = value;
          text = value;
        },
        select,
      },
    );

    return {
      mentions: hook,
      field,
      setItems(next: MentionEntry[]) {
        roster = next;
      },
      updated: () => updated,
      input: () => hook.onInput(),
    };
  }

  it("selects through the active trigger and reports the whole entry", () => {
    const selected: MentionEntry[] = [];
    const context = createMentions((entry) => {
      selected.push(entry);
      return true;
    });

    context.input();
    expect(context.mentions.matches.value.map((entry) => entry.label)).toEqual(["Search"]);
    expect(context.mentions.onKeydown(new KeyboardEvent("keydown", { key: "Enter" }))).toBe(true);
    expect(selected[0]?.value).toBe("search");
    expect(context.updated()).toBe("/Search ");
  });

  it("can report a selection without rewriting the text", () => {
    const context = createMentions(() => false);

    context.input();
    context.mentions.onKeydown(new KeyboardEvent("keydown", { key: "Enter" }));

    expect(context.updated()).toBe("");
    expect(context.mentions.open.value).toBe(false);
  });

  it("can accept Tab as an explicit commit key", () => {
    const context = createMentions(undefined, { commitKeys: ["Enter", " ", "Tab"] });

    context.input();
    const accepted = context.mentions.onKeydown(
      new KeyboardEvent("keydown", { key: "Tab", cancelable: true }),
    );

    expect(accepted).toBe(true);
    expect(context.updated()).toBe("/Search ");
  });

  it("keeps the same token dismissed after Escape until it changes", () => {
    const context = createMentions();

    context.input();
    expect(context.mentions.open.value).toBe(true);

    context.mentions.onKeydown(new KeyboardEvent("keydown", { key: "Escape" }));
    expect(context.mentions.open.value).toBe(false);

    context.input();
    expect(context.mentions.open.value).toBe(false);

    context.setItems([{ label: "Sea", value: "sea" }]);
    context.input();
    expect(context.mentions.open.value).toBe(true);
  });

  it("reopens an async roster when it arrives after the query", () => {
    const context = createMentions(undefined, { items: [] });

    context.input();
    expect(context.mentions.open.value).toBe(false);

    context.setItems(mentions);
    context.input();
    expect(context.mentions.open.value).toBe(true);
  });
});
