import { ToggleGroup as ArkToggleGroup } from "@ark-ui/solid/toggle-group";
import type { ToggleGroupRootProps as ArkToggleGroupRootProps } from "@ark-ui/solid/toggle-group";
import { injectComponentStyle } from "@bysages/core";
import { splitProps } from "solid-js";

/** Ark's ToggleGroup, dressed in the paper-and-ink system: a hairline tray
 * of quiet seals where the pressed item takes the flat ink fill. The API is
 * Ark's own — Root, Item. */

type ToggleGroupOwnProps = {
  /** One rung of the control-height ladder for the items. */
  size?: "sm" | "md" | "lg";
};

function ToggleGroupRoot(props: ArkToggleGroupRootProps & ToggleGroupOwnProps) {
  const [own, rest] = splitProps(props, ["size"]);
  return <ArkToggleGroup.Root {...rest} data-size={own.size ?? "md"} />;
}

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const ToggleGroup: Omit<typeof ArkToggleGroup, "Root"> & { Root: typeof ToggleGroupRoot } = {
  ...ArkToggleGroup,
  Root: ToggleGroupRoot,
};

injectComponentStyle("toggle-group");
