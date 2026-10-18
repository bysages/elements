import { h } from "vue";

import { faces } from "../../generative/faces";
import { slug } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { Breadcrumb } from "./index";

/** The trail of sections above a page; items run from root to here. */
export default defineEntry({
  Breadcrumb: {
    ...faces.Breadcrumb,
    component: ({ props }) => {
      const labels: string[] = props.items ?? ["Home", "Guides", "Ink"];
      const items = labels.map((label, index) =>
        index === labels.length - 1 ? { label } : { label, href: `#${slug(label)}` },
      );
      return h(Breadcrumb as never, { items });
    },
  },
});
