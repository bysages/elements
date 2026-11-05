import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

export type FloatingPortalTarget = boolean | string;

export interface FloatingPortalProps {
  portal?: FloatingPortalTarget;
  children?: ReactNode;
}

function targetFor(portal: FloatingPortalTarget | undefined) {
  if (portal === undefined || portal === false) return null;
  return portal === true ? document.body : document.querySelector<HTMLElement>(portal);
}

/** Mount floating markup inline through SSR and hydration, then move it
 * only after the client owns the tree. A missing selector stays inline
 * rather than discarding the vessel. */
export function FloatingPortal({ portal, children }: FloatingPortalProps) {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const next = targetFor(portal);
    setTarget(next);
  }, [portal]);

  return target ? createPortal(children, target) : <>{children}</>;
}
