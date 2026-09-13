import type { Meta } from "@storybook/vue3-vite";
import { h, reactive } from "vue";

import { DataTable, createColumnHelper } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Data/Table" };
export default meta;

const col = createColumnHelper<any, any>();

/* Deterministic pseudo-random data so every reload reads the same. */
function seeded(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
}

const provinces = [
  ["North", "Hebei", "Shijiazhuang"],
  ["North", "Shanxi", "Taiyuan"],
  ["South", "Guangdong", "Guangzhou"],
  ["South", "Guangxi", "Nanning"],
  ["East", "Zhejiang", "Hangzhou"],
  ["East", "Jiangsu", "Suzhou"],
  ["West", "Sichuan", "Chengdu"],
  ["West", "Shaanxi", "Xi'an"],
];
const products = ["Rice paper", "Ink stick", "Brush", "Seal paste", "Stone slab"];

interface SaleRow {
  id: string;
  region: string;
  province: string;
  city: string;
  product: string;
  units: number;
  revenue: number;
  growth: number;
  updated: string;
}

function makeRows(count: number): SaleRow[] {
  const rand = seeded(20260912);
  return Array.from({ length: count }, (_, i) => {
    const [region, province, city] = provinces[Math.floor(rand() * provinces.length)]!;
    const units = Math.floor(rand() * 900) + 50;
    return {
      id: `row-${i}`,
      region,
      province,
      city,
      product: products[Math.floor(rand() * products.length)]!,
      units,
      revenue: units * (Math.floor(rand() * 40) + 10),
      growth: Math.round((rand() * 30 - 10) * 10) / 10,
      updated: `2026-0${Math.floor(rand() * 8) + 1}-${String(Math.floor(rand() * 27) + 1).padStart(2, "0")}`,
    };
  });
}

const salesColumns = col.columns([
  col.accessor("region", { header: "Region" }),
  col.accessor("province", { header: "Province" }),
  col.accessor("city", { header: "City" }),
  col.accessor("product", { header: "Product" }),
  col.accessor("units", {
    header: "Units",
    meta: { numeric: true },
    footer: () => "Total",
  }),
  col.accessor("revenue", {
    header: "Revenue",
    meta: { numeric: true },
    cell: (info) => `$${(info.getValue() as number).toLocaleString("en-US")}`,
  }),
  col.accessor("growth", {
    header: "Growth",
    meta: { numeric: true },
    cell: (info) => `${info.getValue() as number}%`,
  }),
  col.accessor("updated", { header: "Updated" }),
]);

const frame = (children: () => any, style: Record<string, string> = {}) =>
  h("div", { style: { display: "grid", gap: "1rem", ...style } }, [children()]);

/** The resting table: hairlines, a quiet header, rows of ink. */
export const Basic = {
  render: () =>
    frame(() =>
      h(DataTable, {
        data: makeRows(8),
        columns: salesColumns.slice(0, 5),
        style: { "max-width": "48rem" },
      }),
    ),
};

/** Header cells answer clicks; the arrow carries the sort. */
export const Sortable = {
  render: () =>
    frame(() =>
      h(DataTable, {
        data: makeRows(24),
        columns: salesColumns.slice(0, 5),
        initialSorting: [{ id: "units", desc: true }],
        style: { "max-width": "48rem" },
      }),
    ),
};

/** A global filter above the scroll, per-column slots in the header. */
export const Filterable = {
  render: () =>
    frame(() =>
      h(DataTable, {
        data: makeRows(60),
        columns: salesColumns.slice(0, 5),
        filterable: true,
        style: { "max-width": "56rem" },
      }),
    ),
};

/** Rows nest under `subRows`; the first column hosts the expander. */
export const TreeTable = {
  render: () =>
    frame(() =>
      h(DataTable, {
        tree: true,
        data: [
          {
            region: "North",
            units: 4820,
            revenue: 96400,
            subRows: [
              {
                region: "Hebei",
                units: 2310,
                revenue: 46200,
                subRows: [
                  { region: "Shijiazhuang", units: 1200, revenue: 24000 },
                  { region: "Tangshan", units: 1110, revenue: 22200 },
                ],
              },
              { region: "Shanxi", units: 2510, revenue: 50200 },
            ],
          },
          {
            region: "South",
            units: 5310,
            revenue: 106200,
            subRows: [
              { region: "Guangdong", units: 3610, revenue: 72200 },
              { region: "Guangxi", units: 1700, revenue: 34000 },
            ],
          },
          { region: "East", units: 2750, revenue: 55000 },
        ],
        columns: col.columns([
          col.accessor("region", { header: "Region" }),
          col.accessor("units", { header: "Units", meta: { numeric: true } }),
          col.accessor("revenue", {
            header: "Revenue",
            meta: { numeric: true },
            cell: (info) => `$${(info.getValue() as number).toLocaleString("en-US")}`,
          }),
        ]),
        style: { "max-width": "40rem" },
      }),
    ),
};

/** Equal neighbours in the merged column fold into one cell. */
export const MergedCells = {
  render: () =>
    frame(() =>
      h(DataTable, {
        data: makeRows(12).sort((a, b) => a.region.localeCompare(b.region)),
        columns: salesColumns.slice(0, 6),
        merge: ["region"],
        style: { "max-width": "56rem" },
      }),
    ),
};

/** Header and footer stick to the viewport; pinned columns ride their
 * offset while the body scrolls beneath. */
export const StickyAndPinned = {
  render: () =>
    frame(() =>
      h(DataTable, {
        data: makeRows(40),
        columns: salesColumns,
        pinStart: ["region"],
        pinEnd: ["revenue"],
        stickyFooter: true,
        style: { "max-width": "56rem", "max-height": "20rem" },
      }),
    ),
};

/** Ten thousand rows, one window: only the visible slice is on stage. */
export const Virtualized = {
  render: () =>
    frame(() =>
      h(DataTable, {
        data: makeRows(10000),
        columns: salesColumns.slice(0, 5),
        virtual: true,
        rowHeight: 40,
        style: { "max-width": "56rem", "max-height": "20rem" },
      }),
    ),
};

/** Client-side pagination: the bar below the scroll carries the pages. */
export const Paginated = {
  render: () =>
    frame(() =>
      h(DataTable, {
        data: makeRows(87),
        columns: salesColumns.slice(0, 5),
        paginated: true,
        pageSize: 10,
        style: { "max-width": "56rem" },
      }),
    ),
};

/** Edits land without a full re-render: remove rows and the remaining
 * row elements keep their identity, selection included. */
export const IncrementalUpdates = {
  render: () =>
    withState(() => {
      const state = reactive({ rows: makeRows(8) });
      return () =>
        frame(() => {
          const table = h(DataTable, {
            data: state.rows,
            columns: salesColumns.slice(0, 5),
            selectable: true,
            style: { "max-width": "56rem" },
          });
          const tools = h("div", { style: { display: "flex", gap: "0.5rem" } }, [
            h(
              "button",
              {
                type: "button",
                onClick: () => {
                  state.rows = state.rows.filter((_, i) => i !== 0 && i !== state.rows.length - 1);
                },
              },
              "Drop first and last",
            ),
            h(
              "button",
              {
                type: "button",
                onClick: () => {
                  state.rows = [...state.rows, ...makeRows(2)];
                },
              },
              "Append two rows",
            ),
          ]);
          return h("div", { style: { display: "grid", gap: "0.75rem" } }, [tools, table]);
        });
    }),
};
