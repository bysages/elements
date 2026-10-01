import { createComponent, Show, type JSX } from "solid-js";

import { faces } from "../../generative/faces.generated";
import { defineEntry } from "../../generative/shared";
import { Stat } from "./index";

/** One loud figure with its quiet label and an optional delta. */
export default defineEntry({
  Stat: {
    ...faces.Stat,
    component: ({ props }) =>
      createComponent(Stat.Root, {
        get children() {
          return [
            createComponent(Stat.Label, {
              get children() {
                return props.label;
              },
            }),
            createComponent(Stat.Value, {
              get children() {
                return props.value;
              },
            }),
            createComponent(Show, {
              keyed: true,
              get when() {
                return props.change != null;
              },
              get children() {
                return createComponent(Stat.Delta, {
                  get direction() {
                    return props.direction ?? "flat";
                  },
                  get children() {
                    return props.change;
                  },
                });
              },
            }),
          ] as JSX.Element;
        },
      }),
  },
});
