/** The two glyphs a copy affordance needs: the stamp and its
 * confirmation. Inline SVG keeps the enhancement framework-agnostic —
 * it lives beside the renderer's generated code HTML. */
const COPY_CODE_ICON = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
const COPIED_CODE_ICON = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>`;

/** How long the confirmation stays before the stamp returns. */
const REVERT_MS = 1500;

/** Make sure every fenced block under `host` carries its copy stamp.
 * The stamp anchors to a wrapper outside the scrolling `pre` — inside,
 * it would fix to the overflow area and travel out of view with the
 * code. The renderer rebuilds the markdown as one HTML string on every
 * stream tick, so this stays idempotent and cheap enough to re-run
 * after each patch. */
export function decorateCodeCopy(host: HTMLElement, copyLabel: string): void {
  for (const pre of host.querySelectorAll("pre")) {
    let body = pre.parentElement;
    if (!body || body.getAttribute("data-part") !== "code-body") {
      body = document.createElement("div");
      body.setAttribute("data-scope", "ai");
      body.setAttribute("data-part", "code-body");
      pre.replaceWith(body);
      body.appendChild(pre);
    }
    let button = body.querySelector<HTMLButtonElement>('[data-part="code-copy"]');
    if (!button) {
      button = document.createElement("button");
      button.type = "button";
      button.setAttribute("data-scope", "ai");
      button.setAttribute("data-part", "code-copy");
      button.innerHTML = COPY_CODE_ICON;
      body.appendChild(button);
    }
    button.title = copyLabel;
    button.setAttribute("aria-label", copyLabel);
  }
}

/** The one delegated click for the whole response: copy the block's
 * text and confirm in place, then return the stamp after a beat. */
export async function clickCodeCopy(
  event: Event,
  copyLabel: string,
  copiedLabel: string,
): Promise<void> {
  const button = (event.target as HTMLElement | null)?.closest<HTMLButtonElement>(
    '[data-part="code-copy"]',
  );
  const pre = button?.closest('[data-part="code-body"]')?.querySelector("pre");
  if (!button || !pre) return;
  await navigator.clipboard.writeText(pre.textContent ?? "");
  button.innerHTML = COPIED_CODE_ICON;
  button.setAttribute("data-state", "copied");
  button.title = copiedLabel;
  button.setAttribute("aria-label", copiedLabel);
  setTimeout(() => {
    if (!button.isConnected) return;
    button.innerHTML = COPY_CODE_ICON;
    button.removeAttribute("data-state");
    button.title = copyLabel;
    button.setAttribute("aria-label", copyLabel);
  }, REVERT_MS);
}
