import { injectComponentStyle } from "@bysages/core";

import CardRoot from "./Card.svelte";
import CardContent from "./CardContent.svelte";
import CardDescription from "./CardDescription.svelte";
import CardFooter from "./CardFooter.svelte";
import CardHeader from "./CardHeader.svelte";
import CardTitle from "./CardTitle.svelte";

/** A vessel: round, resting at the first elevation, one hairline for its
 * edge. Root, Header, Title, Description, Content, Footer — sections
 * carry their own whitespace, so any subset composes. */
export const Card = Object.assign(CardRoot, {
  Root: CardRoot,
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
});

export type { CardDescriptionProps, CardPartProps, CardProps, CardTitleProps } from "./props";

injectComponentStyle("card");
