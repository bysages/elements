import { injectComponentStyle } from "@bysages/core";
import { type HTMLAttributes, type ReactNode, useEffect, useRef, useState } from "react";

import { withSelfRoot } from "../../internal/family";

export interface DeferredContentProps extends HTMLAttributes<HTMLDivElement> {
  /** How much of the placeholder must be visible before the content
   * mounts, from 0 (any pixel) to 1 (the whole box). */
  threshold?: number;
  /** Drawn until the box approaches the viewport. */
  placeholder?: ReactNode;
  children?: ReactNode;
}

/** Content that waits to be worth rendering: the slot stays off the
 * tree until the placeholder scrolls near the viewport, then mounts
 * once and stays. The placeholder is drawn by the caller, so the late
 * arrival costs no layout shift it cannot predict. */
function DeferredContentImpl({
  threshold = 0.2,
  placeholder,
  children,
  ...rest
}: DeferredContentProps) {
  injectComponentStyle("deferred-content");
  const host = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const node = host.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);
  return (
    <div ref={host} {...rest} data-scope="deferred-content" data-part="root">
      {active ? children : placeholder}
    </div>
  );
}

export const DeferredContent = withSelfRoot(DeferredContentImpl);
