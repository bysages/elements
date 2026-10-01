import { createElement, type ReactNode } from "react";

import { faces } from "../../generative/faces.generated";
import { defineEntry } from "../../generative/shared";
import { Card } from "./index";

/** Grouping vessel. Give title and description instead of hand-building a header; children render in the body; footer holds actions. */
export default defineEntry({
  Card: {
    ...faces.Card,
    component: ({ props, children, slots }) => {
      const header = (slots?.header as ReactNode) ?? null;
      const footer = (slots?.footer as ReactNode) ?? null;
      return createElement(
        Card.Root,
        null,
        header
          ? createElement(Card.Header, null, header)
          : props.title != null || props.description != null
            ? createElement(
                Card.Header,
                null,
                props.title != null ? createElement(Card.Title, null, props.title!) : null,
                props.description != null
                  ? createElement(Card.Description, null, props.description!)
                  : null,
              )
            : null,
        createElement(Card.Content, null, children as ReactNode),
        footer ? createElement(Card.Footer, null, footer) : null,
      );
    },
  },
});
