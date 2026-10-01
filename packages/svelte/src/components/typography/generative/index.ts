import { faces } from "../../../generative/faces.generated";
import { defineEntry } from "../../../generative/shared";
import Heading from "./Heading.svelte";
import Text from "./Text.svelte";

/** Section heading. One per view at level 1; do not skip levels. */
export default defineEntry({
  Heading: {
    ...faces.Heading,
    component: Heading,
  },
  Text: {
    ...faces.Text,
    component: Text,
  },
});
