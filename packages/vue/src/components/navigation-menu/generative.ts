import { h } from "vue";
import { z } from "zod";

import { slug } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { NavigationMenu } from "./index";

/** A top navigation with dropdown panels. */
export default defineEntry({
  NavigationMenu: {
    props: z.object({ items: z.array(z.string()).optional() }),
    description: "A top navigation with dropdown panels.",
    component: ({ props }) => {
      const items = props.items ?? ["Docs", "Components", "Themes", "Blog"];
      return h(NavigationMenu.Root as never, {}, () => [
        h(NavigationMenu.List, () =>
          items.map((item: string) =>
            h(NavigationMenu.Item, { key: item, value: slug(item) }, () =>
              h(NavigationMenu.Link as never, { href: "#" + slug(item) }, () => item),
            ),
          ),
        ),
      ]);
    },
  },
});
