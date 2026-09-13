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
  background: var(--bs-color-surface-inset);
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
  color: var(--bs-color-primary);
  text-decoration: underline;
  text-decoration-color: var(--bs-color-border-strong);
}

[data-scope="ai"][data-part="response"] a:hover {
  text-decoration-color: var(--bs-color-primary);
}

[data-scope="ai"][data-part="response"] code {
  padding: var(--bs-space-1) calc(var(--bs-space-1) + 1px);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-xs);
  background: var(--bs-color-surface-inset);
  font-family: var(--bs-font-mono);
  font-size: var(--bs-font-size-sm);
}

[data-scope="ai"][data-part="response"] pre {
  margin: var(--bs-space-3) 0;
  padding: var(--bs-space-3);
  overflow-x: auto;
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-lg);
  background: var(--bs-color-surface-inset);
}

[data-scope="ai"][data-part="response"] pre code {
  padding: 0;
  border: none;
  background: none;
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

[data-scope="ai"][data-part="response"] th,
[data-scope="ai"][data-part="response"] td {
  padding: var(--bs-space-1) var(--bs-space-2);
  border: 1px solid var(--bs-color-border);
  text-align: start;
}

[data-scope="ai"][data-part="response"] hr {
  margin: var(--bs-space-4) 0;
  border: none;
  border-block-start: 1px solid var(--bs-color-border);
}

/* Reasoning: a quiet disclosure. The summary whispers; the thought
   itself hangs on one hairline, like the timeline thread. */
[data-scope="ai"][data-part="reasoning"] summary {
  display: inline-flex;
  align-items: center;
  gap: var(--bs-space-2);
  color: var(--bs-color-text-secondary);
  font-size: var(--bs-font-size-sm);
  font-weight: var(--bs-font-weight-medium);
  letter-spacing: var(--bs-tracking-label);
  cursor: pointer;
  list-style: none;
  user-select: none;
}

[data-scope="ai"][data-part="reasoning"] summary::-webkit-details-marker {
  display: none;
}

[data-scope="ai"][data-part="reasoning"] summary::before {
  content: "";
  inline-size: calc(var(--bs-part-size-sm) / 2);
  block-size: calc(var(--bs-part-size-sm) / 2);
  border-inline-end: 1px solid var(--bs-color-border-strong);
  border-block-end: 1px solid var(--bs-color-border-strong);
  transform: rotate(-45deg);
  transition: transform var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="ai"][data-part="reasoning"][open] summary::before {
  transform: rotate(45deg);
}

[data-scope="ai"][data-part="reasoning"] [data-part="reasoning-content"] {
  margin-block-start: var(--bs-space-2);
  padding-inline-start: var(--bs-space-3);
  border-inline-start: 1px solid var(--bs-color-border);
  color: var(--bs-color-text-tertiary);
  font-size: var(--bs-font-size-sm);
  line-height: var(--bs-line-height-relaxed);
}

/* A tool call: a quiet vessel naming what was reached for. The status
   dot pairs color with nothing else — the name carries the meaning. */
[data-scope="ai"][data-part="tool"] {
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-lg);
  background: var(--bs-color-surface-1);
}

[data-scope="ai"][data-part="tool"] summary {
  display: flex;
  align-items: center;
  gap: var(--bs-space-2);
  padding: var(--bs-space-2) var(--bs-space-3);
  font-size: var(--bs-font-size-sm);
  font-weight: var(--bs-font-weight-medium);
  letter-spacing: var(--bs-tracking-label);
  cursor: pointer;
  list-style: none;
  user-select: none;
}

[data-scope="ai"][data-part="tool"] summary::-webkit-details-marker {
  display: none;
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

[data-scope="ai"][data-part="tool"][data-status="running"] [data-part="tool-status"]::before {
  border-color: var(--bs-color-info);
  background: var(--bs-color-info);
}

[data-scope="ai"][data-part="tool"][data-status="completed"] [data-part="tool-status"]::before {
  border-color: var(--bs-color-success);
  background: var(--bs-color-success);
}

[data-scope="ai"][data-part="tool"][data-status="error"] [data-part="tool-status"]::before {
  border-color: var(--bs-color-danger);
  background: var(--bs-color-danger);
}

[data-scope="ai"][data-part="tool-body"] {
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

/* Actions row: a quiet line of shared ghost buttons. */
[data-scope="ai"][data-part="actions"] {
  display: flex;
  align-items: center;
  gap: var(--bs-space-1);
}

/* The prompt: one vessel holding a bare textarea and the submit seal.
   The halo answers the vessel, not the field inside it. */
[data-scope="ai"][data-part="prompt"] {
  display: flex;
  align-items: flex-end;
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

[data-scope="ai"][data-part="prompt-textarea"] {
  box-sizing: border-box;
  flex: 1;
  min-block-size: calc(var(--bs-control-height-md) - 2 * var(--bs-space-2));
  max-block-size: calc(var(--bs-space-16) * 2);
  padding: 0;
  border: none;
  background: none;
  color: var(--bs-color-text-primary);
  font: inherit;
  font-size: var(--bs-font-size-md);
  line-height: var(--bs-line-height-relaxed);
  resize: none;
}

[data-scope="ai"][data-part="prompt-textarea"]:focus {
  outline: none;
}

[data-scope="ai"][data-part="prompt-textarea"]::placeholder {
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
