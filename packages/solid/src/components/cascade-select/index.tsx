import { useEnvironmentContext } from "@ark-ui/solid/environment";
import { useFilter, useLocaleContext } from "@ark-ui/solid/locale";
import { injectComponentStyle } from "@bysages/core";
import * as cascade from "@zag-js/cascade-select";
import { normalizeProps, useMachine } from "@zag-js/solid";
import {
  For,
  Show,
  createMemo,
  createSignal,
  createUniqueId,
  mergeProps,
  splitProps,
} from "solid-js";
import type { JSX } from "solid-js";
import { Portal } from "solid-js/web";

import { Input } from "../input";

export interface CascadeSelectNode {
  label: string;
  value: string;
  children?: CascadeSelectNode[];
  disabled?: boolean;
}

function chevronDown() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function chevronRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
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

export interface CascadeSelectProps extends JSX.HTMLAttributes<HTMLDivElement> {
  value?: string[][];
  data: CascadeSelectNode[];
  placeholder?: string;
  highlightTrigger?: "click" | "hover";
  filterable?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  onValueChange?: (value: string[][]) => void;
}

/**
 * A corridor of linked columns: pick a branch and the next column
 * dissolves open beside it, until a leaf click settles the whole path.
 * `value` is the selected path (or paths, when `multiple`) — the
 * joined labels ride the trigger. `highlightTrigger: "hover"` turns the
 * classic cascading menu: pointing is enough to unfold. `filterable`
 * swaps the corridor for a flat list of matching paths while a query
 * runs — each hit still reads as its full route.
 */
export function CascadeSelect(props: CascadeSelectProps) {
  const [own, rest] = splitProps(props, [
    "value",
    "data",
    "placeholder",
    "highlightTrigger",
    "filterable",
    "multiple",
    "disabled",
    "onValueChange",
  ]);
  const id = createUniqueId();
  const locale = useLocaleContext();
  const env = useEnvironmentContext();

  const collection = createMemo(() =>
    cascade.collection<CascadeSelectNode>({
      nodeToValue: (node) => node.value,
      nodeToString: (node) => node.label,
      nodeToChildren: (node) => node.children ?? [],
      rootNode: { value: "ROOT", label: "", children: own.data },
    }),
  );

  const service = useMachine(cascade.machine, () => ({
    id,
    collection: collection(),
    dir: locale().dir,
    getRootNode: env().getRootNode.bind(env()),
    disabled: own.disabled || undefined,
    multiple: own.multiple || undefined,
    ...(own.value !== undefined ? { value: own.value } : {}),
    ...(own.highlightTrigger != null ? { highlightTrigger: own.highlightTrigger } : {}),
    onValueChange(details) {
      own.onValueChange?.(details.value);
    },
  }));
  const api = createMemo(() => cascade.connect(service, normalizeProps));

  const [query, setQuery] = createSignal("");
  const filterFns = useFilter({ sensitivity: "base" });
  const filtering = () => own.filterable && query().trim().length > 0;

  /** The corridor's answer to a query: every leaf whose route matches —
   * the query may land on any hop, and the whole route still shows. */
  const matchPaths = createMemo(() => {
    if (!filtering()) return [];
    const q = query().trim();
    const hits: { path: string[]; labels: string[] }[] = [];
    const walk = (
      nodes: CascadeSelectNode[] | undefined,
      path: string[],
      labels: string[],
      matched: boolean,
    ) => {
      for (const node of nodes ?? []) {
        const hit = matched || filterFns().contains(node.label, q);
        const nextPath = [...path, node.value];
        const nextLabels = [...labels, node.label];
        if (node.children?.length) {
          walk(node.children, nextPath, nextLabels, hit);
        } else if (hit) {
          hits.push({ path: nextPath, labels: nextLabels });
        }
      }
    };
    walk(own.data, [], [], false);
    return hits;
  });

  const isSelected = (path: string[]) =>
    (own.value ?? []).some((p) => p.join("/") === path.join("/"));

  function pickMatch(path: string[]) {
    if (own.multiple) {
      const current = own.value ?? [];
      const key = path.join("/");
      const next = current.some((p) => p.join("/") === key)
        ? current.filter((p) => p.join("/") !== key)
        : [...current, path];
      api().setValue(next);
    } else {
      api().selectValue(path);
      api().setOpen(false);
    }
  }

  /** The machine's `valueAsString` only updates through its select
   * event, so an externally-set `value` would render the
   * placeholder forever — resolve the labels from the data instead. */
  function labelsFor(path: string[]): string[] | null {
    const out: string[] = [];
    let nodes: CascadeSelectNode[] | undefined = own.data;
    for (const value of path) {
      const node: CascadeSelectNode | undefined = nodes?.find((n) => n.value === value);
      if (!node) return null;
      out.push(node.label);
      nodes = node.children;
    }
    return out;
  }

  const display = () => {
    const parts = (own.value ?? [])
      .map((path) => labelsFor(path)?.join(" / "))
      .filter((label): label is string => label != null);
    return parts.length > 0 ? parts.join(", ") : null;
  };

  /** One column per walk of the highlighted path — the list binds to
   * the node, the next column hangs off its highlighted child. */
  function renderColumn(
    node: CascadeSelectNode,
    indexPath: number[],
    valuePath: string[],
  ): JSX.Element {
    const nodeProps = { item: node, indexPath, value: valuePath };
    const nodeState = () => api().getItemState(nodeProps);
    const children = collection().getNodeChildren(node);
    const list = (
      <ul {...mergeProps(() => api().getListProps(nodeProps))}>
        <For each={children}>
          {(item, index) => {
            const itemValue = collection().getNodeValue(item);
            const itemProps = {
              item,
              indexPath: [...indexPath, index()],
              value: [...valuePath, itemValue],
            };
            const itemState = () => api().getItemState(itemProps);
            return (
              <li {...mergeProps(() => api().getItemProps(itemProps))}>
                <span {...mergeProps(() => api().getItemTextProps(itemProps))}>{item.label}</span>
                <Show when={itemState().hasChildren}>
                  <span data-part="branch-indicator" aria-hidden="true">
                    {chevronRight()}
                  </span>
                </Show>
                <span {...mergeProps(() => api().getItemIndicatorProps(itemProps))}>
                  {checkGlyph()}
                </span>
              </li>
            );
          }}
        </For>
      </ul>
    );
    const next = nodeState().highlightedChild;
    const child =
      next != null && collection().isBranchNode(next)
        ? renderColumn(
            next,
            [...indexPath, nodeState().highlightedIndex],
            [...valuePath, collection().getNodeValue(next)],
          )
        : null;
    return (
      <>
        {list}
        {child}
      </>
    );
  }

  return (
    <div {...rest} {...mergeProps(() => api().getRootProps())}>
      <div {...mergeProps(() => api().getControlProps())}>
        <button
          {...mergeProps(() => api().getTriggerProps(), {
            get disabled() {
              return own.disabled || undefined;
            },
            onclick(event: MouseEvent & { currentTarget: HTMLButtonElement }) {
              (api().getTriggerProps() as { onclick?: (e: unknown) => void }).onclick?.(event);
              setQuery("");
            },
          })}
        >
          <span {...mergeProps(() => api().getValueTextProps())}>
            {display() ?? own.placeholder ?? "Select…"}
          </span>
          <span {...mergeProps(() => api().getIndicatorProps())}>{chevronDown()}</span>
        </button>
      </div>
      <Portal>
        <div {...mergeProps(() => api().getPositionerProps())}>
          <div {...mergeProps(() => api().getContentProps())}>
            <Show when={own.filterable}>
              <div data-part="search">
                <Input
                  size="sm"
                  value={query()}
                  onValueChange={setQuery}
                  placeholder="Filter…"
                  aria-label="Filter options"
                />
              </div>
            </Show>
            <Show
              when={!filtering()}
              fallback={
                <Show
                  when={matchPaths().length > 0}
                  fallback={<p data-part="empty">Nothing matches</p>}
                >
                  <For each={matchPaths()}>
                    {(hit) => (
                      <button
                        type="button"
                        data-part="match"
                        data-selected={isSelected(hit.path) || undefined}
                        onclick={() => pickMatch(hit.path)}
                      >
                        {hit.labels.join(" / ")}
                      </button>
                    )}
                  </For>
                </Show>
              }
            >
              {renderColumn(collection().rootNode, [], [])}
            </Show>
          </div>
        </div>
      </Portal>
    </div>
  );
}

injectComponentStyle("cascade-select");
