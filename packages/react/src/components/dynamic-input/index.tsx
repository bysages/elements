import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes } from "react";

import { Button } from "../button";
import { Input } from "../input";

export interface DynamicInputProps extends HTMLAttributes<HTMLDivElement> {
  /** The rows' values; the group renders one Input per entry. */
  value?: string[];
  /** The fewest rows the group keeps; the remove seals yield first. */
  min?: number;
  /** The most rows the group grows to; the add control yields then. */
  max?: number;
  placeholder?: string;
  /** The add control's visible words. */
  addLabel?: string;
  disabled?: boolean;
  invalid?: boolean;
  onValueChange?: (value: string[]) => void;
}

/**
 * A column of entry rows: one Input per line, each with a quiet remove
 * seal, and an add row at the tail. The list is controlled — every edit
 * reports a fresh array through `onValueChange` and the caller's array
 * stays the only truth. Deleting never drops below `min`, adding never
 * grows past `max`, and the group always keeps one row: an entry list
 * that emptied itself would leave the reader no place to type.
 */
export function DynamicInput({
  value,
  min = 0,
  max,
  placeholder,
  addLabel = "Add entry",
  disabled = false,
  invalid = false,
  onValueChange,
  children: _children,
  ...rest
}: DynamicInputProps) {
  const values = value ?? [""];

  const update = (index: number, next: string) => {
    const rows = values.slice();
    rows[index] = next;
    onValueChange?.(rows);
  };

  const remove = (index: number) => {
    const rows = values.filter((_, i) => i !== index);
    // Emptied by the last removal, the group resets to one blank row
    // instead of vanishing.
    onValueChange?.(rows.length > 0 ? rows : [""]);
  };

  const add = () => {
    onValueChange?.([...values, ""]);
  };

  const canRemove = values.length > Math.max(min, 1);
  const canAdd = max === undefined || values.length < max;

  return (
    <div {...rest} data-scope="dynamic-input" data-part="root">
      {values.map((value, index) => (
        <div key={index} data-scope="dynamic-input" data-part="row">
          <Input
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            invalid={invalid}
            onValueChange={(next) => update(index, next)}
          />
          <Button
            variant="ghost"
            square
            disabled={disabled || !canRemove}
            aria-label={`Remove entry ${index + 1}`}
            onClick={() => remove(index)}
          >
            {crossIcon()}
          </Button>
        </div>
      ))}
      <div data-scope="dynamic-input" data-part="add">
        <Button variant="ghost" disabled={disabled || !canAdd} onClick={() => add()}>
          +{addLabel}
        </Button>
      </div>
    </div>
  );
}

/** The one glyph a remove seal needs: a single crossing stroke. */
function crossIcon() {
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
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

injectComponentStyle("dynamic-input");
