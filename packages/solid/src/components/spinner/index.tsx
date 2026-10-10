import { injectComponentStyle } from "@bysages/core/styling";
import { splitProps, type JSX } from "solid-js";

import { withSelfRoot } from "../../internal/family";
import { useComponentMessages } from "../config-provider/use-component-messages";

export interface SpinnerProps extends JSX.HTMLAttributes<HTMLElement> {
  size?: "sm" | "md" | "lg";
}

/** A wheel of waiting: one arc of ink turning about its center. Quiet by
 * default — it reports progress without claiming attention. */
export const Spinner = withSelfRoot(function Spinner(props: SpinnerProps) {
  injectComponentStyle("spinner");
  const [own, rest] = splitProps(props, ["size"]);
  const messages = useComponentMessages();
  return (
    <span
      {...rest}
      role="status"
      aria-label={rest["aria-label"] ?? messages().spinner.loading}
      data-scope="spinner"
      data-part="root"
      data-size={own.size ?? "md"}
    >
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle
          cx={12}
          cy={12}
          r={9}
          stroke="currentColor"
          stroke-opacity={0.2}
          stroke-width={2.5}
        />
        <path
          d="M21 12a9 9 0 0 0-9-9"
          stroke="currentColor"
          stroke-width={2.5}
          stroke-linecap="round"
        />
      </svg>
    </span>
  );
});
