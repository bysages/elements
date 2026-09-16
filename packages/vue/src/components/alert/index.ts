import { injectComponentStyle } from "@bysages/core";
import type { ComputedRef, InjectionKey, SetupContext } from "vue";
import { computed, defineComponent, h, inject, provide } from "vue";

// The status rides the context as a computed so a live status prop
// re-reads on every icon render instead of freezing at mount.
const STATUS: InjectionKey<ComputedRef<string>> = Symbol("alert-status");

function glyph(status: string) {
  const paths: Record<string, string> = {
    info: "M12 8v5m0 3v.01M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z",
    success: "m4 12.5 5 5L20 6.5",
    warning: "M12 4 2.5 20h19L12 4Zm0 6v4m0 3v.01",
    danger: "M6 6l12 12M18 6 6 18",
  };
  return h(
    "svg",
    {
      width: 16,
      height: 16,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.75,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "aria-hidden": true,
    },
    [h("path", { d: paths[status] ?? paths.info })],
  );
}

/** A notice drawn on the page: a wash of the status pigment, one heavier
 * hairline on the leading edge, the serif for its title. */
const Root = defineComponent({
  name: "AlertRoot",
  props: {
    status: { type: String, default: "ink" },
  },
  setup(props, ctx: SetupContext) {
    provide(
      STATUS,
      computed(() => props.status),
    );
    return () =>
      h(
        "div",
        {
          role: props.status === "ink" || props.status === "info" ? "status" : "alert",
          ...ctx.attrs,
          "data-scope": "alert",
          "data-part": "root",
          "data-status": props.status,
        },
        ctx.slots.default?.(),
      );
  },
});

const Icon = defineComponent({
  name: "AlertIcon",
  setup() {
    const status = inject(
      STATUS,
      computed(() => "ink"),
    );
    return () => h("span", { "data-scope": "alert", "data-part": "icon" }, glyph(status.value));
  },
});

const Body = defineComponent({
  name: "AlertBody",
  setup(_, ctx: SetupContext) {
    return () =>
      h("div", { ...ctx.attrs, "data-scope": "alert", "data-part": "body" }, ctx.slots.default?.());
  },
});

const Title = defineComponent({
  name: "AlertTitle",
  setup(_, ctx: SetupContext) {
    return () =>
      h("p", { ...ctx.attrs, "data-scope": "alert", "data-part": "title" }, ctx.slots.default?.());
  },
});

const Description = defineComponent({
  name: "AlertDescription",
  setup(_, ctx: SetupContext) {
    return () =>
      h(
        "p",
        { ...ctx.attrs, "data-scope": "alert", "data-part": "description" },
        ctx.slots.default?.(),
      );
  },
});

export const Alert = Object.assign(Root, { Root, Icon, Body, Title, Description });

injectComponentStyle("alert");
