import type { JSX } from "solid-js";
import { spread } from "solid-js/web";

/** Detect a host element without assuming one exists during SSR. */
export function isElement(value: unknown): value is Element {
  return typeof Element !== "undefined" && value instanceof Element;
}

/** Graft machine props onto a caller-owned Solid element. Solid elements
 * are concrete nodes rather than cloneable vnodes, so this uses the same
 * runtime spread that JSX spread compiles to.
 */
export function withElementProps(element: Element, props: JSX.HTMLAttributes<any>): JSX.Element {
  spread(element, props, element instanceof SVGElement, true);
  return element as JSX.Element;
}
