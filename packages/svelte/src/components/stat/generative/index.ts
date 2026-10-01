import { faces } from "../../../generative/faces.generated";
import { defineEntry } from "../../../generative/shared";
import Stat from "./Stat.svelte";

/** One loud figure with its quiet label and an optional delta. */
export default defineEntry({
  Stat: {
    ...faces.Stat,
    component: Stat,
  },
});
