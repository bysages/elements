import { Toggle as ArkToggle } from "@ark-ui/solid/toggle";
import { injectComponentStyle } from "@bysages/core/styling";
import { createComponent, mergeProps, splitProps, type ComponentProps } from "solid-js";

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

export interface ToggleFacadeProps extends ComponentProps<typeof ArkToggle.Root> {
  /** The accessible name when the content is only a glyph. */
  label?: string;
}

/** The complete pressed seal behind one label: the default content
 * swaps through the indicator, so one child serves both states. */
function ToggleFacade(props: ToggleFacadeProps) {
  injectComponentStyle("toggle");
  const [own, rest] = splitProps(props, ["children", "label"]);

  return (
    <ToggleRoot {...rest} aria-label={own.label ?? rest["aria-label"]}>
      <ArkToggle.Indicator fallback={own.children}>{own.children}</ArkToggle.Indicator>
    </ToggleRoot>
  );
}

/* Ark's namespace is frozen — spread copies the members so the facade
 * coexists with the anatomy while Root stays the same callable wrapper. */
export const Toggle: typeof ToggleFacade &
  Omit<typeof ArkToggle, "Root"> & { Root: typeof ToggleRoot } = defineFamily(ToggleFacade, {
  ...ArkToggle,
  Root: ToggleRoot,
});

injectComponentStyle("toggle");
