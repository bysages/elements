<script setup lang="ts">
import {
  applyTheme,
  getTheme,
  Button,
  Popover,
  RadioGroup,
  type ThemeAccent,
  type ThemeDensity,
  type ThemeScene,
} from "@bysages/vue";

// The whole control reads the theme engine on mount, so it must never
// render on the server.
const theme = reactive(getTheme());

const scenes: Array<{ value: ThemeScene; label: string }> = [
  { value: "auto", label: "Auto — paper, top light" },
  { value: "civic", label: "Civic — zhusha, high contrast" },
  { value: "enterprise", label: "Enterprise — qinghua" },
  { value: "studio", label: "Studio — celadon" },
  { value: "tech", label: "Tech — ink" },
];

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
            :model-value="theme.scene"
            @update:model-value="(v) => setScene(v as ThemeScene)"
          >
            <RadioGroup.Item v-for="s in scenes" :key="s.value" :value="s.value">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemControl />
              <RadioGroup.ItemText>{{ s.label }}</RadioGroup.ItemText>
            </RadioGroup.Item>
          </RadioGroup.Root>
        </section>
        <section>
          <h3>Accent</h3>
          <RadioGroup.Root
            :model-value="theme.accent"
            @update:model-value="(v) => set({ accent: v as ThemeAccent })"
          >
            <RadioGroup.Item v-for="a in accents" :key="a.value" :value="a.value">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemControl />
              <RadioGroup.ItemText>{{ a.label }}</RadioGroup.ItemText>
            </RadioGroup.Item>
          </RadioGroup.Root>
        </section>
        <section>
          <h3>Density</h3>
          <RadioGroup.Root
            :model-value="theme.density"
            @update:model-value="(v) => set({ density: v as ThemeDensity })"
          >
            <RadioGroup.Item v-for="d in densities" :key="d.value" :value="d.value">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemControl />
              <RadioGroup.ItemText>{{ d.label }}</RadioGroup.ItemText>
            </RadioGroup.Item>
          </RadioGroup.Root>
        </section>
      </Popover.Content>
    </Popover.Positioner>
  </Popover.Root>
</template>
