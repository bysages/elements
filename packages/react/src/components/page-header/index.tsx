import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes } from "react";

/** The page's face: an eyebrow whisper, a serif title, one line of
 * description, and the actions resting beside the title on the same
 * baseline. Heading groups title and actions; the rest compose below. */
function part(name: string, tag: string) {
  const Tag = tag as "header";
  const Component = ({ children, ...rest }: HTMLAttributes<HTMLElement>) => (
    <Tag {...rest} data-scope="page-header" data-part={name.toLowerCase()}>
      {children}
    </Tag>
  );
  Component.displayName = "PageHeader" + name;
  return Component;
}

const Root = part("Root", "header");
const Heading = part("Heading", "div");
const Eyebrow = part("Eyebrow", "p");
const Title = part("Title", "h1");
const Description = part("Description", "p");
const Actions = part("Actions", "div");

export const PageHeader = Object.assign(Root, {
  Root,
  Heading,
  Eyebrow,
  Title,
  Description,
  Actions,
});

injectComponentStyle("page-header");
