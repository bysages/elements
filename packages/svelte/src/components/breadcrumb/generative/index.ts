import { faces } from "../../../generative/faces.generated";
import { defineEntry } from "../../../generative/shared";
import Breadcrumb from "./Breadcrumb.svelte";

/** A trail of waymarks from home to the current page. */
export default defineEntry({
  Breadcrumb: {
    ...faces.Breadcrumb,
    component: Breadcrumb,
  },
});
