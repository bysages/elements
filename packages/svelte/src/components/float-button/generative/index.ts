import { faces } from "../../../generative/faces.generated";
import { defineEntry } from "../../../generative/shared";
import FloatButton from "./FloatButton.svelte";

/** A floating action cluster; named actions fan out from one corner. */
export default defineEntry({
  FloatButton: {
    ...faces.FloatButton,
    component: FloatButton,
  },
});
