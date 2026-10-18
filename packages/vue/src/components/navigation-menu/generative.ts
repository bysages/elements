import { h } from "vue";
import { z } from "zod";

import { slug } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { NavigationMenu } from "./index";

/** A flat navigation bar; grouped panels stay on the anatomy. */
export default defineEntry({
  NavigationMenu: {
    props: z.object({ items: z.array(z.string()).optional() }),
    description: "A flat navigation bar; grouped panels stay on the anatomy.",
    component: ({ props }) =>
      h(NavigationMenu, {
        items: (props.items ?? ["Docs", "Components", "Themes", "Blog"]).map((label: string) => ({
          label,
          href: "#" + slug(label),
        })),
      }),
  },
});
