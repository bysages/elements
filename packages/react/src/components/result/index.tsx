import { injectComponentStyle } from "@bysages/core/styling";
import type { HTMLAttributes, ReactNode } from "react";

import { iconBody } from "../../internal/icon";

type Status = "success" | "warning" | "danger" | "info";

const MARK =
  `<g data-for="success">${iconBody("check")}</g>` +
  `<g data-for="warning">${iconBody("triangle-alert")}</g>` +
  `<g data-for="danger">${iconBody("circle-x")}</g>` +
  `<g data-for="info">${iconBody("info")}</g>`;

export interface ResultRootProps extends HTMLAttributes<HTMLDivElement> {
  /** The verdict the operation returned; the fixed pigments speak it. */
  status?: Status;
  children?: ReactNode;
}

export function ResultRoot({ status = "info", children, ...rest }: ResultRootProps) {
  injectComponentStyle("result");
  return (
    <div {...rest} data-scope="result" data-part="root" data-status={status}>
      {children}
    </div>
  );
}

/** The mark carries all four verdicts and lets the root choose, so the
 * icon can never drift from the status the root declares. */
export function ResultIcon({
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { children?: ReactNode }) {
  injectComponentStyle("result");
  return (
    <div {...rest} data-scope="result" data-part="icon">
      {children ?? (
        <svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: MARK }}
        />
      )}
    </div>
  );
}

function part(name: string, tag: "h3" | "p" | "div") {
  return function Part({
    children,
    ...rest
  }: HTMLAttributes<HTMLElement> & { children?: ReactNode }) {
    injectComponentStyle("result");
    const Tag = tag as "div";
    return (
      <Tag {...rest} data-scope="result" data-part={name}>
        {children}
      </Tag>
    );
  };
}

/** A verdict drawn after the deed: the mark washes in the fixed
 * pigment, the title rides the serif, and the extra carries the way
 * onward. Any subset composes. */
export const Result = Object.assign(ResultRoot, {
  Root: ResultRoot,
  Icon: ResultIcon,
  Title: part("title", "h3"),
  Description: part("description", "p"),
  Extra: part("extra", "div"),
});
