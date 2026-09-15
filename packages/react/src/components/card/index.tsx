import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes, ReactElement } from "react";
import { Children, cloneElement, isValidElement } from "react";

/** A vessel: round, resting at the first elevation, one hairline for its
 * edge. Root, Header, Title, Description, Content, Footer — sections
 * carry their own whitespace, so any subset composes. */
function part(name: string, tag: string) {
  const Tag = tag as "section";
  const Component = ({
    asChild,
    children,
    ...rest
  }: HTMLAttributes<HTMLElement> & { asChild?: boolean }) => {
    const partProps = { ...rest, "data-scope": "card", "data-part": name.toLowerCase() };
    if (asChild) {
      const child = Children.only(children);
      return isValidElement(child)
        ? cloneElement(child as ReactElement<Record<string, unknown>>, partProps)
        : null;
    }
    return <Tag {...partProps}>{children}</Tag>;
  };
  Component.displayName = "Card" + name;
  return Component;
}

const Root = part("Root", "section");
const Header = part("Header", "header");
const Title = part("Title", "h3");
const Description = part("Description", "p");
const Content = part("Content", "div");
const Footer = part("Footer", "footer");

export const Card = Object.assign(Root, {
  Root,
  Header,
  Title,
  Description,
  Content,
  Footer,
});

injectComponentStyle("card");
