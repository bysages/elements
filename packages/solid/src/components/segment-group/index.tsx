import { SegmentGroup as ArkSegmentGroup } from "@ark-ui/solid/segment-group";
import type { SegmentGroupRootProps as ArkSegmentGroupRootProps } from "@ark-ui/solid/segment-group";
import { injectComponentStyle } from "@bysages/core";
import { createComponent, mergeProps, splitProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

type SegmentGroupOwnProps = {
  /** One rung of the control-height ladder for the segments. The
   * family keeps its compact register, so the rungs sit one notch
   * below the global ladder - the default md rests at the small
   * height. */
  size?: "sm" | "md" | "lg";
};

function SegmentGroupRoot(props: ArkSegmentGroupRootProps & SegmentGroupOwnProps) {
  const [own, rest] = splitProps(props, ["size"]);
  const id = useElementId("segment-group", () => rest.id);

  return createComponent(
    ArkSegmentGroup.Root,
    mergeProps(rest, {
      get "data-size"() {
        return own.size ?? "md";
      },
      get id() {
        return id();
      },
    }),
  );
}

/** SegmentGroup, dressed in the paper-and-ink system: a hairline tray
 * where one flat ink plate travels beneath the checked seal. The parts - Root, Label, Indicator, Item, ItemText, ItemControl,
 * ItemHiddenInput. */
/* Ark's namespace is frozen - spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const SegmentGroup: typeof SegmentGroupRoot &
  Omit<typeof ArkSegmentGroup, "Root"> & { Root: typeof SegmentGroupRoot } = defineFamily(
  SegmentGroupRoot,
  {
    ...ArkSegmentGroup,
    Root: SegmentGroupRoot,
  },
);

injectComponentStyle("segment-group");
