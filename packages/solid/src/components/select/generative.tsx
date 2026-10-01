import { For, createComponent, type JSX } from "solid-js";

import { faces } from "../../generative/faces.generated";
import { labelled, collectionFor, useBound } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { Icon } from "../icon";
import { Select } from "./index";

/** A choice field that opens a ruled list; options carry label and value. */
export default defineEntry({
  Select: {
    ...faces.Select,
    component: ({ props, bindings }) => {
      const [value, setValue] = useBound<string>(props.value, bindings?.value);
      const collection = collectionFor(props.options);
      return labelled(
        props.label,
        createComponent(Select.Root, {
          collection,
          get value() {
            return value != null ? [value] : undefined;
          },
          onValueChange: (details: { value: string[] }) => setValue(details.value[0]),
          get children() {
            return [
              createComponent(Select.Control, {
                get children() {
                  return [
                    createComponent(Select.Trigger, {
                      get children() {
                        return createComponent(Select.ValueText, {
                          get placeholder() {
                            return props.placeholder;
                          },
                        });
                      },
                    }),
                    createComponent(Select.Indicator, {
                      get children() {
                        return createComponent(Icon, { name: "chevrons-up-down" });
                      },
                    }),
                  ] as JSX.Element;
                },
              }),
              createComponent(Select.Positioner, {
                get children() {
                  return createComponent(Select.Content, {
                    get children() {
                      return createComponent(Select.ItemGroup, {
                        get children() {
                          return (
                            <For each={props.options}>
                              {(option: { label: string; value: string }) =>
                                createComponent(Select.Item, {
                                  get item() {
                                    return option;
                                  },
                                  get children() {
                                    return [
                                      createComponent(Select.ItemText, {
                                        get children() {
                                          return option.label;
                                        },
                                      }),
                                      createComponent(Select.ItemIndicator, {
                                        get children() {
                                          return createComponent(Icon, { name: "check" });
                                        },
                                      }),
                                    ] as JSX.Element;
                                  },
                                })
                              }
                            </For>
                          );
                        },
                      }) as JSX.Element;
                    },
                  }) as JSX.Element;
                },
              }),
              createComponent(Select.HiddenSelect, {}),
            ] as JSX.Element;
          },
        }),
      );
    },
  },
});
