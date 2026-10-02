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
  PageHeader,
  Tabs,
  Textarea,
  Typography,
} from "@bysages/vue";
import { catalog, registry } from "@bysages/vue/generative";
import {
  ActionProvider,
  Renderer,
  StateProvider,
  ValidationProvider,
  VisibilityProvider,
} from "@json-render/vue";
import { computed, h, ref, watch } from "vue";

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
      apply: "Apply",
      invalid: "Props must be a JSON object.",
    },
    design: "Design",
    preview: "Preview",
    invalid: "The composition is not a valid spec yet.",
    json: {
      title: "JSON",
      copy: "Copy",
      copied: "Copied",
      download: "Download",
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
      apply: "应用",
      invalid: "属性必须是 JSON 对象。",
    },
    design: "设计",
    preview: "预览",
    invalid: "当前组合还不是合法规格。",
    json: {
      title: "JSON",
      copy: "复制",
      copied: "已复制",
      download: "下载",
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
const filteredComponents = computed(() => {
  const query = search.value.trim().toLowerCase();
  if (!query) return componentNames;
  return componentNames.filter((name) => name.toLowerCase().includes(query));
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

const compositionRows = computed<CompositionRow[]>(() =>
  rootNode.value.children.map(function toRow(id: string): CompositionRow {
    const node = nodes.value[id]!;
    const children = node.children.map(toRow);
    return {
      id,
      type: node.type,
      childCount: children.length,
      subRows: children.length ? children : undefined,
    };
  }),
);

const col = createColumnHelper<CompositionRow>();
const compositionColumns = col.columns([
  col.accessor("type", {
    header: () => text.value.tree.component,
    cell: ({ row }) => {
      const item = row.original;
      const selected = item.id === selectedId.value;
      return h("span", { class: "flex min-w-0 items-center gap-(--bs-gap-sm)" }, [
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
        item.childCount
          ? h("span", { class: "text-xs text-tertiary" }, String(item.childCount))
          : null,
      ]);
    },
  }),
  col.display({
    id: "actions",
    header: () => "",
    cell: ({ row }) =>
      h(
        Button,
        {
          variant: "ghost",
          size: "sm",
          square: true,
          "aria-label": `${text.value.tree.remove} ${row.original.type}`,
          onClick: () => removeNode(row.original.id),
        },
        () => "×",
      ),
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

  rows.forEach((row) => place(row, [ROOT_ID]));
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

const propsDraft = ref("{}");
const propsError = ref("");
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
    const rootId = parsed.root ?? ROOT_ID;
    const rootElement = parsed.elements?.[rootId];
    if (!rootElement?.type) throw new Error("root");
    const candidate = {
      root: rootId,
      elements: Object.fromEntries(
        Object.entries(parsed.elements ?? {}).map(([id, element]) => [
          id,
          {
            type: element.type ?? "Text",
            props: element.props ?? {},
            children: element.children ?? [],
          },
        ]),
      ),
      state: {},
    };
    const result = catalog.validate(candidate);
    if (!result.success) throw new Error("spec");
    rootNode.value = {
      id: rootId,
      type: candidate.elements[rootId]!.type,
      props: { ...(candidate.elements[rootId]!.props as Record<string, unknown>) },
      children: [...(candidate.elements[rootId]!.children ?? [])],
    };
    nodes.value = Object.fromEntries(
      Object.entries(candidate.elements)
        .filter(([id]) => id !== rootId)
        .map(([id, element]) => [
          id,
          {
            id,
            type: element.type,
            props: { ...(element.props as Record<string, unknown>) },
            children: [...(element.children ?? [])],
          },
        ]),
    );
    selectedId.value = rootId;
    importError.value = "";
  } catch {
    importError.value = text.value.json.invalid;
  }
}
</script>

<template>
  <div class="grid content-start gap-(--bs-gap-xl)">
    <PageHeader.Root>
      <PageHeader.Heading>
        <div class="min-w-0">
          <PageHeader.Title>{{ text.heading }}</PageHeader.Title>
          <PageHeader.Description>{{ text.lede }}</PageHeader.Description>
        </div>
      </PageHeader.Heading>
    </PageHeader.Root>

    <div class="grid items-start gap-(--bs-gap-lg) xl:grid-cols-[20rem_minmax(0,1fr)_24rem]">
      <div class="grid min-w-0 content-start gap-(--bs-gap-lg)">
        <Card.Root>
          <Card.Header>
            <Card.Title as-child
              ><h2>{{ text.palette.title }}</h2></Card.Title
            >
            <Card.Description>{{ text.palette.hint }}</Card.Description>
          </Card.Header>
          <Card.Content class="grid content-start gap-(--bs-gap-sm)">
            <Input v-model="search" :placeholder="text.palette.search" type="search" />
            <ul class="m-0 grid max-h-[22rem] content-start gap-1 overflow-y-auto list-none p-0">
              <li v-for="name in filteredComponents" :key="name">
                <Button
                  variant="outline"
                  size="sm"
                  class="w-full cursor-grab! justify-start! active:cursor-grabbing!"
                  draggable="true"
                  @click="addTo(name)"
                  @dragstart="startComponent($event, name)"
                >
                  {{ name }}
                </Button>
              </li>
            </ul>
          </Card.Content>
        </Card.Root>

        <Card.Root>
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
        </Card.Root>
      </div>

      <Card.Root class="min-w-0">
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
      </Card.Root>

      <Tabs.Root default-value="inspector" class="grid min-w-0 content-start">
        <Tabs.List>
          <Tabs.Trigger value="inspector">{{ text.inspector.title }}</Tabs.Trigger>
          <Tabs.Trigger value="design">{{ text.design }}</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="inspector">
          <Card.Root class="min-w-0">
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
                <div class="flex flex-wrap gap-(--bs-gap-sm)">
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
          </Card.Root>
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
