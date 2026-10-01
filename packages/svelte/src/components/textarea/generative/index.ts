import { faces } from "../../../generative/faces.generated";
import { defineEntry } from "../../../generative/shared";
import Textarea from "./Textarea.svelte";

/** A multi-line field for prose-length answers. */
export default defineEntry({
  Textarea: {
    ...faces.Textarea,
    component: Textarea,
  },
});
