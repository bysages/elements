import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { DataTable, createColumnHelper } from ".";

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

const frame = (children: React.ReactNode, style: React.CSSProperties = {}) => (
  <div style={{ display: "grid", gap: "1rem", ...style }}>{children}</div>
);

/** The resting table: hairlines, a quiet header, rows of ink. */
export const Basic = {
  render: () =>
    frame(
      <DataTable
        data={makeRows(8)}
        columns={salesColumns.slice(0, 5)}
        style={{ maxWidth: "48rem" }}
      />,
    ),
};

/** Header cells answer clicks; the arrow carries the sort. */
export const Sortable = {
  render: () =>
    frame(
      <DataTable
        data={makeRows(24)}
        columns={salesColumns.slice(0, 5)}
        initialSorting={[{ id: "units", desc: true }]}
        style={{ maxWidth: "48rem" }}
      />,
    ),
};

/** A global filter above the scroll, per-column slots in the header. */
export const Filterable = {
  render: () =>
    frame(
      <DataTable
        data={makeRows(60)}
        columns={salesColumns.slice(0, 5)}
        filterable
        style={{ maxWidth: "56rem" }}
      />,
    ),
};

/** Rows nest under `subRows`; the first column hosts the expander. */
export const TreeTable = {
  render: () =>
    frame(
      <DataTable
        tree
        data={[
          {
            id: "north",
            region: "North",
            units: 4820,
            revenue: 96400,
            subRows: [
              {
                id: "north-hebei",
                region: "Hebei",
                units: 2310,
                revenue: 46200,
                subRows: [
                  { id: "north-hebei-sjz", region: "Shijiazhuang", units: 1200, revenue: 24000 },
                  { id: "north-hebei-ts", region: "Tangshan", units: 1110, revenue: 22200 },
                ],
              },
              { id: "north-shanxi", region: "Shanxi", units: 2510, revenue: 50200 },
            ],
          },
          {
            id: "south",
            region: "South",
            units: 5310,
            revenue: 106200,
            subRows: [
              { id: "south-gd", region: "Guangdong", units: 3610, revenue: 72200 },
              { id: "south-gx", region: "Guangxi", units: 1700, revenue: 34000 },
            ],
          },
          { id: "east", region: "East", units: 2750, revenue: 55000 },
        ]}
        columns={col.columns([
          col.accessor("region", { header: "Region" }),
          col.accessor("units", { header: "Units", meta: { numeric: true } }),
          col.accessor("revenue", {
            header: "Revenue",
            meta: { numeric: true },
            cell: (info) => `$${(info.getValue() as number).toLocaleString("en-US")}`,
          }),
        ])}
        style={{ maxWidth: "40rem" }}
      />,
    ),
};

/** Equal neighbours in the merged column fold into one cell. */
export const MergedCells = {
  render: () =>
    frame(
      <DataTable
        data={makeRows(12).sort((a, b) => a.region.localeCompare(b.region))}
        columns={salesColumns.slice(0, 6)}
        merge={["region"]}
        style={{ maxWidth: "56rem" }}
      />,
    ),
};

/** Header and footer stick to the viewport; pinned columns ride their
 * offset while the body scrolls beneath. */
export const StickyAndPinned = {
  render: () =>
    frame(
      <DataTable
        data={makeRows(40)}
        columns={salesColumns}
        pinStart={["region"]}
        pinEnd={["revenue"]}
        stickyFooter
        style={{ maxWidth: "56rem", maxHeight: "20rem" }}
      />,
    ),
};

/** Ten thousand rows, one window: only the visible slice is on stage. */
export const Virtualized = {
  render: () =>
    frame(
      <DataTable
        data={makeRows(10000)}
        columns={salesColumns.slice(0, 5)}
        virtual
        rowHeight={40}
        style={{ maxWidth: "56rem", maxHeight: "20rem" }}
      />,
    ),
};

/** Client-side pagination: the bar below the scroll carries the pages. */
export const Paginated = {
  render: () =>
    frame(
      <DataTable
        data={makeRows(87)}
        columns={salesColumns.slice(0, 5)}
        paginated
        pageSize={10}
        style={{ maxWidth: "56rem" }}
      />,
    ),
};

/** Edits land without a full re-render: remove rows and the remaining
 * row elements keep their identity, selection included. */
export const IncrementalUpdates = {
  render: () => {
    const [rows, setRows] = useState(makeRows(8));
    return (
      <div style={{ display: "grid", gap: "0.75rem" }}>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            type="button"
            onClick={() =>
              setRows((prev) => prev.filter((_, i) => i !== 0 && i !== prev.length - 1))
            }
          >
            Drop first and last
          </button>
          <button type="button" onClick={() => setRows((prev) => [...prev, ...makeRows(2)])}>
            Append two rows
          </button>
        </div>
        <DataTable
          data={rows}
          columns={salesColumns.slice(0, 5)}
          selectable
          style={{ maxWidth: "56rem" }}
        />
      </div>
    );
  },
};

/** Header cells drag onto each other and swap; pinned columns hold
 * still. */
export const DraggableColumns = {
  render: () =>
    frame(
      <DataTable
        data={makeRows(12)}
        columns={salesColumns.slice(0, 5)}
        reorderable
        pinStart={["region"]}
        style={{ maxWidth: "56rem" }}
      />,
    ),
};

/** Rows drop above or below their target; the reordered array comes
 * back through the callback and sticks in the story state. */
export const RowReorder = {
  render: () => {
    const [rows, setRows] = useState(makeRows(8));
    return (
      <DataTable
        data={rows}
        columns={salesColumns.slice(0, 5)}
        reorderable
        selectable
        onRowReorder={(next) => setRows(next as SaleRow[])}
        style={{ maxWidth: "56rem" }}
      />
    );
  },
};

const treeColumns = col.columns([
  col.accessor("region", { header: "Region" }),
  col.accessor("units", { header: "Units", meta: { numeric: true } }),
  col.accessor("revenue", {
    header: "Revenue",
    meta: { numeric: true },
    cell: (info) => `$${(info.getValue() as number).toLocaleString("en-US")}`,
  }),
]);

const initialTree = [
  {
    id: "north",
    region: "North",
    units: 4820,
    revenue: 96400,
    subRows: [
      { id: "north-hebei", region: "Hebei", units: 2310, revenue: 46200 },
      { id: "north-shanxi", region: "Shanxi", units: 2510, revenue: 50200 },
    ],
  },
  {
    id: "south",
    region: "South",
    units: 5310,
    revenue: 106200,
    subRows: [
      { id: "south-gd", region: "Guangdong", units: 3610, revenue: 72200 },
      { id: "south-gx", region: "Guangxi", units: 1700, revenue: 34000 },
    ],
  },
  { id: "east", region: "East", units: 2750, revenue: 55000 },
];

/** Tree drops read before / inside / after: the outer bands swap
 * siblings, the middle band adopts the dragged branch as a child, and
 * a branch never drops into its own subtree. */
export const TreeDrag = {
  render: () => {
    const [tree, setTree] = useState(initialTree);
    return (
      <DataTable
        tree
        reorderable
        data={tree}
        columns={treeColumns}
        onRowReorder={(next) => setTree(next as typeof initialTree)}
        style={{ maxWidth: "40rem" }}
      />
    );
  },
};
