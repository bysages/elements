import { For, createComponent, type JSX } from "solid-js";

import { faces } from "../../generative/faces.generated";
import { labelled, slug } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { Stack } from "../stack";
import { RadioGroup } from "./index";

/** Several boxes where exactly one may hold. */
export default defineEntry({
  RadioGroup: {
    ...faces.RadioGroup,
    component: ({ props }) => {
      const values = () => props.items ?? ["Option A", "Option B", "Option C"];
      const list: JSX.Element = createComponent(Stack, {
        gap: "sm",
        get children() {
          return (
            <For each={values()}>
              {(value: string) =>
                createComponent(RadioGroup.Item, {
                  get value() {
                    return value;
                  },
                  get children() {
                    return [
                      createComponent(RadioGroup.ItemControl, {}),
                      createComponent(RadioGroup.ItemText, {
                        get children() {
                          return value;
                        },
                      }),
                      createComponent(RadioGroup.ItemHiddenInput, {}),
                    ] as JSX.Element;
                  },
                })
              }
            </For>
          );
        },
      });
      return labelled(
        props.label,
        createComponent(RadioGroup.Root, {
          get defaultValue() {
            return slug(values()[0] ?? "");
          },
          get children() {
            return list;
          },
        }),
      );
    },
  },
});
