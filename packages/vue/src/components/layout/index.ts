import { injectComponentStyle } from "@bysages/core";
import type { CSSProperties, SetupContext, SlotsType } from "vue";
import { computed, defineComponent, h, inject, provide, ref, watch, type PropType } from "vue";

/**
 * The application skeleton: Root, Header, Sider, Content, Footer —
 * the admin arrangement dressed in the paper-and-ink surfaces. The
 * root is a full-height grid; a declared `sider` turns the columns
 * around to meet whichever edge the rail stands on.
 */
export interface LayoutRootProps {
  /** Declare which edge the skeleton reserves for its sider — without
   * it the root is a single column. */
  sider?: "start" | "end";
}

/** Which edge the enclosing root reserves for its rail — shared so the
 * sider's resize handle knows which way the hand pulls. */
export interface LayoutContext {
  siderPlacement: () => "start" | "end" | undefined;
}

const LAYOUT_CONTEXT = Symbol("layout-context");

const Root = defineComponent({
  name: "LayoutRoot",
  props: {
    sider: { type: String as PropType<"start" | "end">, default: undefined },
  },
  setup(props, ctx: SetupContext) {
    provide(LAYOUT_CONTEXT, { siderPlacement: () => props.sider } satisfies LayoutContext);
    return () =>
      h(
        "div",
        {
          ...ctx.attrs,
          "data-scope": "layout",
          "data-part": "root",
          "data-sider": props.sider,
        },
        () => ctx.slots.default?.(),
      );
  },
});

/** A semantic block of the skeleton — header, footer, and the flow's
 * main content each land on their native element and their grid area. */
function region(name: string, tag: string) {
  return defineComponent({
    name: "Layout" + name,
    setup(_props, ctx: SetupContext) {
      return () =>
        h(tag, { ...ctx.attrs, "data-scope": "layout", "data-part": name.toLowerCase() }, () =>
          ctx.slots.default?.(),
        );
    },
  });
}

const Header = region("Header", "header");
const Content = region("Content", "main");
const Footer = region("Footer", "footer");

export interface LayoutSiderProps {
  /** The caller drives the fold; the sider mirrors it and echoes every
   * change back for the `v-model:collapsed` contract. */
  collapsed?: boolean;
  /** The rail's resting inline size — a layout parameter, not a visual
   * token, so it rides an inline variable. */
  width?: string;
  /** The inline size when folded. */
  collapsedWidth?: string;
  /** Offer the hairline at the flow edge: the rail's width follows the
   * hand (and the arrow keys), clamped by `min-width`/`max-width`, and
   * every change rides `update:width`. */
  resizable?: boolean;
  /** The rail's narrowest inline size while resizing. */
  minWidth?: string;
  /** The rail's widest inline size while resizing. */
  maxWidth?: string;
}

/** One step of the arrow-key resize, in px. */
const RESIZE_STEP = 16;

const Sider = defineComponent({
  name: "LayoutSider",
  props: {
    collapsed: { type: Boolean, default: false },
    width: { type: String, default: "16rem" },
    collapsedWidth: { type: String, default: "3.5rem" },
    resizable: { type: Boolean, default: false },
    minWidth: { type: String, default: "12rem" },
    maxWidth: { type: String, default: "24rem" },
  },
  emits: {
    "update:collapsed": (_collapsed: boolean) => true,
    "update:width": (_width: string) => true,
  },
  setup(
    props,
    ctx: SetupContext<
      {
        "update:collapsed": (_collapsed: boolean) => true;
        "update:width": (_width: string) => true;
      },
      SlotsType<{ default?: (props: { collapsed: boolean }) => any }>
    >,
  ) {
    const collapsed = ref(props.collapsed);
    watch(
      () => props.collapsed,
      (next) => {
        if (next === collapsed.value) return;
        collapsed.value = next;
        ctx.emit("update:collapsed", next);
      },
    );

    // The rail's live width: a controlled prop when given, a local
    // mirror otherwise — the hand (drag, arrow keys) writes through
    // both, and the stylesheet clamps it between min and max.
    const innerWidth = ref(props.width);
    watch(
      () => props.width,
      (next) => {
        if (next === innerWidth.value) return;
        innerWidth.value = next;
        ctx.emit("update:width", next);
      },
    );
    const width = computed(() => (props.width !== undefined ? props.width : innerWidth.value));

    const rail = ref<HTMLElement | null>(null);
    const layout = inject<{ siderPlacement: () => "start" | "end" | undefined } | null>(
      LAYOUT_CONTEXT,
      null,
    );
    const dragging = ref(false);
    let startPointerX = 0;
    let startWidth = 0;

    const onPointerdown = (event: PointerEvent) => {
      dragging.value = true;
      startPointerX = event.clientX;
      startWidth = rail.value ? rail.value.getBoundingClientRect().width : 0;
      (event.currentTarget as Element).setPointerCapture(event.pointerId);
    };
    const onPointermove = (event: PointerEvent) => {
      if (!dragging.value) return;
      // Pulling toward the flow widens the rail; the side decides which
      // way that is.
      const towardFlow = (layout?.siderPlacement() ?? "start") === "end" ? -1 : 1;
      const next = Math.round(startWidth + towardFlow * (event.clientX - startPointerX));
      innerWidth.value = `${next}px`;
      ctx.emit("update:width", `${next}px`);
    };
    const onPointerup = (event: PointerEvent) => {
      dragging.value = false;
      (event.currentTarget as Element).releasePointerCapture(event.pointerId);
    };
    const onKeydown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const widen =
        (layout?.siderPlacement() ?? "start") === "end"
          ? event.key === "ArrowLeft"
          : event.key === "ArrowRight";
      const current = rail.value ? rail.value.getBoundingClientRect().width : 0;
      const next = Math.round(current + (widen ? RESIZE_STEP : -RESIZE_STEP));
      innerWidth.value = `${next}px`;
      ctx.emit("update:width", `${next}px`);
    };

    return () => {
      const { style, ...attrs } = ctx.attrs;
      const handle =
        props.resizable && !collapsed.value
          ? h("div", {
              "data-scope": "layout",
              "data-part": "sider-resize",
              "data-dragging": dragging.value ? "" : undefined,
              role: "separator",
              "aria-orientation": "vertical",
              tabindex: 0,
              "aria-label": "Resize sidebar",
              "aria-valuenow": Math.round(
                rail.value ? rail.value.getBoundingClientRect().width : 0,
              ),
              onPointerdown,
              onPointermove,
              onPointerup,
              onKeydown,
            })
          : null;
      return h(
        "aside",
        {
          ...attrs,
          ref: rail,
          style: [
            style as CSSProperties,
            {
              "--bs-layout-sider-width": collapsed.value ? props.collapsedWidth : width.value,
              // While folded the clamp collapses onto the folded size —
              // a 3.5rem rail must never be lifted to the 12rem floor.
              "--bs-layout-sider-min": collapsed.value ? props.collapsedWidth : props.minWidth,
              "--bs-layout-sider-max": collapsed.value ? props.collapsedWidth : props.maxWidth,
            },
          ],
          "data-scope": "layout",
          "data-part": "sider",
          "data-collapsed": collapsed.value ? "" : undefined,
          "data-dragging": dragging.value ? "" : undefined,
          "data-resizable": props.resizable ? "" : undefined,
        },
        // The default slot receives the fold state, so a rail can swap
        // its labels for icons instead of being clipped mid-word by the
        // narrowing edge.
        () => (ctx.slots.default?.({ collapsed: collapsed.value }) ?? []).concat(handle),
      );
    };
  },
});

export const Layout = Object.assign(Root, { Root, Header, Sider, Content, Footer });

injectComponentStyle("layout");
