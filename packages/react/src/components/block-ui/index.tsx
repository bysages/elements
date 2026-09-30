import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes, ReactNode } from "react";

import { Spinner } from "../spinner";

export interface BlockUIProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether the curtain is drawn. */
  blocked?: boolean;
  children?: ReactNode;
}

/** A curtain over content that must wait: the blocked region keeps its
 * shape and dims under frosted paper while a quiet wheel reports the
 * wait. Callers own the state; the curtain only answers it. */
export function BlockUI({ blocked = false, children, ...rest }: BlockUIProps) {
  injectComponentStyle("block-ui");
  return (
    <div
      {...rest}
      data-scope="block-ui"
      data-part="root"
      data-blocked={blocked ? "" : undefined}
      aria-busy={blocked || undefined}
    >
      {children}
      {blocked ? (
        <div data-scope="block-ui" data-part="mask">
          <Spinner size="lg" />
        </div>
      ) : null}
    </div>
  );
}
