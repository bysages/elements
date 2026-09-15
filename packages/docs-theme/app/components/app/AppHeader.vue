<script setup lang="ts">
import { Button, Drawer } from "@bysages/vue";

const appConfig = useAppConfig();

const github = computed(() => (appConfig as { github?: { url?: string } }).github);

const { subNavigationMode } = useSubNavigation();

const menuOpen = ref(false);

const route = useRoute();
watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false;
  },
);

const { Root, Backdrop, Positioner, Content, Title } = Drawer;

const { t } = useDocsI18n();
</script>

<template>
  <header
    class="bs-docs-header"
    :class="{ 'bs-docs-header-stacked': subNavigationMode === 'header' }"
  >
    <AppHeaderLeft />

    <AppHeaderCenter />

    <div class="bs-docs-header-end">
      <AppHeaderCTA />

      <Button
        v-if="github?.url"
        as-child
        variant="ghost"
        size="sm"
        square
        class="bs-docs-header-github"
      >
        <NuxtLink :to="github.url" target="_blank" aria-label="GitHub" title="GitHub">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true">
            <path
              d="M8 .2a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38l-.01-1.49c-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.42 7.42 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48l-.01 2.2c0 .21.15.46.55.38A8 8 0 0 0 8 .2Z"
            />
          </svg>
        </NuxtLink>
      </Button>

      <ClientOnly>
        <AppAssistantButton />
        <LanguageSelect />
        <ColorModeButton />
        <ThemeSettingsButton />
      </ClientOnly>

      <IconMenuToggle class="bs-docs-header-menu" @click="menuOpen = true" />
    </div>

    <AppHeaderBottom v-if="subNavigationMode === 'header'" />
  </header>

  <!-- Outside the header: its backdrop-filter would become the fixed
       positioner's containing block and drag the sheet under the bar. -->
  <ClientOnly>
    <Root :open="menuOpen" swipe-direction="left" @update:open="menuOpen = $event">
      <Backdrop />
      <Positioner>
        <Content aria-label="Navigation" class="bs-docs-header-drawer">
          <Title>{{ t("docs.menu") }}</Title>
          <!-- The whole tree: narrowed-to-section content would strand a
               phone reader inside one shelf. -->
          <DocsAsideLeftBody full />
        </Content>
      </Positioner>
    </Root>
  </ClientOnly>
</template>
