import { Avatar as ArkAvatar } from "@ark-ui/solid/avatar";
import { injectComponentStyle } from "@bysages/core/styling";
import { Show, splitProps } from "solid-js";
import type { ComponentProps, JSX } from "solid-js";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** Avatar, dressed in the paper-and-ink system: a circular seal on
 * inset paper that holds initials until the image loads over them.
 * `size` picks a control-height rung for the seal — the core styles
 * re-point `--bs-avatar-size` per rung, and scenes can still retune the
 * variable directly. */
export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps extends ComponentProps<typeof ArkAvatar.Root> {
  /** Seal diameter: the small, medium, or large control rung. The
   * default (medium) stands as tall as the biggest control so an avatar
   * rides a row without stretching it. */
  size?: AvatarSize;
  /** The corner: round by default; square cuts it sharp, a stamp
   * beside a round portrait. */
  shape?: "circle" | "square";
}

function AvatarRoot(props: AvatarProps) {
  const [own, rest] = splitProps(props, ["size", "shape"]);
  const id = useElementId("avatar", () => rest.id);
  return (
    <ArkAvatar.Root
      {...rest}
      id={id()}
      data-size={own.size ?? "md"}
      data-shape={own.shape ?? "circle"}
    />
  );
}

export interface AvatarFacadeProps extends Omit<AvatarProps, "children" | "shape" | "size"> {
  /** The person's name — the fallback initials and image description. */
  name?: string;
  /** The portrait source, loaded above the initials fallback. */
  src?: string;
  size?: AvatarSize;
  shape?: "circle" | "square";
  children?: JSX.Element;
}

function initials(name: string | undefined) {
  return (
    name
      ?.trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join("") ?? ""
  );
}

/** The shorthand: a complete avatar from a name and image, with the
 * anatomy still there when a consumer needs to compose its own. */
function AvatarFacade(props: AvatarFacadeProps) {
  const [own, rest] = splitProps(props, ["name", "shape", "size", "src"]);
  return (
    <AvatarRoot {...rest} shape={own.shape ?? "circle"} size={own.size ?? "md"}>
      <Show
        when={props.children}
        fallback={
          <>
            <Show when={own.src}>
              <ArkAvatar.Image alt={own.name} src={own.src} />
            </Show>
            <Show when={own.name}>
              <ArkAvatar.Fallback>{initials(own.name)}</ArkAvatar.Fallback>
            </Show>
          </>
        }
      >
        {props.children}
      </Show>
    </AvatarRoot>
  );
}

/* Ark's namespace is frozen — spread copies the members so the facade
 * stays callable while Root remains the sized wrapper and the rest stay
 * Ark's own parts. */
export const Avatar: typeof AvatarFacade &
  Omit<typeof ArkAvatar, "Root"> & { Root: typeof AvatarRoot } = defineFamily(AvatarFacade, {
  ...ArkAvatar,
  Root: AvatarRoot,
});

injectComponentStyle("avatar");
