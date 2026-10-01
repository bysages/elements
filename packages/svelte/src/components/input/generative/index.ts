import { faces } from "../../../generative/faces.generated";
import { defineEntry } from "../../../generative/shared";
import Input from "./Input.svelte";

/** A single-line field; rely on border, surface and the focus halo. */
export default defineEntry({
  Input: {
    ...faces.Input,
    component: Input,
  },
});
