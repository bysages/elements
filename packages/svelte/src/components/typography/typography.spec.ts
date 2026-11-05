import { mount, unmount } from "svelte";
import { beforeEach, describe, expect, it } from "vite-plus/test";

import TypographyHeading from "./TypographyHeading.svelte";

beforeEach(() => {
  document.body.replaceChildren();
});

describe("typography heading", () => {
  it("maps an explicit semantic tag and size", () => {
    const container = document.createElement("div");
    document.body.append(container);
    const component = mount(TypographyHeading, {
      target: container,
      props: { as: "h3", size: "lg" },
    });

    const heading = container.querySelector("h3");
    expect(heading?.getAttribute("data-part")).toBe("heading");
    expect(heading?.getAttribute("data-size")).toBe("lg");
    void unmount(component);
  });

  it("keeps the prose paragraph as the default voice", () => {
    const container = document.createElement("div");
    document.body.append(container);
    const component = mount(TypographyHeading, { target: container });

    expect(container.querySelector("p")?.hasAttribute("data-size")).toBe(false);
    void unmount(component);
  });
});
