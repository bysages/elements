import { injectComponentStyle } from "@bysages/core";
import { For, createEffect, createSignal, onMount, splitProps, type JSX } from "solid-js";

export interface TerminalProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "onCommand"> {
  /** The transcript, oldest line first. */
  lines?: string[];
  /** The sigil at the head of the entry line. */
  prompt?: string;
  placeholder?: string;
  label?: string;
  onCommand?: (text: string) => void;
}

/** A quiet console: the transcript above, the prompt line below. The
 * component owns only the reading and the caret — each entered line
 * leaves as an event, and the caller answers through the lines prop,
 * so history stays theirs to shape. */
export function Terminal(props: TerminalProps) {
  injectComponentStyle("terminal");
  const [own, rest] = splitProps(props, ["lines", "prompt", "placeholder", "label", "onCommand"]);
  const [draft, setDraft] = createSignal("");
  const [scroll, setScroll] = createSignal<HTMLDivElement | null>(null);
  onMount(() => {
    createEffect(() => {
      if (own.lines?.length === undefined) return;
      scroll()?.scrollTo({ top: scroll()?.scrollHeight });
    });
  });
  function submit() {
    const text = draft().trim();
    if (!text) return;
    setDraft("");
    own.onCommand?.(text);
  }
  return (
    <div {...rest} role="log" aria-label={own.label} data-scope="terminal" data-part="root">
      <div ref={setScroll} data-scope="terminal" data-part="scroll">
        <For each={own.lines}>
          {(line) => (
            <div data-scope="terminal" data-part="line">
              {line}
            </div>
          )}
        </For>
      </div>
      <div data-scope="terminal" data-part="entry">
        <span data-scope="terminal" data-part="sigil" aria-hidden="true">
          {own.prompt ?? "$"}
        </span>
        <input
          data-scope="terminal"
          data-part="input"
          value={draft()}
          placeholder={own.placeholder}
          aria-label={own.label ? `${own.label} command line` : "Command line"}
          spellcheck={false}
          autocomplete="off"
          onInput={(event) => setDraft(event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              submit();
            }
          }}
        />
      </div>
    </div>
  );
}
