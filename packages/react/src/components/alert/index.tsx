import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes, ReactNode } from "react";
import { createContext, useContext } from "react";

export type AlertStatus = "ink" | "info" | "success" | "warning" | "danger";

const StatusContext = createContext<AlertStatus>("ink");

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
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[status]} />
    </svg>
  );
}

/** A notice drawn on the page: a wash of the status pigment, one heavier
 * hairline on the leading edge, the serif for its title. Root, Icon,
 * Body, Title, Description — the icon reads the status from the Root. */
export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  status?: AlertStatus;
  children?: ReactNode;
}

function AlertRoot({ status = "ink", children, ...rest }: AlertProps) {
  return (
    <StatusContext.Provider value={status}>
      <div
        {...rest}
        role={status === "ink" || status === "info" ? "status" : "alert"}
        data-scope="alert"
        data-part="root"
        data-status={status}
      >
        {children}
      </div>
    </StatusContext.Provider>
  );
}

function Icon() {
  const status = useContext(StatusContext);
  return (
    <span data-scope="alert" data-part="icon">
      {glyph(status)}
    </span>
  );
}

function Body({ children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...rest} data-scope="alert" data-part="body">
      {children}
    </div>
  );
}

function Title({ children, ...rest }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p {...rest} data-scope="alert" data-part="title">
      {children}
    </p>
  );
}

function Description({ children, ...rest }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p {...rest} data-scope="alert" data-part="description">
      {children}
    </p>
  );
}

export const Alert = Object.assign(AlertRoot, {
  Root: AlertRoot,
  Icon,
  Body,
  Title,
  Description,
});

injectComponentStyle("alert");
