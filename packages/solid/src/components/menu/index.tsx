import { Menu as ArkMenu } from "@ark-ui/solid/menu";
import { injectComponentStyle } from "@bysages/core";
import { For, createContext, splitProps, useContext } from "solid-js";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

/** Ark's Menu, dressed in the paper-and-ink system: a quiet paper vessel on
 * elevation, hover as light on the row, checked items as the flat ink fill.
 * The API is Ark's own — Root, Trigger, ContextTrigger, Indicator, Positioner,
 * Content, Item, ItemText, ItemIndicator, ItemGroup, ItemGroupLabel,
 * TriggerItem, Separator, Arrow, ArrowTip. */

/** The row rung rides the context because Ark's Root renders no DOM of
 * its own — the vessel (Content) is the element the rung can land on,
 * and the Portal breaks CSS ancestry between the two. The getter keeps
 * the rung live, so a bound size retunes an open vessel. */
const MenuSizeContext = createContext<() => "sm" | "md" | "lg">();

type MenuOwnProps = {
  /** One rung of the control-height ladder for the vessel's rows. */
  size?: "sm" | "md" | "lg";
};

function MenuRoot(props: Parameters<typeof ArkMenu.Root>[0] & MenuOwnProps) {
  const [own, rest] = splitProps(props, ["size"]);
  const id = useElementId("menu", () => rest.id);
  return (
    <MenuSizeContext.Provider value={() => own.size ?? "md"}>
      <ArkMenu.Root {...rest} id={id()} />
    </MenuSizeContext.Provider>
  );
}

function MenuContent(props: Parameters<typeof ArkMenu.Content>[0]) {
  const size = useContext(MenuSizeContext);
  return <ArkMenu.Content {...props} data-size={size?.() ?? "md"} />;
}

/** One plain row in the callable menu; richer checkboxes, radios, and
 * nested menus stay on the anatomy. */
export interface MenuItemOption {
  label: string;
  value: string;
  disabled?: boolean;
}

type MenuPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";

export interface MenuFacadeProps {
  open?: boolean;
  defaultOpen?: boolean;
  trigger: string;
  items: MenuItemOption[];
  disabled?: boolean;
  placement?: MenuPlacement;
  size?: "sm" | "md" | "lg";
  onSelect?: (value: string) => void;
  onOpenChange?: (open: boolean) => void;
}

function MenuFacade(props: MenuFacadeProps) {
  injectComponentStyle("menu");

  return (
    <MenuRoot
      size={props.size ?? "md"}
      {...(props.open === undefined ? {} : { open: props.open })}
      {...(props.defaultOpen === undefined ? {} : { defaultOpen: props.defaultOpen })}
      {...(props.placement === undefined ? {} : { positioning: { placement: props.placement } })}
      onSelect={(details: { value: string }) => props.onSelect?.(details.value)}
      onOpenChange={(details: { open: boolean }) => props.onOpenChange?.(details.open)}
    >
      <ArkMenu.Trigger disabled={props.disabled}>
        {props.trigger}
        <ArkMenu.Indicator>
          {iconNode("chevron-down", { width: "14", height: "14" })}
        </ArkMenu.Indicator>
      </ArkMenu.Trigger>
      <ArkMenu.Positioner>
        <MenuContent>
          <For each={props.items}>
            {(item) => (
              <ArkMenu.Item value={item.value} disabled={item.disabled}>
                {item.label}
              </ArkMenu.Item>
            )}
          </For>
        </MenuContent>
      </ArkMenu.Positioner>
    </MenuRoot>
  );
}

/* Ark's namespace is frozen — spread copies the members so Root and
 * Content can be the sized wrappers while the rest stay Ark's own parts. */
export const Menu: typeof MenuFacade &
  Omit<typeof ArkMenu, "Root" | "Content"> & {
    Root: typeof MenuRoot;
    Content: typeof MenuContent;
  } = defineFamily(MenuFacade, {
  ...ArkMenu,
  Root: MenuRoot,
  Content: MenuContent,
});

injectComponentStyle("menu");
