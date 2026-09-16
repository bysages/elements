import { injectComponentStyle } from "@bysages/core";
import type { ButtonHTMLAttributes, HTMLAttributes } from "react";

export type BannerStatus = "ink" | "info" | "success" | "warning" | "danger";

export interface BannerRootProps extends HTMLAttributes<HTMLElement> {
  status?: BannerStatus;
}

/** A page-level notice, spoken across the full measure: a wash of the
 * status pigment, one heavier hairline on the leading edge, and room
 * for actions and a quiet close. Ink is the neutral register; the four
 * semantic pigments are fixed. */
const Root = ({ status = "ink", children, ...rest }: BannerRootProps) => (
  <div
    {...rest}
    role={status === "ink" ? undefined : "status"}
    data-scope="banner"
    data-part="root"
    data-status={status}
  >
    {children}
  </div>
);

function part(name: string, tag: string) {
  const Tag = tag as "span";
  const Component = ({ children, ...rest }: HTMLAttributes<HTMLElement>) => (
    <Tag {...rest} data-scope="banner" data-part={name.toLowerCase()}>
      {children}
    </Tag>
  );
  Component.displayName = "Banner" + name;
  return Component;
}

const Icon = part("Icon", "span");
const Body = part("Body", "div");
const Title = part("Title", "p");
const Description = part("Description", "p");
const Actions = part("Actions", "div");

/** The quiet close: a plain square-cut button; dismissal stays the
 * consumer's state. */
const Close = (rest: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...rest}
    type={rest.type ?? "button"}
    aria-label={rest["aria-label"] ?? "Dismiss"}
    data-scope="banner"
    data-part="close"
  >
    <svg viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  </button>
);

export const Banner = Object.assign(Root, {
  Root,
  Icon,
  Body,
  Title,
  Description,
  Actions,
  Close,
});

injectComponentStyle("banner");
