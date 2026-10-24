import { injectComponentStyle } from "@bysages/core/styling";
import { type HTMLAttributes, type KeyboardEvent, useEffect, useRef, useState } from "react";

import { withSelfRoot } from "../../internal/family";
import { useComponentMessages } from "../../internal/messages";

export interface TerminalProps extends HTMLAttributes<HTMLDivElement> {
  /** The transcript, oldest line first. */
  lines?: string[];
  /** The sigil at the head of the entry line. */
  prompt?: string;
  placeholder?: string;
  label?: string;
  /** Treat the transcript as output only; no command line mounts. */
  readOnly?: boolean;
  onCommand?: (text: string) => void;
}

/** A quiet console: the transcript above, the prompt line below. The
 * component owns only the reading and the caret — each entered line
 * leaves as an event, and the caller answers through the lines prop,
 * so history stays theirs to shape. */
function TerminalImpl({
  lines = [],
  prompt = "$",
  placeholder,
  label,
  readOnly = false,
  onCommand,
  ...rest
}: TerminalProps) {
  injectComponentStyle("terminal");
  const messages = useComponentMessages();
  const commandLineLabel = label ?? messages.terminal.commandLine;
  const [draft, setDraft] = useState("");
  const scroll = useRef<HTMLDivElement | null>(null);
  // Joined lines also notice replacements at the same length — a live
  // transcript can change without merely growing.
  const transcript = lines.join("\n");
  useEffect(() => {
    scroll.current?.scrollTo({ top: scroll.current.scrollHeight });
  }, [transcript]);
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
      aria-label={commandLineLabel}
      data-scope="terminal"
      data-part="root"
      {...(readOnly ? { "data-readonly": "" } : {})}
    >
      <div ref={scroll} data-scope="terminal" data-part="scroll">
        {lines.map((line, index) => (
          <div key={index} data-scope="terminal" data-part="line">
            {line}
          </div>
        ))}
      </div>
      {readOnly ? null : (
        <div data-scope="terminal" data-part="entry">
          <span data-scope="terminal" data-part="sigil" aria-hidden="true">
            {prompt}
          </span>
          <input
            data-scope="terminal"
            data-part="input"
            value={draft}
            placeholder={placeholder}
            aria-label={commandLineLabel}
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
      )}
    </div>
  );
}

export const Terminal = withSelfRoot(TerminalImpl);
