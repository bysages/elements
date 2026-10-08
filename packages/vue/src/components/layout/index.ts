import { Splitter as ArkSplitter } from "@ark-ui/vue/splitter";
import { injectComponentStyle } from "@bysages/core";
import type { CSSProperties, SetupContext, SlotsType } from "vue";
import {
  computed,
  defineComponent,
  h,
  inject,
  onMounted,
  onScopeDispose,
  provide,
  reactive,
  ref,
  watch,
  watchEffect,
  type ComponentPublicInstance,
  type PropType,
} from "vue";

import { useComponentMessages } from "../../internal/messages";

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

/** Runtime settings the sider shares with its root so the split can be
 * driven by Ark while the public sizing props stay on `Layout.Sider`. */
export interface LayoutSiderState {
  resizable: boolean;
  collapsed: boolean;
  width: string;
  minWidth: string;
  maxWidth: string;
}

/** Which edge the enclosing root reserves for its rail, plus the shared
 * state needed to compose its header/content/footer grid with Ark Splitter. */
export interface LayoutContext {
  siderPlacement: () => "start" | "end" | undefined;
  siderState: LayoutSiderState;
  resizeStart: () => void;
  resize: (width: number) => void;
  resizeEnd: () => void;
}

const LAYOUT_CONTEXT = Symbol("layout-context");

/** One step of Ark's keyboard resize, expressed in layout percentages at
 * render time so the public behavior remains a 16px move. */
const RESIZE_STEP = 16;

function styleRecord(style: unknown): CSSProperties {
  if (!style) return {};
  if (typeof style === "string") {
    return Object.fromEntries(
      style
        .split(";")
        .filter(Boolean)
        .map((rule) => {
          const split = rule.indexOf(":");
          return split > 0 ? [rule.slice(0, split).trim(), rule.slice(split + 1).trim()] : [];
        }),
    );
  }
  if (Array.isArray(style)) return Object.assign({}, ...style.map(styleRecord));
  return style as CSSProperties;
}

const Root = defineComponent({
  name: "LayoutRoot",
  props: {
    sider: { type: String as PropType<"start" | "end">, default: undefined },
  },
  setup(props, ctx: SetupContext) {
    injectComponentStyle("layout");

    const siderState = reactive<LayoutSiderState>({
      resizable: false,
      collapsed: false,
      width: "16rem",
      minWidth: "12rem",
      maxWidth: "24rem",
    });

    const context: LayoutContext = {
      siderPlacement: () => props.sider,
      siderState,
      resizeStart: () => {},
      resize: () => {},
      resizeEnd: () => {},
    };
    provide(LAYOUT_CONTEXT, context);

    const splitterActive = computed(() => !!props.sider);
    const splitterRoot = ref<ComponentPublicInstance | null>(null);
    const rootWidth = ref(0);
    let observer: ResizeObserver | undefined;

    const observe = (element: Element | undefined) => {
      observer?.disconnect();
      if (!element) {
        rootWidth.value = 0;
        return;
      }
      observer ??= new ResizeObserver(() => {
        rootWidth.value = element.getBoundingClientRect().width;
      });
      observer.observe(element);
      rootWidth.value = element.getBoundingClientRect().width;
    };

    onMounted(() => {
      if (typeof ResizeObserver === "undefined") {
        rootWidth.value =
          splitterRoot.value?.$el instanceof Element
            ? (splitterRoot.value.$el as HTMLElement).getBoundingClientRect().width
            : 0;
        return;
      }
      watch(
        () =>
          splitterRoot.value?.$el instanceof Element
            ? (splitterRoot.value.$el as Element)
            : undefined,
        observe,
        { immediate: true, flush: "post" },
      );
    });
    onScopeDispose(() => observer?.disconnect());

    const keyboardResizeBy = computed(() =>
      rootWidth.value > 0 ? (RESIZE_STEP / rootWidth.value) * 100 : RESIZE_STEP,
    );
    const panels = computed(() => {
      const rail = {
        id: "sider",
        minSize: siderState.minWidth,
        maxSize: siderState.maxWidth,
      };
      const flow = { id: "flow", minSize: "0px" };
      return props.sider === "end" ? [flow, rail] : [rail, flow];
    });
    const size = computed(() =>
      props.sider === "end" ? [undefined, siderState.width] : [siderState.width, undefined],
    );
    const siderIndex = () => (props.sider === "end" ? 1 : 0);

    const renderGrid = () => {
      const { style, ...attrs } = ctx.attrs;
      const callerStyle = styleRecord(style);
      return h(
        "div",
        {
          ...attrs,
          // Ark's root writes a flex container inline. The semantic layout
          // grid remains the rendered root; these three values restore it.
          style: {
            ...callerStyle,
            display: callerStyle.display ?? "grid",
            width: callerStyle.width ?? "auto",
            height: callerStyle.height ?? "auto",
            overflow: callerStyle.overflow ?? "visible",
          },
          "data-scope": "layout",
          "data-part": "root",
          "data-sider": props.sider,
        },
        () => ctx.slots.default?.(),
      );
    };

    return () => {
      if (!splitterActive.value) return renderGrid();
      return h(
        ArkSplitter.Root as never,
        {
          ref: splitterRoot,
          asChild: true,
          panels: panels.value,
          size: size.value,
          keyboardResizeBy: keyboardResizeBy.value,
          onResize: (details: { size: number[] }) => {
            const width = (rootWidth.value * (details.size[siderIndex()] ?? 0)) / 100;
            if (width > 0) context.resize(width);
          },
          onResizeStart: () => context.resizeStart(),
          onResizeEnd: () => context.resizeEnd(),
        } as never,
        renderGrid,
      );
    };
  },
});

/** A semantic block of the skeleton — header, footer, and the flow's
 * main content each land on their native element and their grid area. */
function region(name: string, tag: string) {
  return defineComponent({
    name: "Layout" + name,
    setup(_props, ctx: SetupContext) {
      const layout = inject<LayoutContext | null>(LAYOUT_CONTEXT, null);
      const splitPanel = computed(
        () =>
          name === "Content" &&
          !!layout &&
          !!layout.siderPlacement() &&
          layout.siderState.resizable,
      );
      return () => {
        const attrs = {
          ...ctx.attrs,
          "data-scope": "layout",
          "data-part": name.toLowerCase(),
        };
        const children = () => ctx.slots.default?.();
        return splitPanel.value
          ? h(ArkSplitter.Panel as never, { id: "flow", asChild: true } as never, () =>
              h(tag, attrs, children),
            )
          : h(tag, attrs, children);
      };
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
  /** Offer the Ark-powered hairline at the flow edge: the rail's width
   * follows the hand and keyboard, clamped by `min-width`/`max-width`,
   * and every change rides `update:width`. */
  resizable?: boolean;
  /** The rail's narrowest inline size while resizing. */
  minWidth?: string;
  /** The rail's widest inline size while resizing. */
  maxWidth?: string;
}

const Sider = defineComponent({
  name: "LayoutSider",
  props: {
    collapsed: { type: Boolean, default: false },
    width: { type: String, default: undefined },
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
    const messages = useComponentMessages();
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
    // mirror otherwise — Ark writes through both, and the stylesheet
    // clamps it between min and max.
    const innerWidth = ref(props.width ?? "16rem");
    watch(
      () => props.width,
      (next) => {
        const fallback = next ?? "16rem";
        if (fallback === innerWidth.value) return;
        innerWidth.value = fallback;
        ctx.emit("update:width", fallback);
      },
    );
    const width = computed(() => (props.width !== undefined ? props.width : innerWidth.value));

    const layout = inject<LayoutContext | null>(LAYOUT_CONTEXT, null);
    const dragging = ref(false);
    const active = computed(() => props.resizable && !collapsed.value);

    watch(active, (next) => {
      if (!next) dragging.value = false;
    });

    watchEffect(() => {
      if (!layout) return;
      // Splitter owns the rendered track, so its clamps must follow the
      // folded state too; otherwise its inline min-width defeats the CSS
      // variable that switches the rail to its collapsed measure.
      layout.siderState.resizable = props.resizable;
      layout.siderState.collapsed = collapsed.value;
      layout.siderState.width = collapsed.value ? props.collapsedWidth : width.value;
      layout.siderState.minWidth = collapsed.value ? props.collapsedWidth : props.minWidth;
      layout.siderState.maxWidth = collapsed.value ? props.collapsedWidth : props.maxWidth;
    });
    if (layout) {
      layout.resizeStart = () => {
        dragging.value = true;
      };
      layout.resize = (nextWidth) => {
        const next = `${Math.round(nextWidth)}px`;
        innerWidth.value = next;
        ctx.emit("update:width", next);
      };
      layout.resizeEnd = () => {
        dragging.value = false;
      };
      onScopeDispose(() => {
        layout.siderState.resizable = false;
        dragging.value = false;
      });
    }

    return () => {
      const { style, ...attrs } = ctx.attrs;
      const children = () => ctx.slots.default?.({ collapsed: collapsed.value }) ?? [];
      const aside = () =>
        h(
          "aside",
          {
            ...attrs,
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
            "data-resizable": active.value ? "" : undefined,
          },
          children().concat(
            active.value
              ? h(
                  ArkSplitter.ResizeTrigger as never,
                  {
                    id: layout?.siderPlacement() === "end" ? "flow:sider" : "sider:flow",
                    "aria-label": messages.value.sidebar.resize,
                  } as never,
                )
              : [],
          ),
        );

      return props.resizable && layout
        ? h(ArkSplitter.Panel as never, { id: "sider", asChild: true } as never, aside)
        : aside();
    };
  },
});

export const Layout = Object.assign(Root, {
  Root,
  Header,
  Sider,
  Content,
  Footer,
});
