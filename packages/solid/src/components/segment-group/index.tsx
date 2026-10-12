import { SegmentGroup as ArkSegmentGroup } from "@ark-ui/solid/segment-group";
import type { SegmentGroupRootProps as ArkSegmentGroupRootProps } from "@ark-ui/solid/segment-group";
import { injectComponentStyle } from "@bysages/core/styling";
import { For, Show, splitProps, createComponent, mergeProps } from "solid-js";

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

export type SegmentGroupItem = {
  value: string;
  label: string;
  disabled?: boolean;
};

/** The complete segmented choice behind one value and its named seals. */
export interface SegmentGroupFacadeProps {
  value?: string;
  defaultValue?: string;
  items: SegmentGroupItem[];
  label?: string;
  disabled?: boolean;
  readOnly?: boolean;
  /** One rung of the control-height ladder for the segments. The
   * family keeps its compact register, so the rungs sit one notch
   * below the global ladder - the default md rests at the small
   * height. */
  size?: "sm" | "md" | "lg";
  /** The tray reads as one row of seals; the underlying machine
   * defaults to a vertical stack, so the horizontal row is ours to
   * assert. */
  orientation?: "horizontal" | "vertical";
  onValueChange?: (value: string) => void;
}

function SegmentGroupFacade(props: SegmentGroupFacadeProps) {
  injectComponentStyle("segment-group");

  return (
    <SegmentGroupRoot
      size={props.size ?? "md"}
      disabled={props.disabled}
      readOnly={props.readOnly}
      orientation={props.orientation ?? "horizontal"}
      defaultValue={props.defaultValue}
      {...(props.value === undefined ? {} : { value: props.value })}
      onValueChange={(details: { value: string | null }) =>
        props.onValueChange?.(details.value ?? "")
      }
    >
      <Show when={props.label}>
        <ArkSegmentGroup.Label>{props.label}</ArkSegmentGroup.Label>
      </Show>
      <ArkSegmentGroup.Indicator />
      <For each={props.items}>
        {(item) => (
          <ArkSegmentGroup.Item value={item.value} disabled={item.disabled}>
            <ArkSegmentGroup.ItemText>{item.label}</ArkSegmentGroup.ItemText>
            <ArkSegmentGroup.ItemControl />
            <ArkSegmentGroup.ItemHiddenInput />
          </ArkSegmentGroup.Item>
        )}
      </For>
    </SegmentGroupRoot>
  );
}

type SegmentGroupParts = Omit<typeof ArkSegmentGroup, "Root"> & {
  Root: typeof SegmentGroupRoot;
};

/* Ark's namespace is frozen — spread copies the members so the facade
 * coexists with the anatomy while Root stays the sized wrapper. */
export const SegmentGroup: typeof SegmentGroupFacade & SegmentGroupParts = defineFamily(
  SegmentGroupFacade,
  {
    ...ArkSegmentGroup,
    Root: SegmentGroupRoot,
  },
);

injectComponentStyle("segment-group");
