import { injectComponentStyle } from "@bysages/core";
import { circle_check, circle_x, info, triangle_alert } from "@bysages/icons";
import type { ComputedRef, InjectionKey, SetupContext } from "vue";
import { computed, defineComponent, h, inject, provide } from "vue";

import { glyphNode } from "../../internal/glyph";

// The status rides the context as a computed so a live status prop
// re-reads on every icon render instead of freezing at mount.
const STATUS: InjectionKey<ComputedRef<string>> = Symbol("alert-status");

function glyph(status: string) {
  const byStatus: Record<string, typeof info> = {
    info,
    success: circle_check,
    warning: triangle_alert,
    danger: circle_x,
  };
  return glyphNode(byStatus[status] ?? info, { width: 16, height: 16 });
}

const Root = defineComponent({
  name: "AlertRoot",
  props: {
    status: { type: String, default: "ink" },
  },
  setup(props, ctx: SetupContext) {
    injectComponentStyle("alert");

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

/** A notice drawn on the page: a wash of the status pigment, one heavier
 * hairline on the leading edge, the serif for its title. */

export const Alert = Object.assign(Root, { Root, Icon, Body, Title, Description });
