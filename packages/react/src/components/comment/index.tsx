import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes, ReactNode } from "react";

import { withSelfRoot } from "../../internal/family";

/**
 * A voice on the record: the portrait hangs left (the `avatar` prop),
 * the body carries the byline from `author` and `datetime`, the ink is
 * the children, and `actions` is the row of answers.
 */
export interface CommentProps extends HTMLAttributes<HTMLElement> {
  author?: string;
  datetime?: string;
  /** The portrait at the row's head. */
  avatar?: ReactNode;
  /** The row of answers beneath the ink. */
  actions?: ReactNode;
}

function CommentImpl({ author, datetime, avatar, actions, children, ...rest }: CommentProps) {
  injectComponentStyle("comment");
  return (
    <article {...rest} data-scope="comment" data-part="root">
      {avatar ? (
        <div data-scope="comment" data-part="avatar">
          {avatar}
        </div>
      ) : null}
      <div data-scope="comment" data-part="body">
        {author || datetime ? (
          <header data-scope="comment" data-part="header">
            {author ? (
              <span data-scope="comment" data-part="author">
                {author}
              </span>
            ) : null}
            {datetime ? (
              <time data-scope="comment" data-part="datetime" dateTime={datetime}>
                {datetime}
              </time>
            ) : null}
          </header>
        ) : null}
        <div data-scope="comment" data-part="content">
          {children}
        </div>
        {actions ? (
          <div data-scope="comment" data-part="actions">
            {actions}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export const Comment = withSelfRoot(CommentImpl);
