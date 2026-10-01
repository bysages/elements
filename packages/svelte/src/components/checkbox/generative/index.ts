import { faces } from "../../../generative/faces.generated";
import { defineEntry } from "../../../generative/shared";
import Checkbox from "./Checkbox.svelte";

/** One independent box with its label. */
export default defineEntry({
  Checkbox: {
    ...faces.Checkbox,
    component: Checkbox,
  },
});
