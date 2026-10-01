import { h } from "vue";

import { faces } from "../../generative/faces";
import { defineEntry } from "../../generative/shared";
import { Alert } from "./index";

/** A bordered notice; status picks the pigment. */
export default defineEntry({
  Alert: {
    ...faces.Alert,
    component: ({ props }) =>
      h(Alert.Root, { status: props.status ?? "ink" }, () => [
        h(Alert.Icon),
        h(Alert.Body, () => [
          h(Alert.Title, () => props.title),
          props.message != null ? h(Alert.Description, () => props.message!) : null,
        ]),
      ]),
  },
});
