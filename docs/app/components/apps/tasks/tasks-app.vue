<script setup lang="ts">
import { createListCollection } from "@ark-ui/vue/select";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Dialog,
  Field,
  Input,
  SegmentGroup,
  Select,
} from "@bysages/vue";
import { computed, reactive, ref } from "vue";

const { locale } = useI18n();

type Status = "todo" | "doing" | "done";
type Priority = "high" | "med" | "low";
type Task = {
  id: string;
  title: { en: string; zh: string };
  status: Status;
  priority: Priority;
  due: { en: string; zh: string };
  who: string;
};

const copy = {
  en: {
    new: "New task",
    title: "Task",
    titlePlaceholder: "What moves the press forward",
    priority: "Priority",
    due: "Due date",
    add: "Add task",
    cancel: "Cancel",
    filters: { all: "All", todo: "To do", doing: "In progress", done: "Done" },
    priorities: { any: "Any priority", high: "High", med: "Medium", low: "Low" },
    priorityLabel: { high: "High", med: "Medium", low: "Low" },
    empty: "No tasks in this drawer.",
    left: (n: number) => `${n} open`,
    done: "Done",
  },
  zh: {
    new: "新建任务",
    title: "任务",
    titlePlaceholder: "什么事推动印坊前进",
    priority: "优先级",
    due: "截止日期",
    add: "添加任务",
    cancel: "取消",
    filters: { all: "全部", todo: "待办", doing: "进行中", done: "已完成" },
    priorities: { any: "不限优先级", high: "高", med: "中", low: "低" },
    priorityLabel: { high: "高", med: "中", low: "低" },
    empty: "这个抽屉里没有任务。",
    left: (n: number) => `${n} 件未完成`,
    done: "完成",
  },
} as const;

const text = computed(() => copy[locale.value as "en" | "zh"]);

const tasks = reactive<Task[]>([
  {
    id: "t-01",
    title: { en: "Proof edition No. 12, second pass", zh: "第十二辑校样，第二遍" },
    status: "doing",
    priority: "high",
    due: { en: "Thu", zh: "周四" },
    who: "LW",
  },
  {
    id: "t-02",
    title: { en: "Order 300 gsm xuan restock", zh: "下单补货三百克宣纸" },
    status: "todo",
    priority: "med",
    due: { en: "Fri", zh: "周五" },
    who: "SW",
  },
  {
    id: "t-03",
    title: { en: "Ink drawdowns for celadon", zh: "青瓷墨打样" },
    status: "done",
    priority: "high",
    due: { en: "Tue", zh: "周二" },
    who: "SW",
  },
  {
    id: "t-04",
    title: { en: "Set poetry supplement galleys", zh: "排诗补的活字长条" },
    status: "doing",
    priority: "med",
    due: { en: "Fri", zh: "周五" },
    who: "CM",
  },
  {
    id: "t-05",
    title: { en: "Paper fair booth plan B-14", zh: "纸博会 B-14 摊位布置" },
    status: "todo",
    priority: "low",
    due: { en: "Oct 12", zh: "10 月 12 日" },
    who: "HS",
  },
  {
    id: "t-06",
    title: { en: "Marquee pass timing to 42s", zh: "走马灯放慢到四十二秒" },
    status: "done",
    priority: "low",
    due: { en: "Mon", zh: "周一" },
    who: "CM",
  },
  {
    id: "t-07",
    title: { en: "Bindery batch for Friday", zh: "周五装订批次核对" },
    status: "todo",
    priority: "high",
    due: { en: "Fri", zh: "周五" },
    who: "LW",
  },
]);

const statusFilter = ref<Status | "all">("all");
const priorityFilter = ref<string[]>(["any"]);

const priorityTone: Record<Priority, string> = { high: "danger", med: "warning", low: "info" };

const statusTone: Record<
  Status,
  { tone: "ink" | "primary" | "success"; variant: "outline" | "subtle" }
> = {
  todo: { tone: "ink", variant: "outline" },
  doing: { tone: "primary", variant: "subtle" },
  done: { tone: "success", variant: "subtle" },
};

const checkedState = (status: Status) =>
  status === "done" ? true : status === "doing" ? "indeterminate" : false;

const visible = computed(() =>
  tasks.filter(
    (t) =>
      (statusFilter.value === "all" || t.status === statusFilter.value) &&
      (priorityFilter.value[0] === "any" || t.priority === priorityFilter.value[0]),
  ),
);

const openCount = computed(() => tasks.filter((t) => t.status !== "done").length);

const priorityCollection = computed(() =>
  createListCollection({
    items: (["any", "high", "med", "low"] as const).map((value) => ({
      value,
      label: text.value.priorities[value],
    })),
  }),
);

// The new-task door: a title, a priority, a date — the ledger does
// the rest.
const composing = ref(false);
const draft = reactive({ title: "", priority: ["med"] as string[], due: "" });

// The box is the workflow: an open box is waiting, the dash means
// hands are on it, the check settles it.
function cycle(task: Task, v: boolean) {
  task.status = v ? (task.status === "todo" ? "doing" : "done") : "todo";
}

function add() {
  if (!draft.title.trim()) return;
  tasks.unshift({
    id: `t-${crypto.randomUUID().slice(0, 6)}`,
    title: { en: draft.title, zh: draft.title },
    status: "todo",
    priority: (draft.priority[0] ?? "med") as Priority,
    due: { en: draft.due || "—", zh: draft.due || "—" },
    who: "SW",
  });
  composing.value = false;
  draft.title = "";
  draft.priority = ["med"];
  draft.due = "";
}
</script>

<template>
  <Card.Root>
    <Card.Header class="flex! flex-row! items-center! justify-between!">
      <div>
        <Card.Title>{{ locale === "zh" ? "印坊清单" : "Press ledger" }}</Card.Title>
        <Card.Description>{{ text.left(openCount) }}</Card.Description>
      </div>
      <Dialog.Root lazy-mount :open="composing" @update:open="composing = $event">
        <Dialog.Trigger as-child>
          <Button size="sm">
            <Icon name="i-lucide-plus" />
            {{ text.new }}
          </Button>
        </Dialog.Trigger>
        <Teleport to="body">
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content class="max-w-md!">
              <Dialog.Title>{{ text.new }}</Dialog.Title>
              <Dialog.CloseTrigger :aria-label="locale === 'zh' ? '关闭' : 'Close'">
                <Icon name="i-lucide-x" />
              </Dialog.CloseTrigger>
              <div class="grid gap-3 py-2">
                <Field.Root required>
                  <Field.Label>{{ text.title }}</Field.Label>
                  <Input v-model="draft.title" :placeholder="text.titlePlaceholder" />
                </Field.Root>
                <Field.Root>
                  <Field.Label>{{ text.priority }}</Field.Label>
                  <Select.Root :collection="priorityCollection" v-model="draft.priority">
                    <Select.Control>
                      <Select.Trigger>
                        <Select.ValueText :placeholder="text.priorities.med" />
                      </Select.Trigger>
                      <Select.Indicator>
                        <Icon name="i-lucide-chevron-down" />
                      </Select.Indicator>
                    </Select.Control>
                    <Teleport to="body">
                      <Select.Positioner>
                        <Select.Content>
                          <Select.Item
                            v-for="item in priorityCollection.items"
                            :key="item.value"
                            :item="item"
                          >
                            <Select.ItemText>{{
                              text.priorities[item.value as Priority]
                            }}</Select.ItemText>
                          </Select.Item>
                        </Select.Content>
                      </Select.Positioner>
                    </Teleport>
                    <Select.HiddenSelect />
                  </Select.Root>
                </Field.Root>
                <Field.Root>
                  <Field.Label>{{ text.due }}</Field.Label>
                  <Input v-model="draft.due" type="date" />
                </Field.Root>
              </div>
              <div class="flex justify-end gap-2">
                <Button variant="ghost" @click="composing = false">{{ text.cancel }}</Button>
                <Button :disabled="!draft.title.trim()" @click="add">{{ text.add }}</Button>
              </div>
            </Dialog.Content>
          </Dialog.Positioner>
        </Teleport>
      </Dialog.Root>
    </Card.Header>
    <Card.Content>
      <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
        <SegmentGroup.Root
          size="sm"
          :model-value="statusFilter"
          @update:model-value="statusFilter = $event as Status | 'all'"
        >
          <SegmentGroup.Indicator />
          <SegmentGroup.Item value="all">
            <SegmentGroup.ItemHiddenInput />
            <SegmentGroup.ItemControl />
            <SegmentGroup.ItemText>{{ text.filters.all }}</SegmentGroup.ItemText>
          </SegmentGroup.Item>
          <SegmentGroup.Item value="todo">
            <SegmentGroup.ItemHiddenInput />
            <SegmentGroup.ItemControl />
            <SegmentGroup.ItemText>{{ text.filters.todo }}</SegmentGroup.ItemText>
          </SegmentGroup.Item>
          <SegmentGroup.Item value="doing">
            <SegmentGroup.ItemHiddenInput />
            <SegmentGroup.ItemControl />
            <SegmentGroup.ItemText>{{ text.filters.doing }}</SegmentGroup.ItemText>
          </SegmentGroup.Item>
          <SegmentGroup.Item value="done">
            <SegmentGroup.ItemHiddenInput />
            <SegmentGroup.ItemControl />
            <SegmentGroup.ItemText>{{ text.filters.done }}</SegmentGroup.ItemText>
          </SegmentGroup.Item>
        </SegmentGroup.Root>

        <Select.Root :collection="priorityCollection" v-model="priorityFilter" class="w-40!">
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText :placeholder="text.priorities.any" />
            </Select.Trigger>
            <Select.Indicator>
              <Icon name="i-lucide-chevron-down" />
            </Select.Indicator>
          </Select.Control>
          <Teleport to="body">
            <Select.Positioner>
              <Select.Content>
                <Select.Item
                  v-for="item in priorityCollection.items"
                  :key="item.value"
                  :item="item"
                >
                  <Select.ItemText>{{ text.priorities[item.value as Priority] }}</Select.ItemText>
                </Select.Item>
              </Select.Content>
            </Select.Positioner>
          </Teleport>
          <Select.HiddenSelect />
        </Select.Root>
      </div>

      <ul class="m-0 list-none p-0">
        <li
          v-for="task in visible"
          :key="task.id"
          class="flex items-center gap-3 border-b border-border py-3 last:border-b-0"
        >
          <Checkbox.Root
            :checked="checkedState(task.status)"
            @update:checked="(v: boolean) => cycle(task, v)"
          >
            <Checkbox.Control>
              <Checkbox.Indicator :indeterminate="false">
                <Icon name="i-lucide-check" />
              </Checkbox.Indicator>
              <Checkbox.Indicator :indeterminate="true">
                <Icon name="i-lucide-minus" />
              </Checkbox.Indicator>
            </Checkbox.Control>
            <Checkbox.HiddenInput />
          </Checkbox.Root>
          <span
            class="min-w-0 flex-1 truncate text-sm"
            :class="task.status === 'done' ? 'text-tertiary line-through' : ''"
            >{{ task.title[locale] }}</span
          >
          <Badge :tone="statusTone[task.status].tone" :variant="statusTone[task.status].variant">
            {{ text.filters[task.status] }}
          </Badge>
          <Badge :tone="priorityTone[task.priority]" variant="subtle">
            {{ text.priorityLabel[task.priority] }}
          </Badge>
          <span class="hidden w-20 shrink-0 text-xs tabular-nums text-tertiary sm:block">{{
            task.due[locale]
          }}</span>
          <Avatar.Root class="size-6 shrink-0">
            <Avatar.Fallback>{{ task.who }}</Avatar.Fallback>
          </Avatar.Root>
        </li>
      </ul>
      <p v-if="!visible.length" class="m-0 py-8 text-center text-sm text-tertiary">
        {{ text.empty }}
      </p>
    </Card.Content>
  </Card.Root>
</template>
