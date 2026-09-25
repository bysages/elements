import { Avatar as ArkAvatar } from "@ark-ui/vue/avatar";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, type PropType } from "vue";

/** Avatar, dressed in the paper-and-ink system: a circular seal on
 * inset paper that holds initials until the image loads over them.
 * `size` picks a control-height rung for the seal — the core styles
 * re-point `--bs-avatar-size` per rung, and scenes can still retune the
 * variable directly. */
export type AvatarSize = "sm" | "md" | "lg";

const AvatarRoot = defineComponent({
  name: "SAvatarRoot",
  props: { size: { type: String as PropType<AvatarSize>, default: undefined } },
  setup(props, { attrs, slots }) {
    return () => h(ArkAvatar.Root, { ...attrs, "data-size": props.size }, slots);
  },
});

/* Ark's namespace is frozen — spread copies the members as data
 * properties so Root can be the sized wrapper while the rest stay
 * Ark's own parts. */
export const Avatar = { ...ArkAvatar, Root: AvatarRoot };

export type AvatarProps = {
  /** Seal diameter: the small, medium, or large control rung. The
   * default (large) stands as tall as the biggest control so an avatar
   * rides a row without stretching it. */
  size?: AvatarSize;
};

injectComponentStyle("avatar");
