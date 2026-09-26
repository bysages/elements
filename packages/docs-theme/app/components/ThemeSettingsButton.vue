<script setup lang="ts">
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

// The whole control reads the theme engine on mount, so it must never
// render on the server.
const theme = reactive(getTheme());

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
];
const scenes = sceneNames.map((s) => ({
  ...s,
  dot: s.value === "auto" ? undefined : SCENE_DEFAULT_ACCENT[s.value],
}));

const accents: Array<{ value: ThemeAccent; label: string }> = [
  { value: "auto", label: "Auto — follows the scene" },
  { value: "ink", label: "Ink — the solemn default" },
  { value: "qinghua", label: "Qinghua cobalt" },
  { value: "celadon", label: "Celadon" },
  { value: "zhusha", label: "Zhusha cinnabar" },
];

const densities: Array<{ value: ThemeDensity; label: string }> = [
  { value: "compact", label: "Compact" },
  { value: "default", label: "Default" },
  { value: "comfortable", label: "Comfortable" },
  { value: "spacious", label: "Spacious" },
];

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
    <Popover.Trigger as-child>
      <Button
        variant="ghost"
        size="sm"
        square
        aria-label="Theme settings"
        title="Theme settings"
        class="bs-docs-header-theme-settings"
      >
        <Icon name="i-lucide-sliders-horizontal" />
      </Button>
    </Popover.Trigger>
    <Popover.Positioner>
      <Popover.Content class="bs-docs-theme-panel">
        <section>
          <h3>Scene</h3>
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
                <span class="bs-docs-theme-scene-name">{{ s.en }}</span>
                <span class="bs-docs-theme-scene-glyph">{{ s.zh }}</span>
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
          <h3>Accent</h3>
          <RadioGroup.Root
            class="bs-docs-theme-swatch-row"
            orientation="horizontal"
            :model-value="theme.accent"
            @update:model-value="(v) => set({ accent: v as ThemeAccent })"
          >
            <RadioGroup.Item
              v-for="a in accents"
              :key="a.value"
              :value="a.value"
              class="bs-docs-theme-swatch"
              :title="a.label"
              :aria-label="a.label"
            >
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemControl />
              <RadioGroup.ItemText />
              <span
                class="bs-docs-theme-dot"
                :data-accent="a.value === 'auto' || a.value === 'ink' ? undefined : a.value"
                :data-swatch="a.value"
                :data-ink-dot="a.value === 'ink' ? '' : undefined"
              />
            </RadioGroup.Item>
          </RadioGroup.Root>
        </section>
        <section>
          <h3>Density</h3>
          <SegmentGroup.Root
            orientation="horizontal"
            :model-value="theme.density"
            @update:model-value="(v) => set({ density: v as ThemeDensity })"
          >
            <SegmentGroup.Indicator />
            <SegmentGroup.Item v-for="d in densities" :key="d.value" :value="d.value">
              <SegmentGroup.ItemHiddenInput />
              <SegmentGroup.ItemControl />
              <SegmentGroup.ItemText>{{ d.label }}</SegmentGroup.ItemText>
            </SegmentGroup.Item>
          </SegmentGroup.Root>
        </section>
      </Popover.Content>
    </Popover.Positioner>
  </Popover.Root>
</template>
