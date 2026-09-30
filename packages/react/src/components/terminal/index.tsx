import { injectComponentStyle } from "@bysages/core";
import { type HTMLAttributes, type KeyboardEvent, useEffect, useRef, useState } from "react";

export interface TerminalProps extends HTMLAttributes<HTMLDivElement> {
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
export function Terminal({
  lines = [],
  prompt = "$",
  placeholder,
  label,
  onCommand,
  ...rest
}: TerminalProps) {
  injectComponentStyle("terminal");
  const [draft, setDraft] = useState("");
  const scroll = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    scroll.current?.scrollTo({ top: scroll.current.scrollHeight });
  }, [lines.length]);
  function submit() {
    const text = draft.trim();
    if (!text) return;
    setDraft("");
    onCommand?.(text);
  }
  return (
    <div
      {...rest}
      role="log"
      aria-label={label ?? undefined}
      data-scope="terminal"
      data-part="root"
    >
      <div ref={scroll} data-scope="terminal" data-part="scroll">
        {lines.map((line, index) => (
          <div key={index} data-scope="terminal" data-part="line">
            {line}
          </div>
        ))}
      </div>
      <div data-scope="terminal" data-part="entry">
        <span data-scope="terminal" data-part="sigil" aria-hidden="true">
          {prompt}
        </span>
        <input
          data-scope="terminal"
          data-part="input"
          value={draft}
          placeholder={placeholder}
          aria-label={label ? `${label} command line` : "Command line"}
          spellCheck={false}
          autoComplete="off"
          onInput={(event) => setDraft((event.target as HTMLInputElement).value)}
          onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
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
