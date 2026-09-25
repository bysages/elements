import { useEnvironmentContext } from "@ark-ui/react/environment";
import { useFilter, useLocaleContext } from "@ark-ui/react/locale";
import { Portal } from "@ark-ui/react/portal";
import { injectComponentStyle } from "@bysages/core";
import * as cascade from "@zag-js/cascade-select";
import { normalizeProps, useMachine } from "@zag-js/react";
import { useId, useMemo, useState } from "react";
import type { HTMLAttributes, ReactNode } from "react";

import { Input } from "../input";

export interface CascadeSelectNode {
  label: string;
  value: string;
  children?: CascadeSelectNode[];
  disabled?: boolean;
}

const chevronDown = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const chevronRight = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

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

/**
 * A corridor of linked columns: pick a branch and the next column
 * dissolves open beside it, until a leaf click settles the whole path.
 * `value` is the selected path (or paths, when `multiple`) — the joined
 * labels ride the trigger. `highlightTrigger: "hover"` turns the
 * classic cascading menu: pointing is enough to unfold. `filterable`
 * swaps the corridor for a flat list of matching paths while a query
 * runs — each hit still reads as its full route.
 */
export interface CascadeSelectProps extends HTMLAttributes<HTMLDivElement> {
  value?: string[][];
  data: CascadeSelectNode[];
  placeholder?: string;
  highlightTrigger?: "click" | "hover";
  filterable?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  onValueChange?: (value: string[][]) => void;
}

export function CascadeSelect({
  value,
  data,
  placeholder = "Select…",
  highlightTrigger,
  filterable = false,
  multiple = false,
  disabled = false,
  onValueChange,
  ...rest
}: CascadeSelectProps) {
  const id = useId();
  const locale = useLocaleContext();
  const env = useEnvironmentContext();

  const collection = cascade.collection<CascadeSelectNode>({
    nodeToValue: (node) => node.value,
    nodeToString: (node) => node.label,
    nodeToChildren: (node) => node.children ?? [],
    rootNode: { value: "ROOT", label: "", children: data },
  });

  const service = useMachine(cascade.machine, {
    id,
    collection,
    dir: locale.dir,
    getRootNode: env.getRootNode.bind(env),
    disabled: disabled || undefined,
    multiple: multiple || undefined,
    ...(value !== undefined ? { value } : {}),
    ...(highlightTrigger != null ? { highlightTrigger } : {}),
    onValueChange(details) {
      onValueChange?.(details.value);
    },
  });
  const api = cascade.connect(service, normalizeProps);

  const [query, setQuery] = useState("");
  const filterFns = useFilter({ sensitivity: "base" });
  const filtering = filterable && query.trim().length > 0;

  /** The corridor's answer to a query: every leaf whose route matches —
   * the query may land on any hop, and the whole route still shows. */
  const matchPaths = useMemo(() => {
    if (!filtering) return [];
    const q = query.trim();
    const hits: { path: string[]; labels: string[] }[] = [];
    const walk = (
      nodes: CascadeSelectNode[] | undefined,
      path: string[],
      labels: string[],
      matched: boolean,
    ) => {
      for (const node of nodes ?? []) {
        const hit = matched || filterFns.contains(node.label, q);
        const nextPath = [...path, node.value];
        const nextLabels = [...labels, node.label];
        if (node.children?.length) {
          walk(node.children, nextPath, nextLabels, hit);
        } else if (hit) {
          hits.push({ path: nextPath, labels: nextLabels });
        }
      }
    };
    walk(data, [], [], false);
    return hits;
  }, [filtering, query, filterFns, data]);

  const isSelected = (path: string[]) => (value ?? []).some((p) => p.join("/") === path.join("/"));

  function pickMatch(path: string[]) {
    if (multiple) {
      const current = value ?? [];
      const key = path.join("/");
      const next = current.some((p) => p.join("/") === key)
        ? current.filter((p) => p.join("/") !== key)
        : [...current, path];
      api.setValue(next);
    } else {
      api.selectValue(path);
      api.setOpen(false);
    }
  }

  /** The machine's `valueAsString` only updates through its select
   * event, so an externally-set `value` would render the placeholder
   * forever — resolve the labels from the data instead. */
  function labelsFor(path: string[]): string[] | null {
    const out: string[] = [];
    let nodes: CascadeSelectNode[] | undefined = data;
    for (const entry of path) {
      const node: CascadeSelectNode | undefined = nodes?.find((n) => n.value === entry);
      if (!node) return null;
      out.push(node.label);
      nodes = node.children;
    }
    return out;
  }

  const display = (value ?? [])
    .map((path) => labelsFor(path)?.join(" / "))
    .filter((label): label is string => label != null)
    .join(", ");

  /** One column per walk of the highlighted path — the list binds to
   * the node, the next column hangs off its highlighted child. */
  function renderColumn(
    node: CascadeSelectNode,
    indexPath: number[],
    valuePath: string[],
  ): ReactNode {
    const nodeProps = { item: node, indexPath, value: valuePath };
    const nodeState = api.getItemState(nodeProps);
    const children = collection.getNodeChildren(node);
    const list = (
      <ul {...api.getListProps(nodeProps)}>
        {children.map((item, index) => {
          const itemValue = collection.getNodeValue(item);
          const itemProps = {
            item,
            indexPath: [...indexPath, index],
            value: [...valuePath, itemValue],
          };
          const itemState = api.getItemState(itemProps);
          return (
            <li key={itemValue} {...api.getItemProps(itemProps)}>
              <span {...api.getItemTextProps(itemProps)}>{item.label}</span>
              {itemState.hasChildren ? (
                <span data-part="branch-indicator" aria-hidden="true">
                  {chevronRight}
                </span>
              ) : null}
              <span {...api.getItemIndicatorProps(itemProps)}>{checkGlyph}</span>
            </li>
          );
        })}
      </ul>
    );
    const next = nodeState.highlightedChild;
    const child =
      next != null && collection.isBranchNode(next)
        ? renderColumn(
            next,
            [...indexPath, nodeState.highlightedIndex],
            [...valuePath, collection.getNodeValue(next)],
          )
        : null;
    return [list, child];
  }

  return (
    <div {...rest} {...api.getRootProps()}>
      <div {...api.getControlProps()}>
        <button
          {...api.getTriggerProps()}
          onClick={(event) => {
            api.getTriggerProps().onClick?.(event);
            setQuery("");
          }}
          disabled={disabled || undefined}
        >
          <span {...api.getValueTextProps()}>{display || placeholder}</span>
          <span {...api.getIndicatorProps()}>{chevronDown}</span>
        </button>
      </div>
      <Portal>
        <div {...api.getPositionerProps()}>
          <div {...api.getContentProps()}>
            {filterable ? (
              <div data-part="search">
                <Input
                  size="sm"
                  value={query}
                  onValueChange={setQuery}
                  placeholder="Filter…"
                  aria-label="Filter options"
                />
              </div>
            ) : null}
            {filtering ? (
              matchPaths.length === 0 ? (
                <p data-part="empty">Nothing matches</p>
              ) : (
                matchPaths.map((hit) => (
                  <button
                    key={hit.path.join("/")}
                    type="button"
                    data-part="match"
                    data-selected={isSelected(hit.path) || undefined}
                    onClick={() => pickMatch(hit.path)}
                  >
                    {hit.labels.join(" / ")}
                  </button>
                ))
              )
            ) : (
              renderColumn(collection.rootNode, [], [])
            )}
          </div>
        </div>
      </Portal>
    </div>
  );
}

injectComponentStyle("cascade-select");
