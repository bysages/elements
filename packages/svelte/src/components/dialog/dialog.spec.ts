import { mount, tick, unmount } from "svelte";
import { beforeEach, describe, expect, it } from "vite-plus/test";

import { Dialog } from "./index";

const settle = () => new Promise((resolve) => setTimeout(resolve, 0));

beforeEach(() => {
  document.body.replaceChildren();
});

function mountDialog(props: Record<string, unknown>) {
  const container = document.createElement("div");
  document.body.append(container);
  const component = mount(Dialog, {
    target: container,
    props: { open: true, label: "Vessel", ...props },
  });
  return { component, container };
}

describe("dialog facade", () => {
  it("hydrates inline and then portals to the requested target", async () => {
    const target = document.createElement("div");
    target.id = "dialog-portal";
    document.body.append(target);
    const { component, container } = mountDialog({ portal: "#dialog-portal" });

    expect(container.querySelector('[data-part="content"]')).not.toBeNull();
    expect(target.querySelector('[data-part="content"]')).toBeNull();

    await tick();
    await settle();
    expect(target.querySelector('[data-part="content"]')).not.toBeNull();
    expect(container.querySelector('[data-part="content"]')).toBeNull();
    void unmount(component);
  });

  it("keeps a portal=false vessel inline", async () => {
    const { component, container } = mountDialog({ portal: false, size: "lg" });
    await tick();

    const content = container.querySelector('[data-part="content"]');
    expect(content?.getAttribute("data-size")).toBe("lg");
    void unmount(component);
  });

  it("portals by default and names a content measure", async () => {
    const { component, container } = mountDialog({ size: "xl" });
    await tick();
    await settle();

    expect(container.querySelector('[data-part="content"]')).toBeNull();
    const content = document.body.querySelector('[data-part="content"]');
    expect(content?.getAttribute("data-size")).toBe("xl");
    void unmount(component);
  });
});
