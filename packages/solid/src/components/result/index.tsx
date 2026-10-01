import { injectComponentStyle } from "@bysages/core";
import type { JSX } from "solid-js";
import { splitProps } from "solid-js";

type Status = "success" | "warning" | "danger" | "info";

const MARK = {
  __html:
    '<g data-for="success"><path d="M20 6 9 17l-5-5"/></g><g data-for="warning"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></g><g data-for="danger"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></g><g data-for="info"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></g>',
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
export const Result = {
  Root: ResultRoot,
  Icon: ResultIcon,
  Title: part("title", "h3"),
  Description: part("description", "p"),
  Extra: part("extra", "div"),
};
