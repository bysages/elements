import { injectComponentStyle } from "@bysages/core";
import { createContext, createSignal, useContext, splitProps } from "solid-js";
import type { JSX } from "solid-js";

import { Button } from "../button";
import { useComponentMessages } from "../config-provider/use-component-messages";

export type FloatButtonPlacement = "bottom-end" | "bottom-start" | "top-end" | "top-start";

export type FloatButtonSize = "sm" | "md" | "lg";

/** The group's openness, shared from the mooring to its parts. */
export interface FloatButtonContext {
  open: () => boolean;
  /** The group's button rung; the trigger takes it whole, the items
   * step down one. */
  size: () => FloatButtonSize;
  toggle: () => void;
  /** Folds the fan — an Item calls this once its action fires, the way
   * a speed dial closes after a choice. */
  close: () => void;
}

/** Solid context for {@link FloatButtonContext}, exported so a custom
 * part can read the group's state with `useContext`. */
export const FloatButtonContextKey = createContext<FloatButtonContext>();

export interface FloatButtonRootProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /** Controlled openness: leave unset to let the group hold its own
   * state; while set, the Trigger reports back through
   * `onOpenChange`. */
  open?: boolean;
  /** Which corner the group moors at. */
  placement?: FloatButtonPlacement;
  /** One rung of the button ladder for the whole group. */
  size?: FloatButtonSize;
  /** The openness changed — from the Trigger, or an Item folding the
   * fan. */
  onOpenChange?: (open: boolean) => void;
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
function FloatButtonRoot(props: FloatButtonRootProps) {
  const [own, rest] = splitProps(props, ["open", "placement", "size", "onOpenChange"]);
  const [inner, setInner] = createSignal(false);
  const open = () => own.open ?? inner();
  const setOpen = (value: boolean) => {
    setInner(value);
    own.onOpenChange?.(value);
  };
  const context: FloatButtonContext = {
    open,
    size: () => own.size ?? "lg",
    toggle: () => setOpen(!open()),
    close: () => setOpen(false),
  };
  return (
    <FloatButtonContextKey.Provider value={context}>
      <div
        {...rest}
        data-scope="float-button"
        data-part="root"
        data-placement={own.placement ?? "bottom-end"}
        data-state={open() ? "open" : "closed"}
      />
    </FloatButtonContextKey.Provider>
  );
}

export interface FloatButtonTriggerProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  /** The accessible name; the control is icon-only. */
  label?: string;
}

const STEP_DOWN: Record<FloatButtonSize, "sm" | "md"> = { lg: "md", md: "sm", sm: "sm" };

function FloatButtonTrigger(props: FloatButtonTriggerProps) {
  const [own, rest] = splitProps(props, ["label", "children"]);
  const context = useContext(FloatButtonContextKey);
  const messages = useComponentMessages();
  return (
    <Button
      {...rest}
      variant="solid"
      square
      size={context?.size() ?? "lg"}
      onClick={() => context?.toggle()}
      aria-label={own.label || messages().floatButton.actions}
      aria-expanded={context?.open() ?? false}
    >
      {own.children}
    </Button>
  );
}

export interface FloatButtonItemProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "onClick"> {
  /** The action's name: the button's accessible name and the
   * annotation surfaced beside it while the group is open. */
  label: string;
  disabled?: boolean;
  /** The action fired — the fan folds right after. */
  onClick?: (event: MouseEvent) => void;
}

function FloatButtonItem(props: FloatButtonItemProps) {
  const [own, rest] = splitProps(props, ["label", "disabled", "onClick", "children"]);
  const context = useContext(FloatButtonContextKey);
  return (
    <div {...rest} data-scope="float-button" data-part="item">
      <Button
        variant="outline"
        square
        size={context ? STEP_DOWN[context.size()] : "md"}
        disabled={own.disabled}
        aria-label={own.label}
        onClick={(event) => {
          own.onClick?.(event);
          // The dial folds once the action is chosen.
          context?.close();
        }}
      >
        {own.children}
      </Button>
      <span
        data-scope="float-button"
        data-part="item-label"
        // The accessible name rides the button; the annotation is
        // for the eyes only.
        aria-hidden="true"
      >
        {own.label}
      </span>
    </div>
  );
}

export const FloatButton = Object.assign(FloatButtonRoot, {
  Root: FloatButtonRoot,
  Trigger: FloatButtonTrigger,
  Item: FloatButtonItem,
});

injectComponentStyle("float-button");
