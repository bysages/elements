export const terminalCss = /* css */ `
/* The console is the one block of plain ink on the page: ground and
   words stay at the fixed gray extremes in every scene and every
   light, because a terminal that flips with the page stops reading as
   one. The mono register and the thin ink scrollbar carry the rest. */
[data-scope="terminal"][data-part="root"] {
  display: flex;
  flex-direction: column;
  border-radius: var(--bs-radius-md);
  background: var(--bs-color-gray-900);
  color: var(--bs-color-gray-100);
  font-family: var(--bs-font-mono);
  font-size: var(--bs-font-size-sm);
}

[data-scope="terminal"][data-part="scroll"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-gap-xs);
  padding: var(--bs-padding-md);
  max-block-size: 14rem;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-color: color-mix(in oklab, var(--bs-color-gray-100) 25%, transparent)
    transparent;
  scrollbar-width: thin;
}

/* An empty transcript is no surface at all — the console is just its
   prompt line until the first line arrives. */
[data-scope="terminal"][data-part="scroll"]:empty {
  display: none;
}

[data-scope="terminal"][data-part="line"] {
  color: color-mix(in oklab, var(--bs-color-gray-100) 90%, transparent);
  line-height: var(--bs-line-height-relaxed);
  white-space: pre-wrap;
  word-break: break-word;
}

[data-scope="terminal"][data-part="entry"] {
  display: flex;
  align-items: center;
  gap: var(--bs-gap-sm);
  padding: var(--bs-padding-sm) var(--bs-padding-md);
  border-block-start: var(--bs-hairline) solid color-mix(in oklab, var(--bs-color-gray-100) 16%, transparent);
}

[data-scope="terminal"][data-part="sigil"] {
  color: color-mix(in oklab, var(--bs-color-gray-100) 55%, transparent);
  user-select: none;
}

[data-scope="terminal"][data-part="input"] {
  flex: 1;
  min-inline-size: 0;
  border: none;
  background: transparent;
  color: var(--bs-color-gray-100);
  caret-color: var(--bs-color-gray-100);
  font: inherit;
}

[data-scope="terminal"][data-part="input"]:focus-visible {
  outline: none;
}

[data-scope="terminal"][data-part="input"]::placeholder {
  color: color-mix(in oklab, var(--bs-color-gray-100) 38%, transparent);
}
`;
