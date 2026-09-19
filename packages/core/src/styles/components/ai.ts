export const aiCss = /* css */ `
/* The conversation column: messages stack with section-band air, the
   log role so screen readers follow the stream. */
[data-scope="ai"][data-part="conversation"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-space-5);
}

/* A message: the assistant speaks flat on the paper, the user's words
   sit in a recessed bubble — round, like every vessel. */
[data-scope="ai"][data-part="message"] {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--bs-space-2);
  max-inline-size: 46rem;
}

[data-scope="ai"][data-part="message"][data-role="user"] {
  align-self: flex-end;
  align-items: flex-end;
}

[data-scope="ai"][data-part="message"][data-role="user"] [data-part="content"] {
  padding: var(--bs-space-2) var(--bs-space-3);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-lg);
  background: var(--bs-color-surface-1);
  inline-size: fit-content;
  /* A fixed ceiling, not a percentage: the percentage feeds the
     fit-content resolution a reference it cannot satisfy (the parent's
     own width is being fit-content from this very box), and short
     messages then collapse toward min-content — one glyph per line. */
  max-inline-size: 30rem;
}

/* Markdown response: the ink is set with relaxed leading, code rides
   the mono stack on the recessed surface, quotes carry the heavy
   hairline the alert wears. */
[data-scope="ai"][data-part="response"] {
  color: var(--bs-color-text-primary);
  font-size: var(--bs-font-size-md);
  line-height: var(--bs-line-height-relaxed);
}

[data-scope="ai"][data-part="response"] > :first-child {
  margin-block-start: 0;
}

[data-scope="ai"][data-part="response"] > :last-child {
  margin-block-end: 0;
}

[data-scope="ai"][data-part="response"] h1,
[data-scope="ai"][data-part="response"] h2,
[data-scope="ai"][data-part="response"] h3,
[data-scope="ai"][data-part="response"] h4 {
  margin: var(--bs-space-4) 0 var(--bs-space-2);
  font-weight: var(--bs-font-weight-semibold);
  line-height: var(--bs-line-height-snug);
}

[data-scope="ai"][data-part="response"] p {
  margin: var(--bs-space-2) 0;
}

[data-scope="ai"][data-part="response"] ul,
[data-scope="ai"][data-part="response"] ol {
  margin: var(--bs-space-2) 0;
  padding-inline-start: var(--bs-space-5);
}

[data-scope="ai"][data-part="response"] li {
  margin-block: var(--bs-space-1);
}

[data-scope="ai"][data-part="response"] a {
  color: inherit;
  text-decoration: underline;
  text-decoration-color: var(--bs-color-border-strong);
  text-underline-offset: 3px;
}

[data-scope="ai"][data-part="response"] a:hover {
  color: var(--bs-color-primary-subtle-text);
  text-decoration-color: var(--bs-color-primary-subtle-text);
}

/* The code chip: the recessed paper, no border — the docs prose
   treatment. The block: the same panel the pre rides in. */
[data-scope="ai"][data-part="response"] :not(pre) > code {
  padding: calc(var(--bs-space-1) / 2) var(--bs-space-1);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-inset);
  font-family: var(--bs-font-mono);
  font-size: 0.875em;
}

[data-scope="ai"][data-part="response"] pre {
  margin: var(--bs-space-3) 0;
  padding: var(--bs-space-3);
  overflow-x: auto;
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-lg);
  background: var(--bs-color-surface-inset);
  font-family: var(--bs-font-mono);
  font-size: var(--bs-font-size-sm);
  line-height: var(--bs-line-height-relaxed);
}

[data-scope="ai"][data-part="response"] pre code {
  padding: 0;
  background: none;
  font-size: inherit;
}

[data-scope="ai"][data-part="response"] blockquote {
  margin: var(--bs-space-3) 0;
  padding-inline-start: var(--bs-space-3);
  border-inline-start: 3px solid var(--bs-color-border-strong);
  color: var(--bs-color-text-secondary);
}

[data-scope="ai"][data-part="response"] table {
  margin: var(--bs-space-3) 0;
  border-collapse: collapse;
  font-size: var(--bs-font-size-sm);
}

[data-scope="ai"][data-part="response"] th {
  padding: var(--bs-space-2) var(--bs-space-3);
  border-block-end: 1px solid var(--bs-color-border-strong);
  text-align: start;
  font-weight: var(--bs-font-weight-semibold);
}

[data-scope="ai"][data-part="response"] td {
  padding: var(--bs-space-2) var(--bs-space-3);
  border-block-end: 1px solid var(--bs-color-border);
}

[data-scope="ai"][data-part="response"] hr {
  margin: var(--bs-space-4) 0;
  border: none;
  border-block-start: 1px solid var(--bs-color-border);
}

/* Reasoning: the shared collapsible in its quiet register — a bare
   trigger of ink, the thought itself hanging on one hairline. Both the
   tool and the thought stretch the full message column: the message
   flexes its children to fit-content, and a shrinking panel would jump
   wide the moment its content unfurls. */
[data-scope="collapsible"][data-part="root"][data-ai="reasoning"],
[data-scope="collapsible"][data-part="root"][data-ai="tool"] {
  align-self: stretch;
}

[data-scope="collapsible"][data-part="root"][data-ai="reasoning"] [data-part="trigger"],
[data-scope="collapsible"][data-part="root"][data-ai="reasoning"] [data-part="trigger"]:hover {
  justify-content: flex-start;
  inline-size: 100%;
  min-block-size: auto;
  padding: 0;
  border: none;
  background: none;
  box-shadow: none;
  color: var(--bs-color-text-secondary);
  font-size: var(--bs-font-size-sm);
}

[data-scope="collapsible"][data-part="root"][data-ai="reasoning"] [data-part="trigger"]:hover {
  color: var(--bs-color-text-primary);
}

[data-scope="collapsible"][data-part="content"] > [data-scope="ai"][data-part="reasoning-content"] {
  padding: 0 0 0 var(--bs-space-3);
  border-inline-start: 1px solid var(--bs-color-border);
  color: var(--bs-color-text-tertiary);
  font-size: var(--bs-font-size-sm);
  line-height: var(--bs-line-height-relaxed);
}

/* A tool call: the shared collapsible as the vessel — the box is the
   component's, the trigger bleeds to the edges. The status dot pairs
   color with nothing else — the name carries the meaning. */
[data-scope="collapsible"][data-part="root"][data-ai="tool"] {
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-lg);
  background: var(--bs-color-surface-1);
}

[data-scope="collapsible"][data-part="root"][data-ai="tool"] [data-part="trigger"],
[data-scope="collapsible"][data-part="root"][data-ai="tool"] [data-part="trigger"]:hover {
  inline-size: 100%;
  min-block-size: auto;
  padding: var(--bs-space-2) var(--bs-space-3);
  border: none;
  background: none;
  box-shadow: none;
  font-size: var(--bs-font-size-sm);
}

[data-scope="ai"][data-part="tool-status"] {
  display: inline-flex;
  align-items: center;
  gap: var(--bs-space-2);
  margin-inline-start: auto;
  color: var(--bs-color-text-tertiary);
  font-weight: var(--bs-font-weight-regular);
}

[data-scope="ai"][data-part="tool-status"]::before {
  content: "";
  inline-size: calc(var(--bs-part-size-sm) / 2);
  block-size: calc(var(--bs-part-size-sm) / 2);
  border: 1px solid var(--bs-color-border-strong);
  border-radius: var(--bs-radius-full);
  background: var(--bs-color-surface-2);
}

[data-ai="tool"][data-status="running"] [data-part="tool-status"]::before {
  border-color: var(--bs-color-info);
  background: var(--bs-color-info);
}

[data-ai="tool"][data-status="completed"] [data-part="tool-status"]::before {
  border-color: var(--bs-color-success);
  background: var(--bs-color-success);
}

[data-ai="tool"][data-status="error"] [data-part="tool-status"]::before {
  border-color: var(--bs-color-danger);
  background: var(--bs-color-danger);
}

[data-scope="collapsible"][data-part="content"] > [data-scope="ai"][data-part="tool-body"] {
  display: grid;
  gap: var(--bs-space-2);
  padding: 0 var(--bs-space-3) var(--bs-space-3);
  font-size: var(--bs-font-size-sm);
}

[data-scope="ai"][data-part="tool-body"] [data-part="tool-label"] {
  color: var(--bs-color-text-tertiary);
  letter-spacing: var(--bs-tracking-label);
}

[data-scope="ai"][data-part="tool-body"] pre {
  margin: 0;
  padding: var(--bs-space-2);
  overflow-x: auto;
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-inset);
  font-family: var(--bs-font-mono);
}

/* Sources: a quiet list of where the ink came from. */
[data-scope="ai"][data-part="sources"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-space-1);
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: var(--bs-font-size-sm);
}

[data-scope="ai"][data-part="source"] a {
  color: var(--bs-color-text-secondary);
  text-decoration: none;
}

[data-scope="ai"][data-part="source"] a:hover {
  color: var(--bs-color-text-primary);
  text-decoration: underline;
  text-decoration-color: var(--bs-color-border-strong);
}

/* Attachments: the files riding the prompt's header — paper chips on
   the recessed vessel, square-cut like every control. Uploading is a
   dashed ghost, error speaks in danger ink; no chip casts a shadow. */
[data-scope="ai"][data-part="attachments"] {
  display: flex;
  flex-wrap: wrap;
  gap: var(--bs-space-1);
}

[data-scope="ai"][data-part="attachment"] {
  display: inline-flex;
  align-items: center;
  gap: var(--bs-space-1);
  max-inline-size: 100%;
  padding-block: calc(var(--bs-space-1) / 2);
  padding-inline: var(--bs-space-2);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface);
  color: var(--bs-color-text-secondary);
  font-size: var(--bs-font-size-sm);
  transition: border-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="ai"][data-part="attachment"]:hover {
  border-color: var(--bs-color-border-strong);
}

[data-scope="ai"][data-part="attachment"] svg {
  inline-size: 0.875rem;
  block-size: 0.875rem;
  flex: none;
  color: var(--bs-color-text-tertiary);
}

[data-scope="ai"][data-part="attachment"][data-status="uploading"] {
  border-style: dashed;
  color: var(--bs-color-text-tertiary);
}

[data-scope="ai"][data-part="attachment"][data-status="error"] {
  border-color: var(--bs-color-danger);
  color: var(--bs-color-danger);
}

[data-scope="ai"][data-part="attachment"] > span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

[data-scope="ai"][data-part="attachment"] [data-remove] {
  display: inline-flex;
  align-items: center;
  flex: none;
  padding: 0;
  border: none;
  background: none;
  color: inherit;
  cursor: pointer;
}

[data-scope="ai"][data-part="attachment"] [data-remove]:hover {
  color: var(--bs-color-text-primary);
}

[data-scope="ai"][data-part="attachment"] [data-remove]:focus-visible {
  outline: none;
  border-radius: var(--bs-radius-sm);
  box-shadow: var(--bs-focus-ring);
}

/* Actions row: a quiet line of shared ghost buttons. */
[data-scope="ai"][data-part="actions"] {
  display: flex;
  align-items: center;
  gap: var(--bs-space-1);
}

/* The prompt: one vessel — the shared field bared to the paper and
   self-growing on the machine's autoresize. It starts a single line tall,
   the submit seal riding that line; as the text grows the seal settles
   onto the last line. The rows above and below (attachments, the model
   and its switches) are slots — absent when empty, so the bare vessel
   stays one quiet line. The halo answers the vessel, not the control. */
[data-scope="ai"][data-part="prompt"] {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: var(--bs-space-2);
  padding: var(--bs-space-2);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-lg);
  background: var(--bs-color-surface-2);
  transition:
    border-color var(--bs-duration-fast) var(--bs-ease-out),
    box-shadow var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="ai"][data-part="prompt"]:focus-within {
  border-color: var(--bs-color-primary);
  box-shadow: var(--bs-focus-ring);
}

/* The writing row: the field between its optional shoulders, the seal
   and the tools riding the text's last line. */
[data-scope="ai"][data-part="prompt-main"] {
  display: flex;
  align-items: flex-end;
  gap: var(--bs-space-2);
  min-inline-size: 0;
}

[data-scope="ai"][data-part="prompt-header"] {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--bs-space-1);
}

[data-scope="ai"][data-part="prompt-leading"],
[data-scope="ai"][data-part="prompt-trailing"] {
  display: flex;
  align-items: flex-end;
  gap: var(--bs-space-1);
  flex: none;
}

[data-scope="ai"][data-part="prompt"] [data-scope="field"][data-part="root"] {
  flex: 1;
  min-inline-size: 0;
}

[data-scope="ai"][data-part="prompt"] [data-scope="field"][data-part="textarea"] {
  box-sizing: border-box;
  inline-size: 100%;
  /* One line of text stands a control tall: the line box is padded to
     the control height, so text and the submit seal share one axis at
     every density — and the seal keeps riding that axis as text grows. */
  min-block-size: var(--bs-control-height-sm);
  max-block-size: calc(var(--bs-space-16) * 2);
  padding-block: calc(
    (var(--bs-control-height-sm) - var(--bs-font-size-md) * var(--bs-line-height-relaxed)) / 2
  );
  padding-inline: 0;
  border: none;
  border-radius: 0;
  background: none;
  box-shadow: none;
  color: var(--bs-color-text-primary);
  font: inherit;
  font-size: var(--bs-font-size-md);
  line-height: var(--bs-line-height-relaxed);
  resize: none;
}

/* The tool row beneath the writing: the model and its switches — the
   seal closes the row at its far end. */
[data-scope="ai"][data-part="prompt-footer"] {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--bs-space-1);
  flex: none;
}

/* The send-side group: it drifts to the row's far end and keeps the
   model picker and the seal shoulder to shoulder. */
[data-scope="ai"][data-part="prompt-end"] {
  display: flex;
  align-items: center;
  gap: var(--bs-space-2);
  flex: none;
  margin-inline-start: auto;
}

/* The tool row holds fixed-width chrome: a field family dropped in
   here keeps its natural width, not the form-field full-bleed
   baseline. */
[data-scope="ai"][data-part="prompt-footer"] [data-part="root"] {
  inline-size: auto;
}

[data-scope="ai"][data-part="prompt"] [data-scope="field"][data-part="textarea"]:focus,
[data-scope="ai"][data-part="prompt"] [data-scope="field"][data-part="textarea"]:hover:not(:disabled) {
  border: none;
  box-shadow: none;
  outline: none;
}

[data-scope="ai"][data-part="prompt"] [data-scope="field"][data-part="textarea"]:disabled {
  border: none;
  background: none;
}

[data-scope="ai"][data-part="prompt"] [data-scope="field"][data-part="textarea"]::placeholder {
  color: var(--bs-color-text-tertiary);
}

/* The loader: two beads of ink breathing, one after another. */
[data-scope="ai"][data-part="loader"] {
  display: inline-flex;
  align-items: center;
  gap: var(--bs-space-2);
}

[data-scope="ai"][data-part="loader"]::before,
[data-scope="ai"][data-part="loader"]::after {
  content: "";
  inline-size: calc(var(--bs-part-size-sm) / 4);
  block-size: calc(var(--bs-part-size-sm) / 4);
  border-radius: var(--bs-radius-full);
  background: var(--bs-color-text-tertiary);
  animation: ai-loader-breathe var(--bs-duration-slow) var(--bs-ease-out) infinite;
}

[data-scope="ai"][data-part="loader"]::after {
  animation-delay: calc(var(--bs-duration-slow) / 3);
}

@keyframes ai-loader-breathe {
  0%,
  100% {
    opacity: 0.35;
  }

  50% {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  [data-scope="ai"][data-part="loader"]::before,
  [data-scope="ai"][data-part="loader"]::after {
    animation-duration: 1ms;
    animation-iteration-count: 1;
    opacity: 0.7;
  }
}
`;
