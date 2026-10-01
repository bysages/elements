import { createElement } from "react";

import { faces } from "../../generative/faces.generated";
import { defineEntry } from "../../generative/shared";
import { Alert } from "./index";

/** A bordered notice; status picks the pigment. */
export default defineEntry({
  Alert: {
    ...faces.Alert,
    component: ({ props }) =>
      createElement(
        Alert.Root,
        { status: props.status ?? "ink" },
        createElement(Alert.Icon),
        createElement(
          Alert.Body,
          null,
          createElement(Alert.Title, null, props.title),
          props.message != null ? createElement(Alert.Description, null, props.message!) : null,
        ),
      ),
  },
});
