import { injectComponentStyle } from "@bysages/core";
import { createContext, useContext, splitProps } from "solid-js";
import type { JSX } from "solid-js";

import { iconNode } from "../../internal/icon";

export type AlertStatus = "ink" | "info" | "success" | "warning" | "danger";

// The status rides the context as an accessor so a live status prop
// re-reads on every icon render instead of freezing at mount.
const StatusContext = createContext<() => AlertStatus>((): AlertStatus => "ink");

function statusIcon(status: AlertStatus) {
  const names: Record<AlertStatus, string> = {
    ink: "info",
    info: "info",
    success: "circle-check",
    warning: "triangle-alert",
    danger: "circle-x",
  };
  return iconNode(names[status], { width: "16", height: "16" });
}

/** A notice drawn on the page: a wash of the status pigment, one heavier
 * hairline on the leading edge, the serif for its title. Root, Icon,
 * Body, Title, Description — the icon reads the status from the Root. */
export interface AlertProps extends JSX.HTMLAttributes<HTMLDivElement> {
  status?: AlertStatus;
}

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
      {statusIcon(status())}
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
