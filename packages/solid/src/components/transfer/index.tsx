import { Checkbox as ArkCheckbox } from "@ark-ui/solid/checkbox";
import { injectComponentStyle } from "@bysages/core";
import { For, Show, createSignal, splitProps } from "solid-js";
import type { JSX } from "solid-js";

import { Button } from "../button";
import { Input } from "../input";

export interface TransferItem {
  label: string;
  value: string;
  disabled?: boolean;
}

function checkGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="m5 12.5 5 5L19 7" />
    </svg>
  );
}

function arrowGlyph(direction: "right" | "left") {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.75"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d={direction === "right" ? "M5 12h14m-6-6 6 6-6 6" : "M19 12H5m6-6-6 6 6 6"} />
    </svg>
  );
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
export function Transfer(props: TransferProps) {
  const [own, rest] = splitProps(props, [
    "value",
    "data",
    "titles",
    "searchable",
    "disabled",
    "onValueChange",
  ]);
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
              placeholder="Filter…"
              aria-label={`Filter ${title}`}
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
              {(item) => (
                <ArkCheckbox.Root
                  checked={checked().has(item.value)}
                  disabled={own.disabled || item.disabled === true}
                  onCheckedChange={() => toggle(checked(), item.value, setChecked)}
                >
                  <ArkCheckbox.Control>
                    <ArkCheckbox.Indicator>{checkGlyph()}</ArkCheckbox.Indicator>
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
          aria-label="Move right"
          onClick={() => move(true)}
        >
          {arrowGlyph("right")}
        </Button>
        <Button
          variant="outline"
          size="sm"
          square
          disabled={checkedTarget().size === 0 || own.disabled}
          aria-label="Move left"
          onClick={() => move(false)}
        >
          {arrowGlyph("left")}
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
injectComponentStyle("transfer");
injectComponentStyle("checkbox");
