import { faces } from "../../../generative/faces.generated";
import { defineEntry } from "../../../generative/shared";
import Separator from "./Separator.svelte";

/** Hairline divider between sections. */
export default defineEntry({
  Separator: {
    ...faces.Separator,
    component: Separator,
  },
});
