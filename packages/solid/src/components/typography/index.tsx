import { injectComponentStyle } from "@bysages/core/styling";
import { splitProps, type JSX } from "solid-js";
import { Dynamic } from "solid-js/web";

/** The typographic voices, named so prose can ask for one: display and
 * heading ride the song-serif, the rest ride the hei. Nothing here is
 * decorative — hierarchy is size, weight, and space. */
function part(name: string, tag: string) {
  function Component(props: JSX.HTMLAttributes<HTMLParagraphElement>) {
    const Tag = tag as "p";
    return <Tag {...props} data-scope="typography" data-part={name.toLowerCase()} />;
  }
  return Component;
}

export type TypographyHeadingSize = "sm" | "md" | "lg" | "xl" | "display";

export interface TypographyHeadingProps extends JSX.HTMLAttributes<HTMLHeadingElement> {
  /** One rung of the heading token ladder. */
  size?: TypographyHeadingSize;
  /** The document's own semantic heading, independent of visual size. */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

function Heading(props: TypographyHeadingProps) {
  const [own, rest] = splitProps(props, ["as", "size", "children"]);
  const Tag = (own.as ?? "p") as "p";
  return (
    <Dynamic
      component={Tag}
      {...rest}
      data-scope="typography"
      data-part="heading"
      data-size={own.size}
    >
      {own.children}
    </Dynamic>
  );
}

const Display = part("Display", "p");
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
