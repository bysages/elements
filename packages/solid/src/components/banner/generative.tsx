import { createComponent } from "solid-js";

import { faces } from "../../generative/faces.generated";
import { defineEntry } from "../../generative/shared";
import { Banner } from "./index";

/** A full-width notice that speaks once across the page. */
export default defineEntry({
  Banner: {
    ...faces.Banner,
    component: ({ props }) =>
      createComponent(Banner, {
        get status() {
          return props.status;
        },
        get title() {
          return props.title;
        },
        get message() {
          return props.message;
        },
        dismissible: true,
      }),
  },
});
