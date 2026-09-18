import type { Meta } from "@storybook/react-vite";

import { Comment } from ".";
import { Avatar } from "../avatar";
import { Button } from "../button";

const meta: Meta = { title: "Components/Data/Comment" };
export default meta;

/** A voice on the record: portrait, byline, ink, and the row of
 * answers beneath. */
export const Basic = {
  render: () => (
    <Comment
      author="Sage Wei"
      datetime="Today, 09:12"
      avatar={
        <Avatar.Root>
          <Avatar.Fallback>SW</Avatar.Fallback>
        </Avatar.Root>
      }
      actions={
        <>
          <Button variant="ghost" size="sm">
            Reply
          </Button>
          <Button variant="ghost" size="sm">
            Cite
          </Button>
        </>
      }
    >
      The registry reads cleaner since the hairlines went in — the eye knows where one entry ends.
    </Comment>
  ),
};

/** A short note: the byline can ride a single line, and the answers
 * row may stay away entirely. */
export const Brief = {
  render: () => (
    <Comment
      author="Archive keeper"
      datetime="2026-09-15"
      avatar={
        <Avatar.Root>
          <Avatar.Fallback>AK</Avatar.Fallback>
        </Avatar.Root>
      }
    >
      Filed. Shelved in the eastern cabinet, fourth row.
    </Comment>
  ),
};

/** A thread: comments compose, so a reply nests in the body's own
 * measure. */
export const Thread = {
  render: () => (
    <div style={{ display: "grid", gap: "0.5rem", maxInlineSize: "36rem" }}>
      <Comment
        author="Sage Wei"
        datetime="Today, 09:12"
        avatar={
          <Avatar.Root>
            <Avatar.Fallback>SW</Avatar.Fallback>
          </Avatar.Root>
        }
      >
        Shall the hairlines run through the annex as well?
      </Comment>
      <div style={{ paddingInlineStart: "2.75rem" }}>
        <Comment
          author="Archive keeper"
          datetime="Today, 10:03"
          avatar={
            <Avatar.Root>
              <Avatar.Fallback>AK</Avatar.Fallback>
            </Avatar.Root>
          }
        >
          Yes — same rule, same weight, one page everywhere.
        </Comment>
      </div>
    </div>
  ),
};
