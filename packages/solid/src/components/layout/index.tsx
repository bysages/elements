import { injectComponentStyle } from "@bysages/core";
import { createContext, createEffect, createSignal, useContext, splitProps } from "solid-js";
import type { JSX } from "solid-js";

export interface LayoutRootProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /** Declare which edge the skeleton reserves for its sider — without
   * it the root is a single column. */
  sider?: "start" | "end";
}

/** Which edge the enclosing root reserves for its rail — shared so the
 * sider's resize handle knows which way the hand pulls. */
export interface LayoutContextValue {
  siderPlacement: () => "start" | "end" | undefined;
}

const LayoutContext = createContext<LayoutContextValue>();

/**
 * The application skeleton: Root, Header, Sider, Content, Footer —
 * the admin arrangement (Element Plus / AntD keep the same anatomy)
 * dressed in the paper-and-ink surfaces. The root is a full-height
 * grid; a declared `sider` turns the columns around to meet whichever
 * edge the rail stands on.
 */
function LayoutRoot(props: LayoutRootProps) {
  const [own, rest] = splitProps(props, ["sider"]);
  return (
    <LayoutContext.Provider value={{ siderPlacement: () => own.sider }}>
      <div {...rest} data-scope="layout" data-part="root" data-sider={own.sider} />
    </LayoutContext.Provider>
  );
}

// A semantic block of the skeleton — header, footer, and the flow's
// main content each land on their native element and their grid area.
function LayoutHeader(props: JSX.HTMLAttributes<HTMLElement>) {
  return <header {...props} data-scope="layout" data-part="header" />;
}

function LayoutContent(props: JSX.HTMLAttributes<HTMLElement>) {
  return <main {...props} data-scope="layout" data-part="content" />;
}

function LayoutFooter(props: JSX.HTMLAttributes<HTMLElement>) {
  return <footer {...props} data-scope="layout" data-part="footer" />;
}

export interface LayoutSiderProps extends Omit<JSX.HTMLAttributes<HTMLElement>, "children"> {
  /** The caller drives the fold; the sider mirrors it and echoes every
   * change back through `onCollapsedChange`. */
  collapsed?: boolean;
  /** The rail's resting inline size — a layout parameter, not a visual
   * token, so it rides an inline variable. */
  width?: string;
  /** The inline size when folded. */
  collapsedWidth?: string;
  /** Offer the hairline at the flow edge: the rail's width follows the
   * hand (and the arrow keys), clamped by `min-width`/`max-width`, and
   * every change rides `onWidthChange`. */
  resizable?: boolean;
  /** The rail's narrowest inline size while resizing. */
  minWidth?: string;
  /** The rail's widest inline size while resizing. */
  maxWidth?: string;
  /** The fold flipped. */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** The rail's inline size changed — the hand, the arrow keys, or the
   * caller's own width prop moving. */
  onWidthChange?: (width: string) => void;
  /** The children, or a function of the fold state — a rail can swap
   * its labels for icons instead of being clipped mid-word by the
   * narrowing edge. */
  children?: JSX.Element | ((state: { collapsed: boolean }) => JSX.Element);
}

/** One step of the arrow-key resize, in px. */
const RESIZE_STEP = 16;

function LayoutSider(props: LayoutSiderProps) {
  const [own, rest] = splitProps(props, [
    "collapsed",
    "width",
    "collapsedWidth",
    "resizable",
    "minWidth",
    "maxWidth",
    "onCollapsedChange",
    "onWidthChange",
    "style",
    "children",
  ]);

  const collapsed = () => own.collapsed ?? false;

  // The rail's live width: a controlled prop when given, a local
  // mirror otherwise — the hand (drag, arrow keys) writes through both,
  // and the stylesheet clamps it between min and max.
  const [innerWidth, setInnerWidth] = createSignal(own.width ?? "16rem");
  const width = () => own.width ?? innerWidth();

  // An incoming width the mirror doesn't hold yet rides back out, the
  // way a two-way binding echoes — the guard swallows the parent's
  // echo of our own drag and keystroke writes.
  createEffect(() => {
    const next = own.width;
    if (next === undefined || next === innerWidth()) return;
    setInnerWidth(next);
    own.onWidthChange?.(next);
  });
  let prevCollapsed = collapsed();
  createEffect(() => {
    const next = collapsed();
    if (next === prevCollapsed) return;
    prevCollapsed = next;
    own.onCollapsedChange?.(next);
  });

  const layout = useContext(LayoutContext);
  const [dragging, setDragging] = createSignal(false);
  let rail: HTMLElement | undefined;
  let startPointerX = 0;
  let startWidth = 0;

  const railWidth = () => (rail ? Math.round(rail.getBoundingClientRect().width) : 0);

  const onPointerDown = (event: PointerEvent & { currentTarget: HTMLElement }) => {
    setDragging(true);
    startPointerX = event.clientX;
    startWidth = railWidth();
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event: PointerEvent) => {
    if (!dragging()) return;
    // Pulling toward the flow widens the rail; the side decides which
    // way that is.
    const towardFlow = (layout?.siderPlacement() ?? "start") === "end" ? -1 : 1;
    const next = Math.round(startWidth + towardFlow * (event.clientX - startPointerX));
    setInnerWidth(`${next}px`);
    own.onWidthChange?.(`${next}px`);
  };
  const onPointerUp = (event: PointerEvent & { currentTarget: HTMLElement }) => {
    setDragging(false);
    event.currentTarget.releasePointerCapture(event.pointerId);
  };
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const widen =
      (layout?.siderPlacement() ?? "start") === "end"
        ? event.key === "ArrowLeft"
        : event.key === "ArrowRight";
    const next = railWidth() + (widen ? RESIZE_STEP : -RESIZE_STEP);
    setInnerWidth(`${next}px`);
    own.onWidthChange?.(`${next}px`);
  };

  const handle = () =>
    own.resizable && !collapsed() ? (
      <div
        data-scope="layout"
        data-part="sider-resize"
        data-dragging={dragging() ? "" : undefined}
        role="separator"
        aria-orientation="vertical"
        tabindex={0}
        aria-label="Resize sidebar"
        aria-valuenow={railWidth()}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onKeyDown={onKeyDown}
      />
    ) : null;

  const foldedWidth = () => own.collapsedWidth ?? "3.5rem";

  return (
    <aside
      {...rest}
      ref={(el) => (rail = el)}
      style={{
        ...(typeof own.style === "object" ? own.style : {}),
        "--bs-layout-sider-width": collapsed() ? foldedWidth() : width(),
        // While folded the clamp collapses onto the folded size —
        // a 3.5rem rail must never be lifted to the 12rem floor.
        "--bs-layout-sider-min": collapsed() ? foldedWidth() : (own.minWidth ?? "12rem"),
        "--bs-layout-sider-max": collapsed() ? foldedWidth() : (own.maxWidth ?? "24rem"),
      }}
      data-scope="layout"
      data-part="sider"
      data-collapsed={collapsed() ? "" : undefined}
      data-dragging={dragging() ? "" : undefined}
      data-resizable={own.resizable ? "" : undefined}
    >
      {typeof own.children === "function" ? own.children({ collapsed: collapsed() }) : own.children}
      {handle()}
    </aside>
  );
}

export const Layout = Object.assign(LayoutRoot, {
  Root: LayoutRoot,
  Header: LayoutHeader,
  Sider: LayoutSider,
  Content: LayoutContent,
  Footer: LayoutFooter,
});

injectComponentStyle("layout");
