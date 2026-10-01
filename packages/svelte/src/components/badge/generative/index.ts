import { faces } from "../../../generative/faces.generated";
import { defineEntry } from "../../../generative/shared";
import Badge from "./Badge.svelte";

/** A small status seal beside content; reads at a glance. */
export default defineEntry({
  Badge: {
    ...faces.Badge,
    component: Badge,
  },
});
