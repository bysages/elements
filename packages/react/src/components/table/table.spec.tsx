import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vite-plus/test";

import { DataTable, type DataTableToolbarSlot } from "./index";

describe("DataTable toolbar slot", () => {
  it("hands the live filter contract to a caller toolbar", () => {
    let slot: DataTableToolbarSlot | undefined;

    const html = renderToStaticMarkup(
      <DataTable
        columns={[{ id: "name", header: "Name" }]}
        data={[]}
        filterable
        toolbar={(value) => {
          slot = value;
          return <span data-testid="caller-toolbar">{value.globalFilter}</span>;
        }}
      />,
    );

    expect(slot?.globalFilter).toBe("");
    expect(slot?.columnFilters).toEqual([]);
    expect(typeof slot?.setGlobalFilter).toBe("function");
    expect(typeof slot?.setColumnFilters).toBe("function");
    expect(typeof slot?.clearFilters).toBe("function");
    expect(html).toContain('<span data-testid="caller-toolbar"></span>');
    expect(html).not.toContain('data-part="global-filter"');
  });
});
