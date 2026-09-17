import { injectComponentStyle } from "@bysages/core";
import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

import { Button } from "../button";

export interface SuggestionProps extends Omit<JSX.HTMLAttributes<HTMLButtonElement>, "onSelect"> {
  /** The next stroke this seal proposes — also its label; handed
   * back whole on `onSelect`. */
  prompt: string;
  onSelect?: (prompt: string) => void;
}

/** A seal-cut button proposing the next stroke; selection hands back
 * the prompt. The shared Button in its outline register. */
export function Suggestion(props: SuggestionProps) {
  const [own, rest] = splitProps(props, ["prompt", "onSelect"]);
  return (
    <Button variant="outline" size="sm" {...rest} onClick={() => own.onSelect?.(own.prompt)}>
      {own.prompt}
    </Button>
  );
}

injectComponentStyle("ai");

export { Suggestion as AiSuggestion };
