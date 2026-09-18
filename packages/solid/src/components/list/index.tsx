import { injectComponentStyle } from "@bysages/core";
import { Show, splitProps } from "solid-js";
import type { Component, JSX } from "solid-js";

/** A ledger of rows: Root is the list, Item one row, Leading the mark
 * before the words, Content the title and its quiet echo, Actions the
 * way out. The bordered variant draws the hairlines; the hoverable
 * variant gives every row the wash — and any row the caller makes
 * clickable (role="button") answers the pointer on its own. */
function part(name: string, tag: string): Component<JSX.HTMLAttributes<HTMLElement>> {
  function Component(props: JSX.HTMLAttributes<HTMLElement>) {
    const Tag = tag as "section";
    return <Tag {...props} data-scope="list" data-part={name.toLowerCase()} />;
  }
  return Component;
}

const Item = part("Item", "li");
const Leading = part("Leading", "div");
const Actions = part("Actions", "div");

export interface ListRootProps extends JSX.HTMLAttributes<HTMLUListElement> {
  /** One hairline between rows. */
  bordered?: boolean;
  /** Every row answers the pointer with a wash. */
  hoverable?: boolean;
}

function Root(props: ListRootProps) {
  const [own, rest] = splitProps(props, ["bordered", "hoverable"]);
  return (
    <ul
      {...rest}
      data-scope="list"
      data-part="root"
      data-bordered={own.bordered || undefined}
      data-hoverable={own.hoverable || undefined}
    />
  );
}

export interface ListContentProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "title"> {
  /** The row's title, riding its own part above the words. */
  title?: JSX.Element;
  /** The quiet echo beneath the title. */
  description?: JSX.Element;
}

/** The row's words: `title` and `description` ride their own named
 * parts, the children follow them for anything else. */
function Content(props: ListContentProps) {
  const [own, rest] = splitProps(props, ["title", "description", "children"]);
  return (
    <div {...rest} data-scope="list" data-part="content">
      <Show when={own.title}>
        <div data-scope="list" data-part="title">
          {own.title}
        </div>
      </Show>
      <Show when={own.description}>
        <div data-scope="list" data-part="description">
          {own.description}
        </div>
      </Show>
      {own.children}
    </div>
  );
}

export const List = Object.assign(Root, { Root, Item, Leading, Content, Actions });

injectComponentStyle("list");
