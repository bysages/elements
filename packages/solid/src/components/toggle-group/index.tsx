import { ToggleGroup as ArkToggleGroup } from "@ark-ui/solid/toggle-group";
import type { ToggleGroupRootProps as ArkToggleGroupRootProps } from "@ark-ui/solid/toggle-group";
import { injectComponentStyle } from "@bysages/core/styling";
import { For, splitProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

/** Ark's ToggleGroup, dressed in the paper-and-ink system: a hairline tray
 * of quiet seals where the pressed item takes the flat ink fill. The API is
 * Ark's own — Root, Item. */

type ToggleGroupOwnProps = {
  /** One rung of the control-height ladder for the items. */
  size?: "sm" | "md" | "lg";
};

function ToggleGroupRoot(props: ArkToggleGroupRootProps & ToggleGroupOwnProps) {
  const [own, rest] = splitProps(props, ["size"]);
  const id = useElementId("toggle-group", () => rest.id);
  return <ArkToggleGroup.Root {...rest} id={id()} data-size={own.size ?? "md"} />;
}

export type ToggleGroupItem = {
  value: string;
  label: string;
  /** A built-in core-registry icon; omit it to render the label as text. */
  icon?: string;
  disabled?: boolean;
};

type ToggleGroupFacadeValue = string | string[];

function toArkValue(value: ToggleGroupFacadeValue | undefined) {
  return value === undefined ? [] : Array.isArray(value) ? value : [value];
}

/** The complete toggle group: labels or curated icons share the same tray. */
export interface ToggleGroupFacadeProps {
  value?: ToggleGroupFacadeValue;
  defaultValue?: ToggleGroupFacadeValue;
  items: ToggleGroupItem[];
  label?: string;
  multiple?: boolean;
  disabled?: boolean;
  /** One rung of the control-height ladder for the items. */
  size?: "sm" | "md" | "lg";
  onValueChange?: (value: ToggleGroupFacadeValue) => void;
}

function ToggleGroupFacade(props: ToggleGroupFacadeProps) {
  injectComponentStyle("toggle-group");

  return (
    <ToggleGroupRoot
      size={props.size ?? "md"}
      aria-label={props.label}
      disabled={props.disabled}
      multiple={props.multiple}
      defaultValue={toArkValue(props.defaultValue)}
      {...(props.value === undefined ? {} : { value: toArkValue(props.value) })}
      onValueChange={(details: { value: string[] }) =>
        props.onValueChange?.(props.multiple ? details.value : (details.value.at(0) ?? ""))
      }
    >
      <For each={props.items}>
        {(item) => (
          <ArkToggleGroup.Item
            value={item.value}
            disabled={item.disabled}
            aria-label={item.label}
            data-variant={item.icon ? "icon" : "text"}
          >
            {item.icon ? iconNode(item.icon) : item.label}
          </ArkToggleGroup.Item>
        )}
      </For>
    </ToggleGroupRoot>
  );
}

type ToggleGroupParts = Omit<typeof ArkToggleGroup, "Root"> & {
  Root: typeof ToggleGroupRoot;
};

/* Ark's namespace is frozen — spread copies the members so the facade
 * coexists with the anatomy while Root stays the sized wrapper. */
export const ToggleGroup: typeof ToggleGroupFacade & ToggleGroupParts = defineFamily(
  ToggleGroupFacade,
  {
    ...ArkToggleGroup,
    Root: ToggleGroupRoot,
  },
);

injectComponentStyle("toggle-group");
