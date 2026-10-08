<script setup lang="ts">
defineOptions({ inheritAttrs: false });

const { t } = useDocsI18n();
import {
  applyTheme,
  getTheme,
  SCENE_DEFAULT_ACCENT,
  Button,
  Popover,
  RadioGroup,
  SegmentGroup,
  type ThemeAccent,
  type ThemeDensity,
  type ThemeScene,
} from "@bysages/vue";

// Header and drawer controls share one state; the engine stays the source
// of truth for persisted values and resolved theme attributes.
const theme = useState("docs-theme", () => reactive(getTheme())).value;

// dot: the pigment a scene pairs with (the engine's own pairing table),
// shown as a small swatch — "ink" renders as the text ink (the accent's
// absence), undefined hides the dot.
const sceneNames: Array<{ value: ThemeScene; en: string; zh: string }> = [
  { value: "auto", en: "Auto", zh: "纸墨" },
  { value: "civic", en: "Civic", zh: "典章" },
  { value: "enterprise", en: "Enterprise", zh: "信笺" },
  { value: "studio", en: "Studio", zh: "雅集" },
  { value: "tech", en: "Tech", zh: "司南" },
  { value: "cupertino", en: "Cupertino", zh: "圆融" },
  { value: "expressive", en: "Expressive", zh: "飞白" },
  { value: "fluent", en: "Fluent", zh: "流水" },
  { value: "material", en: "Material", zh: "格物" },
  { value: "sketch", en: "Sketch", zh: "写意" },
  { value: "missive", en: "Missive", zh: "家书" },
  { value: "dispatch", en: "Dispatch", zh: "公牍" },
  { value: "metric", en: "Metric", zh: "格律" },
  { value: "new-york", en: "New York", zh: "玄素" },
  { value: "archive", en: "Archive", zh: "卷宗" },
];
const scenes = sceneNames.map((s) => ({
  ...s,
  dot: s.value === "auto" ? undefined : SCENE_DEFAULT_ACCENT[s.value],
}));

// Labels ride the i18n dictionary; the values are the engine's own.
const accents: ThemeAccent[] = [
  "auto",
  "ink",
  "qinghua",
  "celadon",
  "zhusha",
  "feicui",
  "jilan",
  "qingjin",
];

const densities: ThemeDensity[] = ["compact", "default", "comfortable", "spacious"];

const accentLabel = (v: ThemeAccent) => t(`docs.theme.accents.${v}`);
const densityLabel = (v: ThemeDensity) => t(`docs.theme.densities.${v}`);

const densityItems = computed(() =>
  densities.map((value) => ({ value, label: densityLabel(value) })),
);

function set(partial: Partial<typeof theme>) {
  // applyTheme answers with the full theme (auto accents re-pair with the
  // scene), so the local mirror stays honest.
  Object.assign(theme, applyTheme(partial));
}

function setScene(scene: ThemeScene) {
  // The scene is the top of the theme stack: choosing one re-pairs its own
  // pigment, so an earlier explicit accent must not survive the change.
  set({ scene, accent: "auto" });
}
</script>

<template>
  <Popover.Root>
    <!-- The root is a fragment (trigger + portal), so the caller's
         class lands here on the trigger itself. -->
    <Popover.Trigger as-child>
      <Button
        v-bind="$attrs"
        variant="ghost"
        size="sm"
        square
        :aria-label="t('docs.theme.settings')"
        :title="t('docs.theme.settings')"
        class="bs-docs-header-theme-settings"
      >
        <Icon name="i-lucide-sliders-horizontal" />
      </Button>
    </Popover.Trigger>
    <Popover.Positioner>
      <Popover.Content class="bs-docs-theme-panel" data-density="compact">
        <section>
          <h3>{{ t("docs.theme.scene") }}</h3>
          <RadioGroup.Root
            class="bs-docs-theme-scene-grid"
            orientation="horizontal"
            :model-value="theme.scene"
            @update:model-value="(v) => setScene(v as ThemeScene)"
          >
            <RadioGroup.Item
              v-for="s in scenes"
              :key="s.value"
              :value="s.value"
              class="bs-docs-theme-scene"
            >
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemControl />
              <RadioGroup.ItemText>
                <span class="bs-docs-theme-scene-name">{{ s.zh }}</span>
                <span class="bs-docs-theme-scene-glyph">{{ s.en }}</span>
              </RadioGroup.ItemText>
              <span
                v-if="s.dot"
                class="bs-docs-theme-dot"
                :data-accent="s.dot === 'ink' ? undefined : s.dot"
                :data-ink-dot="s.dot === 'ink' ? '' : undefined"
              />
            </RadioGroup.Item>
          </RadioGroup.Root>
        </section>
        <section>
          <h3>{{ t("docs.theme.accent") }}</h3>
          <RadioGroup.Root
            class="bs-docs-theme-swatch-row"
            orientation="horizontal"
            :model-value="theme.accent"
            @update:model-value="(v) => set({ accent: v as ThemeAccent })"
          >
            <RadioGroup.Item
              v-for="a in accents"
              :key="a"
              :value="a"
              class="bs-docs-theme-swatch"
              :title="accentLabel(a)"
              :aria-label="accentLabel(a)"
            >
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemControl />
              <RadioGroup.ItemText />
              <span
                class="bs-docs-theme-dot"
                :data-accent="a === 'auto' || a === 'ink' ? undefined : a"
                :data-swatch="a"
                :data-ink-dot="a === 'ink' ? '' : undefined"
              />
            </RadioGroup.Item>
          </RadioGroup.Root>
        </section>
        <section>
          <h3>{{ t("docs.theme.density") }}</h3>
          <SegmentGroup
            orientation="horizontal"
            size="sm"
            :items="densityItems"
            :model-value="theme.density"
            @update:model-value="(v) => set({ density: v as ThemeDensity })"
          />
        </section>
      </Popover.Content>
    </Popover.Positioner>
  </Popover.Root>
</template>
