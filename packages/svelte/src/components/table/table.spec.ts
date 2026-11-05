import { mount, tick, unmount } from "svelte";
import { beforeEach, describe, expect, it } from "vite-plus/test";

import Fixture from "./DataTableToolbarFixture.svelte";

const settle = () => new Promise((resolve) => setTimeout(resolve, 0));

beforeEach(() => {
  document.body.replaceChildren();
});

describe("DataTable toolbar contract", () => {
  it("hands the custom toolbar filtering state and setters", async () => {
    const container = document.createElement("div");
    document.body.append(container);
    const component = mount(Fixture, { target: container });

    expect(
      container.querySelector<HTMLInputElement>('[data-testid="custom-filter"]'),
    ).not.toBeNull();
    expect(container.querySelector('[data-testid="contract-filter"]')?.textContent).toBe("|");

    container.querySelector<HTMLButtonElement>('[data-testid="set-filter"]')?.click();
    await tick();
    await settle();
    expect(container.querySelector('[data-testid="contract-filter"]')?.textContent).toBe("ink|");

    container.querySelector<HTMLButtonElement>('[data-testid="set-column-filter"]')?.click();
    await tick();
    await settle();
    expect(container.querySelector('[data-testid="column-filter-count"]')?.textContent).toBe("1");

    container.querySelector<HTMLButtonElement>('[data-testid="clear-filters"]')?.click();
    await tick();
    await settle();
    expect(container.querySelector('[data-testid="column-filter-count"]')?.textContent).toBe("0");

    void unmount(component);
  });
});
