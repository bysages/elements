import { Toggle as ArkToggle } from "@ark-ui/react/toggle";
import { injectComponentStyle } from "@bysages/core/styling";
import type { ComponentProps } from "react";

import { useElementId } from "../../internal/id";

/** Ark's Toggle, dressed in the paper-and-ink system: a standalone seal that
 * settles into the flat ink fill while pressed on. The API is Ark's own —
 * Root, Indicator. */
function ToggleRoot(props: ComponentProps<typeof ArkToggle.Root>) {
  const id = useElementId("toggle", props);

  return <ArkToggle.Root {...props} id={id} />;
}

export interface ToggleFacadeProps extends ComponentProps<typeof ArkToggle.Root> {
  /** The accessible name when the content is only an icon. */
  label?: string;
}

function ToggleFacade({ label, children, ...rest }: ToggleFacadeProps) {
  return (
    <ToggleRoot {...rest} aria-label={label ?? rest["aria-label"]}>
      <ArkToggle.Indicator>{children}</ArkToggle.Indicator>
    </ToggleRoot>
  );
}

ToggleFacade.displayName = "SToggle";

type ToggleParts = typeof ArkToggle;

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Toggle = Object.assign(ToggleFacade, {
  ...ArkToggle,
  Root: ToggleRoot,
}) as typeof ToggleFacade & ToggleParts;

injectComponentStyle("toggle");
