import { injectComponentStyle } from "@bysages/core";
import AlertRoot from "./Alert.svelte";
import AlertIcon from "./AlertIcon.svelte";
import AlertBody from "./AlertBody.svelte";
import AlertTitle from "./AlertTitle.svelte";
import AlertDescription from "./AlertDescription.svelte";

/** A notice drawn on the page: a wash of the status pigment, one heavier
 * hairline on the leading edge, the serif for its title. Root, Icon,
 * Body, Title, Description — the icon reads the status from the Root. */
export const Alert = Object.assign(AlertRoot, {
  Root: AlertRoot,
  Icon: AlertIcon,
  Body: AlertBody,
  Title: AlertTitle,
  Description: AlertDescription,
});

export type { AlertProps, AlertPartProps, AlertStatus } from "./props";

injectComponentStyle("alert");
