import { injectComponentStyle } from "@bysages/core/styling";
import type { HTMLAttributes } from "react";
import { useState, type MouseEvent } from "react";

import { withSelfRoot } from "../../internal/family";
import { iconNode } from "../../internal/icon";

export interface TagProps extends Omit<HTMLAttributes<HTMLElement>, "defaultValue"> {
  /** The pigment the tag is inked with; ink is the solemn default,
   * and the fixed pigments speak for their meaning. */
  tone?: "ink" | "primary" | "success" | "warning" | "danger" | "info";
  /** How the tag rests: a solid fill, an outline shell, a subtle
   * wash. The pressed state always reads as solid. */
  variant?: "solid" | "outline" | "subtle";
  /** Render the tag as a pressed button the consumer can toggle. */
  checkable?: boolean;
  /** The pressed state held from outside; omit it and the tag keeps
   * its own state from `defaultValue`. */
  value?: boolean;
  defaultValue?: boolean;
  /** Render the quiet removal seal. */
  closable?: boolean;
  disabled?: boolean;
  onValueChange?: (checked: boolean) => void;
  onClose?: () => void;
}

/** A small named seal for filtering and cataloguing. The resting shape
 * is a span; `checkable` raises it to a pressed button, and `closable`
 * hangs the removal seal inside — dismissal stays the consumer's state,
 * the way the banner's does. */
function TagImpl({
  tone = "ink",
  variant = "solid",
  checkable = false,
  value,
  defaultValue = false,
  closable = false,
  disabled = false,
  onValueChange,
  onClose,
  children,
  ...rest
}: TagProps) {
  injectComponentStyle("tag");
  const [internalChecked, setInternalChecked] = useState(defaultValue);
  const checked = value ?? internalChecked;

  const toggle = () => {
    if (disabled) return;
    const next = !checked;
    setInternalChecked(next);
    onValueChange?.(next);
  };

  const dismiss = (event: MouseEvent<HTMLElement>) => {
    // Removal never reaches the checkable root: closing a tag is not
    // pressing it.
    event.stopPropagation();
    if (disabled) return;
    onClose?.();
  };

  const pressed = checkable && checked;
  const closeControl = closable ? (
    <button
      data-scope="tag"
      data-part="close"
      type="button"
      aria-label="Remove"
      disabled={disabled}
      onClick={dismiss}
    >
      {iconNode("x")}
    </button>
  ) : null;

  const partProps = {
    ...rest,
    "data-scope": "tag",
    "data-part": "root",
    "data-tone": tone,
    "data-variant": variant,
    ...(checkable ? { "data-checkable": "true" } : {}),
    ...(pressed ? { "data-checked": "true" } : {}),
    ...(disabled ? { "data-disabled": "true" } : {}),
  } as HTMLAttributes<HTMLElement>;

  // A button cannot contain another control. When both actions are on,
  // the visual tag becomes a group: the check control and the close
  // control stay siblings, independently focusable and announced.
  if (checkable && closable) {
    return (
      <span {...partProps}>
        <button
          data-scope="tag"
          data-part="check"
          type="button"
          aria-pressed={checked}
          disabled={disabled}
          onClick={toggle}
        >
          {children}
        </button>
        {closeControl}
      </span>
    );
  }

  if (checkable) {
    return (
      <button
        {...partProps}
        type="button"
        aria-pressed={checked}
        disabled={disabled}
        onClick={toggle}
      >
        {children}
        {closeControl}
      </button>
    );
  }

  return (
    <span {...partProps} {...(disabled ? { "aria-disabled": "true" } : {})}>
      {children}
      {closeControl}
    </span>
  );
}

TagImpl.displayName = "STag";

export const Tag = withSelfRoot(TagImpl);
