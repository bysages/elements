import { injectComponentStyle } from "@bysages/core/styling";
import type { HTMLAttributes, ReactNode } from "react";
import { createContext, useContext } from "react";

import { iconNode } from "../../internal/icon";

export type AlertStatus = "ink" | "info" | "success" | "warning" | "danger";

const StatusContext = createContext<AlertStatus>("ink");

function statusIcon(status: AlertStatus) {
  const icons: Record<AlertStatus, string> = {
    info: "info",
    success: "circle-check",
    warning: "triangle-alert",
    danger: "circle-x",
    ink: "info",
  };
  return iconNode(icons[status], { width: 16, height: 16 });
}

/** A notice

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
      {statusIcon(status)}
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
