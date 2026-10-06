import { Menu as ArkMenu } from "@ark-ui/solid/menu";
import { injectComponentStyle } from "@bysages/core";
import { For, splitProps } from "solid-js";
import type { JSX } from "solid-js";
import { Portal } from "solid-js/web";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";
import { Button } from "../button";
import { useComponentMessages } from "../config-provider/use-component-messages";
import { Menu } from "../menu";

export interface SplitButtonEntry {
  label: string;
  /** Handed back with `onSelect` when the entry is chosen. */
  value: string;
  danger?: boolean;
  disabled?: boolean;
}

export interface SplitButtonProps extends Omit<
  JSX.HTMLAttributes<HTMLDivElement>,
  "onClick" | "onSelect"
> {
  /** The main action's label. */
  label: string;
  /** The dropdown's entries. */
  items?: SplitButtonEntry[];
  /** How both halves rest; the arrow always reads as one control with
   * the main button. */
  variant?: "solid" | "outline" | "ghost" | "subtle";
  tone?: "ink" | "info" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  /** The main button was pressed. */
  onClick?: (event: MouseEvent) => void;
  /** An entry was chosen; carries its `value`. */
  onSelect?: (value: string) => void;
}

/**
 * A primary action with its alternatives one seam away: the main button
 * fires `onClick`, the fitted arrow opens a paper vessel of the same
 * register whose entries call `onSelect` with their value. The arrow is
 * the menu machine's trigger with the button recipe riding over it —
 * the machine keeps the element (positioning, focus, `data-state`), the
 * button stylesheet's trigger register dresses it. The popup keeps the
 * menu parts untouched.
 */
function SplitButtonImpl(props: SplitButtonProps) {
  injectComponentStyle("split-button");
  injectComponentStyle("menu");
  const [own, rest] = splitProps(props, [
    "label",
    "items",
    "variant",
    "tone",
    "size",
    "disabled",
    "onClick",
    "onSelect",
    "children",
  ]);
  const variant = () => own.variant ?? "solid";
  const tone = () => own.tone ?? "ink";
  const size = () => own.size ?? "md";
  const id = useElementId("split-button-menu");
  const messages = useComponentMessages();
  return (
    <div {...rest} data-scope="split-button" data-part="root">
      <Button
        variant={variant()}
        tone={tone()}
        size={size()}
        disabled={own.disabled}
        onClick={(event) => own.onClick?.(event)}
      >
        {own.label}
      </Button>
      <ArkMenu.Root id={id()} positioning={{ placement: "bottom-end" }}>
        <ArkMenu.Trigger
          // The machine's trigger anatomy stays on the element
          // (data-scope="menu", data-part="trigger") and the button
          // recipe's seals go on top — the trigger register reads them.
          asChild={(propsFn) => (
            <button
              {...propsFn()}
              type="button"
              disabled={own.disabled}
              aria-label={messages().more.actions}
              data-variant={variant()}
              data-tone={tone()}
              data-size={size()}
              data-square="true"
              data-motion="ink-ripple lit"
            >
              {chevronDown()}
            </button>
          )}
        />
        <Portal>
          <ArkMenu.Positioner>
            <ArkMenu.Content>
              <For each={own.items ?? []}>
                {(entry) => (
                  <ArkMenu.Item
                    value={entry.value}
                    disabled={entry.disabled}
                    // Danger rides a data flag of our own — the
                    // split-button stylesheet tints the row.
                    data-danger={entry.danger ? "" : undefined}
                    onSelect={() => own.onSelect?.(entry.value)}
                  >
                    <ArkMenu.ItemText>{entry.label}</ArkMenu.ItemText>
                  </ArkMenu.Item>
                )}
              </For>
            </ArkMenu.Content>
          </ArkMenu.Positioner>
        </Portal>
      </ArkMenu.Root>
    </div>
  );
}

/** One stroke pointing down: all a fitted dropdown arrow needs. */
function chevronDown() {
  return iconNode("chevron-down", { width: "16", height: "16" });
}
// The popup keeps the menu parts, so the menu stylesheet dresses them.

export const SplitButton = defineFamily(SplitButtonImpl, Menu) as typeof SplitButtonImpl &
  typeof Menu;
