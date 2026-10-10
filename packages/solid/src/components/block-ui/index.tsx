import { injectComponentStyle } from "@bysages/core/styling";
import { Show, splitProps, type JSX } from "solid-js";

import { withSelfRoot } from "../../internal/family";
import { Spinner } from "../spinner";

export interface BlockUIProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /** Whether the curtain is drawn. */
  blocked?: boolean;
  children?: JSX.Element;
}

/** A curtain over content that must wait: the blocked region keeps its
 * shape and dims under frosted paper while a quiet wheel reports the
 * wait. Callers own the state; the curtain only answers it. */
export const BlockUI = withSelfRoot(function BlockUI(props: BlockUIProps) {
  injectComponentStyle("block-ui");
  const [own, rest] = splitProps(props, ["blocked", "children"]);
  return (
    <div
      {...rest}
      data-scope="block-ui"
      data-part="root"
      data-blocked={own.blocked ? "" : undefined}
      aria-busy={own.blocked || undefined}
    >
      {own.children}
      <Show when={own.blocked}>
        <div data-scope="block-ui" data-part="mask">
          <Spinner size="lg" />
        </div>
      </Show>
    </div>
  );
});
