// @vitest-environment happy-dom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it } from "vite-plus/test";

import { FloatingPortal } from "./floating";

beforeEach(() => {
  document.body.replaceChildren();
  (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
});

function marker(text: string) {
  return <span data-testid="floating-child">{text}</span>;
}

describe("FloatingPortal", () => {
  it("renders inline on the server even when a client portal is requested", () => {
    const html = renderToStaticMarkup(
      <FloatingPortal portal={true}>{marker("inline")}</FloatingPortal>,
    );
    expect(html).toContain('<span data-testid="floating-child">inline</span>');
  });

  it("moves client output to body by default opt-in and restores inline on false", async () => {
    const container = document.createElement("div");
    document.body.append(container);
    const root = createRoot(container);

    act(() => {
      root.render(<FloatingPortal portal={true}>{marker("body")}</FloatingPortal>);
    });
    expect(container.querySelector('[data-testid="floating-child"]')).toBeNull();
    expect(document.body.querySelector('[data-testid="floating-child"]')?.textContent).toBe("body");

    act(() => {
      root.render(<FloatingPortal portal={false}>{marker("inline")}</FloatingPortal>);
    });
    expect(document.body.querySelector('[data-testid="floating-child"]')?.textContent).toBe(
      "inline",
    );
    expect(container.querySelector('[data-testid="floating-child"]')?.textContent).toBe("inline");

    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it("uses a stable selector target and stays inline when it is missing", async () => {
    const container = document.createElement("div");
    const target = document.createElement("div");
    target.id = "floating-target";
    document.body.append(target, container);
    const root = createRoot(container);

    act(() => {
      root.render(<FloatingPortal portal="#missing-target">{marker("inline")}</FloatingPortal>);
    });
    expect(target.querySelector('[data-testid="floating-child"]')).toBeNull();
    expect(container.querySelector('[data-testid="floating-child"]')?.textContent).toBe("inline");

    act(() => {
      root.render(<FloatingPortal portal="#floating-target">{marker("targeted")}</FloatingPortal>);
    });
    expect(target.querySelector('[data-testid="floating-child"]')?.textContent).toBe("targeted");
    expect(container.querySelector('[data-testid="floating-child"]')).toBeNull();

    act(() => {
      root.unmount();
    });
    target.remove();
    container.remove();
  });
});
