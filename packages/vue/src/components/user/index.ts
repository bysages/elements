import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { computed, defineComponent, h, type PropType } from "vue";

import { withSelfRoot } from "../../internal/family";
import { Avatar, type AvatarSize } from "../avatar";

/** A person on one line: the seal before the words, the name and its
 * quiet echo beneath. The mark is the Avatar itself — one component
 * renders it here, so every size and shape the Avatar knows the user
 * inherits; this row only lays the words out beside it. */
export const User = withSelfRoot(
  defineComponent({
    name: "User",
    props: {
      /** The person's name — the loud line. */
      name: { type: String, required: true },
      /** The quiet echo beneath the name: a role, a title, an address. */
      description: { type: String, default: undefined },
      /** Seal diameter: one rung of the Avatar's own ladder. */
      size: { type: String as PropType<AvatarSize>, default: "md" },
      src: { type: String, default: undefined },
      shape: { type: String as PropType<"circle" | "square">, default: "circle" },
    },
    setup(props, ctx: SetupContext) {
      injectComponentStyle("user");

      const initials = computed(() =>
        props.name
          .split(/\s+/)
          .filter(Boolean)
          .slice(0, 2)
          .map((word) => word[0]?.toUpperCase() ?? "")
          .join(""),
      );
      return () =>
        h("div", { ...ctx.attrs, "data-scope": "user", "data-part": "root" }, [
          h(
            Avatar.Root,
            { size: props.size, shape: props.shape, src: props.src ?? undefined },
            () => h(Avatar.Fallback, () => initials.value),
          ),
          h("div", { "data-scope": "user", "data-part": "meta" }, [
            h("span", { "data-scope": "user", "data-part": "name" }, props.name),
            props.description
              ? h("span", { "data-scope": "user", "data-part": "description" }, props.description)
              : null,
            ctx.slots.default?.(),
          ]),
        ]);
    },
  }),
);
