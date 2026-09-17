import { getContext, setContext } from "svelte";

/** Which edge the enclosing root reserves for its rail — shared so the
 * sider's resize handle knows which way the hand pulls. */
export interface LayoutContext {
  siderPlacement: () => "start" | "end" | undefined;
}

export const LAYOUT_KEY: unique symbol = Symbol("bysages-layout");

export function provideLayout(context: LayoutContext): LayoutContext {
  setContext(LAYOUT_KEY, context);
  return context;
}

export function useLayout(): LayoutContext | null {
  return getContext<LayoutContext | null>(LAYOUT_KEY) ?? null;
}
