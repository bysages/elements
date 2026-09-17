import { injectComponentStyle } from "@bysages/core";
import { Index, splitProps } from "solid-js";
import type { JSX } from "solid-js";

import { Button } from "../button";
import { Input } from "../input";

export interface DynamicInputProps extends JSX.HTMLAttributes<HTMLDivElement> {
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
  /** Every edit emits a fresh array; the caller's array stays the only
   * truth. */
  onValueChange?: (value: string[]) => void;
}

/**
 * A column of entry rows: one Input per line, each with a quiet remove
 * seal, and an add row at the tail. The list is controlled — every edit
 * calls `onValueChange` with a fresh array and the caller's array stays
 * the only truth. Deleting never drops below `min`, adding never grows
 * past `max`, and the group always keeps one row: an entry list that
 * emptied itself would leave the reader no place to type.
 */
export function DynamicInput(props: DynamicInputProps) {
  const [own, rest] = splitProps(props, [
    "value",
    "min",
    "max",
    "placeholder",
    "addLabel",
    "disabled",
    "invalid",
    "onValueChange",
    "children",
  ]);

  const values = () => own.value ?? [""];

  const update = (index: number, value: string) => {
    const next = values().slice();
    next[index] = value;
    own.onValueChange?.(next);
  };

  const remove = (index: number) => {
    const next = values().filter((_, i) => i !== index);
    // Emptied by the last removal, the group resets to one blank row
    // instead of vanishing.
    own.onValueChange?.(next.length > 0 ? next : [""]);
  };

  const add = () => {
    own.onValueChange?.([...values(), ""]);
  };

  const canRemove = () => values().length > Math.max(own.min ?? 0, 1);
  const canAdd = () => own.max === undefined || values().length < own.max;

  return (
    <div {...rest} data-scope="dynamic-input" data-part="root">
      {/* Rows are positional: Index keeps each row's Input mounted while
          its value edits, where keyed-by-reference diffing would remount
          the row and drop the caret on every keystroke. */}
      <Index each={values()}>
        {(value, index) => (
          <div data-scope="dynamic-input" data-part="row">
            <Input
              value={value()}
              placeholder={own.placeholder}
              disabled={own.disabled}
              invalid={own.invalid}
              onValueChange={(next) => update(index, next)}
            />
            <Button
              variant="ghost"
              square
              disabled={own.disabled || !canRemove()}
              aria-label={`Remove entry ${index + 1}`}
              onClick={() => remove(index)}
            >
              {crossIcon()}
            </Button>
          </div>
        )}
      </Index>
      <div data-scope="dynamic-input" data-part="add">
        <Button variant="ghost" disabled={own.disabled || !canAdd()} onClick={() => add()}>
          +{own.addLabel ?? "Add entry"}
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
      stroke-width={1.75}
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

injectComponentStyle("dynamic-input");
