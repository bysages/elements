import { Menu as ArkMenu } from "@ark-ui/react/menu";
import { injectComponentStyle } from "@bysages/core/styling";
import { createContext, useContext, type ComponentProps } from "react";

import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

/** The row rung rides the context because Ark's Root renders no DOM of
 * its own — the vessel (Content) is the element the rung can land on,
 * and the Portal breaks CSS ancestry between the two. */
const MenuSizeContext = createContext<"sm" | "md" | "lg">("md");

type MenuRootProps = ComponentProps<typeof ArkMenu.Root> & {
  /** One rung of the control-height ladder for the vessel's rows. */
  size?: "sm" | "md" | "lg";
};

function MenuRoot(props: MenuRootProps) {
  const id = useElementId("menu", props);
  const { size = "md", ...rest } = props;

  return (
    <MenuSizeContext.Provider value={size}>
      <ArkMenu.Root {...rest} id={id} />
    </MenuSizeContext.Provider>
  );
}

function MenuContent(props: ComponentProps<typeof ArkMenu.Content>) {
  const size = useContext(MenuSizeContext);
  return <ArkMenu.Content {...props} data-size={size} />;
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

function MenuFacade({
  open,
  defaultOpen,
  trigger,
  items,
  disabled = false,
  placement = "bottom-start",
  size = "md",
  onSelect,
  onOpenChange,
}: MenuFacadeProps) {
  return (
    <MenuRoot
      size={size}
      positioning={{ placement }}
      {...(open === undefined ? {} : { open })}
      {...(defaultOpen === undefined ? {} : { defaultOpen })}
      onSelect={(details: { value: string }) => onSelect?.(details.value)}
      onOpenChange={(details: { open: boolean }) => onOpenChange?.(details.open)}
    >
      <ArkMenu.Trigger disabled={disabled}>
        {trigger}
        <ArkMenu.Indicator>{iconNode("chevron-down", { width: 14, height: 14 })}</ArkMenu.Indicator>
      </ArkMenu.Trigger>
      <ArkMenu.Positioner>
        <MenuContent>
          {items.map((item) => (
            <ArkMenu.Item key={item.value} value={item.value} disabled={item.disabled}>
              {item.label}
            </ArkMenu.Item>
          ))}
        </MenuContent>
      </ArkMenu.Positioner>
    </MenuRoot>
  );
}

MenuFacade.displayName = "SMenu";

type MenuParts = Omit<typeof ArkMenu, "Root" | "Content"> & {
  Root: typeof MenuRoot;
  Content: typeof MenuContent;
};

/* Ark's namespace is frozen — spread copies the members so Root and
 * Content can be the sized wrappers while the rest stay Ark's own parts. */
export const Menu = Object.assign(MenuFacade, {
  ...ArkMenu,
  Root: MenuRoot,
  Content: MenuContent,
}) as typeof MenuFacade & MenuParts;

injectComponentStyle("menu");
