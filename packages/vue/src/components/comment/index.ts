import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { defineComponent, h } from "vue";

/**
 * A voice on the record: the portrait hangs left (the avatar slot),
 * the body carries the byline from `author` and `datetime`, the ink is
 * the default slot, and the actions slot is the row of answers.
 */
export interface CommentProps {
  author?: string;
  datetime?: string;
}

export const Comment = defineComponent({
  name: "Comment",
  props: {
    author: { type: String, default: undefined },
    datetime: { type: String, default: undefined },
  },
  setup(props, ctx: SetupContext) {
    return () =>
      h("article", { ...ctx.attrs, "data-scope": "comment", "data-part": "root" }, [
        ctx.slots.avatar
          ? h("div", { "data-scope": "comment", "data-part": "avatar" }, ctx.slots.avatar)
          : null,
        h("div", { "data-scope": "comment", "data-part": "body" }, () => [
          props.author || props.datetime
            ? h("header", { "data-scope": "comment", "data-part": "header" }, () => [
                props.author
                  ? h(
                      "span",
                      { "data-scope": "comment", "data-part": "author" },
                      () => props.author,
                    )
                  : null,
                props.datetime
                  ? h(
                      "time",
                      {
                        "data-scope": "comment",
                        "data-part": "datetime",
                        datetime: props.datetime,
                      },
                      () => props.datetime,
                    )
                  : null,
              ])
            : null,
          h("div", { "data-scope": "comment", "data-part": "content" }, ctx.slots.default),
          ctx.slots.actions
            ? h("div", { "data-scope": "comment", "data-part": "actions" }, ctx.slots.actions)
            : null,
        ]),
      ]);
  },
});

injectComponentStyle("comment");
