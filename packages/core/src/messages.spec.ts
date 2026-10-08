import { describe, expect, it } from "vitest";

import { resolveComponentMessages } from "./messages";

describe("resolveComponentMessages", () => {
  it("uses English defaults without a Chinese language subtag", () => {
    expect(resolveComponentMessages("en-GB").pagination).toEqual({
      previous: "Previous page",
      next: "Next page",
    });
    expect(resolveComponentMessages("not-a-locale").spinner.loading).toBe("Loading");
  });

  it("uses Chinese defaults for every zh language subtag", () => {
    expect(resolveComponentMessages("zh-CN").pagination).toEqual({
      previous: "上一页",
      next: "下一页",
    });
    expect(resolveComponentMessages("zh-Hant").spinner.loading).toBe("加载中");
  });

  it("merges leaf overrides without replacing their locale defaults", () => {
    const messages = resolveComponentMessages("zh-CN", {
      table: { filterAll: "Search every column" },
    });

    expect(messages.table.filterColumn).toBe("筛选 {name}");
    expect(messages.table.filterAll).toBe("Search every column");
  });
});
