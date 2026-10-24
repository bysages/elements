// @vitest-environment happy-dom
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vite-plus/test";

import { Terminal } from "./index";

describe("terminal", () => {
  it("keeps an editable command line by default", () => {
    const html = renderToStaticMarkup(<Terminal lines={["ready"]} />);

    expect(html).toContain('data-part="entry"');
    expect(html).toContain('data-part="input"');
  });

  it("omits the command line in readonly mode", () => {
    const html = renderToStaticMarkup(<Terminal lines={["ready"]} readOnly />);

    expect(html).toContain("data-readonly");
    expect(html).toContain('role="log"');
    expect(html).not.toContain('data-part="entry"');
    expect(html).not.toContain('data-part="input"');
  });
});
