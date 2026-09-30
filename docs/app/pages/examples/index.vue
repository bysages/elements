<script setup lang="ts">
import { Badge, Card } from "@bysages/vue";

// The examples gallery sits outside the content shelves — real pages
// under app/pages/examples — so this index is the entry the header's
// Examples tab lands on.
definePageMeta({ layout: "default", examples: true });

// strategy "prefix" serves every locale under its own segment, so the
// bare path would fall out of the router — each link rides localePath.
const lp = useLocalePath();

const { locale } = useI18n();

const copy = {
  en: {
    seo: {
      title: "Examples",
      description:
        "Complete applications built from the Elements library — an admin dashboard, a blog, a GitHub profile, and an AI chat workbench.",
    },
    heading: "Examples",
    lede: "Complete applications assembled from the library — each one is the real components, styled only by the design system, running live in this page.",
    open: "Open the example",
    source: "View source",
    apps: {
      dashboard: {
        title: "Admin Dashboard",
        description:
          "A revenue console: stat cards, charts, and a sortable, filterable, selectable data table with drawer detail and dialog editing.",
      },
      login: {
        title: "Login",
        description:
          "Three doors into the same workbench: a centered card, a split panel wearing the house ink, and a two-step one-time code with a resend clock.",
      },
      blog: {
        title: "Blog",
        description:
          "An editorial site: a filterable post grid, an article view with a tracked table of contents, and a comment thread.",
      },
      landing: {
        title: "Marketing Landing",
        description:
          "A letterpress studio's public face: sticky nav, serif hero, wordmark lattice, and a masonry press gallery.",
      },
      chat: {
        title: "AI Chat Workbench",
        description:
          "A simulated assistant conversation: streamed responses, tool calls, reasoning, and suggestion chips — no network, all local.",
      },
      github: {
        title: "GitHub Profile",
        description:
          "DemoMacro's GitHub profile, fed live by the ungh API: real avatar, star and fork counts, and the tabbed repository index.",
      },
      mobile: {
        title: "Mobile Registers",
        description:
          "Two phone screens in the handheld registers: a chat home in missive and an office workbench in dispatch, each pinned to its scene by ConfigProvider.",
      },
      mail: {
        title: "Mail",
        description:
          "A three-tray letter room: folders, a list with unread dots and stars, and a reading pane that drafts replies in a dialog.",
      },
      tasks: {
        title: "Tasks",
        description:
          "A small press-room board: status filters, a priority select, completion checkboxes, and new tasks added in a dialog.",
      },
      music: {
        title: "Music",
        description:
          "A listening room: an album shelf, a track queue, and a now-playing panel whose band moves and hands off to the next song.",
      },
      forms: {
        title: "Forms",
        description:
          "The form workbench: a profile card validated while you type, beside a preferences card of switches and a digest cadence.",
      },
    },
  },
  zh: {
    seo: {
      title: "示例",
      description:
        "用 Elements 组件库搭建的完整应用——管理控制台、博客、GitHub 主页与 AI 对话工作台。",
    },
    heading: "示例",
    lede: "用组件库拼装的完整应用——每一个都是真实组件，只由设计系统着色，在本页实时运行。",
    open: "打开示例",
    source: "查看源码",
    apps: {
      dashboard: {
        title: "管理控制台",
        description:
          "一间营收控制台：统计卡、图表，以及一张可排序、可筛选、可多选的数据表，配抽屉详情与对话框编辑。",
      },
      login: {
        title: "登录",
        description:
          "通向同一间工作台的三扇门：居中卡片、身着纸墨的分屏，以及带重发倒计时的两步验证码。",
      },
      blog: {
        title: "博客",
        description: "一个编辑部落格：可筛选的文章栅格、带跟随目录的阅读页，以及评论区串。",
      },
      landing: {
        title: "营销落地页",
        description: "一家活版印刷工作室的门面：吸顶导航、衬线主视觉、字标格阵与瀑布流印刷画廊。",
      },
      chat: {
        title: "AI 对话工作台",
        description:
          "一段模拟的助手对话：流式回复、工具调用、推理过程与建议标签——不走网络，全在本地。",
      },
      github: {
        title: "GitHub 主页",
        description:
          "DemoMacro 的 GitHub 主页，由 ungh API 实时供数：真实头像、star 与 fork 计数，以及分页签的仓库索引。",
      },
      mobile: {
        title: "移动端场景",
        description:
          "手持终端里的两块屏：missive 风格的聊天首页与 dispatch 风格的办公工作台，各自由 ConfigProvider 钉在对应场景。",
      },
      mail: {
        title: "邮件",
        description:
          "三栏的信房：文件夹、带未读点与星标的信件列表，以及在对话框里落笔回信的阅读栏。",
      },
      tasks: {
        title: "任务清单",
        description: "印坊里的小看板：状态筛选、优先级选择、完成勾选，新建任务在对话框里落笔。",
      },
      music: {
        title: "音乐",
        description: "一间听音室：专辑架、曲目队列，以及走带行进、唱完自动交棒的正在播放面板。",
      },
      forms: {
        title: "表单",
        description: "表单工作台：左边一张边输边校验的资料卡，右边一张开关与摘要节奏的偏好卡。",
      },
    },
  },
} as const;

const text = computed(() => copy[locale.value as "en" | "zh"]);

useSeoMeta({
  title: () => text.value.seo.title,
  description: () => text.value.seo.description,
});

const config = useAppConfig() as {
  github?: { url?: string; branch?: string; rootDir?: string };
};

const sourceUrl = (name: string) =>
  [
    config.github?.url,
    "tree",
    config.github?.branch,
    config.github?.rootDir,
    "app/components/apps",
    name,
  ]
    .filter(Boolean)
    .join("/");

type ExampleName =
  | "dashboard"
  | "login"
  | "mail"
  | "tasks"
  | "music"
  | "forms"
  | "blog"
  | "landing"
  | "chat"
  | "github"
  | "mobile";

const apps: Array<{ name: ExampleName; components: string[] }> = [
  {
    name: "dashboard",
    components: ["Layout", "Stat", "Chart", "DataTable", "Drawer", "Dialog", "Toast"],
  },
  {
    name: "login",
    components: ["Card", "Field", "Input", "Checkbox", "PinInput", "Button", "SegmentGroup"],
  },
  {
    name: "mail",
    components: ["Card", "Input", "Badge", "Dialog", "Avatar"],
  },
  {
    name: "tasks",
    components: ["Checkbox", "Badge", "SegmentGroup", "Select", "Dialog"],
  },
  { name: "music", components: ["Slider", "Button", "Icon"] },
  {
    name: "forms",
    components: ["Form", "FormField", "Input", "Textarea", "Switch", "Select"],
  },
  {
    name: "blog",
    components: ["Card", "Badge", "Pagination", "Typography", "Toc", "Comment", "Avatar"],
  },
  { name: "landing", components: ["Masonry", "Accordion", "Card", "Avatar", "Badge", "Button"] },
  {
    name: "chat",
    components: ["AiPromptInput", "AiMessage", "AiResponse", "AiTool", "AiSuggestion"],
  },
  { name: "github", components: ["Chart", "Tabs", "Card", "Badge", "Avatar", "Button"] },
  { name: "mobile", components: ["ConfigProvider", "Avatar", "Badge", "Input", "Icon"] },
];
</script>

<template>
  <div class="mx-auto w-full max-w-[90rem] px-6 pb-12 pt-8">
    <header class="mb-8 max-w-[44rem]">
      <h1 class="m-0 mb-3 font-serif text-4xl leading-tight">{{ text.heading }}</h1>
      <p class="m-0 text-secondary">{{ text.lede }}</p>
    </header>

    <div class="grid grid-cols-[repeat(auto-fill,minmax(min(20rem,100%),1fr))] gap-5">
      <Card.Root v-for="app in apps" :key="app.name">
        <Card.Header>
          <Card.Title>
            <NuxtLink
              :to="lp(`/examples/${app.name}`)"
              class="text-inherit no-underline hover:underline hover:underline-offset-[0.2em]"
            >
              {{ text.apps[app.name].title }}
            </NuxtLink>
          </Card.Title>
          <Card.Description>{{ text.apps[app.name].description }}</Card.Description>
        </Card.Header>
        <Card.Content>
          <ul class="m-0 flex list-none flex-wrap gap-2 p-0">
            <li v-for="component in app.components" :key="component">
              <Badge tone="ink" variant="outline">{{ component }}</Badge>
            </li>
          </ul>
        </Card.Content>
        <!-- gap-4! outranks the unlayered core footer gap — the open/source
             pair wants a wider berth than the default. -->
        <Card.Footer class="gap-4!">
          <NuxtLink
            :to="lp(`/examples/${app.name}`)"
            class="font-medium text-primary no-underline hover:underline hover:underline-offset-[0.2em]"
          >
            {{ text.open }}
          </NuxtLink>
          <a
            :href="sourceUrl(app.name)"
            target="_blank"
            rel="noopener"
            class="text-tertiary no-underline hover:text-secondary hover:underline hover:underline-offset-[0.2em]"
          >
            {{ text.source }}
          </a>
        </Card.Footer>
      </Card.Root>
    </div>
  </div>
</template>
