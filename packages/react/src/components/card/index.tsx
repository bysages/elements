import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes } from "react";

/** A vessel: round, resting at the first elevation, one hairline for its
 * edge. Root, Header, Title, Description, Content, Footer — sections
 * carry their own whitespace, so any subset composes. */
function part(name: string, tag: string) {
  const Tag = tag as "section";
  const Component = ({ children, ...rest }: HTMLAttributes<HTMLElement>) => (
    <Tag {...rest} data-scope="card" data-part={name.toLowerCase()}>
      {children}
    </Tag>
  );
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
