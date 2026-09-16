import { injectComponentStyle } from "@bysages/core";
import type { JSX } from "solid-js";

/** The page's face: an eyebrow whisper, a serif title, one line of
 * description, and the actions resting beside the title on the same
 * baseline. Heading groups title and actions; the rest compose below. */
function part(name: string, tag: string, extra: Record<string, string> = {}) {
  function Component(props: JSX.HTMLAttributes<HTMLElement>) {
    const Tag = tag as "header";
    return (
      <Tag
        {...(extra as JSX.HTMLAttributes<HTMLElement>)}
        {...props}
        data-scope="page-header"
        data-part={name.toLowerCase()}
      />
    );
  }
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
