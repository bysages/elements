import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes } from "react";

import { withSelfRoot } from "../../internal/family";
import { useComponentMessages } from "../../internal/messages";

export interface SpinnerProps extends HTMLAttributes<HTMLElement> {
  size?: "sm" | "md" | "lg";
}

/** A wheel of waiting: one arc of ink turning about its center. Quiet by
 * default — it reports progress without claiming attention. */
function SpinnerImpl({ size = "md", children, ...rest }: SpinnerProps) {
  injectComponentStyle("spinner");
  const messages = useComponentMessages();
  return (
    <span
      {...rest}
      role="status"
      aria-label={rest["aria-label"] ?? messages.spinner.loading}
      data-scope="spinner"
      data-part="root"
      data-size={size}
    >
      <svg viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx={12} cy={12} r={9} stroke="currentColor" strokeOpacity={0.2} strokeWidth={2.5} />
        <path
          d="M21 12a9 9 0 0 0-9-9"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
        />
      </svg>
      {children}
    </span>
  );
}

export const Spinner = withSelfRoot(SpinnerImpl);
