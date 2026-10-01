import { faces } from "../../../generative/faces.generated";
import { defineEntry } from "../../../generative/shared";
import RadioGroup from "./RadioGroup.svelte";

/** Several boxes where exactly one may hold. */
export default defineEntry({
  RadioGroup: {
    ...faces.RadioGroup,
    component: RadioGroup,
  },
});
