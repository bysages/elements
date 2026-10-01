import { h } from "vue";
import { z } from "zod";

import { slug } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { Breadcrumb } from "./index";

/** The trail of sections above a page; items run from root to here. */
export default defineEntry({
  Breadcrumb: {
    props: z.object({ items: z.array(z.string()).optional() }),
    description: "The trail of sections above a page; items run from root to here.",
    component: ({ props }) => {
      const items = props.items ?? ["Home", "Guides", "Ink"];
      return h(Breadcrumb.Root as never, () => [
        h(Breadcrumb.List, () =>
          items.map((item: string, index: number) => {
            const last = index === items.length - 1;
            return h(Breadcrumb.Item, { key: item }, () => [
              last
                ? h(Breadcrumb.Current as never, () => item)
                : h(Breadcrumb.Link as never, { href: "#" + slug(item) }, () => item),
              last ? null : h(Breadcrumb.Separator as never),
            ]);
          }),
        ),
      ]);
    },
  },
});
