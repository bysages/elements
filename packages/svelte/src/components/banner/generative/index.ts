import { faces } from "../../../generative/faces.generated";
import { defineEntry } from "../../../generative/shared";
import Banner from "./Banner.svelte";

/** A full-width notice that speaks once across the page. */
export default defineEntry({
  Banner: {
    ...faces.Banner,
    component: Banner,
  },
});
