<script setup lang="ts">
import { Avatar, Badge, Button, Card, Input, Pagination, Tabs } from "@bysages/vue";
import { computed, ref, watch } from "vue";

const { locale } = useI18n();
const lang = computed(() => locale.value as "en" | "zh");

import ContributionWall from "./contribution-wall.vue";
import { contributionDays, contributionTotal } from "./contributions";

interface UnghUser {
  user: { id: number; username: string; avatar: string };
}

interface UnghRepo {
  id: number;
  name: string;
  repo: string;
  description: string | null;
  stars: number;
  forks: number;
  pushedAt: string;
}

// The page is live where ungh reaches: avatar, repos, stars, forks and
// dates all read the real account. The follower counts stay demo
// numbers — ungh does not serve them. When the network stands between
// the site and ungh, the snapshot below keeps the page whole; it holds
// the account as fetched, not invented numbers.
const { data: userData } = await useFetch<UnghUser>("https://ungh.cc/users/find/DemoMacro", {
  key: "ungh-user",
});
const { data: reposData } = await useFetch<{ repos: UnghRepo[] }>(
  "https://ungh.cc/users/DemoMacro/repos",
  { key: "ungh-repos" },
);

const snapshotUser: UnghUser["user"] = {
  id: 37478508,
  username: "DemoMacro",
  avatar: "https://avatars.githubusercontent.com/u/37478508?v=4",
};

const snapshotRepos: UnghRepo[] = [
  {
    id: 1238514749,
    name: "agentor",
    repo: "DemoMacro/agentor",
    description: "A toolkit for building AI agents, with full TypeScript support.",
    stars: 1,
    forks: 1,
    pushedAt: "2026-08-09T12:42:54Z",
  },
  {
    id: 1240805543,
    name: "ai",
    repo: "DemoMacro/ai",
    description:
      "The AI Toolkit for TypeScript. From the creators of Next.js, the AI SDK is a free open-source library for building AI-powered applications and agents ",
    stars: 0,
    forks: 0,
    pushedAt: "2026-07-29T05:11:55Z",
  },
  {
    id: 991175123,
    name: "apisix-sdk",
    repo: "DemoMacro/apisix-sdk",
    description:
      "Apache APISIX SDK - Complete TypeScript/JavaScript client for APISIX Admin API and Control API with APISIX 3.0+ support.",
    stars: 1,
    forks: 0,
    pushedAt: "2026-09-27T03:45:46Z",
  },
  {
    id: 1172279440,
    name: "awesome-kysely",
    repo: "DemoMacro/awesome-kysely",
    description: "A curated list of Kysely resources, tools, utilities and applications.",
    stars: 0,
    forks: 0,
    pushedAt: "2026-03-04T06:10:13Z",
  },
  {
    id: 1289328959,
    name: "awesome-tiptap",
    repo: "DemoMacro/awesome-tiptap",
    description: "⚡ Delightful Tiptap packages and resources",
    stars: 0,
    forks: 0,
    pushedAt: "2026-07-04T16:06:02Z",
  },
  {
    id: 1169045615,
    name: "BunIt",
    repo: "DemoMacro/BunIt",
    description:
      "A collection of high-performance tools and utilities exclusively built for the Bun ecosystem",
    stars: 0,
    forks: 0,
    pushedAt: "2026-09-20T01:30:54Z",
  },
  {
    id: 1241675725,
    name: "chat",
    repo: "DemoMacro/chat",
    description:
      "A unified TypeScript SDK for building chat bots across Slack, Microsoft Teams, Google Chat, Discord, and more.",
    stars: 0,
    forks: 0,
    pushedAt: "2026-08-04T15:59:38Z",
  },
  {
    id: 724536701,
    name: "chunmomo",
    repo: "DemoMacro/chunmomo",
    description: null,
    stars: 0,
    forks: 0,
    pushedAt: "2023-08-13T05:56:42Z",
  },
  {
    id: 1301793593,
    name: "dashscript",
    repo: "DemoMacro/dashscript",
    description:
      "JavaScript/TypeScript ergonomics, Rust performance, native + wasm + napi outputs.",
    stars: 0,
    forks: 0,
    pushedAt: "2026-08-09T12:48:12Z",
  },
  {
    id: 888324401,
    name: "db0",
    repo: "DemoMacro/db0",
    description: "📚  Lightweight SQL Connector",
    stars: 0,
    forks: 0,
    pushedAt: "2026-03-11T05:14:32Z",
  },
  {
    id: 484823640,
    name: "DemoMacro",
    repo: "DemoMacro/DemoMacro",
    description: "Config files for my GitHub profile.",
    stars: 1,
    forks: 0,
    pushedAt: "2025-12-26T05:05:32Z",
  },
  {
    id: 156317297,
    name: "demomacro.github.io",
    repo: "DemoMacro/demomacro.github.io",
    description: "https://demomacro.github.io",
    stars: 1,
    forks: 0,
    pushedAt: "2024-08-02T23:29:41Z",
  },
  {
    id: 1082931427,
    name: "docen",
    repo: "DemoMacro/docen",
    description:
      "A canvas DOCX editor that renders and edits with MS Office layout fidelity in the browser — built on TipTap/ProseMirror and LeaferJS — plus headless Markdown ⇄ DOCX conversion through a unified Tiptap JSON model. Fully typed; no server required.",
    stars: 60,
    forks: 9,
    pushedAt: "2026-09-24T06:06:54Z",
  },
  {
    id: 786106069,
    name: "dotext-cli",
    repo: "DemoMacro/dotext-cli",
    description: "A simple dotext command line implementation, powered by Demo Macro.",
    stars: 0,
    forks: 0,
    pushedAt: "2026-08-29T07:28:26Z",
  },
  {
    id: 955815580,
    name: "everything-client",
    repo: "DemoMacro/everything-client",
    description:
      "A modern JavaScript library for interacting with the Everything search engine, providing a powerful cross-platform interface to search files on Windows systems.",
    stars: 0,
    forks: 0,
    pushedAt: "2026-09-27T03:51:45Z",
  },
  {
    id: 893213525,
    name: "geoip0",
    repo: "DemoMacro/geoip0",
    description: "Self-hosted Geo IP Zero Configuration API Services for Serverless.",
    stars: 5,
    forks: 1,
    pushedAt: "2026-09-20T01:11:02Z",
  },
  {
    id: 140134532,
    name: "gitbook-boilerplate-netlify-cms",
    repo: "DemoMacro/gitbook-boilerplate-netlify-cms",
    description: "Gitbook boilerplate integrated with Netlify CMS, powered by Demo Macro.",
    stars: 8,
    forks: 27,
    pushedAt: "2024-10-29T16:11:00Z",
  },
  {
    id: 140944662,
    name: "hexo-boilerplate-netlify-cms",
    repo: "DemoMacro/hexo-boilerplate-netlify-cms",
    description: "Hexo boilerplate integrated with Netlify CMS, powered by Demo Macro.",
    stars: 10,
    forks: 31,
    pushedAt: "2025-09-16T03:51:43Z",
  },
  {
    id: 1156452713,
    name: "JS.GS",
    repo: "DemoMacro/JS.GS",
    description:
      "Modern URL shortener with powerful analytics - Track clicks, analyze geolocation, monitor devices, and gain insights from your shortened links.",
    stars: 0,
    forks: 0,
    pushedAt: "2026-09-20T00:47:00Z",
  },
  {
    id: 1082952082,
    name: "markitdown",
    repo: "DemoMacro/markitdown",
    description: "Python tool for converting files and office documents to Markdown.",
    stars: 0,
    forks: 0,
    pushedAt: "2026-04-17T05:55:55Z",
  },
  {
    id: 1083006291,
    name: "markitdown-server",
    repo: "DemoMacro/markitdown-server",
    description:
      "A HTTP server for markitdown, providing RESTful API service for document to Markdown conversion.",
    stars: 0,
    forks: 0,
    pushedAt: "2025-11-06T21:02:06Z",
  },
  {
    id: 632995880,
    name: "nlptools",
    repo: "DemoMacro/nlptools",
    description:
      "Comprehensive NLP toolkit with high-performance string distance and similarity algorithms",
    stars: 2,
    forks: 0,
    pushedAt: "2026-10-01T00:44:22Z",
  },
  {
    id: 1210956321,
    name: "office-open",
    repo: "DemoMacro/office-open",
    description:
      "Create Word, Excel, and PowerPoint files (.docx, .xlsx, .pptx) from plain JSON or fully typed APIs — generate, parse, and patch. Built for AI agents, LLM tool-calling, and hand-written code alike; no Microsoft Office required, opens in every major office suite.",
    stars: 35,
    forks: 9,
    pushedAt: "2026-09-30T09:16:12Z",
  },
];

const user = computed(() => userData.value?.user ?? snapshotUser);
const repos = computed(() =>
  reposData.value?.repos?.length ? reposData.value.repos : snapshotRepos,
);

const popular = computed(() =>
  [...repos.value]
    .sort((a, b) => b.stars - a.stars || Date.parse(b.pushedAt) - Date.parse(a.pushedAt))
    .slice(0, 6),
);
const recent = computed(() =>
  [...repos.value].sort((a, b) => Date.parse(b.pushedAt) - Date.parse(a.pushedAt)),
);

const query = ref("");
const page = ref(1);
const PAGE_SIZE = 6;
const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return recent.value;
  return recent.value.filter(
    (r) => r.name.toLowerCase().includes(q) || (r.description ?? "").toLowerCase().includes(q),
  );
});
const paged = computed(() =>
  filtered.value.slice((page.value - 1) * PAGE_SIZE, page.value * PAGE_SIZE),
);
watch(query, () => (page.value = 1));

// The bio reads the account's own words; the org seals are the two
// projects DemoMacro belongs to.
const bio = "Always believe that good things are about to happen.";

const copy = {
  en: {
    follow: "Follow",
    sponsor: "Sponsor",
    followers: "followers",
    following: "following",
    orgs: "Organizations",
    overview: "Overview",
    repositories: "Repositories",
    contributions: (n: number) => `${n} contributions in the last year`,
    popular: "Popular repositories",
    noDescription: "No description yet.",
    find: "Find a repository…",
    findLabel: "Find a repository",
    public: "Public",
    updated: "Updated",
    noMatch: (q: string) => `Nothing matches “${q}”.`,
    prev: "Previous page",
    next: "Next page",
    wall: "Contributions over the past year",
  },
  zh: {
    follow: "关注",
    sponsor: "赞助",
    followers: "位关注者",
    following: "位关注中",
    orgs: "所属组织",
    overview: "概览",
    repositories: "仓库",
    contributions: (n: number) => `过去一年有 ${n} 次贡献`,
    popular: "热门仓库",
    noDescription: "还没有简介。",
    find: "查找仓库…",
    findLabel: "查找仓库",
    public: "公开",
    updated: "更新于",
    noMatch: (q: string) => `没有与「${q}」匹配的结果。`,
    prev: "上一页",
    next: "下一页",
    wall: "过去一年的贡献",
  },
} as const;

const text = computed(() => copy[lang.value]);
const followers = 219;
const following = 38;
const email = "abc@imst.xyz";
const website = "www.demomacro.com";
const orgs = [
  {
    username: "funish",
    avatar: "https://avatars.githubusercontent.com/u/66000500?v=4",
  },
  {
    username: "bysages",
    avatar: "https://avatars.githubusercontent.com/u/92733738?v=4",
  },
];

// GitHub's rail carries the member's local clock — it ticks on the
// client, so the interval only exists after mount.
const now = ref(Date.now());
let clock: ReturnType<typeof setInterval> | undefined;
onMounted(() => {
  clock = setInterval(() => (now.value = Date.now()), 30_000);
});
onUnmounted(() => clearInterval(clock));
const localTime = computed(() =>
  new Intl.DateTimeFormat(lang.value === "zh" ? "zh-CN" : "en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Shanghai",
  }).format(new Date(now.value)),
);

// Languages are demo-assigned too: the point is the element — a wall of
// real repos wears the same colored dot GitHub's list does.
const demoLanguages = ["TypeScript", "Rust", "Go", "Vue", "JavaScript", "Shell", "Python", "CSS"];
const toneFor: Record<string, string> = {
  TypeScript: "bg-info",
  Rust: "bg-danger",
  Go: "bg-info",
  Vue: "bg-success",
  JavaScript: "bg-warning",
  Shell: "bg-primary",
  Python: "bg-success",
  CSS: "bg-danger",
};
const languageOf = (r: UnghRepo) => demoLanguages[r.id % demoLanguages.length];
const dotOf = (r: UnghRepo) => toneFor[languageOf(r)] ?? "bg-primary";

const day = computed(
  () =>
    new Intl.DateTimeFormat(lang.value === "zh" ? "zh-CN" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    }),
);
const fmtDate = (iso: string) => day.value.format(new Date(iso));
</script>

<template>
  <div class="mx-auto grid w-full max-w-[64rem] gap-(--bs-gap-2xl) lg:grid-cols-[13rem_1fr]">
    <!-- The identity column: seal, the account's own words, the two
         actions, and the meta rail GitHub carries — local clock, mail,
         site, and the org seals. -->
    <aside class="flex flex-col gap-(--bs-gap-md)">
      <Avatar class="size-36!">
        <Avatar.Image :src="user.avatar" :alt="user.username" />
        <Avatar.Fallback>{{ user.username[0] }}</Avatar.Fallback>
      </Avatar>
      <div>
        <h1 class="m-0 font-serif text-2xl leading-tight">
          {{ user.username }}
        </h1>
        <p class="m-0 text-tertiary">@{{ user.username }}</p>
      </div>
      <p class="m-0 text-sm leading-relaxed text-secondary">{{ bio }}</p>
      <div class="flex gap-(--bs-gap-sm)">
        <Button as-child class="flex-1">
          <a :href="`https://github.com/${user.username}`" target="_blank" rel="noopener">{{
            text.follow
          }}</a>
        </Button>
        <Button as-child variant="outline" class="flex-1">
          <a href="https://github.com/sponsors/DemoMacro" target="_blank" rel="noopener">
            <Icon name="i-lucide-heart" /> {{ text.sponsor }}
          </a>
        </Button>
      </div>
      <p class="m-0 text-sm text-secondary">
        <b class="text-primary">{{ followers }}</b> {{ text.followers }} ·
        <b class="text-primary">{{ following }}</b> {{ text.following }}
      </p>
      <dl class="m-0 grid list-none gap-y-(--bs-gap-sm) p-0 text-sm text-secondary">
        <div class="flex items-center gap-(--bs-gap-sm)">
          <Icon name="i-lucide-clock" class="text-tertiary" />
          <dd class="m-0">{{ localTime }} (UTC +08:00)</dd>
        </div>
        <div class="flex items-center gap-(--bs-gap-sm)">
          <Icon name="i-lucide-mail" class="text-tertiary" />
          <dd class="m-0">
            <a
              :href="`mailto:${email}`"
              class="text-primary no-underline hover:underline hover:underline-offset-[0.2em]"
              >{{ email }}</a
            >
          </dd>
        </div>
        <div class="flex items-center gap-(--bs-gap-sm)">
          <Icon name="i-lucide-link" class="text-tertiary" />
          <dd class="m-0">
            <a
              :href="`https://${website}`"
              target="_blank"
              rel="noopener"
              class="text-primary no-underline hover:underline hover:underline-offset-[0.2em]"
              >{{ website }}</a
            >
          </dd>
        </div>
      </dl>
      <div class="flex flex-col gap-(--bs-gap-sm) border-t border-border pt-(--bs-padding-md)">
        <span class="text-xs uppercase tracking-[0.14em] text-tertiary">{{ text.orgs }}</span>
        <div class="flex flex-wrap gap-(--bs-gap-sm)">
          <a
            v-for="org in orgs"
            :key="org.username"
            :href="`https://github.com/${org.username}`"
            target="_blank"
            rel="noopener"
            :title="`@${org.username}`"
            class="flex items-center gap-(--bs-gap-xs) text-sm font-semibold text-primary no-underline hover:underline hover:underline-offset-[0.2em]"
          >
            <Avatar size="sm">
              <Avatar.Image :src="org.avatar" :alt="org.username" />
              <Avatar.Fallback>{{ org.username[0] }}</Avatar.Fallback>
            </Avatar>
            @{{ org.username }}
          </a>
        </div>
      </div>
    </aside>

    <section class="flex min-w-0 flex-col gap-(--bs-gap-xl)">
      <Tabs.Root default-value="overview">
        <Tabs.List>
          <Tabs.Trigger value="overview">{{ text.overview }}</Tabs.Trigger>
          <Tabs.Trigger value="repositories"
            >{{ text.repositories }}
            <span class="text-tertiary">{{ repos.length }}</span></Tabs.Trigger
          >
        </Tabs.List>

        <Tabs.Content value="overview" class="flex flex-col gap-(--bs-gap-xl)">
          <Card>
            <Card.Header>
              <Card.Title>{{ text.contributions(contributionTotal) }}</Card.Title>
            </Card.Header>
            <Card.Content>
              <ContributionWall :days="contributionDays" />
            </Card.Content>
          </Card>

          <section class="flex flex-col gap-(--bs-gap-md)">
            <h2 class="m-0 font-serif text-lg leading-tight">
              {{ text.popular }}
            </h2>
            <div
              class="grid gap-(--bs-gap-lg) [grid-template-columns:repeat(auto-fill,minmax(min(16rem,100%),1fr))]"
            >
              <Card v-for="r in popular" :key="r.id">
                <Card.Content class="grid content-start gap-(--bs-gap-sm)!">
                  <a
                    :href="`https://github.com/${r.repo}`"
                    target="_blank"
                    rel="noopener"
                    class="text-sm font-semibold text-primary no-underline hover:underline hover:underline-offset-[0.2em]"
                    >{{ r.repo }}</a
                  >
                  <p class="m-0 line-clamp-2 text-xs leading-relaxed text-secondary">
                    {{ r.description ?? text.noDescription }}
                  </p>
                  <span class="mt-auto flex items-center gap-(--bs-gap-sm) text-xs text-tertiary">
                    <span class="size-2.5 rounded-full" :class="dotOf(r)" />
                    {{ languageOf(r) }}
                    <span>★ {{ r.stars }}</span>
                  </span>
                </Card.Content>
              </Card>
            </div>
          </section>
        </Tabs.Content>

        <Tabs.Content value="repositories" class="flex flex-col gap-(--bs-gap-lg)">
          <Input
            v-model="query"
            :placeholder="text.find"
            :aria-label="text.findLabel"
            class="max-w-80!"
          />
          <Card v-for="r in paged" :key="r.id">
            <Card.Content class="grid content-start gap-(--bs-gap-sm)!">
              <div class="flex items-center gap-(--bs-gap-md)">
                <a
                  :href="`https://github.com/${r.repo}`"
                  target="_blank"
                  rel="noopener"
                  class="font-serif text-base font-semibold text-primary no-underline hover:underline hover:underline-offset-[0.2em]"
                  >{{ r.name }}</a
                >
                <Badge tone="ink" variant="outline">{{ text.public }}</Badge>
              </div>
              <p class="m-0 text-sm leading-relaxed text-secondary">
                {{ r.description ?? text.noDescription }}
              </p>
              <span
                class="flex flex-wrap items-center gap-x-(--bs-gap-md) gap-y-(--bs-gap-xs) text-xs text-tertiary"
              >
                <span class="flex items-center gap-(--bs-gap-xs)">
                  <span class="size-2.5 rounded-full" :class="dotOf(r)" />
                  {{ languageOf(r) }}
                </span>
                <span>★ {{ r.stars }}</span>
                <span>⑂ {{ r.forks }}</span>
                <span>{{ text.updated }} {{ fmtDate(r.pushedAt) }}</span>
              </span>
            </Card.Content>
          </Card>
          <p v-if="filtered.length === 0" class="m-0 text-sm text-tertiary" role="status">
            {{ text.noMatch(query) }}
          </p>
          <div v-if="filtered.length > PAGE_SIZE" class="flex justify-center">
            <Pagination.Root
              :count="filtered.length"
              :page-size="PAGE_SIZE"
              :page="page"
              @update:page="page = $event"
            >
              <Pagination.PrevTrigger :aria-label="text.prev">
                <Icon name="i-lucide-chevron-left" />
              </Pagination.PrevTrigger>
              <Pagination.Context v-slot="{ pages }">
                <template v-for="(p, index) in pages" :key="index">
                  <Pagination.Ellipsis v-if="p.type === 'ellipsis'" :index="index"
                    >…</Pagination.Ellipsis
                  >
                  <Pagination.Item v-else :value="p.value">{{ p.value }}</Pagination.Item>
                </template>
              </Pagination.Context>
              <Pagination.NextTrigger :aria-label="text.next">
                <Icon name="i-lucide-chevron-right" />
              </Pagination.NextTrigger>
            </Pagination.Root>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </section>
  </div>
</template>
