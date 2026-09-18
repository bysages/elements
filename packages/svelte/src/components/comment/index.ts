import { injectComponentStyle } from "@bysages/core";

import CommentComponent from "./Comment.svelte";

/** A voice on the record: the portrait hangs left (the avatar snippet),
 * the body carries the byline from `author` and `datetime`, the ink is
 * the children snippet, and the actions snippet is the row of answers. */
export const Comment = CommentComponent;

export type { CommentProps } from "./props";

injectComponentStyle("comment");
