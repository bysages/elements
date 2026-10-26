// @vitest-environment happy-dom
import { render } from "solid-js/web";
import { afterEach, beforeEach, describe, expect, it } from "vite-plus/test";

import type { MentionEntry } from "../mentions";
import { useMentions } from "../mentions/use-mentions";
import { PromptInput } from "./index";

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
  it("clears the live query without inserting when configured", () => {
    const commands: MentionEntry[] = [{ label: "Search", value: "search", group: "Commands" }];
    const selected: string[] = [];
    const values: string[] = [];
    const container = document.createElement("div");
    document.body.append(container);
    dispose = render(
      () => (
        <PromptInput
          value="/se"
          mentions={{
            items: commands,
            triggers: ["/"],
            insertOnSelect: false,
            clearQueryOnSelect: true,
          }}
          onSelect={(entry) => selected.push(entry.value)}
          onValueChange={(value) => values.push(value)}
        />
      ),
      container,
    );
    const editor = container.querySelector<HTMLElement>('[data-part="prompt-editor"]')!;

    editor.dispatchEvent(new Event("input", { bubbles: true }));
    editor.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Tab", bubbles: true, cancelable: true }),
    );

    expect(selected).toEqual(["search"]);
    expect(values.at(-1)).toBe("");
  });

  it("offers candidates from the active trigger among several", async () => {
    const roster: MentionEntry[] = [
      { label: "Agent", value: "agent", group: "People" },
      { label: "Search", value: "search", group: "Commands" },
    ];
    const container = document.createElement("div");
    document.body.append(container);
    dispose = render(
      () => <PromptInput value="@ag" mentions={{ items: roster, triggers: ["@", "/"] }} />,
      container,
    );
    container
      .querySelector<HTMLElement>('[data-part="prompt-editor"]')!
      .dispatchEvent(new Event("input", { bubbles: true }));
    await Promise.resolve();

    const labels = [...document.querySelectorAll('[data-part="option-label"]')].map(
      (node) => node.textContent,
    );
    expect(labels).toEqual(["Agent"]);
    expect(document.querySelector('[data-part="group-label"]')?.textContent).toBe("People");
  });

  it("commits an entry with Space and inserts its rich token", () => {
    const roster: MentionEntry[] = [{ label: "Search", value: "search", group: "Commands" }];
    const values: string[] = [];
    const container = document.createElement("div");
    document.body.append(container);
    dispose = render(
      () => (
        <PromptInput
          value="/se"
          mentions={{ items: roster, triggers: ["/"] }}
          onValueChange={(value) => values.push(value)}
        />
      ),
      container,
    );
    const editor = container.querySelector<HTMLElement>('[data-part="prompt-editor"]')!;

    editor.dispatchEvent(new Event("input", { bubbles: true }));
    editor.dispatchEvent(
      new KeyboardEvent("keydown", { key: " ", bubbles: true, cancelable: true }),
    );

    expect(values.at(-1)).toBe("/Search ");
    expect(container.querySelector('[data-part="prompt-mention"]')).not.toBeNull();
  });
});
