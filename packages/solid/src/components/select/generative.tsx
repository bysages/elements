import { For, createComponent, type JSX } from "solid-js";

import { faces } from "../../generative/faces.generated";
import { labelled, collectionFor, useBound } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { iconNode } from "../../internal/icon";
import { Select } from "./index";

/** A choice field that opens a ruled list; options carry label and value. */
export default defineEntry({
  Select: {
    ...faces.Select,
    component: ({ props, bindings }) => {
      const [value, setValue] = useBound<string | string[]>(props.value, bindings?.value);
      const collection = collectionFor(props.options);
      return labelled(
        props.label,
        createComponent(Select.Root, {
          collection,
          get disabled() {
            return props.disabled;
          },
          get multiple() {
            return props.multiple;
          },
          get value() {
            return props.multiple
              ? Array.isArray(value)
                ? value
                : value
                  ? [value]
                  : undefined
              : typeof value === "string"
                ? [value]
                : undefined;
          },
          onValueChange: (details: { value: string[] }) =>
            setValue(props.multiple ? details.value : (details.value[0] ?? "")),
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
                        return iconNode("chevrons-up-down");
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
                                          return iconNode("check");
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
