import { injectComponentStyle } from "@bysages/core";
import type { JSX } from "solid-js";

export interface BrowserPartProps extends JSX.HTMLAttributes<HTMLDivElement> {}

/** The three lamps are the system's own fixed pigments — the same
 * semantics reserved for danger, warning, and success. */
export function BrowserDots(props: BrowserPartProps) {
  injectComponentStyle("browser");

  return (
    <div {...props} data-scope="browser" data-part="dots">
      {(["danger", "warning", "success"] as const).map((tone) => (
        <span data-scope="browser" data-part="dot" data-tone={tone} />
      ))}
    </div>
  );
}

export function BrowserRoot(props: BrowserPartProps) {
  injectComponentStyle("browser");

  return (
    <div {...props} data-scope="browser" data-part="root">
      {props.children}
    </div>
  );
}

export function BrowserTitleBar(props: BrowserPartProps) {
  injectComponentStyle("browser");

  return (
    <div {...props} data-scope="browser" data-part="titlebar">
      {props.children}
    </div>
  );
}

export function BrowserUrlBar(props: BrowserPartProps) {
  injectComponentStyle("browser");

  return (
    <div {...props} data-scope="browser" data-part="urlbar">
      {props.children}
    </div>
  );
}

export function BrowserBody(props: BrowserPartProps) {
  injectComponentStyle("browser");

  return (
    <div {...props} data-scope="browser" data-part="body">
      {props.children}
    </div>
  );
}

/** A browser window as a vessel: title bar, the three lamps, the
 * address well, and a body that carries whatever the site hangs in
 * it — an iframe, a screenshot, a live page. */
export const Browser = Object.assign(BrowserRoot, {
  Root: BrowserRoot,
  TitleBar: BrowserTitleBar,
  Dots: BrowserDots,
  UrlBar: BrowserUrlBar,
  Body: BrowserBody,
});
