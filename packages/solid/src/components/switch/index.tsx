import { Switch as ArkSwitch } from "@ark-ui/solid/switch";
import type { SwitchRootProps as ArkSwitchRootProps } from "@ark-ui/solid/switch";
import { injectComponentStyle } from "@bysages/core/styling";
import { splitProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** Ark's Switch, dressed in the paper-and-ink system: a track that rests
 * in the inset shade of the paper and fills flat with primary ink when on,
 * the thumb sliding on the spring. The API is Ark's own — Root, Label,
 * Control, Thumb, HiddenInput. */

type SwitchOwnProps = {
  /** One rung for the thumb; the track travels with it. */
  size?: "sm" | "md" | "lg";
};

function SwitchRoot(props: ArkSwitchRootProps & SwitchOwnProps) {
  const [own, rest] = splitProps(props, ["size"]);
  const id = useElementId("switch", () => rest.id);
  return <ArkSwitch.Root {...rest} id={id()} data-size={own.size ?? "md"} />;
}

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Switch: typeof SwitchRoot &
  Omit<typeof ArkSwitch, "Root"> & { Root: typeof SwitchRoot } = defineFamily(SwitchRoot, {
  ...ArkSwitch,
  Root: SwitchRoot,
});

injectComponentStyle("switch");
