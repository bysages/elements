import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { DataTable } from "./index";

/** A ruled data table: columns name the fields, data carries the rows. */
export default defineEntry({
  Table: {
    props: z.object({
      columns: z.array(z.object({ key: z.string(), header: z.string().optional() })).optional(),
      data: z.array(z.record(z.string(), z.unknown())).optional(),
    }),
    description: "A ruled data table: columns name the fields, data carries the rows.",
    component: ({ props }) => {
      const data = props.data ?? [];
      const columns = (props.columns ?? Object.keys(data[0] ?? {}).map((key) => ({ key }))).map(
        (column: { key: string; header?: string }) => ({
          accessorKey: column.key,
          header: column.header ?? column.key,
        }),
      );
      return h(DataTable as never, { data, columns } as never);
    },
  },
});
