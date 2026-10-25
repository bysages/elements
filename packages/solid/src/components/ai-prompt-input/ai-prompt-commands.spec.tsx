// @vitest-environment happy-dom
import { render } from "solid-js/web";
import { afterEach, beforeEach, describe, expect, it } from "vite-plus/test";

import type { MentionEntry } from "../mentions";
import { useMentions } from "../mentions/use-mentions";

let dispose: (() => void) | undefined;

beforeEach(() => {
  document.body.replaceChildren();
});

afterEach(() => {
  dispose?.();
  dispose = undefined;
  document.body.replaceChildren();
});

describe("AI prompt commands", () => {
  it("commits slash commands with Tab and keeps no-insert events", () => {
    const commands: MentionEntry[] = [
      { label: "Search", value: "search", group: "Commands" },
      { label: "Image", value: "image", group: "Commands" },
    ];
    const committed: MentionEntry[] = [];
    let text = "/se";
    const field = document.createElement("textarea");
    field.value = text;
    field.setSelectionRange(text.length, text.length);
    document.body.append(field);
    let current: ReturnType<typeof useMentions> | undefined;

    dispose = render(() => {
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
    }, document.createElement("div"));

    current?.onInput();
    current?.onKeydown(new KeyboardEvent("keydown", { key: "Tab", cancelable: true }));

    expect(committed.map((entry) => entry.value)).toEqual(["search"]);
  });
});
