// @vitest-environment happy-dom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it } from "vite-plus/test";

import { Layout } from "./index";

let container: HTMLDivElement | undefined;
let root: ReturnType<typeof createRoot> | undefined;

beforeEach(() => {
  document.body.replaceChildren();
  (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
});

afterEach(() => {
  root?.unmount();
  root = undefined;
  container?.remove();
  container = undefined;
});

describe("Layout sider resizing", () => {
  function mount({ collapsed }: { collapsed: boolean }) {
    container = document.createElement("div");
    document.body.append(container);
    root = createRoot(container);

    act(() => {
      root?.render(
        <Layout.Root sider="start">
          <Layout.Sider resizable collapsed={collapsed} width="16rem" collapsedWidth="3.5rem">
            Navigation
          </Layout.Sider>
          <Layout.Content>Flow</Layout.Content>
        </Layout.Root>,
      );
    });

    return container;
  }

  async function renderCollapsed(collapsed: boolean) {
    await act(async () => {
      root?.render(
        <Layout.Root sider="start">
          <Layout.Sider resizable collapsed={collapsed} width="16rem" collapsedWidth="3.5rem">
            Navigation
          </Layout.Sider>
          <Layout.Content>Flow</Layout.Content>
        </Layout.Root>,
      );
    });
  }

  it("renders the Ark splitter track only while expanded", () => {
    const expanded = mount({ collapsed: false });

    const sider = expanded.querySelector("aside");
    expect(sider?.querySelector('[data-scope="splitter"][data-part="panel"]')).not.toBeNull();
    expect(
      sider?.querySelector('[data-scope="splitter"][data-part="resize-trigger"]'),
    ).not.toBeNull();
    expect(sider?.textContent).toContain("Navigation");
  });

  it("keeps sider content and applies the collapsed width without the trigger", async () => {
    const mounted = mount({ collapsed: false });
    await renderCollapsed(true);

    const sider = mounted.querySelector<HTMLElement>('[data-part="sider"]');
    expect(sider?.style.getPropertyValue("--bs-layout-sider-width")).toBe("3.5rem");
    expect(mounted.querySelector('[data-scope="splitter"][data-part="resize-trigger"]')).toBeNull();
    expect(sider?.textContent).toContain("Navigation");
  });

  it("restores the expanded width after collapse and expansion", async () => {
    const mounted = mount({ collapsed: false });
    const sider = mounted.querySelector<HTMLElement>('[data-part="sider"]');
    expect(sider?.style.getPropertyValue("--bs-layout-sider-width")).toBe("16rem");

    await renderCollapsed(true);
    expect(sider?.style.getPropertyValue("--bs-layout-sider-width")).toBe("3.5rem");

    await renderCollapsed(false);
    expect(sider?.style.getPropertyValue("--bs-layout-sider-width")).toBe("16rem");
  });
});
