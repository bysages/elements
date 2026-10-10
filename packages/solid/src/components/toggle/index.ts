import { Toggle as ArkToggle } from "@ark-ui/solid/toggle";
import { injectComponentStyle } from "@bysages/core/styling";
import { createComponent, mergeProps, type ComponentProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** Ark's Toggle, dressed in the paper-and-ink system: a standalone seal that
 * settles into the flat ink fill while pressed on. The API is Ark's own —
 * Root, Indicator. */
function ToggleRoot(props: ComponentProps<typeof ArkToggle.Root>) {
  const id = useElementId("toggle", () => props.id);

  return createComponent(
    ArkToggle.Root,
    mergeProps(props, {
      get id() {
        return id();
      },
    }),
  );
}

export const Toggle: typeof ToggleRoot &
  Omit<typeof ArkToggle, "Root"> & { Root: typeof ToggleRoot } = defineFamily(ToggleRoot, {
  ...ArkToggle,
  Root: ToggleRoot,
});
injectComponentStyle("toggle");
