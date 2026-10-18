import { injectComponentStyle } from "@bysages/core/styling";
import { For, Show, mergeProps, splitProps } from "solid-js";
import type { Component, JSX } from "solid-js";

import { useComponentMessages } from "../config-provider/use-component-messages";

/** A trail of waymarks: Root wraps the nav, List the ordered trail, and
 * each Item carries a Link — or the Current page — parted by a quiet
 * Separator. Links take href and the rest through attributes. */
type PartExtra =
  | Record<string, string>
  | ((messages: { breadcrumb: { label: string } }) => Record<string, string>);

function part<P extends Record<string, unknown>>(
  name: string,
  tag: string,
  extra: PartExtra = {},
): Component<P> {
  return ((props: P) => {
    const messages = useComponentMessages();
    const partExtra = typeof extra === "function" ? extra(messages()) : extra;
    const Tag = tag as "nav";
    return (
      <Tag
        {...partExtra}
        {...(props as JSX.HTMLAttributes<HTMLElement>)}
        data-scope="breadcrumb"
        data-part={name.toLowerCase()}
      />
    );
  }) as Component<P>;
}

const Root = part("Root", "nav", (messages) => ({ "aria-label": messages.breadcrumb.label }));
const List = part("List", "ol");
const Item = part("Item", "li");
const Link = part("Link", "a");
const Current = part("Current", "span", { "aria-current": "page" });

// The quiet slash between waymarks, present when the reader passes no
// mark of their own. The default rides beneath the spread, so given
// children win.
const Separator: Component<JSX.HTMLAttributes<HTMLSpanElement>> = (props) => (
  <span
    {...mergeProps({ children: "/" as JSX.Element }, props)}
    aria-hidden="true"
    data-scope="breadcrumb"
    data-part="separator"
  />
);

export type BreadcrumbItem = string | { label: string; href?: string };

export interface BreadcrumbFacadeProps extends Omit<JSX.HTMLAttributes<HTMLElement>, "children"> {
  /** The waymarks, in walking order. */
  items: BreadcrumbItem[];
  /** The trail's name, when the default is not enough. */
  label?: string;
}

/** The shorthand: the whole trail from plain labels and destinations,
 * with the last waymark set down as the current page. */
function BreadcrumbFacade(props: BreadcrumbFacadeProps) {
  const [own, rest] = splitProps(props, ["items", "label"]);
  return (
    <Root {...rest} {...(own.label ? { "aria-label": own.label } : {})}>
      <List>
        <For each={own.items}>
          {(item, index) => {
            const entry = typeof item === "string" ? { label: item } : item;
            const current = () => index() === own.items.length - 1;
            return (
              <>
                <Item>
                  <Show when={!current()} fallback={<Current>{entry.label}</Current>}>
                    <Link href={entry.href}>{entry.label}</Link>
                  </Show>
                </Item>
                <Show when={!current()}>
                  <Separator />
                </Show>
              </>
            );
          }}
        </For>
      </List>
    </Root>
  );
}

export const Breadcrumb = Object.assign(BreadcrumbFacade, {
  Root,
  List,
  Item,
  Link,
  Current,
  Separator,
});

injectComponentStyle("breadcrumb");
