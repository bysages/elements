// @vitest-environment happy-dom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { beforeEach, describe, expect, it } from "vite-plus/test";

import type { MentionEntry } from "../mentions";
import { useMentions } from "../mentions/use-mentions";
import { AiPromptInput } from "./index";

const mentions: MentionEntry[] = [
  { label: "Agent", value: "agent" },
  { label: "Search", value: "search", group: "Commands" },
];

beforeEach(() => {
  document.body.replaceChildren();
  (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
});

describe("ai prompt input", () => {
  it("does not submit an IME composition Enter", () => {
    const container = document.createElement("div");
    document.body.append(container);
    const root = createRoot(container);
    const submitted: string[] = [];

    act(() => {
      root.render(
        <AiPromptInput
          value="@ag"
          mentions={{ items: mentions, triggers: ["@", "/"] }}
          onSubmit={(value) => submitted.push(value)}
        />,
      );
    });
    const textarea = container.querySelector<HTMLElement>(`[data-part="prompt-editor"]`);
    if (!textarea) throw new Error("prompt editor is missing");

    act(() => {
      textarea.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Enter", bubbles: true, isComposing: true }),
      );
    });

    expect(submitted).toEqual([]);
  });

  it("submits a native Enter", () => {
    const container = document.createElement("div");
    document.body.append(container);
    const root = createRoot(container);
    const submitted: string[] = [];

    act(() => {
      root.render(
        <AiPromptInput
          value="@ag"
          mentions={{ items: mentions, triggers: ["@", "/"] }}
          onSubmit={(value) => submitted.push(value)}
        />,
      );
    });
    const textarea = container.querySelector<HTMLElement>(`[data-part="prompt-editor"]`);
    if (!textarea) throw new Error("prompt editor is missing");

    act(() => {
      textarea.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    });

    expect(submitted).toEqual(["@ag"]);
  });
});

describe("useMentions", () => {
  function createMentions(select?: (entry: MentionEntry) => boolean | void) {
    let text = "/se";
    let updated = "";
    const field = document.createElement("textarea");
    field.value = text;
    document.body.append(field);
    let current: ReturnType<typeof useMentions> | undefined;

    function Probe() {
      current = useMentions(
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
      return null;
    }

    const container = document.createElement("div");
    document.body.append(container);
    act(() => {
      createRoot(container).render(<Probe />);
    });

    return {
      mentions: () => current,
      updated: () => updated,
      input: () => current?.onInput(),
      keydown: (key: string) => current?.onKeydown({ key, preventDefault: () => {} }),
    };
  }

  it("selects through the active trigger and reports the whole entry", async () => {
    const selected: MentionEntry[] = [];
    const context = createMentions((entry) => {
      selected.push(entry);
      return true;
    });

    act(() => {
      context.input();
    });
    expect(context.mentions()?.matches.map((entry) => entry.label)).toEqual(["Search"]);

    act(() => {
      context.keydown("Enter");
    });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(selected[0]?.value).toBe("search");
    expect(context.updated()).toBe("/Search ");
  });

  it("can report a selection without rewriting the text", async () => {
    const context = createMentions(() => false);

    act(() => {
      context.input();
    });
    await act(async () => {
      context.keydown("Enter");
    });

    expect(context.updated()).toBe("");
  });
});
