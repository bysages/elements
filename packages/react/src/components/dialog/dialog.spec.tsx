// @vitest-environment happy-dom
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vite-plus/test";

import { Dialog } from "./index";

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
