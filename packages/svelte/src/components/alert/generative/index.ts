import { faces } from "../../../generative/faces.generated";
import { defineEntry } from "../../../generative/shared";
import Alert from "./Alert.svelte";

/** A bordered notice; status picks the pigment. */
export default defineEntry({
  Alert: {
    ...faces.Alert,
    component: Alert,
  },
});
