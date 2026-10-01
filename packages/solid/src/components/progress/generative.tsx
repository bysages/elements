import { createComponent, Show, type JSX } from "solid-js";

import { faces } from "../../generative/faces.generated";
import { defineEntry } from "../../generative/shared";
import { Progress } from "./index";

/** A working track that fills toward done. */
export default defineEntry({
  Progress: {
    ...faces.Progress,
    component: ({ props }) =>
      createComponent(Progress.Root, {
        get value() {
          return props.value;
        },
        get children() {
          return [
            createComponent(Show, {
              keyed: true,
              get when() {
                return props.label != null;
              },
              get children() {
                return createComponent(Progress.Label, {
                  get children() {
                    return props.label;
                  },
                });
              },
            }),
            createComponent(Progress.Track, {
              get children() {
                return createComponent(Progress.Range, {});
              },
            }),
          ] as JSX.Element;
        },
      }),
  },
});
