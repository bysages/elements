<script setup lang="ts">
import { Avatar, Badge, Button, Card, Dialog, Field, Input, Textarea } from "@bysages/vue";
import { computed, reactive, ref } from "vue";

const { locale } = useI18n();

type Folder = "inbox" | "starred" | "sent" | "archive" | "trash";
type Mail = {
  id: string;
  folder: Exclude<Folder, "starred">;
  from: { name: string; email: string };
  subject: { en: string; zh: string };
  body: { en: string[]; zh: string[] };
  time: { en: string; zh: string };
  unread: boolean;
  starred: boolean;
  label: { en: string; zh: string } | null;
};

const copy = {
  en: {
    compose: "Compose",
    search: "Search mail",
    folders: {
      inbox: "Inbox",
      starred: "Starred",
      sent: "Sent",
      archive: "Archive",
      trash: "Trash",
    },
    empty: "Nothing here — the tray is empty.",
    reply: "Reply",
    archive: "Archive",
    del: "Move to trash",
    to: "To",
    subject: "Subject",
    message: "Message",
    send: "Send",
    drafts: "Drafts fold open here.",
  },
  zh: {
    compose: "撰写",
    search: "搜索邮件",
    folders: {
      inbox: "收件箱",
      starred: "已加星标",
      sent: "已发送",
      archive: "归档",
      trash: "废纸篓",
    },
    empty: "这里是空的。",
    reply: "回复",
    archive: "归档",
    del: "移入废纸篓",
    to: "收件人",
    subject: "主题",
    message: "正文",
    send: "发送",
    drafts: "草稿会摊在这里。",
  },
} as const;

const text = computed(() => copy[locale.value as "en" | "zh"]);

const mails = reactive<Mail[]>([
  {
    id: "m-01",
    folder: "inbox",
    from: { name: "Lin Wan", email: "lin@songyan.press" },
    subject: { en: "Proof for edition No. 12", zh: "第十二辑的校样" },
    body: {
      en: [
        "The second proof of edition No. 12 came off the press this morning. The qinghua ink sits heavier on the uncoated sheets than on the sample — deliberate, and I think correct.",
        "Come by the letter room when you can; the plates are still on the press.",
      ],
      zh: [
        "第十二辑的第二遍校样今早下机。青花墨在非涂布纸上的吃墨比样张重——是有意的，我也认为是对的。",
        "有空来字房看看，版还在机上。",
      ],
    },
    time: { en: "09:41", zh: "09:41" },
    unread: true,
    starred: true,
    label: { en: "Press", zh: "印务" },
  },
  {
    id: "m-02",
    folder: "inbox",
    from: { name: "Zhou Ping", email: "zhou@huizhou-paper.cn" },
    subject: { en: "Restock: 300 gsm xuan", zh: "补货：三百克宣纸" },
    body: {
      en: [
        "The 300 gsm xuan you asked about is back in stock, 480 sheets left. I held forty for you through Friday.",
        "The mill also sent a new 320 gsm sample; it takes the zhusha ink beautifully.",
      ],
      zh: [
        "你问的三百克宣纸到货了，还剩四百八十张，给你留了四十张到周五。",
        "纸坊还寄了新出的三百二十克样张，朱砂上去很好看。",
      ],
    },
    time: { en: "08:15", zh: "08:15" },
    unread: true,
    starred: false,
    label: { en: "Paper", zh: "纸张" },
  },
  {
    id: "m-03",
    folder: "inbox",
    from: { name: "Songyan Desk", email: "desk@songyan.press" },
    subject: { en: "Typesetting rota for next week", zh: "下周排版轮值" },
    body: {
      en: [
        "Tuesday is yours on the composing stick; Wednesday and Thursday go to the apprentices.",
        "The galley for the poetry supplement needs a second pair of eyes before Friday.",
      ],
      zh: ["周二的手托排版归你，周三周四给学徒们练手。", "诗补的活字长条周五前需要再过一遍眼。"],
    },
    time: { en: "Yesterday", zh: "昨天" },
    unread: false,
    starred: false,
    label: { en: "Studio", zh: "工坊" },
  },
  {
    id: "m-04",
    folder: "inbox",
    from: { name: "Chen Mo", email: "chenmo@inkline.dev" },
    subject: { en: "Marquee timings", zh: "走马灯的节奏" },
    body: {
      en: [
        "I slowed the marquee to 42 seconds per pass — the pigments read as a sequence now instead of a stripe.",
        "If it still feels quick on the landing wall, we can stagger the columns.",
      ],
      zh: [
        "我把走马灯放慢到每圈四十二秒——颜料现在读得出次序，不再是一条彩带。",
        "如果落地页那面墙还嫌快，可以让几列错开起步。",
      ],
    },
    time: { en: "Yesterday", zh: "昨天" },
    unread: false,
    starred: false,
    label: { en: "Site", zh: "站点" },
  },
  {
    id: "m-05",
    folder: "inbox",
    from: { name: "Hu Shuang", email: "hu@paperfair.cn" },
    subject: { en: "Booth confirmation, paper fair", zh: "纸博会摊位确认" },
    body: {
      en: [
        "Your booth is B-14, by the south door — morning light hits the displayed sheets directly.",
        "Two tables, one lockable drawer. Loading starts Thursday 07:00.",
      ],
      zh: [
        "摊位定为 B-14，南门边——上午的光正好打在展出的样纸上。",
        "两张桌、一个带锁抽屉。周四早上七点开始进场。",
      ],
    },
    time: { en: "Mon", zh: "周一" },
    unread: false,
    starred: true,
    label: { en: "Travel", zh: "差旅" },
  },
  {
    id: "m-06",
    folder: "sent",
    from: { name: "Me", email: "sage@songyan.press" },
    subject: { en: "Re: Ink drawdowns for celadon", zh: "Re: 青瓷墨的打样" },
    body: {
      en: [
        "The celadon drawdowns look settled — approve the darker of the two and keep the lighter for the endpapers.",
        "Please send both to the bindery with Friday's batch.",
      ],
      zh: ["青瓷的打样定下来了——批深的那版，浅的留给环衬。", "两版都随周五那批料送装订坊。"],
    },
    time: { en: "Mon", zh: "周一" },
    unread: false,
    starred: false,
    label: null,
  },
  {
    id: "m-07",
    folder: "archive",
    from: { name: "Meridian Press", email: "hello@meridian.example" },
    subject: { en: "Joint printing, autumn catalogue", zh: "秋季目录的联合印制" },
    body: {
      en: [
        "Would you take the letterpress inner signatures of our autumn catalogue? Sixteen pages, two inks.",
        "We cover paper and press time; the colophon names both houses.",
      ],
      zh: [
        "我们秋季目录的活版内页，你们接不接？十六页，双色。",
        "纸张与机时我们出，版权页署两家名。",
      ],
    },
    time: { en: "Sep 22", zh: "9 月 22 日" },
    unread: false,
    starred: false,
    label: { en: "Press", zh: "印务" },
  },
  {
    id: "m-08",
    folder: "trash",
    from: { name: "No-Reply", email: "noreply@fonts.example" },
    subject: { en: "Your trial expired", zh: "你的试用已到期" },
    body: {
      en: ["The trial lapsed on Tuesday. The files stay intact for thirty days."],
      zh: ["试用周二到期了。文件会保留三十天。"],
    },
    time: { en: "Sep 18", zh: "9 月 18 日" },
    unread: false,
    starred: false,
    label: null,
  },
]);

const folder = ref<Folder>("inbox");
const selectedId = ref<string | null>("m-01");
const query = ref("");

const folderList: Array<{ key: Folder; icon: string }> = [
  { key: "inbox", icon: "i-lucide-inbox" },
  { key: "starred", icon: "i-lucide-star" },
  { key: "sent", icon: "i-lucide-send" },
  { key: "archive", icon: "i-lucide-archive" },
  { key: "trash", icon: "i-lucide-trash-2" },
];

const unreadCount = (key: Folder) =>
  mails.filter((m) => (key === "starred" ? m.starred : m.folder === key && m.unread)).length;

const visible = computed(() =>
  mails.filter((m) => {
    if (folder.value === "starred" ? !m.starred : m.folder !== folder.value) return false;
    const q = query.value.trim().toLowerCase();
    if (!q) return true;
    const hay =
      `${m.from.name} ${m.from.email} ${m.subject[locale.value as "en" | "zh"]}`.toLowerCase();
    return hay.includes(q);
  }),
);

const selected = computed(() => mails.find((m) => m.id === selectedId.value) ?? null);

function pick(mail: Mail) {
  mail.unread = false;
  selectedId.value = mail.id;
}

function toggleStar(mail: Mail) {
  mail.starred = !mail.starred;
}

function moveTo(mail: Mail, target: Exclude<Folder, "starred">) {
  mail.folder = target;
  if (selectedId.value === mail.id) selectedId.value = null;
}

// Compose opens as its own door; sending files the letter under Sent
// and opens it — the sent tray is never an empty ritual.
const composing = ref(false);
const draft = reactive({ to: "", subject: "", body: "" });

function send() {
  const id = `m-${crypto.randomUUID().slice(0, 6)}`;
  const mail: Mail = {
    id,
    folder: "sent",
    from: { name: locale.value === "zh" ? "我" : "Me", email: "sage@songyan.press" },
    subject: { en: draft.subject || "(no subject)", zh: draft.subject || "（无主题）" },
    body: { en: [draft.body], zh: [draft.body] },
    time: locale.value === "zh" ? "刚刚" : "now",
    unread: false,
    starred: false,
    label: null,
  };
  mails.unshift(mail);
  composing.value = false;
  draft.to = "";
  draft.subject = "";
  draft.body = "";
  folder.value = "sent";
  selectedId.value = id;
}
</script>

<template>
  <Card.Root>
    <Card.Content class="p-0!">
      <div class="grid h-[38rem] md:grid-cols-[11rem_17rem_1fr]">
        <!-- The folders rail: quiet ink, counts where they earn keep. -->
        <nav class="hidden flex-col gap-1 border-r border-border p-3 md:flex" aria-label="Folders">
          <Dialog.Root lazy-mount :open="composing" @update:open="composing = $event">
            <Dialog.Trigger as-child class="mb-3">
              <Button class="w-full!">
                <Icon name="i-lucide-pen-line" />
                {{ text.compose }}
              </Button>
            </Dialog.Trigger>
            <Teleport to="body">
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content class="max-w-md!">
                  <Dialog.Title>{{ text.compose }}</Dialog.Title>
                  <Dialog.CloseTrigger :aria-label="locale === 'zh' ? '关闭' : 'Close'">
                    <Icon name="i-lucide-x" />
                  </Dialog.CloseTrigger>
                  <div class="grid gap-3 py-2">
                    <Field.Root>
                      <Field.Label>{{ text.to }}</Field.Label>
                      <Input v-model="draft.to" type="email" placeholder="to@songyan.press" />
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>{{ text.subject }}</Field.Label>
                      <Input v-model="draft.subject" :placeholder="text.subject" />
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>{{ text.message }}</Field.Label>
                      <Textarea v-model="draft.body" :rows="6" />
                    </Field.Root>
                  </div>
                  <div class="flex justify-end gap-2">
                    <Button variant="ghost" @click="composing = false">{{
                      locale === "zh" ? "取消" : "Cancel"
                    }}</Button>
                    <Button @click="send">
                      <Icon name="i-lucide-send" />
                      {{ text.send }}
                    </Button>
                  </div>
                </Dialog.Content>
              </Dialog.Positioner>
            </Teleport>
          </Dialog.Root>

          <button
            v-for="f in folderList"
            :key="f.key"
            class="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm no-underline transition-colors hover:bg-surface-2"
            :class="folder === f.key ? 'bg-surface-2 font-medium text-primary' : 'text-secondary'"
            @click="
              folder = f.key;
              selectedId = null;
            "
          >
            <Icon :name="f.icon" />
            {{ text.folders[f.key] }}
            <span v-if="unreadCount(f.key)" class="ml-auto text-xs tabular-nums text-tertiary">{{
              unreadCount(f.key)
            }}</span>
          </button>
        </nav>

        <!-- The list: sender, subject, one line of the letter. -->
        <div
          class="flex min-h-0 flex-col border-border md:border-r"
          :class="selected ? 'hidden md:flex' : 'flex'"
        >
          <div class="p-2">
            <Input v-model="query" :placeholder="text.search" />
          </div>
          <div class="min-h-0 flex-1 overflow-y-auto">
            <div
              v-for="mail in visible"
              :key="mail.id"
              role="button"
              tabindex="0"
              class="flex w-full cursor-pointer flex-col gap-0.5 border-b border-border px-3 py-2.5 text-left transition-colors hover:bg-surface-1"
              :class="selectedId === mail.id ? 'bg-surface-1' : ''"
              @click="pick(mail)"
              @keydown.enter.prevent="pick(mail)"
            >
              <span class="flex items-center gap-2">
                <span v-if="mail.unread" class="size-1.5 shrink-0 rounded-full bg-primary" />
                <span class="truncate text-sm" :class="mail.unread ? 'font-medium' : ''">{{
                  mail.from.name
                }}</span>
                <span class="ml-auto shrink-0 text-xs tabular-nums text-tertiary">{{
                  mail.time[locale]
                }}</span>
              </span>
              <span class="truncate text-sm" :class="mail.unread ? 'font-medium' : ''">{{
                mail.subject[locale]
              }}</span>
              <span class="flex items-center gap-1">
                <button
                  class="p-0.5 no-underline"
                  :class="mail.starred ? 'text-primary' : 'text-tertiary hover:text-secondary'"
                  :aria-label="text.folders.starred"
                  @click.stop="toggleStar(mail)"
                >
                  <Icon
                    name="i-lucide-star"
                    mode="svg"
                    :class="mail.starred ? 'fill-icon text-primary' : ''"
                  />
                </button>
                <span class="truncate text-xs text-tertiary">{{ mail.body[locale][0] }}</span>
              </span>
            </div>
            <p v-if="!visible.length" class="p-6 text-center text-sm text-tertiary">
              {{ text.empty }}
            </p>
          </div>
        </div>

        <!-- The letter itself. -->
        <div
          class="flex min-h-0 flex-col overflow-y-auto p-6"
          :class="selected ? 'block' : 'hidden md:block'"
        >
          <template v-if="selected">
            <div class="mb-3 flex items-center gap-1 md:hidden">
              <Button variant="ghost" size="sm" @click="selectedId = null">
                <Icon name="i-lucide-arrow-left" />
              </Button>
            </div>
            <div class="mb-4 flex items-start justify-between gap-4">
              <h2 class="m-0 font-serif text-xl leading-snug">{{ selected.subject[locale] }}</h2>
              <div class="flex shrink-0 gap-1">
                <Button variant="ghost" size="sm" square @click="toggleStar(selected)">
                  <Icon
                    name="i-lucide-star"
                    mode="svg"
                    :class="selected.starred ? 'fill-icon text-primary' : ''"
                  />
                </Button>
                <Button variant="ghost" size="sm" square @click="moveTo(selected, 'archive')">
                  <Icon name="i-lucide-archive" />
                </Button>
                <Button variant="ghost" size="sm" square @click="moveTo(selected, 'trash')">
                  <Icon name="i-lucide-trash-2" />
                </Button>
              </div>
            </div>
            <div class="mb-5 flex items-center gap-3">
              <Avatar.Root class="size-9">
                <Avatar.Fallback>{{ selected.from.name.slice(0, 1) }}</Avatar.Fallback>
              </Avatar.Root>
              <div class="min-w-0">
                <p class="m-0 truncate text-sm font-medium">{{ selected.from.name }}</p>
                <p class="m-0 truncate text-xs text-tertiary">{{ selected.from.email }}</p>
              </div>
              <span class="ml-auto shrink-0 text-xs text-tertiary">{{
                selected.time[locale]
              }}</span>
            </div>
            <div class="grid gap-3">
              <p
                v-for="(para, i) in selected.body[locale]"
                :key="i"
                class="m-0 text-sm leading-relaxed text-secondary"
              >
                {{ para }}
              </p>
            </div>
            <div v-if="selected.label" class="mt-5">
              <Badge tone="ink" variant="outline">{{ selected.label[locale] }}</Badge>
            </div>
          </template>
          <p v-else class="grid h-full place-items-center text-sm text-tertiary">
            {{ text.drafts }}
          </p>
        </div>
      </div>
    </Card.Content>
  </Card.Root>
</template>
