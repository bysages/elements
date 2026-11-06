// @vitest-environment happy-dom
import { describe, expect, it } from "vite-plus/test";
import { createApp, h } from "vue";

import { createColumnHelper, DataTable } from "./index";

const col = createColumnHelper<any, any>();
const columns = col.columns([col.accessor("id", { header: "ID" })]);

const rows = Array.from({ length: 12 }, (_, index) => ({ id: `row-${index}` }));

describe("DataTable pagination", () => {
  it("mounts the page-size control without slot normalization warnings", () => {
    const warnings: string[] = [];
    const container = document.createElement("div");
    document.body.append(container);
    const app = createApp({
      render: () =>
        h(DataTable, {
          columns,
          data: rows,
          paginated: true,
          pageSize: 5,
          pageSizeOptions: [5, 10],
        }),
    });
    app.config.warnHandler = (message) => warnings.push(String(message));

    app.mount(container);

    expect(container.querySelector('[data-part="pagination"]')).toBeTruthy();
    expect(
      warnings.some((message) =>
        message.includes("Non-function value encountered for default slot"),
      ),
    ).toBe(false);
    app.unmount();
    container.remove();
  });
});
