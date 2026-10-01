import { createComponent, Show, type JSX } from "solid-js";

import { faces } from "../../generative/faces.generated";
import { defineEntry } from "../../generative/shared";
import { Card } from "./index";

/** Grouping vessel. Give title and description instead of hand-building a header; children render in the body. */
export default defineEntry({
  Card: {
    ...faces.Card,
    component: ({ props, children }) =>
      createComponent(Card.Root, {
        get children() {
          return [
            createComponent(Show, {
              keyed: true,
              get when() {
                return props.title != null || props.description != null;
              },
              get children() {
                return createComponent(Card.Header, {
                  get children() {
                    return [
                      createComponent(Show, {
                        keyed: true,
                        get when() {
                          return props.title != null;
                        },
                        get children() {
                          return createComponent(Card.Title, {
                            get children() {
                              return props.title;
                            },
                          });
                        },
                      }),
                      createComponent(Show, {
                        keyed: true,
                        get when() {
                          return props.description != null;
                        },
                        get children() {
                          return createComponent(Card.Description, {
                            get children() {
                              return props.description;
                            },
                          });
                        },
                      }),
                    ] as JSX.Element;
                  },
                });
              },
            }),
            createComponent(Card.Content, {
              get children() {
                return children as JSX.Element;
              },
            }),
          ] as JSX.Element;
        },
      }),
  },
});
