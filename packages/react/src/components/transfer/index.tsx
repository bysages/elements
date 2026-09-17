import { Checkbox as ArkCheckbox } from "@ark-ui/react/checkbox";
import { injectComponentStyle } from "@bysages/core";
import { useState } from "react";
import type { HTMLAttributes, ReactNode } from "react";

import { Button } from "../button";
import { Input } from "../input";

export interface TransferItem {
  label: string;
  value: string;
  disabled?: boolean;
}

const checkGlyph = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={3}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m5 12.5 5 5L19 7" />
  </svg>
);

function arrowGlyph(direction: "right" | "left") {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={direction === "right" ? "M5 12h14m-6-6 6 6-6 6" : "M19 12H5m6-6-6 6 6 6"} />
    </svg>
  );
}

export interface TransferProps extends HTMLAttributes<HTMLDivElement> {
  value?: string[];
  data: TransferItem[];
  titles?: string[];
  searchable?: boolean;
  disabled?: boolean;
  onValueChange?: (value: string[]) => void;
}

/**
 * Two ledgers and a crossing: items sit in the source column until the
 * reader checks them and walks them across — and back, the same way.
 * `value` is the target column's value list; everything else in `data`
 * stays on the left. `searchable` adds a filter line to each panel.
 */
export function Transfer({
  value = [],
  data,
  titles = ["Source", "Target"],
  searchable = false,
  disabled = false,
  onValueChange,
  ...rest
}: TransferProps) {
  const [checkedSource, setCheckedSource] = useState<Set<string>>(() => new Set());
  const [checkedTarget, setCheckedTarget] = useState<Set<string>>(() => new Set());
  const [sourceQuery, setSourceQuery] = useState("");
  const [targetQuery, setTargetQuery] = useState("");

  const target = new Set(value);

  function panelItems(values: TransferItem[], inTarget: boolean, query: string) {
    return values.filter(
      (item) =>
        item.label.toLowerCase().includes(query.toLowerCase()) &&
        target.has(item.value) === inTarget,
    );
  }

  function toggle(side: "source" | "target", option: string) {
    const setter = side === "source" ? setCheckedSource : setCheckedTarget;
    setter((prev) => {
      const next = new Set(prev);
      if (next.has(option)) next.delete(option);
      else next.add(option);
      return next;
    });
  }

  function move(toTarget: boolean) {
    const moving = toTarget ? checkedSource : checkedTarget;
    if (moving.size === 0) return;
    const next = toTarget
      ? [...value, ...moving].filter((entry, index, all) => all.indexOf(entry) === index)
      : value.filter((entry) => !moving.has(entry));
    if (toTarget) setCheckedSource(new Set());
    else setCheckedTarget(new Set());
    onValueChange?.(next);
  }

  function panel(
    side: "source" | "target",
    title: string,
    query: string,
    onQuery: (value: string) => void,
    checked: Set<string>,
    items: TransferItem[],
  ): ReactNode {
    return (
      <div data-scope="transfer" data-part="panel" data-side={side}>
        <div data-scope="transfer" data-part="head">
          <span data-scope="transfer" data-part="title">
            {title}
          </span>
          <span data-scope="transfer" data-part="count">
            {items.length}
          </span>
        </div>
        {searchable ? (
          <div data-scope="transfer" data-part="search">
            <Input
              size="sm"
              value={query}
              onValueChange={onQuery}
              placeholder="Filter…"
              aria-label={`Filter ${title}`}
            />
          </div>
        ) : null}
        <div data-scope="transfer" data-part="list">
          {items.length === 0 ? (
            <p data-scope="transfer" data-part="empty">
              Nothing here
            </p>
          ) : (
            items.map((item) => {
              const locked = disabled || item.disabled === true;
              return (
                <ArkCheckbox.Root
                  key={item.value}
                  checked={checked.has(item.value)}
                  disabled={locked}
                  onCheckedChange={() => toggle(side, item.value)}
                >
                  <ArkCheckbox.Control>
                    <ArkCheckbox.Indicator>{checkGlyph}</ArkCheckbox.Indicator>
                  </ArkCheckbox.Control>
                  <ArkCheckbox.Label data-part="label">{item.label}</ArkCheckbox.Label>
                  <ArkCheckbox.HiddenInput />
                </ArkCheckbox.Root>
              );
            })
          )}
        </div>
      </div>
    );
  }

  const items = panelItems(data, false, sourceQuery);
  const targetItems = panelItems(data, true, targetQuery);

  return (
    <div {...rest} data-scope="transfer" data-part="root">
      {panel("source", titles[0], sourceQuery, setSourceQuery, checkedSource, items)}
      <div data-scope="transfer" data-part="operations">
        <Button
          variant="outline"
          size="sm"
          square
          disabled={checkedSource.size === 0 || disabled}
          aria-label="Move right"
          onClick={() => move(true)}
        >
          {arrowGlyph("right")}
        </Button>
        <Button
          variant="outline"
          size="sm"
          square
          disabled={checkedTarget.size === 0 || disabled}
          aria-label="Move left"
          onClick={() => move(false)}
        >
          {arrowGlyph("left")}
        </Button>
      </div>
      {panel("target", titles[1], targetQuery, setTargetQuery, checkedTarget, targetItems)}
    </div>
  );
}

// The rows are the checkbox family's own seals — the transfer stylesheet
// only dresses the ledgers around them.
injectComponentStyle("transfer");
injectComponentStyle("checkbox");
