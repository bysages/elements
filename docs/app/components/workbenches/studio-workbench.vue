<script setup lang="ts">
import {
  Alert,
  Badge,
  Button,
  Card,
  createColumnHelper,
  DataTable,
  Input,
  JsonTreeView,
  NumberInput,
  PageHeader,
  Select,
  Switch,
  Tabs,
  Textarea,
  Typography,
} from "@bysages/vue";
import { catalog, faceFamilies, registry } from "@bysages/vue/generative";
import {
  ActionProvider,
  Renderer,
  StateProvider,
  ValidationProvider,
  VisibilityProvider,
} from "@json-render/vue";
import { computed, h, ref, watch } from "vue";

import { componentSections } from "../../../scripts/component-sections";
import DesignPanel from "./design-panel.vue";
import { COMPONENT_MIME, ROOT_ID, type StudioNode, type StudioNodes } from "./studio-types";

const { locale } = useI18n();

const copy = {
  en: {
    seo: { title: "Studio", description: "Compose Elements JSON interfaces by drag and drop." },
    heading: "Studio",
    lede: "Drag components from the catalog into the composition, tune them in the inspector, and the preview keeps up. The JSON you export is the same spec an AI stream produces.",
    palette: {
      title: "Catalog",
      search: "Search components",
      hint: "Drag into the composition, or click to add under the selection.",
    },
    tree: {
      title: "Composition",
      component: "Component",
      root: "Page",
      empty: "Nothing here yet — drop a component from the catalog.",
      remove: "Remove",
    },
    inspector: {
      title: "Inspector",
      empty: "Select a row in the composition to edit its props.",
      props: "Props",
      optional: "optional",
      noFields: "This component declares no schema fields.",
      listHint: "Comma-separated values",
      jsonFieldInvalid: "Must be valid JSON.",
      advanced: "Advanced (JSON)",
      apply: "Apply",
      invalid: "Props must be a JSON object.",
    },
    design: "Design",
    preview: "Preview",
    invalid: "The composition is not a valid spec yet.",
    json: {
      title: "JSON",
      copy: "Copy JSON",
      copied: "Copied",
      download: "Download JSON",
      import: "Import",
      apply: "Apply",
      invalid: "Not a valid composition JSON.",
      importHint: "Paste a composition JSON, then apply to replace the current one.",
    },
  },
  zh: {
    seo: { title: "工作台", description: "用拖拽组合 Elements 的 JSON 界面。" },
    heading: "工作台",
    lede: "把目录里的组件拖进组合，在检查器里调整属性，预览即时跟上。导出的 JSON 与 AI 生成界面用的是同一套规格。",
    palette: {
      title: "组件目录",
      search: "搜索组件",
      hint: "拖进下方组合使用，或点击加到选中节点下。",
    },
    tree: {
      title: "组合结构",
      component: "组件",
      root: "页面",
      empty: "还没有内容——从目录拖一个组件进来。",
      remove: "移除",
    },
    inspector: {
      title: "检查器",
      empty: "在组合里选中一行，编辑它的属性。",
      props: "属性",
      optional: "可选",
      noFields: "该组件没有规格字段。",
      listHint: "逗号分隔多个值",
      jsonFieldInvalid: "必须是合法 JSON。",
      advanced: "高级（JSON）",
      apply: "应用",
      invalid: "属性必须是 JSON 对象。",
    },
    design: "设计",
    preview: "预览",
    invalid: "当前组合还不是合法规格。",
    json: {
      title: "JSON",
      copy: "复制 JSON",
      copied: "已复制",
      download: "下载 JSON",
      import: "导入",
      apply: "应用",
      invalid: "不是有效的组合 JSON。",
      importHint: "粘贴一段组合 JSON，应用后替换当前组合。",
    },
  },
} as const;

const text = computed(() => copy[locale.value as "en" | "zh"]);

type CatalogEntry = (typeof catalog.data.components)[string];
type ZodField = {
  def?: {
    type?: string;
    innerType?: ZodField;
    element?: ZodField;
    entries?: Record<string, unknown>;
  };
};

const componentNames = catalog.componentNames;
const entryFor = (name: string): CatalogEntry | undefined => catalog.data.components[name];
const accepts = (name: string) => !!entryFor(name)?.slots?.includes("default");

function defaultProps(name: string): Record<string, unknown> {
  const shape =
    (entryFor(name)?.props as { def?: { shape?: Record<string, ZodField> } })?.def?.shape ?? {};
  const props: Record<string, unknown> = {};
  for (const [key, declared] of Object.entries(shape)) {
    if (declared.def?.type === "optional") continue;
    const field = declared.def?.innerType ?? declared;
    if (field.def?.type === "enum") {
      const first = Object.keys(field.def.entries ?? {})[0];
      if (first) props[key] = first;
    } else if (field.def?.type === "boolean") props[key] = false;
    else if (field.def?.type === "number") props[key] = 0;
    else if (field.def?.type === "array") props[key] = [];
    else if (field.def?.type === "string") props[key] = `${name} ${key}`;
  }
  return props;
}

const rootNode = ref<StudioNode>({
  id: ROOT_ID,
  type: "Stack",
  props: { direction: "column", gap: "lg" },
  children: ["studio-heading", "studio-card"],
});

const nodes = ref<StudioNodes>({
  "studio-heading": {
    id: "studio-heading",
    type: "Heading",
    props: { level: "2", text: "A composed page" },
    children: [],
  },
  "studio-card": {
    id: "studio-card",
    type: "Card",
    props: {
      title: "The record",
      description: "Every drop lands as data, never as a bespoke widget.",
    },
    children: ["studio-text", "studio-action"],
  },
  "studio-text": {
    id: "studio-text",
    type: "Text",
    props: {
      variant: "body",
      text: "Move a component in the tree; the JSON and the preview move with it.",
    },
    children: [],
  },
  "studio-action": {
    id: "studio-action",
    type: "Button",
    props: { label: "Continue", variant: "solid" },
    children: [],
  },
});

const selectedId = ref(ROOT_ID);

const search = ref("");

/** The catalog walks the same shelves the docs site does — one grouping,
 * and the shelf each face joins is the family that registered it, not a
 * guess from its name (Layout and its parts would never match that way).
 * A face whose family no shelf claims lands on a trailing shelf. */
const catalogGroups = computed(() => {
  const query = search.value.trim().toLowerCase();
  const matches = (name: string) => !query || name.toLowerCase().includes(query);
  const groups = componentSections.map((section) => ({
    key: section.slug,
    label: locale.value === "zh" ? section.zh : section.en,
    items: componentNames.filter(
      (name) => section.families.includes(faceFamilies[name] ?? "") && matches(name),
    ),
  }));
  const claimed = new Set(groups.flatMap((group) => group.items));
  const rest = componentNames.filter((name) => !claimed.has(name) && matches(name));
  if (rest.length)
    groups.push({ key: "other", label: locale.value === "zh" ? "其他" : "Other", items: rest });
  return groups.filter((group) => group.items.length > 0);
});

function allNodes(): StudioNode[] {
  return [rootNode.value, ...Object.values(nodes.value)];
}

function parentOf(id: string): StudioNode | undefined {
  return allNodes().find((node) => node.children.includes(id));
}

/** The nearest ancestor that can take children — a drop on a leaf climbs
 * to its container instead of producing an invalid nesting. */
function containerOf(targetId: string): StudioNode {
  let node = targetId === ROOT_ID ? rootNode.value : nodes.value[targetId];
  while (node && node.id !== ROOT_ID && !accepts(node.type)) {
    node = parentOf(node.id) ?? rootNode.value;
  }
  return node ?? rootNode.value;
}

function newNode(name: string): string {
  const id = `studio-${name.toLowerCase()}-${Math.random().toString(36).slice(2, 8)}`;
  nodes.value[id] = { id, type: name, props: defaultProps(name), children: [] };
  selectedId.value = id;
  return id;
}

function addTo(name: string, targetId = selectedId.value) {
  const target = containerOf(targetId);
  target.children.push(newNode(name));
}

/** Sibling insert beside a row: the drop lands in the target's own
 * list, climbing to the nearest container when the parent is a leaf. */
function insertSibling(name: string, targetId: string, after: boolean) {
  let parent = parentOf(targetId) ?? rootNode.value;
  while (parent.id !== ROOT_ID && !accepts(parent.type)) {
    parent = parentOf(parent.id) ?? rootNode.value;
  }
  const at = parent.children.indexOf(targetId);
  parent.children.splice(at + (after ? 1 : 0), 0, newNode(name));
}

function removeNode(id: string) {
  const parent = parentOf(id);
  if (!parent || id === ROOT_ID) return;
  parent.children = parent.children.filter((child) => child !== id);
  const removeTree = (nodeId: string) => {
    const node = nodes.value[nodeId];
    if (!node) return;
    for (const child of node.children) removeTree(child);
    delete nodes.value[nodeId];
  };
  removeTree(id);
  if (selectedId.value === id) selectedId.value = ROOT_ID;
}

/* --- Composition, hosted by the DataTable tree -------------------------- */

interface CompositionRow {
  id: string;
  type: string;
  childCount: number;
  subRows?: CompositionRow[];
}

const compositionRows = computed<CompositionRow[]>(() => {
  const toRow = (id: string): CompositionRow => {
    const node = nodes.value[id]!;
    const children = node.children.map(toRow);
    return {
      id,
      type: node.type,
      childCount: children.length,
      subRows: children.length ? children : undefined,
    };
  };
  return [
    {
      id: ROOT_ID,
      type: text.value.tree.root,
      childCount: rootNode.value.children.length,
      subRows: rootNode.value.children.map(toRow),
    },
  ];
});

const col = createColumnHelper<CompositionRow>();
const compositionColumns = col.columns([
  col.accessor("type", {
    header: () => text.value.tree.component,
    cell: ({ row }) => {
      const item = row.original;
      const selected = item.id === selectedId.value;
      const edge = h("span", { class: "flex items-center gap-(--bs-gap-xs)" }, [
        item.childCount
          ? h("span", { class: "text-xs text-tertiary tabular-nums" }, String(item.childCount))
          : null,
        item.id === ROOT_ID
          ? null
          : h(
              Button,
              {
                variant: "ghost",
                size: "sm",
                square: true,
                "aria-label": `${text.value.tree.remove} ${item.type}`,
                onClick: () => removeNode(item.id),
              },
              () => "×",
            ),
      ]);
      return h(
        "span",
        { class: "flex min-w-0 flex-1 items-center justify-between gap-(--bs-gap-sm)" },
        [
          h(
            Button,
            {
              variant: selected ? "solid" : "ghost",
              size: "sm",
              class: "min-w-0 justify-start",
              "aria-pressed": selected,
              onClick: () => {
                selectedId.value = item.id;
              },
            },
            () => item.type,
          ),
          edge,
        ],
      );
    },
  }),
]);

function syncComposition(rows: CompositionRow[]) {
  // The table hosts any row inside any other; the catalog only lets
  // container components keep children, so a drop on a leaf climbs back
  // to the nearest ancestor that can hold it.
  const children: Record<string, string[]> = { [ROOT_ID]: [] };

  const place = (row: CompositionRow, fallbacks: string[]) => {
    children[row.id] = [];
    const node = nodes.value[row.id];
    const hosts = !!node && accepts(node.type);
    children[fallbacks[0] ?? ROOT_ID]!.push(row.id);
    const below = hosts ? [row.id, ...fallbacks] : fallbacks;
    (row.subRows ?? []).forEach((child) => place(child, below));
  };

  const topLevel = rows.find((row) => row.id === ROOT_ID)?.subRows ?? rows;
  topLevel.forEach((row) => place(row, [ROOT_ID]));
  rootNode.value.children = children[ROOT_ID]!;
  for (const [id, list] of Object.entries(children)) {
    if (id !== ROOT_ID) nodes.value[id]!.children = list;
  }
}

function onRowDrop(row: CompositionRow, event: DragEvent, zone: "before" | "inside" | "after") {
  const name = event.dataTransfer?.getData(COMPONENT_MIME);
  if (!name) return;
  if (zone === "inside") addTo(name, row.id);
  else insertSibling(name, row.id, zone === "after");
}

function startComponent(event: DragEvent, name: string) {
  event.dataTransfer?.setData(COMPONENT_MIME, name);
  event.dataTransfer?.setData("text/plain", name);
  if (event.dataTransfer) event.dataTransfer.effectAllowed = "copy";
}

function allowCatalog(event: DragEvent) {
  if (!event.dataTransfer?.types.includes(COMPONENT_MIME)) return;
  event.preventDefault();
  event.dataTransfer.dropEffect = "copy";
}

function onRootDrop(event: DragEvent) {
  const insideRow = (event.target as HTMLElement | null)?.closest?.('[data-part="row"]');
  if (insideRow) return;
  const name = event.dataTransfer?.getData(COMPONENT_MIME);
  if (name) addTo(name, ROOT_ID);
}

const selectedNode = computed(() =>
  selectedId.value === ROOT_ID ? rootNode.value : nodes.value[selectedId.value],
);
const selectedLabel = computed(() =>
  selectedId.value === ROOT_ID ? text.value.tree.root : (selectedNode.value?.type ?? ""),
);

/* --- Schema-driven inspector -------------------------------------------- */

type SchemaKind = "enum" | "string" | "number" | "boolean" | "stringList" | "json";

interface SchemaField {
  key: string;
  kind: SchemaKind;
  optional: boolean;
  options: string[];
}

function classifyField(declared: ZodField): Omit<SchemaField, "key"> {
  const optional = declared.def?.type === "optional";
  const field = optional ? (declared.def?.innerType ?? declared) : declared;
  const type = field.def?.type ?? "";
  if (type === "enum")
    return { kind: "enum", optional, options: Object.keys(field.def?.entries ?? {}) };
  if (type === "boolean") return { kind: "boolean", optional, options: [] };
  if (type === "number") return { kind: "number", optional, options: [] };
  if (type === "array") {
    // Zod v4 names the array's item schema `element`; optional wraps in `innerType`.
    const item = field.def?.element ?? field.def?.innerType;
    return item?.def?.type === "string"
      ? { kind: "stringList", optional, options: [] }
      : { kind: "json", optional, options: [] };
  }
  if (type === "string") return { kind: "string", optional, options: [] };
  return { kind: "json", optional, options: [] };
}

const schemaFields = computed<SchemaField[]>(() => {
  const name = selectedNode.value?.type;
  const shape = (name ? entryFor(name)?.props : undefined) as
    | { def?: { shape?: Record<string, ZodField> } }
    | undefined;
  return Object.entries(shape?.def?.shape ?? {}).map(([key, declared]) => ({
    key,
    ...classifyField(declared),
  }));
});

function setProp(key: string, value: unknown) {
  const node = selectedNode.value;
  if (!node) return;
  if (value === undefined || value === null || value === "") delete node.props[key];
  else node.props[key] = value;
}

const propValue = (key: string) => selectedNode.value?.props[key];
const enumModel = (f: SchemaField) =>
  typeof propValue(f.key) === "string" ? (propValue(f.key) as string) : "";
const numberModel = (f: SchemaField) => {
  const v = propValue(f.key);
  return typeof v === "number" ? String(v) : "";
};
const onNumber = (f: SchemaField, v: string) => {
  if (v === "") setProp(f.key, undefined);
  else if (!Number.isNaN(Number(v))) setProp(f.key, Number(v));
};
const listModel = (f: SchemaField) => {
  const v = propValue(f.key);
  return Array.isArray(v) ? v.join(", ") : "";
};
const onListChange = (f: SchemaField, event: Event) => {
  const raw = (event.target as HTMLInputElement).value;
  const items = raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  setProp(f.key, items.length ? items : undefined);
};
const jsonDrafts = ref<Record<string, string>>({});
const jsonErrors = ref<Record<string, boolean>>({});
const jsonModel = (f: SchemaField) =>
  jsonDrafts.value[f.key] ?? JSON.stringify(propValue(f.key) ?? null, null, 2);
const onJsonInput = (f: SchemaField, v: string) => {
  jsonDrafts.value[f.key] = v;
};
const onJsonCommit = (f: SchemaField) => {
  const raw = jsonDrafts.value[f.key];
  if (raw === undefined) return;
  try {
    const parsed = JSON.parse(raw) as unknown;
    setProp(f.key, parsed === null ? undefined : parsed);
    delete jsonDrafts.value[f.key];
    delete jsonErrors.value[f.key];
  } catch {
    jsonErrors.value[f.key] = true;
  }
};

const propsDraft = ref("{}");
const propsError = ref("");
watch(selectedId, () => {
  jsonDrafts.value = {};
  jsonErrors.value = {};
});
watch(
  selectedNode,
  (node) => {
    propsDraft.value = JSON.stringify(node?.props ?? {}, null, 2);
    propsError.value = "";
  },
  { immediate: true, deep: true },
);

function applyProps() {
  if (!selectedNode.value) return;
  try {
    const parsed = JSON.parse(propsDraft.value) as Record<string, unknown>;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("props");
    selectedNode.value.props = parsed;
    propsError.value = "";
  } catch {
    propsError.value = text.value.inspector.invalid;
  }
}

function toCandidate() {
  return {
    root: rootNode.value.id,
    elements: Object.fromEntries(
      allNodes().map(({ id, type, props, children }) => [id, { type, props, children }]),
    ),
    state: {},
  };
}

const spec = computed(toCandidate);

const validated = computed(() => {
  const result = catalog.validate(spec.value);
  if (result.success) return { spec: result.data, issues: [] as string[] };
  return {
    spec: null,
    issues: (result.error?.issues ?? []).map((issue) => issue.message),
  };
});

const jsonText = computed(() => JSON.stringify(spec.value, null, 2));
const copied = ref(false);
const importDraft = ref("");
const importError = ref("");

async function copyJson() {
  await navigator.clipboard.writeText(jsonText.value);
  copied.value = true;
  setTimeout(() => (copied.value = false), 1600);
}

function downloadJson() {
  const url = URL.createObjectURL(new Blob([jsonText.value], { type: "application/json" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "elements-composition.json";
  anchor.click();
  URL.revokeObjectURL(url);
}

function importJson() {
  try {
    const parsed = JSON.parse(importDraft.value) as {
      root?: string;
      elements?: Record<
        string,
        { type?: string; props?: Record<string, unknown>; children?: string[] }
      >;
    };
    const source = parsed.elements ?? {};
    const declaredRoot = parsed.root && source[parsed.root] ? parsed.root : ROOT_ID;
    // The tree addresses the page by one id; renaming the declared root
    // keeps every reference honest under the ROOT_ID the editor assumes.
    const resolve = (id: string) => (id === declaredRoot ? ROOT_ID : id);
    const known = new Set(Object.keys(source).map(resolve));
    const elements = Object.fromEntries(
      Object.entries(source).map(([id, element]) => [
        resolve(id),
        {
          type: element.type ?? "Text",
          props: element.props ?? {},
          // Drop references the composition never defines; a dangling id
          // would otherwise reach the tree and break its rendering.
          children: (element.children ?? [])
            .map(resolve)
            .filter((child) => child !== resolve(id) && known.has(child)),
        },
      ]),
    );
    const rootElement = elements[ROOT_ID];
    if (!rootElement?.type) throw new Error("root");
    const candidate = { root: ROOT_ID, elements, state: {} };
    const result = catalog.validate(candidate);
    if (!result.success) throw new Error("spec");
    rootNode.value = {
      id: ROOT_ID,
      type: rootElement.type,
      props: { ...(rootElement.props as Record<string, unknown>) },
      children: [...rootElement.children],
    };
    nodes.value = Object.fromEntries(
      Object.entries(elements)
        .filter(([id]) => id !== ROOT_ID)
        .map(([id, element]) => [
          id,
          {
            id,
            type: element.type,
            props: { ...(element.props as Record<string, unknown>) },
            children: [...element.children],
          },
        ]),
    );
    selectedId.value = ROOT_ID;
    importError.value = "";
  } catch {
    importError.value = text.value.json.invalid;
  }
}
</script>

<template>
  <div class="grid content-start gap-(--bs-gap-xl)">
    <PageHeader>
      <PageHeader.Heading>
        <div class="min-w-0">
          <PageHeader.Title>{{ text.heading }}</PageHeader.Title>
          <PageHeader.Description>{{ text.lede }}</PageHeader.Description>
        </div>
      </PageHeader.Heading>
    </PageHeader>

    <div class="grid items-start gap-(--bs-gap-lg) xl:grid-cols-[20rem_minmax(0,1fr)_24rem]">
      <div class="grid min-w-0 content-start gap-(--bs-gap-lg)">
        <Card>
          <Card.Header>
            <Card.Title as-child
              ><h2>{{ text.palette.title }}</h2></Card.Title
            >
            <Card.Description>{{ text.palette.hint }}</Card.Description>
          </Card.Header>
          <Card.Content class="grid content-start gap-(--bs-gap-sm)">
            <Input v-model="search" :placeholder="text.palette.search" type="search" />
            <div class="m-0 grid max-h-[24rem] content-start gap-(--bs-gap-md) overflow-y-auto">
              <section
                v-for="group in catalogGroups"
                :key="group.key"
                class="grid content-start gap-(--bs-gap-xs)"
              >
                <Typography.Label class="sticky top-0 z-10 bg-surface-2">
                  {{ group.label }}
                </Typography.Label>
                <div class="flex flex-wrap gap-1">
                  <Button
                    v-for="name in group.items"
                    :key="name"
                    variant="outline"
                    size="sm"
                    class="cursor-grab! active:cursor-grabbing!"
                    draggable="true"
                    @click="addTo(name)"
                    @dragstart="startComponent($event, name)"
                  >
                    {{ name }}
                  </Button>
                </div>
              </section>
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Header>
            <Card.Title as-child
              ><h2>{{ text.tree.title }}</h2></Card.Title
            >
          </Card.Header>
          <Card.Content>
            <div
              class="grid content-start gap-(--bs-gap-sm) rounded-lg border border-dashed border-border p-(--bs-padding-sm)"
              @dragover="allowCatalog"
              @drop.prevent="onRootDrop"
            >
              <DataTable
                :data="compositionRows"
                :columns="compositionColumns"
                tree
                reorderable
                external-drops
                default-expanded
                :sortable="false"
                :row-height="32"
                :empty-text="text.tree.empty"
                @row-reorder="syncComposition"
                @row-drop="onRowDrop"
              />
            </div>
          </Card.Content>
        </Card>
      </div>

      <Card class="min-w-0">
        <Card.Header>
          <Card.Title as-child
            ><h2>{{ text.preview }}</h2></Card.Title
          >
        </Card.Header>
        <Card.Content>
          <Alert v-if="!validated.spec" status="warning">
            <Alert.Icon />
            <Alert.Body>
              <Alert.Title>{{ text.invalid }}</Alert.Title>
              <Alert.Description>{{ validated.issues[0] }}</Alert.Description>
            </Alert.Body>
          </Alert>
          <div
            v-else
            id="workbench-studio-preview"
            class="grid min-h-[32rem] content-start gap-(--bs-gap-lg) rounded-sm border border-border bg-surface-0 p-(--bs-padding-xl) transition-colors"
            data-theme="light"
            data-density="default"
          >
            <StateProvider :initial-state="{}">
              <VisibilityProvider>
                <ValidationProvider>
                  <ActionProvider>
                    <Renderer :spec="validated.spec" :registry="registry" />
                  </ActionProvider>
                </ValidationProvider>
              </VisibilityProvider>
            </StateProvider>
          </div>
        </Card.Content>
      </Card>

      <Tabs.Root default-value="inspector" class="grid min-w-0 content-start">
        <Tabs.List>
          <Tabs.Trigger value="inspector">{{ text.inspector.title }}</Tabs.Trigger>
          <Tabs.Trigger value="design">{{ text.design }}</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="inspector">
          <Card class="min-w-0">
            <Card.Header>
              <Card.Title as-child>
                <h2 class="flex items-center justify-between gap-(--bs-gap-sm)">
                  <span>{{ text.inspector.title }}</span>
                  <Badge v-if="selectedLabel" tone="ink" variant="outline">{{
                    selectedLabel
                  }}</Badge>
                </h2>
              </Card.Title>
            </Card.Header>
            <Card.Content class="grid content-start gap-(--bs-gap-md)">
              <template v-if="selectedNode">
                <Typography.Label>{{ text.inspector.props }}</Typography.Label>
                <div v-if="schemaFields.length" class="grid content-start gap-(--bs-gap-sm)">
                  <div v-for="f in schemaFields" :key="f.key" class="grid content-start gap-1">
                    <div class="flex items-baseline justify-between gap-(--bs-gap-sm)">
                      <Typography.Label class="m-0">{{ f.key }}</Typography.Label>
                      <span v-if="f.optional" class="text-xs text-tertiary">{{
                        text.inspector.optional
                      }}</span>
                    </div>
                    <Select
                      v-if="f.kind === 'enum'"
                      size="sm"
                      :options="f.options.map((value) => ({ label: value, value }))"
                      :model-value="enumModel(f)"
                      :aria-label="f.key"
                      @update:model-value="(value) => setProp(f.key, value)"
                    />
                    <Switch
                      v-else-if="f.kind === 'boolean'"
                      size="sm"
                      :model-value="propValue(f.key) === true"
                      :aria-label="f.key"
                      @update:model-value="(value) => setProp(f.key, value)"
                    />
                    <NumberInput
                      v-else-if="f.kind === 'number'"
                      size="sm"
                      :model-value="numberModel(f)"
                      :aria-label="f.key"
                      @update:model-value="(value) => onNumber(f, value)"
                    />
                    <Input
                      v-else-if="f.kind === 'string'"
                      size="sm"
                      :model-value="
                        typeof propValue(f.key) === 'string' ? (propValue(f.key) as string) : ''
                      "
                      :aria-label="f.key"
                      @update:model-value="(value) => setProp(f.key, value)"
                    />
                    <Input
                      v-else-if="f.kind === 'stringList'"
                      size="sm"
                      :placeholder="text.inspector.listHint"
                      :model-value="listModel(f)"
                      :aria-label="f.key"
                      @change="onListChange(f, $event)"
                    />
                    <template v-else>
                      <Textarea
                        rows="3"
                        class="font-mono text-xs"
                        :model-value="jsonModel(f)"
                        :aria-label="f.key"
                        @update:model-value="(value) => onJsonInput(f, value)"
                        @blur="onJsonCommit(f)"
                      />
                      <p v-if="jsonErrors[f.key]" class="m-0 text-xs text-danger">
                        {{ text.inspector.jsonFieldInvalid }}
                      </p>
                    </template>
                  </div>
                </div>
                <Typography.Muted v-else>{{ text.inspector.noFields }}</Typography.Muted>

                <details class="grid content-start gap-(--bs-gap-sm)">
                  <summary class="cursor-pointer text-sm text-tertiary">
                    {{ text.inspector.advanced }}
                  </summary>
                  <Textarea
                    v-model="propsDraft"
                    rows="8"
                    class="font-mono text-xs"
                    :aria-label="text.inspector.props"
                  />
                  <p v-if="propsError" class="m-0 text-sm text-danger">{{ propsError }}</p>
                  <Button variant="outline" size="sm" @click="applyProps">
                    <Icon name="i-lucide-check" />
                    {{ text.inspector.apply }}
                  </Button>
                </details>
              </template>
              <Typography.Muted v-else>{{ text.inspector.empty }}</Typography.Muted>

              <div class="mt-2 grid content-start gap-(--bs-gap-sm)">
                <Typography.Label>{{ text.json.title }}</Typography.Label>
                <JsonTreeView.Root
                  :data="spec"
                  :default-expanded-depth="2"
                  class="max-h-56 overflow-auto rounded-md border border-border bg-surface-2 p-3"
                >
                  <JsonTreeView.Tree />
                </JsonTreeView.Root>
                <div class="flex flex-wrap justify-end gap-(--bs-gap-sm)">
                  <Button variant="outline" size="sm" @click="copyJson">
                    <Icon :name="copied ? 'i-lucide-check' : 'i-lucide-copy'" />
                    {{ copied ? text.json.copied : text.json.copy }}
                  </Button>
                  <Button variant="outline" size="sm" @click="downloadJson">
                    <Icon name="i-lucide-download" />
                    {{ text.json.download }}
                  </Button>
                </div>
                <div class="grid content-start gap-(--bs-gap-xs)">
                  <Typography.Label>{{ text.json.import }}</Typography.Label>
                  <Textarea
                    v-model="importDraft"
                    rows="5"
                    class="font-mono text-xs"
                    :placeholder="text.json.importHint"
                    :aria-label="text.json.import"
                  />
                </div>
                <p v-if="importError" class="m-0 text-sm text-danger">{{ importError }}</p>
                <Button variant="outline" size="sm" @click="importJson">
                  <Icon name="i-lucide-arrow-right-to-line" />
                  {{ text.json.apply }}
                </Button>
              </div>
            </Card.Content>
          </Card>
        </Tabs.Content>
        <Tabs.Content value="design">
          <ClientOnly>
            <DesignPanel preview-id="workbench-studio-preview" compact />
          </ClientOnly>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  </div>
</template>
