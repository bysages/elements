import type { Component } from "svelte";

import { DataTable, createColumnHelper } from ".";

type Story = {
  render?: () => { Component: Component<any>; props?: Record<string, unknown> };
};

const meta = { title: "Components/Data/Table", component: DataTable };

export default meta;

const col = createColumnHelper<any, any>();
const columns = col.columns([
  col.accessor("region", { header: "Region" }),
  col.accessor("province", { header: "Province" }),
  col.accessor("city", { header: "City" }),
  col.accessor("product", { header: "Product" }),
  col.accessor("units", { header: "Units", meta: { numeric: true } }),
]);
const data = Array.from({ length: 12 }, (_, index) => ({
  region: index % 2 ? "South" : "North",
  province: `Province ${index + 1}`,
  city: `City ${index + 1}`,
  product: index % 2 ? "Ink stick" : "Rice paper",
  units: 50 + index * 7,
}));

/** Every other body row carries one step of shade, so wide measures
 * keep the eye on its line. */
export const Striped: Story = {
  render: () => ({
    Component: DataTable,
    props: { data, columns, striped: true, style: "max-inline-size: 48rem" },
  }),
};
