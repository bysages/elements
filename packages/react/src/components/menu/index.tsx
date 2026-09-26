import { Menu as ArkMenu } from "@ark-ui/react/menu";
import { injectComponentStyle } from "@bysages/core";
import { createContext, useContext } from "react";

/** The row rung rides the context because Ark's Root renders no DOM of
 * its own — the vessel (Content) is the element the rung can land on,
 * and the Portal breaks CSS ancestry between the two. */
const MenuSizeContext = createContext<"sm" | "md" | "lg">("md");

type MenuRootProps = Parameters<typeof ArkMenu.Root>[0] & {
  /** One rung of the control-height ladder for the vessel's rows. */
  size?: "sm" | "md" | "lg";
};

function MenuRoot({ size = "md", ...rest }: MenuRootProps) {
  return (
    <MenuSizeContext.Provider value={size}>
      <ArkMenu.Root {...rest} />
    </MenuSizeContext.Provider>
  );
}

function MenuContent(props: Parameters<typeof ArkMenu.Content>[0]) {
  const size = useContext(MenuSizeContext);
  return <ArkMenu.Content {...props} data-size={size} />;
}

/** Ark's Menu, dressed in the paper-and-ink system: a quiet paper vessel on
 * elevation, hover as light on the row, checked items as the flat ink fill.
 * The parts — Root, Trigger, ContextTrigger, Indicator, Positioner,
 * Content, Item, ItemText, ItemIndicator, ItemGroup, ItemGroupLabel,
 * TriggerItem, Separator, Arrow, ArrowTip. Ark's namespace is frozen —
 * spread copies the members so Root and Content can be the sized
 * wrappers while the rest stay Ark's own parts. */
export const Menu: Omit<typeof ArkMenu, "Root" | "Content"> & {
  Root: typeof MenuRoot;
  Content: typeof MenuContent;
} = {
  ...ArkMenu,
  Root: MenuRoot,
  Content: MenuContent,
};

injectComponentStyle("menu");
