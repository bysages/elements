import type { Meta } from "@storybook/react-vite";

import { DataView } from ".";
import { Avatar } from "../avatar";

const meta: Meta = { title: "Components/Data/Data View" };
export default meta;

const RECORDS = Array.from({ length: 23 }, (_, index) => ({
  id: index + 1,
  title: `Ledger entry ${index + 1}`,
  detail: "Settled and sealed.",
}));

/** The ledger layout, paged: rows separate by hairline, the
 * pagination family's own parts carry the foot. */
export const Ledger = {
  render: () => (
    <DataView
      items={RECORDS}
      pageSize={6}
      renderItem={(item) => {
        const record = item as { id: number; title: string };
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--bs-gap-sm)",
              padding: "var(--bs-padding-sm) 0",
            }}
          >
            <Avatar.Root size="sm">
              <Avatar.Fallback>{record.id}</Avatar.Fallback>
            </Avatar.Root>
            <span>{record.title}</span>
          </div>
        );
      }}
    />
  ),
};

/** The lattice layout: equal tiles that shrink with the container. */
export const Lattice = {
  render: () => (
    <DataView
      items={RECORDS.slice(0, 9)}
      layout="grid"
      renderItem={(item) => {
        const record = item as { id: number; title: string; detail: string };
        return (
          <div
            style={{
              padding: "var(--bs-padding-md)",
              border: "1px solid var(--bs-color-border)",
              borderRadius: "var(--bs-radius-md)",
            }}
          >
            <strong>{record.title}</strong>
            <p
              style={{
                margin: 0,
                color: "var(--bs-color-text-tertiary)",
                fontSize: "var(--bs-font-size-sm)",
              }}
            >
              {record.detail}
            </p>
          </div>
        );
      }}
    />
  ),
};
