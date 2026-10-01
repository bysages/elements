import { faces } from "../../../generative/faces.generated";
import { defineEntry } from "../../../generative/shared";
import Switch from "./Switch.svelte";

/** An instant on/off; label names what it switches. */
export default defineEntry({
  Switch: {
    ...faces.Switch,
    component: Switch,
  },
});
