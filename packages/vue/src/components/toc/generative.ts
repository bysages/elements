import { h } from "vue";
import { z } from "zod";

import { slug } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { Toc } from "./index";

/** A table of contents rail; items link down the page. */
export default defineEntry({
  Toc: {
    props: z.object({ items: z.array(z.string()).optional() }),
    description: "A table of contents rail; items link down the page.",
    component: ({ props }) => {
      const items = props.items ?? ["Overview", "Tokens", "Lighting"];
      const sections = items.map((item: string) => ({ value: slug(item), label: item, depth: 1 }));
      return h(Toc.Root as never, { items: sections } as never, () => [
        h(Toc.Nav, () => [
          h(Toc.Title, () => "On this page"),
          h(Toc.List, () => [
            h(Toc.Indicator),
            ...sections.map((section: { value: string; label: string; depth: number }) =>
              h(Toc.Item, { key: section.value, item: section }, () =>
                h(Toc.Link, { href: "#" + section.value }, () => section.label),
              ),
            ),
          ]),
        ]),
      ]);
    },
  },
});
