import { faces } from "../../../generative/faces.generated";
import { defineEntry } from "../../../generative/shared";
import Spinner from "./Spinner.svelte";

/** A quiet wheel for work still settling. */
export default defineEntry({
  Spinner: {
    ...faces.Spinner,
    component: Spinner,
  },
});
