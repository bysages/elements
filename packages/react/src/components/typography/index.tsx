import { injectComponentStyle } from "@bysages/core/styling";
import type { ElementType, HTMLAttributes } from "react";

/** The typographic voices, named so prose can ask for one: display and
 * heading ride the song-serif, the rest ride the hei. Nothing here is
 * decorative — hierarchy is size, weight, and space. */
function part(name: string, tag: string) {
  const Tag = tag as "p";
  const Component = ({ children, ...rest }: HTMLAttributes<HTMLElement>) => (
    <Tag {...rest} data-scope="typography" data-part={name.toLowerCase()}>
      {children}
    </Tag>
  );
  Component.displayName = "Typography" + name;
  return Component;
}

const Display = part("Display", "p");

export type TypographyHeadingSize = "sm" | "md" | "lg" | "xl" | "display";

interface HeadingProps extends HTMLAttributes<HTMLElement> {
  size?: TypographyHeadingSize;
  as?: ElementType;
}

function Heading({ size, as = "p", children, ...rest }: HeadingProps) {
  const Tag = as;
  return (
    <Tag {...rest} data-scope="typography" data-part="heading" data-size={size}>
      {children}
    </Tag>
  );
}

const Lead = part("Lead", "p");
const Body = part("Body", "p");
const Muted = part("Muted", "p");
const Label = part("Label", "p");

export const Typography = Object.assign(Display, {
  Root: Display,
  Display,
  Heading,
  Lead,
  Body,
  Muted,
  Label,
});

injectComponentStyle("typography");
