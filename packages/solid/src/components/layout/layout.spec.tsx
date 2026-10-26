// @vitest-environment happy-dom
import { render } from "solid-js/web";
import { afterEach, beforeEach, describe, expect, it } from "vite-plus/test";

import { Layout } from "./index";

let dispose: (() => void) | undefined;

beforeEach(() => {
  document.body.replaceChildren();
});

afterEach(() => {
  dispose?.();
  dispose = undefined;
  document.body.replaceChildren();
});

describe("Layout sider resizing", () => {
  function mountSider(
    props: { collapsed?: boolean; onWidthChange?: (width: string) => void } = {},
  ) {
    const container = document.createElement("div");
    document.body.append(container);
    dispose = render(
      () => (
        <Layout.Root sider="start">
          <Layout.Sider resizable minWidth="40px" maxWidth="80px" {...props}>
            Navigation
          </Layout.Sider>
          <Layout.Content>Flow</Layout.Content>
        </Layout.Root>
      ),
      container,
    );
    return container;
  }

  it("clamps keyboard resizes to the sider bounds", () => {
    const widths: string[] = [];
    const container = mountSider({ onWidthChange: (width) => widths.push(width) });
    const sider = container.querySelector<HTMLElement>('[data-part="sider"]')!;
    const handle = container.querySelector<HTMLElement>('[data-part="sider-resize"]')!;

    sider.getBoundingClientRect = () => ({ width: 72 }) as DOMRect;
    handle.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true, cancelable: true }),
    );
    sider.getBoundingClientRect = () => ({ width: 32 }) as DOMRect;
    handle.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true, cancelable: true }),
    );

    expect(widths).toEqual(["80px", "40px"]);
  });

  it("offers the resize handle only while expanded", () => {
    const expanded = mountSider();
    expect(expanded.querySelector('[data-part="sider-resize"]')).not.toBeNull();

    dispose?.();
    dispose = undefined;
    expanded.remove();

    const collapsed = mountSider({ collapsed: true });
    expect(collapsed.querySelector('[data-part="sider-resize"]')).toBeNull();
    expect(collapsed.querySelector('[data-part="sider"]')?.textContent).toContain("Navigation");
  });
});
