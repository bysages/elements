import { injectComponentStyle } from "@bysages/core/styling";
import { createMemo, createSignal, splitProps } from "solid-js";
import type { JSX } from "solid-js";

import { withSelfRoot } from "../../internal/family";
import { iconNode } from "../../internal/icon";

type TagTone = "ink" | "primary" | "success" | "warning" | "danger" | "info";
type TagVariant = "solid" | "outline" | "subtle";

export interface TagProps extends Omit<JSX.HTMLAttributes<HTMLElement>, "ref"> {
  /** The pigment the tag is inked with; ink is the solemn default,
   * and the fixed pigments speak for their meaning. */
  tone?: TagTone;
  /** How the tag rests: a solid fill, an outline shell, a subtle
   * wash. The pressed state always reads as solid. */
  variant?: TagVariant;
  /** Render the tag as a pressed button the consumer can toggle. */
  checkable?: boolean;
  /** The pressed state held from outside; omit it and the tag keeps
   * its own state from `defaultValue`. */
  checked?: boolean;
  defaultValue?: boolean;
  /** Render the quiet removal seal. */
  closable?: boolean;
  disabled?: boolean;
  /** Reports the next pressed state from a checkable tag. */
  onValueChange?: (checked: boolean) => void;
  /** Reports a dismissal from the removal seal. */
  onClose?: () => void;
}

export const Tag = withSelfRoot(function Tag(props: TagProps) {
  injectComponentStyle("tag");

  const [own, rest] = splitProps(props, [
    "tone",
    "variant",
    "checkable",
    "checked",
    "defaultValue",
    "closable",
    "disabled",
    "children",
    "onValueChange",
    "onClose",
  ]);
  const [internalChecked, setInternalChecked] = createSignal(own.defaultValue ?? false);
  const checked = createMemo(() => own.checked ?? internalChecked());
  const pressed = () => (own.checkable ? checked() : false);

  const toggle = () => {
    if (own.disabled) return;
    const next = !checked();
    setInternalChecked(next);
    own.onValueChange?.(next);
  };

  const dismiss = (event: MouseEvent) => {
    // Removal never reaches the checkable root: closing a tag is not
    // pressing it.
    event.stopPropagation();
    if (own.disabled) return;
    own.onClose?.();
  };

  const rootAttrs = () => ({
    "data-scope": "tag",
    "data-part": "root",
    "data-tone": own.tone ?? "ink",
    "data-variant": own.variant ?? "solid",
    ...(own.checkable ? { "data-checkable": "true" } : {}),
    ...(pressed() ? { "data-checked": "true" } : {}),
    ...(own.disabled ? { "data-disabled": "true" } : {}),
  });
  const closeControl = own.closable ? (
    <button
      type="button"
      data-scope="tag"
      data-part="close"
      aria-label="Remove"
      disabled={own.disabled}
      onclick={dismiss}
    >
      {iconNode("x")}
    </button>
  ) : null;

  // A button cannot contain another control. When both actions are on,
  // the visual tag keeps the check control and the close control as
  // siblings, independently focusable and announced.
  if (own.checkable && own.closable) {
    return (
      <span {...rest} {...rootAttrs()}>
        <button
          type="button"
          data-scope="tag"
          data-part="check"
          aria-pressed={checked()}
          disabled={own.disabled}
          onclick={toggle}
        >
          {own.children}
        </button>
        {closeControl}
      </span>
    );
  }

  if (own.checkable) {
    return (
      <button
        {...rest}
        {...rootAttrs()}
        type="button"
        aria-pressed={checked()}
        disabled={own.disabled}
        onclick={toggle}
      >
        {own.children}
        {closeControl}
      </button>
    );
  }

  return (
    <span {...rest} {...rootAttrs()} {...(own.disabled ? { "aria-disabled": "true" } : {})}>
      {own.children}
      {closeControl}
    </span>
  );
});
