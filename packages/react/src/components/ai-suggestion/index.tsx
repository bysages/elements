import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes } from "react";

import { Button } from "../button";

/** A seal-cut button proposing the next stroke; selection hands back
 * the prompt. The shared Button in its outline register. */
export interface SuggestionProps extends Omit<HTMLAttributes<HTMLButtonElement>, "onSelect"> {
  /** The next stroke this seal proposes — also its label; handed back
   * whole on `onSelect`. */
  prompt: string;
  onSelect?: (prompt: string) => void;
}

export function Suggestion({ prompt, onSelect, ...rest }: SuggestionProps) {
  return (
    <Button variant="outline" size="sm" {...rest} onClick={() => onSelect?.(prompt)}>
      {prompt}
    </Button>
  );
}

injectComponentStyle("ai");

export { Suggestion as AiSuggestion };
