import { injectComponentStyle } from "@bysages/core";
import type { CSSProperties, HTMLAttributes, KeyboardEvent, PointerEvent, ReactNode } from "react";
import { createContext, useContext, useEffect, useRef, useState } from "react";

/** Declare which edge the skeleton reserves for its sider — without
 * it the root is a single column. */
export interface LayoutRootProps extends HTMLAttributes<HTMLDivElement> {
  sider?: "start" | "end";
  children?: ReactNode;
}

/** Which edge the enclosing root reserves for its rail — shared so the
 * sider's resize handle knows which way the hand pulls. */
export interface LayoutContextValue {
  siderPlacement: () => "start" | "end" | undefined;
}

const LAYOUT_CONTEXT = createContext<LayoutContextValue | null>(null);

/**
 * The application skeleton: Root, Header, Sider, Content, Footer —
 * the admin arrangement dressed in the paper-and-ink surfaces. The
 * root is a full-height grid; a declared `sider` turns the columns
 * around to meet whichever edge the rail stands on.
 */
function Root({ sider, children, ...rest }: LayoutRootProps) {
  return (
    <LAYOUT_CONTEXT.Provider value={{ siderPlacement: () => sider }}>
      <div {...rest} data-scope="layout" data-part="root" data-sider={sider}>
        {children}
      </div>
    </LAYOUT_CONTEXT.Provider>
  );
}

/** A semantic block of the skeleton — header, footer, and the flow's
 * main content each land on their native element and their grid area. */
function region(name: string, tag: "header" | "main" | "footer") {
  const Tag = tag;
  const Component = ({ children, ...rest }: HTMLAttributes<HTMLElement>) => (
    <Tag {...rest} data-scope="layout" data-part={name.toLowerCase()}>
      {children}
    </Tag>
  );
  Component.displayName = "Layout" + name;
  return Component;
}

const Header = region("Header", "header");
const Content = region("Content", "main");
const Footer = region("Footer", "footer");

export interface LayoutSiderProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  /** The caller drives the fold; the sider mirrors it and echoes every
   * change back through `onCollapsedChange`. */
  collapsed?: boolean;
  /** The rail's resting inline size — a layout parameter, not a visual
   * token, so it rides an inline variable. */
  width?: string;
  /** The inline size when folded. */
  collapsedWidth?: string;
  /** Offer the hairline at the flow edge: the rail's width follows the
   * hand (and the arrow keys), clamped by `minWidth`/`maxWidth`, and
   * every change rides `onWidthChange`. */
  resizable?: boolean;
  /** The rail's narrowest inline size while resizing. */
  minWidth?: string;
  /** The rail's widest inline size while resizing. */
  maxWidth?: string;
  onCollapsedChange?: (collapsed: boolean) => void;
  onWidthChange?: (width: string) => void;
  /** The rail's contents; a function receives `{ collapsed }` so a
   * caller can swap label content while the edge moves. */
  children?: ReactNode | ((state: { collapsed: boolean }) => ReactNode);
}

/** One step of the arrow-key resize, in px. */
const RESIZE_STEP = 16;

function Sider({
  collapsed = false,
  width: widthProp,
  collapsedWidth = "3.5rem",
  resizable = false,
  minWidth = "12rem",
  maxWidth = "24rem",
  style,
  onCollapsedChange,
  onWidthChange,
  children,
  ...rest
}: LayoutSiderProps) {
  const layout = useContext(LAYOUT_CONTEXT);
  const rail = useRef<HTMLElement | null>(null);
  const [dragging, setDragging] = useState(false);
  // The rail's live width: a controlled prop when given, a local
  // mirror otherwise — the hand (drag, arrow keys) writes through
  // both, and the stylesheet clamps it between min and max.
  const [innerWidth, setInnerWidth] = useState(widthProp ?? "16rem");
  const width = widthProp !== undefined ? widthProp : innerWidth;

  // Echoes for the `v-model` contract: a caller-driven change rides
  // back once, so plain prop writes still reach every listener.
  const prevCollapsed = useRef(collapsed);
  useEffect(() => {
    if (prevCollapsed.current === collapsed) return;
    prevCollapsed.current = collapsed;
    onCollapsedChange?.(collapsed);
  }, [collapsed, onCollapsedChange]);

  const innerWidthRef = useRef(innerWidth);
  innerWidthRef.current = innerWidth;
  useEffect(() => {
    if (widthProp === undefined || widthProp === innerWidthRef.current) return;
    setInnerWidth(widthProp);
    onWidthChange?.(widthProp);
  }, [widthProp, onWidthChange]);

  const applyWidth = (next: string) => {
    setInnerWidth(next);
    onWidthChange?.(next);
  };

  const dragStart = useRef({ x: 0, width: 0 });

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    setDragging(true);
    dragStart.current = {
      x: event.clientX,
      width: rail.current ? rail.current.getBoundingClientRect().width : 0,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    // Pulling toward the flow widens the rail; the side decides which
    // way that is.
    const towardFlow = (layout?.siderPlacement() ?? "start") === "end" ? -1 : 1;
    applyWidth(
      `${Math.round(dragStart.current.width + towardFlow * (event.clientX - dragStart.current.x))}px`,
    );
  };
  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    setDragging(false);
    event.currentTarget.releasePointerCapture(event.pointerId);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const widen =
      (layout?.siderPlacement() ?? "start") === "end"
        ? event.key === "ArrowLeft"
        : event.key === "ArrowRight";
    const current = rail.current ? rail.current.getBoundingClientRect().width : 0;
    applyWidth(`${Math.round(current + (widen ? RESIZE_STEP : -RESIZE_STEP))}px`);
  };

  const handle =
    resizable && !collapsed ? (
      <div
        data-scope="layout"
        data-part="sider-resize"
        data-dragging={dragging ? "" : undefined}
        role="separator"
        aria-orientation="vertical"
        tabIndex={0}
        aria-label="Resize sidebar"
        aria-valuenow={Math.round(rail.current ? rail.current.getBoundingClientRect().width : 0)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onKeyDown={onKeyDown}
      />
    ) : null;

  return (
    <aside
      {...rest}
      ref={rail}
      style={
        {
          ...style,
          "--bs-layout-sider-width": collapsed ? collapsedWidth : width,
          // While folded the clamp collapses onto the folded size —
          // a 3.5rem rail must never be lifted to the 12rem floor.
          "--bs-layout-sider-min": collapsed ? collapsedWidth : minWidth,
          "--bs-layout-sider-max": collapsed ? collapsedWidth : maxWidth,
        } as CSSProperties
      }
      data-scope="layout"
      data-part="sider"
      data-collapsed={collapsed ? "" : undefined}
      data-dragging={dragging ? "" : undefined}
      data-resizable={resizable ? "" : undefined}
    >
      {/* The contents ride the fold, so a rail can swap its labels for
          icons instead of being clipped mid-word by the narrowing
          edge. */}
      {typeof children === "function" ? children({ collapsed }) : children}
      {handle}
    </aside>
  );
}

export const Layout = Object.assign(Root, { Root, Header, Sider, Content, Footer });

injectComponentStyle("layout");
