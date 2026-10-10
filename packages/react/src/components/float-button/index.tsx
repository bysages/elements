import { injectComponentStyle } from "@bysages/core/styling";
import type { HTMLAttributes, ReactNode } from "react";
import { createContext, useContext, useState } from "react";

import { useComponentMessages } from "../../internal/messages";
import { Button } from "../button";

export type FloatButtonPlacement = "bottom-end" | "bottom-start" | "top-end" | "top-start";

export type FloatButtonSize = "sm" | "md" | "lg";

/** The group's openness, shared from the mooring to its parts. */
export interface FloatButtonContextValue {
  open: boolean;
  /** The group's button rung; the trigger takes it whole, the items
   * step down one. */
  size: FloatButtonSize;
  toggle: () => void;
  /** Folds the fan — an Item calls this once its action fires, the way
   * a speed dial closes after a choice. */
  close: () => void;
}

/** Context for {@link FloatButtonContextValue}, exported so a custom
 * part can read the group's state. */
export const FLOAT_BUTTON_CONTEXT = createContext<FloatButtonContextValue | null>(null);

export interface FloatButtonRootProps extends HTMLAttributes<HTMLDivElement> {
  /** Controlled openness: leave unset to let the group hold its own
   * state; while set, the Trigger reports back through
   * `onOpenChange`. */
  open?: boolean;
  /** Which corner the group moors at. */
  placement?: FloatButtonPlacement;
  /** One rung of the button ladder for the whole group. */
  size?: FloatButtonSize;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
}

/**
 * A floating action and its fanned-out alternatives — FAB and speed
 * dial in one family. The Root moors the group at a page corner and
 * holds the openness (mirrored from `open` when controlled); the
 * Trigger flips it; each Item is a round action with its name surfacing
 * beside it while the group is open. The buttons are the shared recipe
 * (vessels here: round); this family owns only the mooring, the fan
 * and the fold.
 */
function Root({
  open: openProp,
  placement = "bottom-end",
  size,
  onOpenChange,
  children,
  ...rest
}: FloatButtonRootProps) {
  const [inner, setInner] = useState(false);
  const open = openProp !== undefined ? openProp : inner;
  const setOpen = (value: boolean) => {
    setInner(value);
    onOpenChange?.(value);
  };
  return (
    <FLOAT_BUTTON_CONTEXT.Provider
      value={{
        open,
        size: size ?? "lg",
        toggle: () => setOpen(!open),
        close: () => setOpen(false),
      }}
    >
      <div
        {...rest}
        data-scope="float-button"
        data-part="root"
        data-placement={placement}
        data-state={open ? "open" : "closed"}
      >
        {children}
      </div>
    </FLOAT_BUTTON_CONTEXT.Provider>
  );
}

const STEP_DOWN: Record<FloatButtonSize, "sm" | "md"> = {
  lg: "md",
  md: "sm",
  sm: "sm",
};

function Trigger({ label, children }: { label?: string; children?: ReactNode }) {
  const context = useContext(FLOAT_BUTTON_CONTEXT);
  const messages = useComponentMessages();
  return (
    <Button
      variant="solid"
      square
      size={context?.size ?? "lg"}
      onClick={() => context?.toggle()}
      aria-label={label || messages.floatButton.actions}
      aria-expanded={context ? context.open : false}
    >
      {children}
    </Button>
  );
}

interface FloatButtonItemProps {
  /** The action's name: the button's accessible name and the
   * annotation surfaced beside it while the group is open. */
  label: string;
  disabled?: boolean;
  onClick?: () => void;
  children?: ReactNode;
}

function Item({ label, disabled = false, onClick, children }: FloatButtonItemProps) {
  const context = useContext(FLOAT_BUTTON_CONTEXT);
  return (
    <div data-scope="float-button" data-part="item">
      <Button
        variant="outline"
        square
        size={context ? STEP_DOWN[context.size] : "md"}
        disabled={disabled}
        aria-label={label}
        onClick={() => {
          onClick?.();
          // The dial folds once the action is chosen.
          context?.close();
        }}
      >
        {children}
      </Button>
      <span
        data-scope="float-button"
        data-part="item-label"
        // The accessible name rides the button; the annotation is
        // for the eyes only.
        aria-hidden="true"
      >
        {label}
      </span>
    </div>
  );
}

export const FloatButton = Object.assign(Root, { Root, Trigger, Item });

injectComponentStyle("float-button");
