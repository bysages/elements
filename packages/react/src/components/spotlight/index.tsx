import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes, ReactNode } from "react";

import { withSelfRoot } from "../../internal/family";

export interface SpotlightProps extends HTMLAttributes<HTMLDivElement> {
  /** How far the lamp throws before the ink swallows it. */
  radius?: string;
  children?: ReactNode;
}

/** The ink-light card: a vessel whose rim and face take light from the
 * reader's hand. The wrapper only measures and writes the geometry —
 * the lamp itself is the two layers the stylesheet paints. */
function SpotlightImpl({ radius, children, ...rest }: SpotlightProps) {
  injectComponentStyle("spotlight");

  const track = (event: React.PointerEvent<HTMLDivElement>) => {
    const host = event.currentTarget;
    const rect = host.getBoundingClientRect();
    host.style.setProperty("--bs-spot-x", `${event.clientX - rect.left}px`);
    host.style.setProperty("--bs-spot-y", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      {...rest}
      data-scope="spotlight"
      data-part="root"
      style={{ ...rest.style, "--bs-spot-radius": radius } as React.CSSProperties}
      onPointerMove={track}
      onPointerEnter={(event) => {
        track(event);
        event.currentTarget.setAttribute("data-hovered", "");
      }}
      onPointerLeave={(event) => event.currentTarget.removeAttribute("data-hovered")}
    >
      {children}
    </div>
  );
}

export const Spotlight = withSelfRoot(SpotlightImpl);
