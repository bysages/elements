import { ToggleGroup as ArkToggleGroup } from "@ark-ui/react/toggle-group";
import { injectComponentStyle } from "@bysages/core";
import type { ComponentProps } from "react";

type ToggleGroupRootProps = ComponentProps<typeof ArkToggleGroup.Root> & {
  /** One rung of the control-height ladder for the items. */
  size?: "sm" | "md" | "lg";
};

function ToggleGroupRoot({ size = "md", ...rest }: ToggleGroupRootProps) {
  return <ArkToggleGroup.Root {...rest} data-size={size} />;
}

/** Ark's ToggleGroup, dressed in the paper-and-ink system: a hairline tray
 * of quiet seals where the pressed item takes the flat ink fill. The API is
 * Ark's own — Root, Item. */
/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const ToggleGroup: Omit<typeof ArkToggleGroup, "Root"> & {
  Root: typeof ToggleGroupRoot;
} = {
  ...ArkToggleGroup,
  Root: ToggleGroupRoot,
};

injectComponentStyle("toggle-group");
