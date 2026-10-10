import { injectComponentStyle } from "@bysages/core/styling";
import type { JSX } from "solid-js";
import { splitProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { iconBody } from "../../internal/icon";

type Status = "success" | "warning" | "danger" | "info";

const MARK = {
  __html:
    `<g data-for="success">${iconBody("check")}</g>` +
    `<g data-for="warning">${iconBody("triangle-alert")}</g>` +
    `<g data-for="danger">${iconBody("circle-x")}</g>` +
    `<g data-for="info">${iconBody("info")}</g>`,
};

export interface ResultRootProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /** The verdict the operation returned; the fixed pigments speak it. */
  status?: Status;
}

export function ResultRoot(props: ResultRootProps) {
  injectComponentStyle("result");
  const [own, rest] = splitProps(props, ["status"]);
  return <div {...rest} data-scope="result" data-part="root" data-status={own.status ?? "info"} />;
}

/** The mark carries all four verdicts and lets the root choose, so the
 * icon can never drift from the status the root declares. */
export function ResultIcon(props: JSX.HTMLAttributes<HTMLDivElement>) {
  injectComponentStyle("result");
  const [own, rest] = splitProps(props, ["children"]);
  return (
    <div {...rest} data-scope="result" data-part="icon">
      {own.children ?? (
        <svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width={1.5}
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
          innerHTML={MARK.__html}
        />
      )}
    </div>
  );
}

function part(name: string, tag: "h3" | "p" | "div") {
  return function Part(props: JSX.HTMLAttributes<HTMLElement>) {
    injectComponentStyle("result");
    const [own, rest] = splitProps(props, ["children"]);
    const Tag = tag as "div";
    return (
      <Tag {...(rest as JSX.HTMLAttributes<HTMLDivElement>)} data-scope="result" data-part={name}>
        {own.children}
      </Tag>
    );
  };
}

/** A verdict drawn after the deed: the mark washes in the fixed
 * pigment, the title rides the serif, and the extra carries the way
 * onward. Any subset composes. */
export const Result = defineFamily(ResultRoot, {
  Root: ResultRoot,
  Icon: ResultIcon,
  Title: part("title", "h3"),
  Description: part("description", "p"),
  Extra: part("extra", "div"),
});
