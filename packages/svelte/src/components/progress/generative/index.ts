import { faces } from "../../../generative/faces.generated";
import { defineEntry } from "../../../generative/shared";
import Progress from "./Progress.svelte";

/** A working track that fills toward done. */
export default defineEntry({
  Progress: {
    ...faces.Progress,
    component: Progress,
  },
});
