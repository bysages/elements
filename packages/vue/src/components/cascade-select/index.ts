import { DEFAULT_ENVIRONMENT, useEnvironmentContext } from "@ark-ui/vue/environment";
import { DEFAULT_LOCALE, useLocaleContext } from "@ark-ui/vue/locale";
import { injectComponentStyle } from "@bysages/core";
import * as cascade from "@zag-js/cascade-select";
import { normalizeProps, useMachine } from "@zag-js/vue";
import type { SetupContext, VNodeArrayChildren } from "vue";
import { computed, defineComponent, h, useId, type PropType } from "vue";
import { Teleport } from "vue";

export interface CascadeSelectNode {
  label: string;
  value: string;
  children?: CascadeSelectNode[];
  disabled?: boolean;
}

function chevronDown() {
  return h(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 2,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "aria-hidden": true,
    },
    [h("path", { d: "m6 9 6 6 6-6" })],
  );
}

function chevronRight() {
  return h(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 2,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "aria-hidden": true,
    },
    [h("path", { d: "m9 18 6-6-6-6" })],
  );
}

function checkGlyph() {
  return h(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 3,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "aria-hidden": true,
    },
    [h("path", { d: "m5 12.5 5 5L19 7" })],
  );
}

/**
 * A corridor of linked columns: pick a branch and the next column
 * dissolves open beside it, until a leaf click settles the whole path.
 * `modelValue` is the selected path (or paths, when `multiple`) — the
 * joined labels ride the trigger. `highlightTrigger: "hover"` turns the
 * classic cascading menu: pointing is enough to unfold.
 */
export const CascadeSelect = defineComponent({
  name: "CascadeSelect",
  props: {
    modelValue: { type: Array as PropType<string[][]>, default: undefined },
    data: { type: Array as PropType<CascadeSelectNode[]>, required: true },
    placeholder: { type: String, default: "Select…" },
    highlightTrigger: { type: String as PropType<"click" | "hover">, default: undefined },
    multiple: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  emits: ["update:modelValue"],
  setup(props, ctx: SetupContext) {
    const id = useId();
    const locale = useLocaleContext(DEFAULT_LOCALE);
    const env = useEnvironmentContext(DEFAULT_ENVIRONMENT);

    const collection = computed(() =>
      cascade.collection<CascadeSelectNode>({
        nodeToValue: (node) => node.value,
        nodeToString: (node) => node.label,
        nodeToChildren: (node) => node.children ?? [],
        rootNode: { value: "ROOT", label: "", children: props.data },
      }),
    );

    const service = useMachine(
      cascade.machine,
      computed(() => ({
        id,
        collection: collection.value,
        dir: locale.value.dir,
        getRootNode: env.value.getRootNode,
        disabled: props.disabled || undefined,
        multiple: props.multiple || undefined,
        ...(props.modelValue !== undefined ? { value: props.modelValue } : null),
        ...(props.highlightTrigger != null ? { highlightTrigger: props.highlightTrigger } : null),
        onValueChange(details) {
          ctx.emit("update:modelValue", details.value);
        },
      })),
    );
    const api = computed(() => cascade.connect(service, normalizeProps));

    /** The machine's `valueAsString` only updates through its select
     * event, so an externally-set `modelValue` would render the
     * placeholder forever — resolve the labels from the data instead. */
    function labelsFor(path: string[]): string[] | null {
      const out: string[] = [];
      let nodes: CascadeSelectNode[] | undefined = props.data;
      for (const value of path) {
        const node: CascadeSelectNode | undefined = nodes?.find((n) => n.value === value);
        if (!node) return null;
        out.push(node.label);
        nodes = node.children;
      }
      return out;
    }

    const display = computed(() => {
      const parts = (props.modelValue ?? [])
        .map((path) => labelsFor(path)?.join(" / "))
        .filter((label): label is string => label != null);
      return parts.length > 0 ? parts.join(", ") : null;
    });

    /** One column per walk of the highlighted path — the list binds to
     * the node, the next column hangs off its highlighted child. */
    function renderColumn(
      node: CascadeSelectNode,
      indexPath: number[],
      valuePath: string[],
    ): VNodeArrayChildren {
      const nodeProps = { item: node, indexPath, value: valuePath };
      const nodeState = api.value.getItemState(nodeProps);
      const children = collection.value.getNodeChildren(node);
      const list = h(
        "ul",
        api.value.getListProps(nodeProps),
        children.map((item, index) => {
          const itemValue = collection.value.getNodeValue(item);
          const itemProps = {
            item,
            indexPath: [...indexPath, index],
            value: [...valuePath, itemValue],
          };
          const itemState = api.value.getItemState(itemProps);
          return h("li", { key: itemValue, ...api.value.getItemProps(itemProps) }, [
            h("span", api.value.getItemTextProps(itemProps), item.label),
            itemState.hasChildren
              ? h("span", { "data-part": "branch-indicator", "aria-hidden": true }, chevronRight())
              : null,
            h("span", api.value.getItemIndicatorProps(itemProps), checkGlyph()),
          ]);
        }),
      );
      const next = nodeState.highlightedChild;
      const child =
        next != null && collection.value.isBranchNode(next)
          ? renderColumn(
              next,
              [...indexPath, nodeState.highlightedIndex],
              [...valuePath, collection.value.getNodeValue(next)],
            )
          : null;
      return [list, child];
    }

    return () =>
      h("div", { ...ctx.attrs, ...api.value.getRootProps() }, [
        h("div", api.value.getControlProps(), [
          h("button", { ...api.value.getTriggerProps(), disabled: props.disabled || undefined }, [
            h("span", api.value.getValueTextProps(), display.value ?? props.placeholder),
            h("span", api.value.getIndicatorProps(), chevronDown()),
          ]),
        ]),
        h(Teleport, { to: "body" }, () => [
          h("div", api.value.getPositionerProps(), [
            h("div", api.value.getContentProps(), renderColumn(collection.value.rootNode, [], [])),
          ]),
        ]),
      ]);
  },
});

injectComponentStyle("cascade-select");
