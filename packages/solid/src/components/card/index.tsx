import { injectComponentStyle } from "@bysages/core";
import type { Component, JSX } from "solid-js";

/** A vessel: round, resting at the first elevation, one hairline for its
 * edge. Root, Header, Title, Description, Content, Footer — sections
 * carry their own whitespace, so any subset composes. */
function part<P extends Record<string, unknown>>(name: string, tag: string): Component<P> {
  return ((props: P) => {
    const Tag = tag as "section";
    return (
      <Tag {...(props as JSX.HTMLAttributes<HTMLElement>)} data-scope="card" data-part={name.toLowerCase()} />
    );
  }) as Component<P>;
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
