import { createColumnHelper, DataTable } from ".";

const meta = { title: "Components/Data/Table", component: DataTable };
export default meta;

const col = createColumnHelper<any, any>();

/* Deterministic pseudo-random data so every reload reads the same. */
function seeded(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
}

interface SaleRow {
  id: string;
  region: string;
  province: string;
  product: string;
  units: number;
}

function makeRows(count: number): SaleRow[] {
  const rand = seeded(20260912);
  const regions = ["North", "South", "East", "West"];
  const provinces = ["Hebei", "Guangdong", "Zhejiang", "Sichuan"];
  const products = ["Rice paper", "Ink stick", "Brush", "Seal paste"];

  return Array.from({ length: count }, (_, index) => ({
    id: `row-${index}`,
    region: regions[Math.floor(rand() * regions.length)]!,
    province: provinces[Math.floor(rand() * provinces.length)]!,
    product: products[Math.floor(rand() * products.length)]!,
    units: Math.floor(rand() * 900) + 50,
  }));
}

const salesColumns = col.columns([
  col.accessor("region", { header: "Region" }),
  col.accessor("province", { header: "Province" }),
  col.accessor("product", { header: "Product" }),
  col.accessor("units", { header: "Units", meta: { numeric: true } }),
]);

/** Every other body row carries one step of shade, so wide measures
 * keep the eye on its line. */
export const Striped = {
  render: () => (
    <div style={{ display: "grid", gap: "1rem", "max-width": "48rem" }}>
      <DataTable data={makeRows(12)} columns={salesColumns} striped />
    </div>
  ),
};
