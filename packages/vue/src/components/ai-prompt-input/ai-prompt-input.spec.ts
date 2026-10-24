// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from "vite-plus/test";
import { createApp, defineComponent, h, nextTick } from "vue";

import type { MentionEntry } from "../mentions";
import { useMentions } from "../mentions/use-mentions";
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
    const textarea = container.querySelector("textarea");
    if (!textarea) throw new Error("prompt textarea is missing");
    return { app, container, textarea };
  }

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
});

describe("useMentions", () => {
  function createMentions(select?: (entry: MentionEntry) => boolean | void) {
    let text = "/se";
    let updated = "";
    const field = {
      focus: () => {},
      setSelectionRange: () => {},
      selectionStart: text.length,
    } as unknown as HTMLTextAreaElement;
    const hook = useMentions(
      () => ({ items: mentions, triggers: ["@", "/"] }),
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
});
