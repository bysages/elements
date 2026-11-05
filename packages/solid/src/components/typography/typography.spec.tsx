// @vitest-environment happy-dom
import { render } from "solid-js/web";
import { afterEach, describe, expect, it } from "vite-plus/test";

import { Typography } from "./index";

let dispose: (() => void) | undefined;

afterEach(() => {
  dispose?.();
  dispose = undefined;
  document.body.replaceChildren();
});

describe("typography heading", () => {
  it("separates semantic element from visual size", () => {
    const container = document.createElement("div");
    document.body.append(container);
    dispose = render(
      () => (
        <Typography.Heading as="h2" size="display">
          Archive
        </Typography.Heading>
      ),
      container,
    );
    const heading = container.querySelector("h2");
    expect(heading?.getAttribute("data-part")).toBe("heading");
    expect(heading?.getAttribute("data-size")).toBe("display");
    expect(heading?.textContent).toBe("Archive");
  });
});
