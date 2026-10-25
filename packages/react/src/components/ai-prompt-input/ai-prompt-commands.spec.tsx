// @vitest-environment happy-dom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { beforeEach, describe, expect, it } from "vite-plus/test";

import type { MentionEntry } from "../mentions";
import { useMentions } from "../mentions/use-mentions";
import { AiPromptInput } from "./index";

const commands: MentionEntry[] = [
  { label: "Search", value: "search", group: "Commands" },
  { label: "Image", value: "image", group: "Commands" },
];

beforeEach(() => {
  document.body.replaceChildren();
  (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
});

describe("AI prompt commands", () => {
  it("commits with Tab when configured", async () => {
    const committed: MentionEntry[] = [];
    let text = "/se";
    const field = document.createElement("textarea");
    field.value = text;
    field.setSelectionRange(text.length, text.length);
    document.body.append(field);
    let current: ReturnType<typeof useMentions> | undefined;

    function Probe() {
      current = useMentions(
        () => ({ items: commands, triggers: ["/"], commitKeys: ["Tab"] }),
        () => field,
        {
          getText: () => text,
          setText: (value) => {
            text = value;
          },
          select: () => false,
          commit: (entry) => committed.push(entry),
        },
      );
      return null;
    }
    const container = document.createElement("div");
    document.body.append(container);
    act(() => {
      createRoot(container).render(<Probe />);
    });

    await act(async () => {
      current?.onInput();
      await Promise.resolve();
    });
    await act(async () => {
      current?.onKeydown({ key: "Tab", preventDefault: () => {} });
    });

    expect(committed.map((entry) => entry.value)).toEqual(["search"]);
  });

  it("clears a slash command query while preserving the entry event", () => {
    const container = document.createElement("div");
    document.body.append(container);
    const root = createRoot(container);
    const selected: string[] = [];
    const values: string[] = [];

    act(() => {
      root.render(
        <AiPromptInput
          value="/se"
          mentions={{
            items: commands,
            triggers: ["/"],
            insertOnSelect: false,
            clearQueryOnSelect: true,
          }}
          onSelect={(entry) => selected.push(entry.value)}
          onValueChange={(value) => values.push(value)}
        />,
      );
    });
    const editor = container.querySelector<HTMLElement>('[data-part="prompt-editor"]');
    if (!editor) throw new Error("prompt editor is missing");

    act(() => {
      editor.dispatchEvent(new Event("input", { bubbles: true }));
    });
    act(() => {
      editor.dispatchEvent(new KeyboardEvent("keydown", { key: "Tab", bubbles: true }));
    });

    expect(selected).toEqual(["search"]);
    expect(values.at(-1)).toBe("");
  });
});
