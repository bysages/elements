import { Avatar as ArkAvatar } from "@ark-ui/vue/avatar";
import { injectComponentStyle } from "@bysages/core/styling";
import { defineComponent, h, type PropType, type SetupContext } from "vue";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** Avatar, dressed in the paper-and-ink system: a circular seal on
 * inset paper that holds initials until the image loads over them.
 * `size` picks a control-height rung for the seal — the core styles
 * re-point `--bs-avatar-size` per rung, and scenes can still retune the
 * variable directly. */
export type AvatarSize = "sm" | "md" | "lg";

const AvatarRoot = defineComponent({
  name: "SAvatarRoot",
  props: {
    /** Seal diameter: one rung of the control-height ladder — the
     * default is the md rung, level with the other control families,
     * so an avatar rides a row without stretching it. */
    size: { type: String as PropType<AvatarSize>, default: "md" },
    /** The corner: round by default; square cuts it sharp, a stamp
     * beside a round portrait. */
    shape: { type: String as PropType<"circle" | "square">, default: "circle" },
  },
  setup(props, { attrs, slots }) {
    injectComponentStyle("avatar");
    const id = useElementId("avatar", attrs);

    return () =>
      h(
        ArkAvatar.Root,
        {
          ...attrs,
          id: id.value,
          "data-size": props.size,
          "data-shape": props.shape,
        },
        slots,
      );
  },
});

function initials(name?: string) {
  if (!name) return "";

  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/** The one-tag avatar: rich composition stays on the anatomy, while a
 * name and portrait are enough for the common seal. */
const AvatarFacade = defineComponent({
  name: "SAvatar",
  inheritAttrs: false,
  props: {
    /** The person's name, from which the fallback initials derive. */
    name: { type: String, default: undefined },
    /** The portrait to load over the initials. */
    src: { type: String, default: undefined },
    size: { type: String as PropType<AvatarSize>, default: "md" },
    shape: { type: String as PropType<"circle" | "square">, default: "circle" },
  },
  setup(props, ctx: SetupContext) {
    injectComponentStyle("avatar");

    return () =>
      h(AvatarRoot, { ...ctx.attrs, size: props.size, shape: props.shape }, () => {
        if (ctx.slots.default) return ctx.slots.default();

        return [
          props.src ? h(ArkAvatar.Image, { alt: props.name, src: props.src }) : null,
          props.name ? h(ArkAvatar.Fallback, () => initials(props.name)) : null,
        ];
      });
  },
});

type AvatarParts = Omit<typeof ArkAvatar, "Root"> & { Root: typeof AvatarRoot };

/* Ark's namespace is frozen — spread copies the members as data
 * properties so Root can be the sized wrapper while the rest stay
 * Ark's own parts. */
export const Avatar = defineFamily(AvatarFacade, {
  ...ArkAvatar,
  Root: AvatarRoot,
} as unknown as AvatarParts) as typeof AvatarFacade & AvatarParts;

export type AvatarProps = {
  /** The person's name, from which the fallback initials derive. */
  name?: string;
  /** The portrait to load over the initials. */
  src?: string;
  /** Seal diameter: the small, medium, or large control rung. The
   * default (medium) stands as tall as the biggest control so an avatar
   * rides a row without stretching it. */
  size?: AvatarSize;
  /** The corner: round by default; square cuts it sharp. */
  shape?: "circle" | "square";
};
