<script setup lang="ts">
import { Avatar, Badge, Button, Card, Input, Pagination, Tabs } from "@bysages/vue";
import { computed, ref, watch } from "vue";

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
// numbers — ungh does not serve them.
const { data: userData } = await useFetch<UnghUser>("https://ungh.cc/users/find/DemoMacro", {
  key: "ungh-user",
});
const { data: reposData } = await useFetch<{ repos: UnghRepo[] }>(
  "https://ungh.cc/users/DemoMacro/repos",
  { key: "ungh-repos" },
);

const user = computed(() => userData.value?.user);
const repos = computed(() => reposData.value?.repos ?? []);
const totalStars = computed(() => repos.value.reduce((sum, r) => sum + r.stars, 0));
const totalForks = computed(() => repos.value.reduce((sum, r) => sum + r.forks, 0));

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
const followers = 219;
const following = 38;
const email = "abc@imst.xyz";
const website = "www.demomacro.com";
const orgs = [
  { username: "funish", avatar: "https://avatars.githubusercontent.com/u/66000500?v=4" },
  { username: "bysages", avatar: "https://avatars.githubusercontent.com/u/92733738?v=4" },
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
  new Intl.DateTimeFormat("en-US", {
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

const day = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});
const fmtDate = (iso: string) => day.format(new Date(iso));
</script>

<template>
  <div v-if="user" class="mx-auto grid w-full max-w-[64rem] gap-8 lg:grid-cols-[13rem_1fr]">
    <!-- The identity column: seal, the account's own words, the two
         actions, and the meta rail GitHub carries — local clock, mail,
         site, and the org seals. -->
    <aside class="flex flex-col gap-3">
      <Avatar.Root class="size-36!">
        <Avatar.Image :src="user.avatar" :alt="user.username" />
        <Avatar.Fallback>{{ user.username[0] }}</Avatar.Fallback>
      </Avatar.Root>
      <div>
        <h1 class="m-0 font-serif text-2xl leading-tight">{{ user.username }}</h1>
        <p class="m-0 text-tertiary">@{{ user.username }}</p>
      </div>
      <p class="m-0 text-sm leading-relaxed text-secondary">{{ bio }}</p>
      <div class="flex gap-2">
        <Button as-child class="flex-1">
          <a :href="`https://github.com/${user.username}`" target="_blank" rel="noopener">Follow</a>
        </Button>
        <Button as-child variant="outline" class="flex-1">
          <a href="https://github.com/sponsors/DemoMacro" target="_blank" rel="noopener">
            <Icon name="i-lucide-heart" /> Sponsor
          </a>
        </Button>
      </div>
      <p class="m-0 text-sm text-secondary">
        <b class="text-primary">{{ followers }}</b> followers ·
        <b class="text-primary">{{ following }}</b> following
      </p>
      <dl class="m-0 grid list-none gap-y-2 p-0 text-sm text-secondary">
        <div class="flex items-center gap-2">
          <Icon name="i-lucide-clock" class="text-tertiary" />
          <dd class="m-0">{{ localTime }} (UTC +08:00)</dd>
        </div>
        <div class="flex items-center gap-2">
          <Icon name="i-lucide-mail" class="text-tertiary" />
          <dd class="m-0">
            <a
              :href="`mailto:${email}`"
              class="text-primary no-underline hover:underline hover:underline-offset-[0.2em]"
              >{{ email }}</a
            >
          </dd>
        </div>
        <div class="flex items-center gap-2">
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
      <div class="flex flex-col gap-2 border-t border-border pt-3">
        <span class="text-xs uppercase tracking-[0.14em] text-tertiary">Organizations</span>
        <div class="flex flex-wrap gap-2">
          <a
            v-for="org in orgs"
            :key="org.username"
            :href="`https://github.com/${org.username}`"
            target="_blank"
            rel="noopener"
            :title="`@${org.username}`"
            class="flex items-center gap-1.5 text-sm font-semibold text-primary no-underline hover:underline hover:underline-offset-[0.2em]"
          >
            <Avatar.Root size="sm">
              <Avatar.Image :src="org.avatar" :alt="org.username" />
              <Avatar.Fallback>{{ org.username[0] }}</Avatar.Fallback>
            </Avatar.Root>
            @{{ org.username }}
          </a>
        </div>
      </div>
    </aside>

    <section class="flex min-w-0 flex-col gap-6">
      <Tabs.Root default-value="overview">
        <Tabs.List>
          <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
          <Tabs.Trigger value="repositories"
            >Repositories <span class="text-tertiary">{{ repos.length }}</span></Tabs.Trigger
          >
        </Tabs.List>

        <Tabs.Content value="overview" class="flex flex-col gap-6">
          <Card.Root>
            <Card.Header>
              <Card.Title>{{ contributionTotal }} contributions in the last year</Card.Title>
            </Card.Header>
            <Card.Content>
              <ContributionWall :days="contributionDays" />
            </Card.Content>
          </Card.Root>

          <section class="flex flex-col gap-3">
            <h2 class="m-0 font-serif text-lg leading-tight">Popular repositories</h2>
            <div
              class="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(min(16rem,100%),1fr))]"
            >
              <Card.Root v-for="r in popular" :key="r.id">
                <Card.Content class="grid content-start gap-2!">
                  <a
                    :href="`https://github.com/${r.repo}`"
                    target="_blank"
                    rel="noopener"
                    class="text-sm font-semibold text-primary no-underline hover:underline hover:underline-offset-[0.2em]"
                    >{{ r.repo }}</a
                  >
                  <p class="m-0 line-clamp-2 text-xs leading-relaxed text-secondary">
                    {{ r.description ?? "No description yet." }}
                  </p>
                  <span class="mt-auto flex items-center gap-2 text-xs text-tertiary">
                    <span class="size-2.5 rounded-full" :class="dotOf(r)" />
                    {{ languageOf(r) }}
                    <span>★ {{ r.stars }}</span>
                  </span>
                </Card.Content>
              </Card.Root>
            </div>
          </section>
        </Tabs.Content>

        <Tabs.Content value="repositories" class="flex flex-col gap-4">
          <Input
            v-model="query"
            placeholder="Find a repository…"
            aria-label="Find a repository"
            class="max-w-80!"
          />
          <Card.Root v-for="r in paged" :key="r.id">
            <Card.Content class="grid content-start gap-2!">
              <div class="flex items-center gap-3">
                <a
                  :href="`https://github.com/${r.repo}`"
                  target="_blank"
                  rel="noopener"
                  class="font-serif text-base font-semibold text-primary no-underline hover:underline hover:underline-offset-[0.2em]"
                  >{{ r.name }}</a
                >
                <Badge tone="ink" variant="outline">Public</Badge>
              </div>
              <p class="m-0 text-sm leading-relaxed text-secondary">
                {{ r.description ?? "No description yet." }}
              </p>
              <span class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-tertiary">
                <span class="flex items-center gap-1.5">
                  <span class="size-2.5 rounded-full" :class="dotOf(r)" />
                  {{ languageOf(r) }}
                </span>
                <span>★ {{ r.stars }}</span>
                <span>⑂ {{ r.forks }}</span>
                <span>Updated {{ fmtDate(r.pushedAt) }}</span>
              </span>
            </Card.Content>
          </Card.Root>
          <p v-if="filtered.length === 0" class="m-0 text-sm text-tertiary" role="status">
            Nothing matches “{{ query }}”.
          </p>
          <div v-if="filtered.length > PAGE_SIZE" class="flex justify-center">
            <Pagination.Root
              :count="filtered.length"
              :page-size="PAGE_SIZE"
              :page="page"
              @update:page="page = $event"
            >
              <Pagination.PrevTrigger aria-label="Previous page">
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
              <Pagination.NextTrigger aria-label="Next page">
                <Icon name="i-lucide-chevron-right" />
              </Pagination.NextTrigger>
            </Pagination.Root>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </section>
  </div>
</template>
