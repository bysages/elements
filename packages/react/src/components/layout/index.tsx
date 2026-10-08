import { Splitter as ArkSplitter } from "@ark-ui/react/splitter";
import { injectComponentStyle } from "@bysages/core";
import type {
  ComponentProps,
  CSSProperties,
  Dispatch,
  HTMLAttributes,
  ReactNode,
  SetStateAction,
} from "react";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

import { useComponentMessages } from "../../internal/messages";

type SplitterRootProps = ComponentProps<typeof ArkSplitter.Root>;

/** Declare which edge the skeleton reserves for its sider — without
 * it the root is a single column. */
export interface LayoutRootProps extends HTMLAttributes<HTMLDivElement> {
  sider?: "start" | "end";
  children?: ReactNode;
}

/** Runtime settings the sider shares with its root so the split can be
 * driven by Ark while the public sizing props stay on `Layout.Sider`. */
export interface LayoutSiderState {
  resizable: boolean;
  collapsed: boolean;
  width: string;
  minWidth: string;
  maxWidth: string;
}

export interface LayoutResizeHandlers {
  start: () => void;
  resize: (width: number) => void;
  end: () => void;
}

export interface LayoutContextValue {
  siderPlacement: () => "start" | "end" | undefined;
  getSiderState: () => LayoutSiderState | null;
  setSiderState: Dispatch<SetStateAction<LayoutSiderState | null>>;
  setResizeHandlers: (handlers: LayoutResizeHandlers) => void;
  resizeStart: () => void;
  resize: (width: number) => void;
  resizeEnd: () => void;
}

const LAYOUT_CONTEXT = createContext<LayoutContextValue | null>(null);

/** One step of Ark's keyboard resize, converted to a splitter percentage
 * at render time so the public behavior remains a 16px move. */
const RESIZE_STEP = 16;

/**
 * The application skeleton: Root, Header, Sider, Content, Footer —
 * the admin arrangement dressed in the paper-and-ink surfaces. The
 * root is a full-height grid; a declared `sider` turns the columns
 * around to meet whichever edge the rail stands on.
 */
function Root({ sider, children, style, ...rest }: LayoutRootProps) {
  const [siderState, setSiderState] = useState<LayoutSiderState | null>(null);
  const [rootWidth, setRootWidth] = useState(0);
  const siderStateRef = useRef(siderState);
  const resizeHandlers = useRef<LayoutResizeHandlers>({
    start: () => {},
    resize: () => {},
    end: () => {},
  });
  siderStateRef.current = siderState;
  const splitterRoot = useRef<HTMLDivElement | null>(null);
  const splitterActive = !!sider;

  useEffect(() => {
    const element = splitterActive ? splitterRoot.current : null;
    if (!element || typeof ResizeObserver === "undefined") {
      if (!element) setRootWidth(0);
      else setRootWidth(element.getBoundingClientRect().width);
      return;
    }
    const observer = new ResizeObserver(() => {
      setRootWidth(element.getBoundingClientRect().width);
    });
    observer.observe(element);
    setRootWidth(element.getBoundingClientRect().width);
    return () => observer.disconnect();
  }, [splitterActive]);

  const context = useMemo<LayoutContextValue>(
    () => ({
      siderPlacement: () => sider,
      getSiderState: () => siderStateRef.current,
      setSiderState,
      setResizeHandlers: (handlers) => {
        resizeHandlers.current = handlers;
      },
      resizeStart: () => resizeHandlers.current.start(),
      resize: (width) => resizeHandlers.current.resize(width),
      resizeEnd: () => resizeHandlers.current.end(),
    }),
    [sider],
  );

  const keyboardResizeBy = rootWidth > 0 ? (RESIZE_STEP / rootWidth) * 100 : RESIZE_STEP;
  const panels = useMemo(() => {
    if (!siderState) return [];
    const rail = {
      id: "sider",
      minSize: siderState.minWidth,
      maxSize: siderState.maxWidth,
    };
    const flow = { id: "flow", minSize: "0px" };
    return sider === "end" ? [flow, rail] : [rail, flow];
  }, [sider, siderState]);
  const size = useMemo(
    () => (sider === "end" ? [undefined, siderState?.width] : [siderState?.width, undefined]),
    [sider, siderState?.width],
  ) as SplitterRootProps["size"];
  const siderIndex = sider === "end" ? 1 : 0;

  const callerStyle = style ?? {};
  const gridStyle: CSSProperties = {
    ...callerStyle,
    // Ark's root writes a flex container inline. The semantic layout grid
    // remains the rendered root; these three values restore it.
    display: callerStyle.display ?? "grid",
    width: callerStyle.width ?? "auto",
    height: callerStyle.height ?? "auto",
    overflow: callerStyle.overflow ?? "visible",
  };

  return (
    <LAYOUT_CONTEXT.Provider value={context}>
      {splitterActive ? (
        <ArkSplitter.Root
          ref={splitterRoot}
          asChild
          panels={panels}
          size={size}
          keyboardResizeBy={keyboardResizeBy}
          onResize={(details) => {
            const width = (rootWidth * (details.size[siderIndex] ?? 0)) / 100;
            if (width > 0) context.resize(width);
          }}
          onResizeStart={context.resizeStart}
          onResizeEnd={context.resizeEnd}
        >
          <div {...rest} style={gridStyle} data-scope="layout" data-part="root" data-sider={sider}>
            {children}
          </div>
        </ArkSplitter.Root>
      ) : (
        <div {...rest} style={gridStyle} data-scope="layout" data-part="root" data-sider={sider}>
          {children}
        </div>
      )}
    </LAYOUT_CONTEXT.Provider>
  );
}

/** A semantic block of the skeleton — header, footer, and the flow's
 * main content each land on their native element and their grid area. */
function region(name: string, tag: "header" | "main" | "footer") {
  const Tag = tag;
  const Component = ({ children, ...rest }: HTMLAttributes<HTMLElement>) => {
    const layout = useContext(LAYOUT_CONTEXT);
    const splitPanel =
      name === "Content" &&
      !!layout?.siderPlacement() &&
      !!layout.getSiderState()?.resizable &&
      !layout.getSiderState()!.collapsed;
    return (
      <Tag {...rest} data-scope="layout" data-part={name.toLowerCase()}>
        {splitPanel ? <ArkSplitter.Panel id="flow">{children}</ArkSplitter.Panel> : children}
      </Tag>
    );
  };
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
  /** Offer the Ark-powered hairline at the flow edge: the rail's width
   * follows the hand and keyboard, clamped by `minWidth`/`maxWidth`,
   * and every change rides `onWidthChange`. */
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
  const messages = useComponentMessages();
  const [dragging, setDragging] = useState(false);
  const active = resizable && !collapsed;

  useEffect(() => {
    if (!active) setDragging(false);
  }, [active]);

  // The rail's live width: a controlled prop when given, a local
  // mirror otherwise — Ark writes through both, and the stylesheet
  // clamps it between min and max.
  const [innerWidth, setInnerWidth] = useState(widthProp ?? "16rem");
  const width = widthProp !== undefined ? widthProp : innerWidth;

  useEffect(() => {
    layout?.setSiderState((previous) =>
      previous
        ? {
            ...previous,
            resizable,
            collapsed,
            width,
            minWidth,
            maxWidth,
          }
        : {
            resizable,
            collapsed,
            width,
            minWidth,
            maxWidth,
          },
    );
  }, [layout, resizable, collapsed, width, minWidth, maxWidth]);

  useEffect(() => () => layout?.setSiderState(null), [layout]);

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

  useEffect(() => {
    layout?.setResizeHandlers({
      start: () => setDragging(true),
      resize: (nextWidth) => {
        const next = `${Math.round(nextWidth)}px`;
        setInnerWidth(next);
        onWidthChange?.(next);
      },
      end: () => setDragging(false),
    });
    return () =>
      layout?.setResizeHandlers({
        start: () => {},
        resize: () => {},
        end: () => {},
      });
  }, [layout, onWidthChange]);

  const contents = typeof children === "function" ? children({ collapsed }) : children;
  const body = active ? (
    <ArkSplitter.Panel id="sider">
      {contents}
      <ArkSplitter.ResizeTrigger
        id={layout?.siderPlacement() === "end" ? "flow:sider" : "sider:flow"}
        aria-label={messages.sidebar.resize}
      />
    </ArkSplitter.Panel>
  ) : (
    contents
  );

  return (
    <aside
      {...rest}
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
      data-resizable={active ? "" : undefined}
    >
      {body}
    </aside>
  );
}

export const Layout = Object.assign(Root, {
  Root,
  Header,
  Sider,
  Content,
  Footer,
});

injectComponentStyle("layout");
