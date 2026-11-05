// @vitest-environment happy-dom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it } from "vite-plus/test";

import { Dialog } from "./index";

beforeEach(() => {
  document.body.replaceChildren();
  (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
});

describe("dialog content measures", () => {
  it.each(["sm", "lg", "xl"] as const)("names the %s sheet without utility overrides", (size) => {
    const html = renderToStaticMarkup(
      <Dialog.Root>
        <Dialog.Content size={size} aria-label="Edit">
          Content
        </Dialog.Content>
      </Dialog.Root>,
    );

    expect(html).toContain(`data-size="${size}"`);
  });

  it("uses the facade's medium measure by default", () => {
    const html = renderToStaticMarkup(<Dialog defaultOpen label="Edit" content="Body" />);

    expect(html).toContain('data-size="md"');
  });
});

describe("dialog floating portal", () => {
  it("portals the default sheet to body and keeps an explicit sheet inline", async () => {
    const container = document.createElement("div");
    document.body.append(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(<Dialog defaultOpen label="Edit" content="Body" />);
    });
    expect(container.querySelector('[data-part="content"]')).toBeNull();
    expect(document.body.querySelector('[data-part="content"]')).not.toBeNull();

    await act(async () => {
      root.render(<Dialog defaultOpen label="Edit" content="Body" portal={false} />);
    });
    expect(container.querySelector('[data-part="content"]')).not.toBeNull();

    await act(async () => {
      root.unmount();
    });
    container.remove();
  });
});

describe("dialog semantic parts", () => {
  it("renders stable header, body and footer anatomy", () => {
    const html = [
      renderToStaticMarkup(<Dialog.Header>Title</Dialog.Header>),
      renderToStaticMarkup(<Dialog.Body>Content</Dialog.Body>),
      renderToStaticMarkup(<Dialog.Footer>Actions</Dialog.Footer>),
    ].join("\n");

    expect(html).toContain('<header data-scope="dialog" data-part="header">');
    expect(html).toContain('<div data-scope="dialog" data-part="body">');
    expect(html).toContain('<footer data-scope="dialog" data-part="footer">');
  });
});
