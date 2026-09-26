import { Menu as ArkMenu } from "@ark-ui/solid/menu";
import { injectComponentStyle } from "@bysages/core";
import { createContext, splitProps, useContext } from "solid-js";

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
  return (
    <MenuSizeContext.Provider value={() => own.size ?? "md"}>
      <ArkMenu.Root {...rest} />
    </MenuSizeContext.Provider>
  );
}

function MenuContent(props: Parameters<typeof ArkMenu.Content>[0]) {
  const size = useContext(MenuSizeContext);
  return <ArkMenu.Content {...props} data-size={size?.() ?? "md"} />;
}

/* Ark's namespace is frozen — spread copies the members so Root and
 * Content can be the sized wrappers while the rest stay Ark's own parts. */
export const Menu: Omit<typeof ArkMenu, "Root" | "Content"> & {
  Root: typeof MenuRoot;
  Content: typeof MenuContent;
} = {
  ...ArkMenu,
  Root: MenuRoot,
  Content: MenuContent,
};

injectComponentStyle("menu");
