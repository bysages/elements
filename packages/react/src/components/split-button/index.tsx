import { Menu as ArkMenu } from "@ark-ui/react/menu";
import { Portal } from "@ark-ui/react/portal";
import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes } from "react";

import { Button } from "../button";

export interface SplitButtonEntry {
  label: string;
  /** Handed back with `onSelect` when the entry is chosen. */
  value: string;
  danger?: boolean;
  disabled?: boolean;
}

export interface SplitButtonProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
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
  onClick?: () => void;
  /** An entry was chosen; carries its `value`. */
  onSelect?: (value: string) => void;
}

/**
 * A primary action with its alternatives one seam away: the main button
 * fires `onClick`, the fitted arrow opens a paper vessel of the same
 * register whose entries report `onSelect` with their value. The arrow
 * is the menu machine's trigger grafting the button recipe — the
 * machine keeps the element (positioning, focus, `data-state`), the
 * button stylesheet's trigger register dresses it. The popup keeps the
 * menu parts untouched.
 */
export function SplitButton({
  label,
  items = [],
  variant = "solid",
  tone = "ink",
  size = "md",
  disabled = false,
  onClick,
  onSelect,
  ...rest
}: SplitButtonProps) {
  return (
    <div {...rest} data-scope="split-button" data-part="root">
      <Button variant={variant} tone={tone} size={size} disabled={disabled} onClick={onClick}>
        {label}
      </Button>
      <ArkMenu.Root positioning={{ placement: "bottom-end" }}>
        <ArkMenu.Trigger asChild>
          {/* The arrow gives the machine the element and keeps only the
             recipe's seals — the anatomy (data-scope, data-part) stays
             the menu trigger's, which the seam stylesheet reads. */}
          <button
            type="button"
            disabled={disabled}
            data-variant={variant}
            data-tone={tone}
            data-size={size}
            data-square="true"
            data-motion="ink-ripple lit"
            aria-label="More actions"
          >
            {chevronDown()}
          </button>
        </ArkMenu.Trigger>
        <Portal>
          <ArkMenu.Positioner>
            <ArkMenu.Content>
              {items.map((entry) => (
                <ArkMenu.Item
                  key={entry.value}
                  value={entry.value}
                  disabled={entry.disabled}
                  // Danger rides a data flag of our own — the
                  // split-button stylesheet tints the row.
                  data-danger={entry.danger ? "" : undefined}
                  onSelect={() => onSelect?.(entry.value)}
                >
                  <ArkMenu.ItemText>{entry.label}</ArkMenu.ItemText>
                </ArkMenu.Item>
              ))}
            </ArkMenu.Content>
          </ArkMenu.Positioner>
        </Portal>
      </ArkMenu.Root>
    </div>
  );
}

/** One stroke pointing down: all a fitted dropdown arrow needs. */
function chevronDown() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

injectComponentStyle("split-button");
// The popup keeps the menu parts, so the menu stylesheet dresses them.
injectComponentStyle("menu");
