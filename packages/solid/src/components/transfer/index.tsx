import { Checkbox as ArkCheckbox } from "@ark-ui/solid/checkbox";
import { injectComponentStyle } from "@bysages/core";
import { For, Show, createSignal, splitProps } from "solid-js";
import type { JSX } from "solid-js";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";
import { Button } from "../button";
import { Checkbox } from "../checkbox";
import {
  formatComponentMessage,
  useComponentMessages,
} from "../config-provider/use-component-messages";
import { Input } from "../input";

export interface TransferItem {
  label: string;
  value: string;
  disabled?: boolean;
}

function checkIcon() {
  return iconNode("check");
}

function arrowIcon(direction: "right" | "left") {
  return direction === "right" ? iconNode("arrow-right") : iconNode("arrow-left");
}

export interface TransferProps extends JSX.HTMLAttributes<HTMLDivElement> {
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
 * `value` is the target column's value list; everything else in
 * `data` stays on the left. `searchable` adds a filter line to each
 * panel.
 */
function TransferImpl(props: TransferProps) {
  const messages = useComponentMessages();
  injectComponentStyle("transfer");
  injectComponentStyle("checkbox");
  const [own, rest] = splitProps(props, [
    "value",
    "data",
    "titles",
    "searchable",
    "disabled",
    "onValueChange",
  ]);
  const id = useElementId("transfer");
  const [checkedSource, setCheckedSource] = createSignal(new Set<string>());
  const [checkedTarget, setCheckedTarget] = createSignal(new Set<string>());
  const [sourceQuery, setSourceQuery] = createSignal("");
  const [targetQuery, setTargetQuery] = createSignal("");

  const target = () => new Set(own.value ?? []);

  function panelItems(values: TransferItem[], inTarget: boolean, query: string) {
    return values.filter(
      (item) =>
        item.label.toLowerCase().includes(query.toLowerCase()) &&
        target().has(item.value) === inTarget,
    );
  }

  function toggle(set: Set<string>, value: string, setChecked: (next: Set<string>) => void) {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    setChecked(next);
  }

  function move(toTarget: boolean) {
    const moving = toTarget ? checkedSource() : checkedTarget();
    if (moving.size === 0) return;
    const next = toTarget
      ? [...(own.value ?? []), ...moving].filter(
          (value, index, all) => all.indexOf(value) === index,
        )
      : (own.value ?? []).filter((value) => !moving.has(value));
    (toTarget ? setCheckedSource : setCheckedTarget)(new Set<string>());
    own.onValueChange?.(next);
  }

  function panel(
    side: "source" | "target",
    title: string,
    query: () => string,
    setQuery: (value: string) => void,
    checked: () => Set<string>,
    setChecked: (next: Set<string>) => void,
    items: TransferItem[],
  ) {
    return (
      <div data-scope="transfer" data-part="panel" data-side={side}>
        <div data-scope="transfer" data-part="head">
          <span data-scope="transfer" data-part="title">
            {title}
          </span>
          <span data-scope="transfer" data-part="count">
            {String(items.length)}
          </span>
        </div>
        <Show when={own.searchable}>
          <div data-scope="transfer" data-part="search">
            <Input
              size="sm"
              value={query()}
              onValueChange={setQuery}
              placeholder={formatComponentMessage(messages().transfer.filter, { name: title })}
              aria-label={formatComponentMessage(messages().transfer.filter, { name: title })}
            />
          </div>
        </Show>
        <div data-scope="transfer" data-part="list">
          <Show
            when={items.length > 0}
            fallback={
              <p data-scope="transfer" data-part="empty">
                Nothing here
              </p>
            }
          >
            <For each={items}>
              {(item, index) => (
                <ArkCheckbox.Root
                  id={`${id()}-${index()}`}
                  checked={checked().has(item.value)}
                  disabled={own.disabled || item.disabled === true}
                  onCheckedChange={() => toggle(checked(), item.value, setChecked)}
                >
                  <ArkCheckbox.Control>
                    <ArkCheckbox.Indicator>{checkIcon()}</ArkCheckbox.Indicator>
                  </ArkCheckbox.Control>
                  <ArkCheckbox.Label data-part="label">{item.label}</ArkCheckbox.Label>
                  <ArkCheckbox.HiddenInput />
                </ArkCheckbox.Root>
              )}
            </For>
          </Show>
        </div>
      </div>
    );
  }

  return (
    <div {...rest} data-scope="transfer" data-part="root">
      {panel(
        "source",
        own.titles?.[0] ?? "Source",
        sourceQuery,
        setSourceQuery,
        checkedSource,
        setCheckedSource,
        panelItems(own.data, false, sourceQuery()),
      )}
      <div data-scope="transfer" data-part="operations">
        <Button
          variant="outline"
          size="sm"
          square
          disabled={checkedSource().size === 0 || own.disabled}
          aria-label={messages().transfer.moveRight}
          onClick={() => move(true)}
        >
          {arrowIcon("right")}
        </Button>
        <Button
          variant="outline"
          size="sm"
          square
          disabled={checkedTarget().size === 0 || own.disabled}
          aria-label={messages().transfer.moveLeft}
          onClick={() => move(false)}
        >
          {arrowIcon("left")}
        </Button>
      </div>
      {panel(
        "target",
        own.titles?.[1] ?? "Target",
        targetQuery,
        setTargetQuery,
        checkedTarget,
        setCheckedTarget,
        panelItems(own.data, true, targetQuery()),
      )}
    </div>
  );
}

// The rows are the checkbox family's own seals — the transfer stylesheet
// only dresses the ledgers around them.

export const Transfer = defineFamily(TransferImpl, Checkbox) as typeof TransferImpl &
  typeof Checkbox;
