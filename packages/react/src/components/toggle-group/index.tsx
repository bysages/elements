import { ToggleGroup as ArkToggleGroup } from "@ark-ui/react/toggle-group";
import { injectComponentStyle } from "@bysages/core";
import type { ComponentProps } from "react";

import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

type ToggleGroupRootProps = ComponentProps<typeof ArkToggleGroup.Root> & {
  /** One rung of the control-height ladder for the items. */
  size?: "sm" | "md" | "lg";
};

function ToggleGroupRoot(props: ToggleGroupRootProps) {
  const id = useElementId("toggle-group", props);
  const { size = "md", ...rest } = props;

  return <ArkToggleGroup.Root {...rest} id={id} data-size={size} />;
}

export type ToggleGroupItem = {
  value: string;
  label: string;
  /** A built-in core-registry icon; omit it to render the label as text. */
  icon?: string;
  disabled?: boolean;
};

export interface ToggleGroupFacadeProps {
  value?: string | string[];
  defaultValue?: string | string[];
  items: ToggleGroupItem[];
  label?: string;
  multiple?: boolean;
  disabled?: boolean;
  /** One rung of the control-height ladder for the items. */
  size?: "sm" | "md" | "lg";
  className?: string;
  onValueChange?: (value: string | string[]) => void;
}

function toArkValue(value: string | string[] | undefined) {
  return value === undefined ? [] : Array.isArray(value) ? value : [value];
}

function ToggleGroupFacade({
  value,
  defaultValue,
  items,
  label,
  multiple = false,
  disabled = false,
  size = "md",
  className,
  onValueChange,
}: ToggleGroupFacadeProps) {
  return (
    <ToggleGroupRoot
      className={className}
      size={size}
      aria-label={label}
      disabled={disabled}
      multiple={multiple}
      defaultValue={toArkValue(defaultValue)}
      {...(value === undefined ? {} : { value: toArkValue(value) })}
      onValueChange={(details: { value: string[] }) =>
        onValueChange?.(multiple ? details.value : (details.value.at(0) ?? ""))
      }
    >
      {items.map((item) => (
        <ArkToggleGroup.Item
          key={item.value}
          value={item.value}
          disabled={item.disabled}
          aria-label={item.label}
          data-variant={item.icon ? "icon" : "text"}
        >
          {item.icon ? iconNode(item.icon) : item.label}
        </ArkToggleGroup.Item>
      ))}
    </ToggleGroupRoot>
  );
}

ToggleGroupFacade.displayName = "SToggleGroup";

/** Ark's ToggleGroup, dressed in the paper-and-ink system: a hairline tray
 * of quiet seals where the pressed item takes the flat ink fill. The API is
 * Ark's own — Root, Item. */
type ToggleGroupParts = Omit<typeof ArkToggleGroup, "Root"> & {
  Root: typeof ToggleGroupRoot;
};

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const ToggleGroup = Object.assign(ToggleGroupFacade, {
  ...ArkToggleGroup,
  Root: ToggleGroupRoot,
}) as typeof ToggleGroupFacade & ToggleGroupParts;

injectComponentStyle("toggle-group");
