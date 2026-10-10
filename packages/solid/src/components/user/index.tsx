import { Avatar as ArkAvatar } from "@ark-ui/solid/avatar";
import { injectComponentStyle } from "@bysages/core/styling";
import { splitProps, type JSX } from "solid-js";

import { withSelfRoot } from "../../internal/family";
import { useElementId } from "../../internal/id";

export interface UserProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /** The person's name — the loud line. */
  name: string;
  /** The quiet echo beneath the name: a role, a title, an address. */
  description?: string;
  /** Seal diameter: one rung of the Avatar's own ladder. */
  size?: "sm" | "md" | "lg";
  src?: string;
  shape?: "circle" | "square";
  children?: JSX.Element;
}

/** A person on one line: the seal before the words, the name and its
 * quiet echo beneath. The mark is the Avatar itself — one component
 * renders it here, so every size and shape the Avatar knows the user
 * inherits; this row only lays the words out beside it. */
export const User = withSelfRoot(function User(props: UserProps) {
  injectComponentStyle("user");
  const id = useElementId("user-avatar");
  const [own, rest] = splitProps(props, [
    "name",
    "description",
    "size",
    "src",
    "shape",
    "children",
  ]);
  const initials = () =>
    own.name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase() ?? "")
      .join("");
  return (
    <div {...rest} data-scope="user" data-part="root">
      <ArkAvatar.Root id={id()} data-size={own.size} data-shape={own.shape ?? "circle"}>
        <ArkAvatar.Fallback>{initials()}</ArkAvatar.Fallback>
      </ArkAvatar.Root>
      <div data-scope="user" data-part="meta">
        <span data-scope="user" data-part="name">
          {own.name}
        </span>
        {own.description ? (
          <span data-scope="user" data-part="description">
            {own.description}
          </span>
        ) : null}
        {own.children}
      </div>
    </div>
  );
});
