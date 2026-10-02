import { h } from "vue";

import { faces } from "../../generative/faces";
import { defineEntry, slotted } from "../../generative/shared";
import { Stack } from "../stack/index";
import { Card } from "./index";

/** Grouping vessel. Give title and description instead of hand-building a header; children render in the body; footer holds actions. */
export default defineEntry({
  Card: {
    ...faces.Card,
    component: ({ props, children, slots }) =>
      h(Card.Root, () => [
        slots?.header?.()
          ? h(Card.Header, () => slotted(slots?.header?.()))
          : props.title != null || props.description != null
            ? h(Card.Header, () => [
                props.title != null ? h(Card.Title, () => props.title!) : null,
                props.description != null ? h(Card.Description, () => props.description!) : null,
              ])
            : null,
        h(Card.Content, () => {
          // The content part carries no gap of its own; the composed
          // body rides a Stack so its blocks keep the named rhythm.
          const body = slotted(children);
          return body.length ? h(Stack, { gap: "md" }, () => body) : null;
        }),
        slots?.footer?.() ? h(Card.Footer, () => slotted(slots?.footer?.())) : null,
      ]),
  },
});
