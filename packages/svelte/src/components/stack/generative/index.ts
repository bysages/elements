import { faces } from "../../../generative/faces.generated";
import { defineEntry } from "../../../generative/shared";
import Stack from "./Stack.svelte";

/** Flex container for layout. direction column stacks vertically, row lays side by side. gap is a named spacing step. */
export default defineEntry({
  Stack: {
    ...faces.Stack,
    component: Stack,
  },
});
