// @vitest-environment happy-dom
import { render } from "solid-js/web";
import { afterEach, describe, expect, it } from "vite-plus/test";

import { DataTable, type DataTableToolbarSlot } from "./index";

let dispose: (() => void) | undefined;

afterEach(() => {
  dispose?.();
  dispose = undefined;
  document.body.replaceChildren();
});

const columns = [{ accessorKey: "name", header: "Name" }];
const data = [{ name: "Alpha" }, { name: "Beta" }];

function cellText() {
  return [...document.querySelectorAll('[data-part="body"] [role="cell"]')]
    .map((cell) => cell.textContent)
    .join(" ");
}

describe("DataTable toolbar contract", () => {
  it("lets a caller toolbar drive global filters", () => {
    const container = document.createElement("div");
    document.body.append(container);
    dispose = render(
      () => (
        <DataTable
          columns={columns}
          data={data}
          filterable
          showToolbar={false}
          toolbar={(slot: DataTableToolbarSlot) => (
            <button type="button" onClick={() => slot.setGlobalFilter("Beta")}>
              Beta only
            </button>
          )}
        />
      ),
      container,
    );

    expect(cellText()).toContain("Alpha");
    container.querySelector<HTMLButtonElement>("button")?.click();
    expect(cellText()).toContain("Beta");
    expect(cellText()).not.toContain("Alpha");
  });

  it("exposes the current filters and clearing", () => {
    let seen: DataTableToolbarSlot | undefined;
    const container = document.createElement("div");
    document.body.append(container);
    dispose = render(
      () => (
        <DataTable
          columns={columns}
          data={data}
          filterable
          showToolbar={false}
          toolbar={(slot: DataTableToolbarSlot) => {
            seen = slot;
            return <span>Toolbar</span>;
          }}
        />
      ),
      container,
    );

    expect(seen?.globalFilter).toBe("");
    expect(seen?.columnFilters).toEqual([]);
    seen?.setColumnFilters([{ id: "name", value: "Beta" }]);
    expect(cellText()).not.toContain("Alpha");
    seen?.clearFilters();
    expect(cellText()).toContain("Alpha");
  });
});
