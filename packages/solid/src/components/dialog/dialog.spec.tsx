// @vitest-environment happy-dom
import { render } from "solid-js/web";
import { afterEach, beforeEach, describe, expect, it } from "vite-plus/test";

import { Dialog } from "./index";

let dispose: (() => void) | undefined;

beforeEach(() => {
  document.body.replaceChildren();
});

afterEach(() => {
  dispose?.();
  dispose = undefined;
  document.body.replaceChildren();
});

describe("dialog facade", () => {
  it("uses the size vocabulary on its content", () => {
    const container = document.createElement("div");
    document.body.append(container);
    dispose = render(
      () => (
        <Dialog
          open
          trigger="Open"
          label="Archive"
          content="Confirm the archive."
          size="xl"
          portal={false}
        />
      ),
      container,
    );
    expect(container.querySelector('[data-part="content"]')?.getAttribute("data-size")).toBe("xl");
  });

  it("moves an open sheet to body after hydration", () => {
    const container = document.createElement("div");
    document.body.append(container);
    dispose = render(
      () => <Dialog open trigger="Open" label="Archive" content="Body" />,
      container,
    );
    expect(document.querySelector('[data-part="content"]')).not.toBeNull();
    expect(container.querySelector('[data-part="content"]')).toBeNull();
  });

  it("keeps an explicit inline sheet in the caller tree", () => {
    const container = document.createElement("div");
    document.body.append(container);
    dispose = render(
      () => <Dialog open trigger="Open" label="Archive" content="Body" portal={false} />,
      container,
    );
    expect(container.querySelector('[data-part="content"]')).not.toBeNull();
    expect(document.querySelector('body > [data-part="positioner"]')).toBeNull();
  });
});
