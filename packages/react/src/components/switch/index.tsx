import { Switch as ArkSwitch } from "@ark-ui/react/switch";
import { injectComponentStyle } from "@bysages/core";
import type { ComponentProps } from "react";

type SwitchRootProps = ComponentProps<typeof ArkSwitch.Root> & {
  /** One rung for the thumb; the track travels with it. */
  size?: "sm" | "md" | "lg";
};

function SwitchRoot({ size = "md", ...rest }: SwitchRootProps) {
  return <ArkSwitch.Root {...rest} data-size={size} />;
}

/** Ark's Switch, dressed in the paper-and-ink system: a track that rests
 * in the inset shade of the paper and fills flat with primary ink when on,
 * the thumb sliding on the spring. The API is Ark's own — Root, Label,
 * Control, Thumb, HiddenInput. */
/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Switch: Omit<typeof ArkSwitch, "Root"> & {
  Root: typeof SwitchRoot;
} = {
  ...ArkSwitch,
  Root: SwitchRoot,
};

injectComponentStyle("switch");
