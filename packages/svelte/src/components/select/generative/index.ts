import { faces } from "../../../generative/faces.generated";
import { defineEntry } from "../../../generative/shared";
import Select from "./Select.svelte";

/** A choice field that opens a ruled list; options carry label and value. */
export default defineEntry({
  Select: {
    ...faces.Select,
    component: Select,
  },
});
