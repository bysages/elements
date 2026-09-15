import { injectComponentStyle } from "@bysages/core";
import { createContext, useContext, splitProps } from "solid-js";
import type { JSX } from "solid-js";

export type AlertStatus = "ink" | "info" | "success" | "warning" | "danger";

// The status rides the context as an accessor so a live status prop
// re-reads on every icon render instead of freezing at mount.
const StatusContext = createContext<() => AlertStatus>(() => "ink");

function glyph(status: AlertStatus) {
  const paths: Record<AlertStatus, string> = {
    info: "M12 8v5m0 3v.01M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z",
    success: "m4 12.5 5 5L20 6.5",
    warning: "M12 4 2.5 20h19L12 4Zm0 6v4m0 3v.01",
    danger: "M6 6l12 12M18 6 6 18",
    ink: "M12 8v5m0 3v.01M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z",
  };
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width={1.75}
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d={paths[status]} />
    </svg>
  );
}

/** A notice drawn on the page: a wash of the status pigment, one heavier
 * hairline on the leading edge, the serif for its title. Root, Icon,
 * Body, Title, Description — the icon reads the status from the Root. */
export interface AlertProps extends JSX.HTMLAttributes<HTMLDivElement> {}

function AlertRoot(props: AlertProps) {
  const [own, rest] = splitProps(props, ["status"]);
  const status = () => own.status ?? "ink";
  return (
    <StatusContext.Provider value={status}>
      <div
        {...rest}
        role={status() === "ink" || status() === "info" ? "status" : "alert"}
        data-scope="alert"
        data-part="root"
        data-status={status()}
      />
    </StatusContext.Provider>
  );
}

function Icon() {
  const status = useContext(StatusContext);
  return (
    <span data-scope="alert" data-part="icon">
      {glyph(status())}
    </span>
  );
}

function Body(props: JSX.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} data-scope="alert" data-part="body" />;
}

function Title(props: JSX.HTMLAttributes<HTMLParagraphElement>) {
  return <p {...props} data-scope="alert" data-part="title" />;
}

function Description(props: JSX.HTMLAttributes<HTMLParagraphElement>) {
  return <p {...props} data-scope="alert" data-part="description" />;
}

export const Alert = Object.assign(AlertRoot, {
  Root: AlertRoot,
  Icon,
  Body,
  Title,
  Description,
});

injectComponentStyle("alert");
