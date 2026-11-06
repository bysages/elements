import { useEffect, useState, type ComponentType, type ReactNode } from "react";
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

/** Wraps an Ark positioner without changing its anatomy contract. The
 * wrapper adds only the portal decision; with no `portal` the wrapped
 * part renders directly, so anatomy callers keep Ark's raw output. */
export function definePositioner<P extends object>(Positioner: ComponentType<P>) {
  function FloatingPositioner({ portal, ...rest }: FloatingPortalProps & P) {
    return (
      <FloatingPortal portal={portal}>
        <Positioner {...(rest as P)} />
      </FloatingPortal>
    );
  }

  FloatingPositioner.displayName = "SFloatingPositioner";

  return FloatingPositioner;
}
