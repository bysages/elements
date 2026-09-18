import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { defineComponent, h } from "vue";

const Root = defineComponent({
  name: "InputGroupRoot",
  setup(_, ctx: SetupContext) {
    return () =>
      h("div", { ...ctx.attrs, "data-scope": "input-group", "data-part": "root" }, () =>
        ctx.slots.default?.(),
      );
  },
});

const Addon = defineComponent({
  name: "InputGroupAddon",
  setup(_, ctx: SetupContext) {
    return () =>
      h("div", { ...ctx.attrs, "data-scope": "input-group", "data-part": "addon" }, () =>
        ctx.slots.default?.(),
      );
  },
});

/**
 * Merged controls: attachments and the entry fused into one seal. The
 * Root draws the single hairline and carries the group's focus halo;
 * the Addon is a recessed cell for the reader's fixed words — a scheme,
 * a unit, a quiet button — placed before or after the entry. Put our
 * Input (or Textarea) inside and its own border and halo step aside in
 * favor of the group's; the stylesheet does the merging, the wrapper
 * adds no visuals of its own.
 */

export const InputGroup = Object.assign(Root, { Root, Addon });

injectComponentStyle("input-group");
