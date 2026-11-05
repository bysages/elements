import {
  Show,
  createSignal,
  onCleanup,
  onMount,
  splitProps,
  type Component,
  type JSX,
} from "solid-js";

export type FloatingPortalTarget = boolean | string;

export interface FloatingPortalProps {
  /** `false` or `undefined` keeps the raw part inline; truthy portals it. */
  portal?: FloatingPortalTarget;
  children: JSX.Element;
}

/** Moves a hydration-rendered subtree without remounting it. The wrapper
 * stays inline through SSR and first hydration, then its children move to
 * the target; `false` and `undefined` render the raw children directly. */
export function FloatingPortal(props: FloatingPortalProps) {
  const [inline, setInline] = createSignal<HTMLDivElement | null>(null);
  let moved: ChildNode[] = [];

  onMount(() => {
    if (props.portal === undefined || props.portal === false) return;
    const target =
      props.portal === true
        ? document.body
        : (document.querySelector(props.portal) as HTMLElement | null);
    if (!(target instanceof HTMLElement) || !inline()) return;

    moved = [...inline()!.childNodes];
    target.append(...moved);
    inline()!.remove();
    onCleanup(() => {
      for (const node of moved) node.parentNode?.removeChild(node);
      moved = [];
    });
  });

  return (
    <Show when={props.portal} fallback={props.children}>
      <div ref={setInline} style="display:contents">
        {props.children}
      </div>
    </Show>
  );
}

/** Wraps an Ark positioner without changing its anatomy contract. The
 * wrapper adds only the portal decision; with no `portal` the wrapped
 * part renders directly, so anatomy callers keep Ark's raw output. */
export function definePositioner<Props extends object>(Positioner: Component<Props>) {
  function FloatingPositioner(props: Props & FloatingPortalProps) {
    const [own, rest] = splitProps(props, ["portal"]);
    return (
      <FloatingPortal portal={own.portal}>
        <Positioner {...(rest as Props)} />
      </FloatingPortal>
    );
  }
  return FloatingPositioner;
}
