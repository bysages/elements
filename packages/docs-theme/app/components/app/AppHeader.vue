<script setup lang="ts">
import { Button, Drawer } from "@bysages/vue";

const appConfig = useAppConfig();

const github = computed(() => (appConfig as { github?: { url?: string } }).github);

const { subNavigationMode, sections } = useSubNavigation();

const menuOpen = ref(false);

const route = useRoute();
watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false;
  },
);

const { Root, Trigger, Backdrop, Positioner, Content, Title } = Drawer;

const { t } = useDocsI18n();

// The square trigger exists only while the center field is folded, but
// it opens the same dialog — the state lives in one place.
const searchOpen = useDocsSearch();
</script>

<template>
  <Root v-model:open="menuOpen">
    <header
      class="bs-docs-header"
      :class="{ 'bs-docs-header-stacked': subNavigationMode === 'header' }"
    >
      <AppHeaderLeft />

      <AppHeaderCenter />

      <div class="bs-docs-header-end">
        <AppHeaderCTA />

        <Button
          variant="ghost"
          size="sm"
          square
          :aria-label="t('docs.search')"
          class="bs-docs-header-search"
          @click="searchOpen = true"
        >
          <Icon name="i-lucide-search" class="size-4" />
        </Button>

        <Button
          v-if="github?.url"
          as-child
          variant="ghost"
          size="sm"
          square
          class="bs-docs-header-github"
        >
          <NuxtLink :to="github.url" target="_blank" aria-label="GitHub" title="GitHub">
            <Icon name="i-simple-icons-github" class="size-4" />
          </NuxtLink>
        </Button>

        <ClientOnly>
          <div class="max-sm:hidden"><AppAssistantButton /></div>
          <div class="max-sm:hidden"><LanguageSelect /></div>
          <template v-if="appConfig.docs.themeControls !== false">
            <div class="max-sm:hidden"><ColorModeButton /></div>
            <ThemeSettingsButton />
          </template>
        </ClientOnly>

        <div class="bs-docs-header-menu">
          <Trigger as-child>
            <IconMenuToggle />
          </Trigger>
        </div>
      </div>

      <AppHeaderBottom v-if="subNavigationMode === 'header'" />
    </header>

    <!-- Outside the header: its backdrop-filter would become the fixed
       positioner's containing block and drag the sheet under the bar.
       The sheet rises from the bottom edge — centered by nature, its
       rounded corners meeting the reader's thumb, no side seams. -->
    <ClientOnly>
      <Backdrop />
      <Positioner>
        <Content :aria-label="t('docs.navigation')" class="bs-docs-header-drawer">
          <Title>{{ t("docs.menu") }}</Title>
          <!-- The shelf row keeps the top-level destinations one tap away,
               even while the drawer's document tree shows every branch. -->
          <nav class="bs-docs-header-drawer-sections" :aria-label="t('docs.sections')">
            <p class="w-full text-sm font-medium text-tertiary">{{ t("docs.sections") }}</p>
            <NuxtLink
              v-for="row in sections"
              :key="row.to"
              :to="row.to"
              :aria-current="row.active ? 'page' : undefined"
            >
              {{ row.label }}
            </NuxtLink>
          </nav>

          <!-- Auxiliary header controls live here on phones: the bar keeps
               only search and navigation, while the drawer becomes their
               touch-sized utility shelf. -->
          <div
            class="bs-docs-header-drawer-actions flex items-center justify-between gap-1 rounded-md border border-border bg-surface-2 p-2 sm:hidden"
          >
            <div><AppAssistantButton /></div>
            <LanguageSelect />
            <div><ColorModeButton /></div>
            <ThemeSettingsButton v-if="appConfig.docs.themeControls !== false" />
            <a
              v-if="github?.url"
              :href="github.url"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              title="GitHub"
              class="inline-flex size-10 items-center justify-center rounded-sm text-foreground transition-colors hover:bg-surface-3 hover:text-secondary"
            >
              <Icon name="i-simple-icons-github" class="size-4" />
            </a>
          </div>

          <div class="min-w-0">
            <p class="mb-2 text-sm font-medium text-tertiary">{{ t("docs.documents") }}</p>
            <DocsAsideLeftBody full />
          </div>
        </Content>
      </Positioner>
    </ClientOnly>
  </Root>
</template>
