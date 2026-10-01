import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Alert } from "./index";

/** A bordered notice; status picks the pigment. */
export default defineEntry({
  Alert: {
    props: z.object({
      status: z.enum(["success", "warning", "danger", "info", "ink"]).optional(),
      title: z.string().optional(),
      message: z.string().optional(),
    }),
    description: "A bordered notice; status picks the pigment.",
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
