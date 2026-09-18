import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes, ReactNode } from "react";

/** A ledger of rows: Root is the list, Item one row, Leading the mark
 * before the words, Content the title and its quiet echo, Actions the
 * way out. The bordered variant draws the hairlines; the hoverable
 * variant gives every row the wash — and any row the caller makes
 * clickable (role="button") answers the pointer on its own. */
function part(name: string, tag: string) {
  const Tag = tag as "div";
  function Component({ children, ...rest }: HTMLAttributes<HTMLElement>) {
    return (
      <Tag {...rest} data-scope="list" data-part={name.toLowerCase()}>
        {children}
      </Tag>
    );
  }
  Component.displayName = "List" + name;
  return Component;
}

export interface ListRootProps extends HTMLAttributes<HTMLUListElement> {
  /** One hairline between rows. */
  bordered?: boolean;
  /** Every row answers the pointer with a wash. */
  hoverable?: boolean;
}

function Root({ bordered = false, hoverable = false, children, ...rest }: ListRootProps) {
  return (
    <ul
      {...rest}
      data-scope="list"
      data-part="root"
      data-bordered={bordered || undefined}
      data-hoverable={hoverable || undefined}
    >
      {children}
    </ul>
  );
}
Root.displayName = "ListRoot";

const Item = part("Item", "li");
const Leading = part("Leading", "div");
const Actions = part("Actions", "div");

/** The row's words: `title` and `description` ride their own slots, the
 * children follow them for anything else. */
export interface ListContentProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactNode;
  description?: ReactNode;
}

function Content({ title, description, children, ...rest }: ListContentProps) {
  return (
    <div {...rest} data-scope="list" data-part="content">
      {title ? (
        <div data-scope="list" data-part="title">
          {title}
        </div>
      ) : null}
      {description ? (
        <div data-scope="list" data-part="description">
          {description}
        </div>
      ) : null}
      {children}
    </div>
  );
}
Content.displayName = "ListContent";

export const List = Object.assign(Root, { Root, Item, Leading, Content, Actions });

injectComponentStyle("list");
