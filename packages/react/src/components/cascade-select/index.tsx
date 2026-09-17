import { useEnvironmentContext } from "@ark-ui/react/environment";
import { useLocaleContext } from "@ark-ui/react/locale";
import { Portal } from "@ark-ui/react/portal";
import { injectComponentStyle } from "@bysages/core";
import * as cascade from "@zag-js/cascade-select";
import { normalizeProps, useMachine } from "@zag-js/react";
import { useId } from "react";
import type { HTMLAttributes, ReactNode } from "react";

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
 * classic cascading menu: pointing is enough to unfold.
 */
export interface CascadeSelectProps extends HTMLAttributes<HTMLDivElement> {
  value?: string[][];
  data: CascadeSelectNode[];
  placeholder?: string;
  highlightTrigger?: "click" | "hover";
  multiple?: boolean;
  disabled?: boolean;
  onValueChange?: (value: string[][]) => void;
}

export function CascadeSelect({
  value,
  data,
  placeholder = "Select…",
  highlightTrigger,
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
        <button {...api.getTriggerProps()} disabled={disabled || undefined}>
          <span {...api.getValueTextProps()}>{display || placeholder}</span>
          <span {...api.getIndicatorProps()}>{chevronDown}</span>
        </button>
      </div>
      <Portal>
        <div {...api.getPositionerProps()}>
          <div {...api.getContentProps()}>{renderColumn(collection.rootNode, [], [])}</div>
        </div>
      </Portal>
    </div>
  );
}

injectComponentStyle("cascade-select");
