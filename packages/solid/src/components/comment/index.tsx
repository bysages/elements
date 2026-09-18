import { injectComponentStyle } from "@bysages/core";
import { Show, splitProps } from "solid-js";
import type { JSX } from "solid-js";

export interface CommentProps extends JSX.HTMLAttributes<HTMLElement> {
  author?: string;
  datetime?: string;
  /** The portrait hanging to the left of the body. */
  avatar?: JSX.Element;
  /** The row of answers beneath the ink. */
  actions?: JSX.Element;
}

/**
 * A voice on the record: the portrait hangs left (the `avatar` prop),
 * the body carries the byline from `author` and `datetime`, the ink is
 * the children, and `actions` is the row of answers.
 */
export function Comment(props: CommentProps) {
  const [own, rest] = splitProps(props, ["author", "datetime", "avatar", "actions", "children"]);
  return (
    <article {...rest} data-scope="comment" data-part="root">
      <Show when={own.avatar}>
        <div data-scope="comment" data-part="avatar">
          {own.avatar}
        </div>
      </Show>
      <div data-scope="comment" data-part="body">
        <Show when={own.author || own.datetime}>
          <header data-scope="comment" data-part="header">
            <Show when={own.author}>
              <span data-scope="comment" data-part="author">
                {own.author}
              </span>
            </Show>
            <Show when={own.datetime}>
              <time data-scope="comment" data-part="datetime" datetime={own.datetime}>
                {own.datetime}
              </time>
            </Show>
          </header>
        </Show>
        <div data-scope="comment" data-part="content">
          {own.children}
        </div>
        <Show when={own.actions}>
          <div data-scope="comment" data-part="actions">
            {own.actions}
          </div>
        </Show>
      </div>
    </article>
  );
}

injectComponentStyle("comment");
