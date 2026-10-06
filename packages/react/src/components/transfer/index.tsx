import { Checkbox as ArkCheckbox } from "@ark-ui/react/checkbox";
import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes, ReactNode } from "react";
import { useState } from "react";

import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";
import { formatMessage, useComponentMessages } from "../../internal/messages";
import { Button } from "../button";
import { Checkbox } from "../checkbox";
import { Input } from "../input";

export interface TransferItem {
  label: string;
  value: string;
  disabled?: boolean;
}

const checkIcon = iconNode("check");

function arrowIcon(direction: "right" | "left") {
  return iconNode(direction === "right" ? "arrow-right" : "arrow-left");
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
function TransferImpl({
  value = [],
  data,
  titles = ["Source", "Target"],
  searchable = false,
  disabled = false,
  onValueChange,
  ...rest
}: TransferProps) {
  injectComponentStyle("transfer");
  injectComponentStyle("checkbox");
  const id = useElementId("transfer", rest);
  const messages = useComponentMessages();
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
              placeholder={messages.transfer.filter}
              aria-label={formatMessage(messages.transfer.filter, { name: title })}
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
                  id={`${id}-${side}-${item.value}`}
                  key={item.value}
                  checked={checked.has(item.value)}
                  disabled={locked}
                  onCheckedChange={() => toggle(side, item.value)}
                >
                  <ArkCheckbox.Control>
                    <ArkCheckbox.Indicator>{checkIcon}</ArkCheckbox.Indicator>
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
          aria-label={messages.transfer.moveRight}
          onClick={() => move(true)}
        >
          {arrowIcon("right")}
        </Button>
        <Button
          variant="outline"
          size="sm"
          square
          disabled={checkedTarget.size === 0 || disabled}
          aria-label={messages.transfer.moveLeft}
          onClick={() => move(false)}
        >
          {arrowIcon("left")}
        </Button>
      </div>
      {panel("target", titles[1], targetQuery, setTargetQuery, checkedTarget, targetItems)}
    </div>
  );
}

export const Transfer = Object.assign(TransferImpl, Checkbox) as typeof TransferImpl &
  typeof Checkbox;

// The rows are the checkbox family's own seals — the transfer stylesheet
// only dresses the ledgers around them.
