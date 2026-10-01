import { faces } from "../../../generative/faces.generated";
import { defineEntry } from "../../../generative/shared";
import Button from "./Button.svelte";

/** The primary action register: solid ink for the one main action, outline, ghost, or subtle for the rest. */
export default defineEntry({
  Button: {
    ...faces.Button,
    component: Button,
  },
});
