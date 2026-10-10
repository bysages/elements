import { SegmentGroup as ArkSegmentGroup } from "@ark-ui/react/segment-group";
import { injectComponentStyle } from "@bysages/core/styling";
import type { ComponentProps } from "react";

import { useElementId } from "../../internal/id";

type SegmentGroupRootProps = ComponentProps<typeof ArkSegmentGroup.Root> & {
  /** One rung of the control-height ladder for the segments. The
   * family keeps its compact register, so the rungs sit one notch
   * below the global ladder - the default md rests at the small
   * height. */
  size?: "sm" | "md" | "lg";
};

function SegmentGroupRoot(props: SegmentGroupRootProps) {
  const id = useElementId("segment-group", props);
  const { size = "md", ...rest } = props;

  return <ArkSegmentGroup.Root {...rest} id={id} data-size={size} />;
}

export type SegmentGroupItem = {
  value: string;
  label: string;
  disabled?: boolean;
};

export interface SegmentGroupFacadeProps {
  value?: string;
  defaultValue?: string;
  items: SegmentGroupItem[];
  label?: string;
  disabled?: boolean;
  readOnly?: boolean;
  orientation?: "horizontal" | "vertical";
  /** One rung of the control-height ladder for the segments. The
   * family keeps its compact register, so the rungs sit one notch
   * below the global ladder - the default md rests at the small
   * height. */
  size?: "sm" | "md" | "lg";
  className?: string;
  onValueChange?: (value: string) => void;
}

function SegmentGroupFacade({
  value,
  defaultValue,
  items,
  label,
  disabled = false,
  readOnly = false,
  orientation = "horizontal",
  size = "md",
  className,
  onValueChange,
}: SegmentGroupFacadeProps) {
  return (
    <SegmentGroupRoot
      className={className}
      size={size}
      orientation={orientation}
      disabled={disabled}
      readOnly={readOnly}
      defaultValue={defaultValue}
      {...(value === undefined ? {} : { value })}
      onValueChange={(details: { value: string | null }) => onValueChange?.(details.value ?? "")}
    >
      {label ? <ArkSegmentGroup.Label>{label}</ArkSegmentGroup.Label> : null}
      <ArkSegmentGroup.Indicator />
      {items.map((item) => (
        <ArkSegmentGroup.Item key={item.value} value={item.value} disabled={item.disabled}>
          <ArkSegmentGroup.ItemText>{item.label}</ArkSegmentGroup.ItemText>
          <ArkSegmentGroup.ItemControl />
          <ArkSegmentGroup.ItemHiddenInput />
        </ArkSegmentGroup.Item>
      ))}
    </SegmentGroupRoot>
  );
}

SegmentGroupFacade.displayName = "SSegmentGroup";

/** SegmentGroup, dressed in the paper-and-ink system: a hairline tray
 * where one flat ink plate travels beneath the checked seal. The parts - Root, Label, Indicator, Item, ItemText, ItemControl,
 * ItemHiddenInput. */
type SegmentGroupParts = Omit<typeof ArkSegmentGroup, "Root"> & {
  Root: typeof SegmentGroupRoot;
};

/* Ark's namespace is frozen - spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const SegmentGroup = Object.assign(SegmentGroupFacade, {
  ...ArkSegmentGroup,
  Root: SegmentGroupRoot,
}) as typeof SegmentGroupFacade & SegmentGroupParts;

injectComponentStyle("segment-group");
