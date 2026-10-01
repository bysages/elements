import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { DataView } from "./index";

/** A paged collection shell; children are its records. */
export default defineEntry({
  DataView: {
    props: z.object({
      layout: z.enum(["list", "card"]).optional(),
      pageSize: z.number().int().optional(),
    }),
    slots: ["default"],
    description: "A paged collection shell; children are its records.",
    component: ({ props }) => {
      const records = props.items ?? [];
      return h(
        DataView as never,
        {
          items: records,
          layout: props.layout === "card" ? "grid" : "list",
          pageSize: props.pageSize,
        } as never,
        {
          item: ({ item }: { item: any }) => [
            h("strong", () => String(item.title ?? item.label ?? "")),
            item.description != null
              ? h("p", { style: { margin: 0, color: "var(--bs-color-text-secondary)" } }, () =>
                  String(item.description),
                )
              : null,
          ],
        },
      );
    },
  },
});
