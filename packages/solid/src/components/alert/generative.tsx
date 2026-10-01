import { createComponent, Show, type JSX } from "solid-js";

import { faces } from "../../generative/faces.generated";
import { defineEntry } from "../../generative/shared";
import { Alert } from "./index";

/** A bordered notice; status picks the pigment. */
export default defineEntry({
  Alert: {
    ...faces.Alert,
    component: ({ props }) =>
      createComponent(Alert.Root, {
        get status() {
          return props.status ?? "ink";
        },
        get children() {
          return [
            createComponent(Alert.Icon, {}),
            createComponent(Alert.Body, {
              get children() {
                return [
                  createComponent(Alert.Title, {
                    get children() {
                      return props.title;
                    },
                  }),
                  createComponent(Show, {
                    keyed: true,
                    get when() {
                      return props.message != null;
                    },
                    get children() {
                      return createComponent(Alert.Description, {
                        get children() {
                          return props.message;
                        },
                      });
                    },
                  }),
                ] as JSX.Element;
              },
            }),
          ] as JSX.Element;
        },
      }),
  },
});
