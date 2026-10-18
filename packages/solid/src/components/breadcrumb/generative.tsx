import { createComponent } from "solid-js";

import { faces } from "../../generative/faces.generated";
import { slug } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { Breadcrumb } from "./index";

/** A trail of waymarks from home to the current page. */
export default defineEntry({
  Breadcrumb: {
    ...faces.Breadcrumb,
    component: ({ props }) => {
      const labels: string[] = props.items ?? ["Home", "Guides", "Ink"];
      const items = labels.map((label, index) =>
        index === labels.length - 1 ? { label } : { label, href: `#${slug(label)}` },
      );
      return createComponent(Breadcrumb, {
        get items() {
          return items;
        },
      });
    },
  },
});
