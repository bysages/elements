import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes, ReactNode } from "react";

import { Avatar, type AvatarSize } from "../avatar";

export interface UserProps extends HTMLAttributes<HTMLDivElement> {
  /** The person's name — the loud line. */
  name: string;
  /** The quiet echo beneath the name: a role, a title, an address. */
  description?: string;
  /** Seal diameter: one rung of the Avatar's own ladder. */
  size?: AvatarSize;
  src?: string;
  shape?: "circle" | "square";
  children?: ReactNode;
}

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

/** A person on one line: the seal before the words, the name and its
 * quiet echo beneath. The mark is the Avatar itself — one component
 * renders it here, so every size and shape the Avatar knows the user
 * inherits; this row only lays the words out beside it. */
export function User({
  name,
  description,
  size,
  src,
  shape = "circle",
  children,
  ...rest
}: UserProps) {
  injectComponentStyle("user");
  return (
    <div {...rest} data-scope="user" data-part="root">
      <Avatar.Root size={size} shape={shape}>
        {src ? <Avatar.Image src={src} /> : null}
        <Avatar.Fallback>{initialsOf(name)}</Avatar.Fallback>
      </Avatar.Root>
      <div data-scope="user" data-part="meta">
        <span data-scope="user" data-part="name">
          {name}
        </span>
        {description ? (
          <span data-scope="user" data-part="description">
            {description}
          </span>
        ) : null}
        {children}
      </div>
    </div>
  );
}
