import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Icon } from "./index";

/** A line icon by Lucide name, e.g. mail, settings, arrow-right. */
export default defineEntry({
  Icon: {
    props: z.object({ name: z.string(), size: z.enum(["sm", "md", "lg"]).optional() }),
    description: "A line icon by Lucide name, e.g. mail, settings, arrow-right.",
    component: ({ props }) => h(Icon, { name: props.name, size: props.size ?? undefined }),
  },
});
