import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Menubar } from "./index";

/** A horizontal bar of menus across the top. */
export default defineEntry({
  Menubar: {
    props: z.object({ label: z.string().optional(), items: z.array(z.string()).optional() }),
    description: "A horizontal bar of menus across the top.",
    component: ({ props }) => {
      const items = props.items ?? ["New file", "Open", "Save"];
      const groups = [
        {
          label: props.label ?? "File",
          items: items.map((item: string) => ({ label: item, value: item })),
        },
      ];
      return h(Menubar as never, { items: groups } as never);
    },
  },
});
