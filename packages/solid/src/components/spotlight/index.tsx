import { injectComponentStyle } from "@bysages/core";
import type { JSX } from "solid-js";
import { splitProps } from "solid-js";

import { withSelfRoot } from "../../internal/family";

export interface SpotlightProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /** How far the lamp throws before the ink swallows it. */
  radius?: string;
}

/** The ink-light card: a vessel whose rim and face take light from the
 * reader's hand. The wrapper only measures and writes the geometry —
 * the lamp itself is the two layers the stylesheet paints. */
export const Spotlight = withSelfRoot(function Spotlight(props: SpotlightProps) {
  injectComponentStyle("spotlight");

  const [own, rest] = splitProps(props, ["radius"]);

  const track = (event: PointerEvent) => {
    const host = event.currentTarget as HTMLElement;
    const rect = host.getBoundingClientRect();
    host.style.setProperty("--bs-spot-x", `${event.clientX - rect.left}px`);
    host.style.setProperty("--bs-spot-y", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      {...rest}
      data-scope="spotlight"
      data-part="root"
      style={{ "--bs-spot-radius": own.radius }}
      onPointerMove={track}
      onPointerEnter={(event: PointerEvent) => {
        track(event);
        (event.currentTarget as HTMLElement).setAttribute("data-hovered", "");
      }}
      onPointerLeave={(event: PointerEvent) =>
        (event.currentTarget as HTMLElement).removeAttribute("data-hovered")
      }
    >
      {props.children}
    </div>
  );
});
