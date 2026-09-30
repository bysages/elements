import { injectComponentStyle } from "@bysages/core";
import { Show, createSignal, onCleanup, onMount, splitProps, type JSX } from "solid-js";

export interface DeferredContentProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /** How much of the placeholder must be visible before the content
   * mounts, from 0 (any pixel) to 1 (the whole box). */
  threshold?: number;
  /** Drawn until the box approaches the viewport. */
  placeholder?: JSX.Element;
  children?: JSX.Element;
}

/** Content that waits to be worth rendering: the slot stays off the
 * tree until the placeholder scrolls near the viewport, then mounts
 * once and stays. The placeholder is drawn by the caller, so the late
 * arrival costs no layout shift it cannot predict. */
export function DeferredContent(props: DeferredContentProps) {
  injectComponentStyle("deferred-content");
  const [own, rest] = splitProps(props, ["threshold", "placeholder", "children"]);
  const [host, setHost] = createSignal<HTMLDivElement | null>(null);
  const [active, setActive] = createSignal(false);
  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: own.threshold ?? 0.2 },
    );
    const node = host();
    if (node) observer.observe(node);
    onCleanup(() => observer.disconnect());
  });
  return (
    <div ref={setHost} {...rest} data-scope="deferred-content" data-part="root">
      <Show when={active()} fallback={own.placeholder}>
        {own.children}
      </Show>
    </div>
  );
}
