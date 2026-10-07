<script setup lang="ts">
import {
  Button,
  Card,
  ColorPicker,
  RadioGroup,
  SCENE_DEFAULT_ACCENT,
  SCENE_DEFAULT_CONTRAST,
  Select,
  Textarea,
  parseColor,
  type ThemeAccent,
  type ThemeContrast,
  type ThemeDensity,
  type ThemeMode,
  type ThemeScene,
} from "@bysages/vue";
import { computed, nextTick, onMounted, ref, watch, type PropType } from "vue";

const props = defineProps({
  /** The specimen's id. The panel edits its attributes and inline token
   * overrides; it never touches the reader's own theme. */
  previewId: { type: String, required: true },
  compact: { type: Boolean, default: false },
});

const { locale } = useI18n();

const copy = {
  en: {
    panel: "Design",
    lede: "Pick a scene, then tune any token the system publishes.",
    controls: {
      mode: "Mode",
      scene: "Scene",
      accent: "Accent",
      contrast: "Contrast",
      density: "Density",
    },
    modes: { light: "Light", dark: "Dark", system: "System" },
    scenes: {
      auto: "Paper and ink",
      civic: "Civic · 典章",
      enterprise: "Enterprise · 信笺",
      studio: "Studio · 雅集",
      tech: "Tech · 司南",
      cupertino: "Cupertino · 圆融",
      expressive: "Expressive · 飞白",
      fluent: "Fluent · 流水",
      material: "Material · 格物",
      sketch: "Sketch · 写意",
      missive: "Missive · 家书",
      dispatch: "Dispatch · 公牍",
      metric: "Metric · 格律",
      "new-york": "New York · 玄素",
    },
    accents: {
      auto: "Follow the scene",
      ink: "Ink",
      qinghua: "Qinghua cobalt",
      celadon: "Celadon",
      zhusha: "Zhusha cinnabar",
      feicui: "Feicui jade",
      jilan: "Jilan blue",
      qingjin: "Qingjin lapis",
    },
    contrasts: { normal: "Normal", high: "High" },
    densities: {
      compact: "Compact",
      default: "Default",
      comfortable: "Comfortable",
      spacious: "Spacious",
    },
    tokens: {
      title: "Tokens",
      search: "Search variables",
      count: "supported variables",
      modified: "modified",
      reset: "Reset",
      resetAll: "Reset all",
      resetOne: "Reset token",
      empty: "No variable matches that search.",
      hint: "Colors, sizes, spacing, type, borders, shadows, focus, light and motion are all editable. Each field starts from the value the system resolves.",
      value: "Value",
    },
    copy: "Copy CSS",
    copied: "Copied",
    download: "Download CSS",
    systemNote: "System mode exports the light and dark registers.",
  },
  zh: {
    panel: "设计",
    lede: "先选一个场景，再调整系统公开的任意变量。",
    controls: { mode: "模式", scene: "场景", accent: "主色", contrast: "对比度", density: "密度" },
    modes: { light: "浅色", dark: "深色", system: "跟随系统" },
    scenes: {
      auto: "纸墨",
      civic: "典章",
      enterprise: "信笺",
      studio: "雅集",
      tech: "司南",
      cupertino: "圆融",
      expressive: "飞白",
      fluent: "流水",
      material: "格物",
      sketch: "写意",
      missive: "家书",
      dispatch: "公牍",
      metric: "格律",
      "new-york": "玄素",
    },
    accents: {
      auto: "随场景",
      ink: "墨",
      qinghua: "青花钴蓝",
      celadon: "青瓷",
      zhusha: "朱砂",
      feicui: "翡翠",
      jilan: "霁蓝",
      qingjin: "青金",
    },
    contrasts: { normal: "标准", high: "高对比" },
    densities: { compact: "紧凑", default: "默认", comfortable: "舒适", spacious: "宽松" },
    tokens: {
      title: "变量",
      search: "搜索变量",
      count: "个可调变量",
      modified: "项已修改",
      reset: "重置",
      resetAll: "全部重置",
      resetOne: "重置变量",
      empty: "没有匹配的变量。",
      hint: "颜色、尺寸、间距、字体、边框、阴影、焦点、光和动效都可编辑；输入框已填入当前值，改动即覆盖。",
      value: "值",
    },
    copy: "复制 CSS",
    copied: "已复制",
    download: "下载 CSS",
    systemNote: "跟随系统时，会同时导出浅色与深色两套值。",
  },
} as const;

const text = computed(() => copy[locale.value as "en" | "zh"]);

type DesignMode = ThemeMode;

const config = ref({
  mode: "light" as DesignMode,
  scene: "auto" as ThemeScene,
  accent: "auto" as ThemeAccent,
  contrast: "normal" as ThemeContrast,
  density: "default" as ThemeDensity,
});

const overrides = ref<Record<string, string>>({});
const tokenDefaults = ref<Record<string, string>>({});
const tokenSearch = ref("");
const availableTokens = ref<string[]>([]);
const copied = ref(false);

const options = <T extends string>(values: readonly T[], labels: Record<string, string>) =>
  values.map((value) => ({ value, label: labels[value]! }));

const modeOptions = options(["light", "dark", "system"] as const, text.value.modes);
const sceneOptions = options(
  ["auto", ...Object.keys(SCENE_DEFAULT_ACCENT)] as const,
  text.value.scenes,
);
/* The named pigments stay the quick picks — the same round chips the
   theme panel in the header draws — and the picker's own area is the
   free-form entry beside them. */
const ACCENT_PRESETS = [
  "auto",
  "ink",
  "qinghua",
  "celadon",
  "zhusha",
  "feicui",
  "jilan",
  "qingjin",
] as const;

const accentHexes = ref<Partial<Record<ThemeAccent, string>>>({});
const customAccent = ref<string | null>(null);

const accentSwatches = computed(() =>
  ACCENT_PRESETS.map((accent) => ({
    value: accent,
    label: text.value.accents[accent]!,
  })),
);

/** Resolve any CSS color by painting it: one canvas pixel of the real
   thing gives the sRGB channels the picker and the swatches compare, no
   matter which wide-gamut form the token was written in. */
function cssColorToHex(cssColor: string): string {
  if (!cssColor) return "";
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const context = canvas.getContext("2d");
  if (!context) return "";
  context.fillStyle = cssColor;
  context.fillRect(0, 0, 1, 1);
  const [r, g, b] = context.getImageData(0, 0, 1, 1).data;
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

function probeAccentHex(accent: ThemeAccent): string {
  const probe = document.createElement("div");
  if (accent !== "ink") probe.dataset.accent = accent;
  probe.style.display = "none";
  document.body.appendChild(probe);
  const raw = getComputedStyle(probe).getPropertyValue("--bs-color-primary").trim();
  const hex = cssColorToHex(raw);
  probe.remove();
  return hex;
}

function normalizeHex(value: string): string {
  const hex = value.trim().match(/^#([0-9a-f]{6})(?:[0-9a-f]{2})?$/i);
  if (hex) return `#${hex[1]!.toLowerCase()}`;
  const rgba = value.match(/rgba?\(([^)]+)\)/i);
  if (rgba) {
    const [r, g, b] = rgba[1]!.split(",").map((part) => parseFloat(part));
    if ([r, g, b].every((n) => Number.isFinite(n)))
      return `#${[r, g, b]
        .map((n) =>
          Math.max(0, Math.min(255, Math.round(n)))
            .toString(16)
            .padStart(2, "0"),
        )
        .join("")}`;
  }
  return "";
}

function relativeLuminance(hex: string): number {
  const channel = (index: number) => {
    const value = parseInt(hex.slice(index, index + 2), 16) / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(1) + 0.7152 * channel(3) + 0.0722 * channel(5);
}

/** A free pigment lays the whole primary register under the interface:
   the hover and active steps mix toward black, the fill rides the base,
   and the subtle and border tints dilute — the same shape a named
   pigment writes, derived instead of copied. */
function accentDerivation(hex: string): Record<string, string> {
  return {
    "--bs-color-primary": hex,
    "--bs-color-primary-hover": `color-mix(in oklab, ${hex} 86%, black)`,
    "--bs-color-primary-active": `color-mix(in oklab, ${hex} 74%, black)`,
    "--bs-color-primary-fill": "var(--bs-color-primary)",
    "--bs-color-primary-fill-hover": "var(--bs-color-primary-hover)",
    "--bs-color-primary-text":
      relativeLuminance(hex) > 0.55 ? "oklch(0.25 0.01 95)" : "oklch(0.988 0.004 95)",
    "--bs-color-primary-subtle": `color-mix(in oklab, ${hex} 14%, transparent)`,
    "--bs-color-primary-subtle-text": `color-mix(in oklab, ${hex} 55%, black)`,
    "--bs-color-primary-border": `color-mix(in oklab, ${hex} 45%, transparent)`,
    "--bs-color-focus": "var(--bs-color-primary)",
  };
}

const currentAccentHex = computed(() => {
  if (customAccent.value) return customAccent.value;
  const accent = resolvedAccent.value ?? "ink";
  return accentHexes.value[accent] ?? "";
});

/* The machine wants a Color object, not a string — parse once here so the
   template can hand the picker a real value. */
const pickerColor = computed(() =>
  currentAccentHex.value ? parseColor(currentAccentHex.value) : undefined,
);

function onAccentPick(details: string | { valueAsString?: string }) {
  const hex = normalizeHex(typeof details === "string" ? details : (details.valueAsString ?? ""));
  if (!hex) return;
  const preset = accentSwatches.value.find((swatch) => swatch.hex === hex);
  if (preset) {
    config.value.accent = preset.accent;
    customAccent.value = null;
  } else {
    config.value.accent = "ink";
    customAccent.value = hex;
  }
}

const contrastOptions = options(["normal", "high"] as const, text.value.contrasts);
const densityOptions = options(
  ["compact", "default", "comfortable", "spacious"] as const,
  text.value.densities,
);

const resolvedAccent = computed(() => {
  if (config.value.accent !== "auto")
    return config.value.accent === "ink" ? undefined : config.value.accent;
  if (config.value.scene === "auto") return undefined;
  const paired = SCENE_DEFAULT_ACCENT[config.value.scene];
  return paired === "ink" ? undefined : paired;
});

const resolvedContrast = computed(() => {
  if (config.value.contrast !== "auto") return config.value.contrast;
  if (config.value.scene === "auto") return "normal" as const;
  return SCENE_DEFAULT_CONTRAST[config.value.scene];
});

function currentHost(): HTMLElement | null {
  return typeof document === "undefined" ? null : document.getElementById(props.previewId);
}

function applyScene(host: HTMLElement | null, mode: DesignMode = config.value.mode) {
  if (!host) return;
  /* "system" means the specimen reads the room: a literal data-theme value
     would pin nothing and still blind the scene's own dark detection, which
     keys on the attribute's absence. */
  if (mode === "system") delete host.dataset.theme;
  else host.dataset.theme = mode;
  if (resolvedContrast.value === "high") host.dataset.contrast = "high";
  else delete host.dataset.contrast;
  host.dataset.density = config.value.density;
  if (config.value.scene === "auto") delete host.dataset.scene;
  else host.dataset.scene = config.value.scene;
  if (resolvedAccent.value && !customAccent.value) host.dataset.accent = resolvedAccent.value;
  else delete host.dataset.accent;

  for (const name of [...host.style].filter((name) => name.startsWith("--bs-")))
    host.style.removeProperty(name);
  if (customAccent.value)
    for (const [name, value] of Object.entries(accentDerivation(customAccent.value)))
      host.style.setProperty(name, value);
  for (const [name, value] of Object.entries(overrides.value)) {
    if (value.trim()) host.style.setProperty(name, value.trim());
  }
}

/* Every editor opens on the value the specimen actually resolves, so a
   deviation is always a visible diff against a named default. The read
   happens with the visitor's overrides lifted — they are the diff, never
   part of the baseline. */
function captureDefaults() {
  const host = currentHost();
  if (!host || !availableTokens.value.length) return;
  const style = getComputedStyle(host);
  const saved = new Map<string, string>();
  for (const name of [...host.style].filter((name) => name.startsWith("--bs-"))) {
    saved.set(name, host.style.getPropertyValue(name));
    host.style.removeProperty(name);
  }
  const resolved: Record<string, string> = {};
  for (const name of availableTokens.value) {
    const value = style.getPropertyValue(name).trim();
    if (value) resolved[name] = value;
  }
  for (const [name, value] of saved) host.style.setProperty(name, value);
  tokenDefaults.value = resolved;
}

async function applyToHost() {
  await nextTick();
  applyScene(currentHost());
  captureDefaults();
}

watch([config, overrides, customAccent], applyToHost, { deep: true, flush: "post" });

function tokenNames(): string[] {
  const names = new Set<string>();
  const walk = (rule: CSSRule) => {
    const style = (rule as CSSStyleRule).style;
    if (style) {
      for (let index = 0; index < style.length; index += 1) {
        const name = style.item(index);
        if (name.startsWith("--bs-")) names.add(name);
      }
    }
    const nested = (rule as CSSContainerRule).cssRules;
    if (nested) for (const child of nested) walk(child);
  };
  for (const sheet of document.styleSheets) {
    try {
      for (const rule of sheet.cssRules) walk(rule);
    } catch {
      // A cross-origin sheet cannot be read, but its variables are already
      // represented by the local stylesheet.
    }
  }
  return [...names].sort();
}

const tokenFamilies: Array<[RegExp, string]> = [
  [/^--bs-color-|^--bs-$/, "Color"],
  [/^--bs-shadow|^--bs-light/, "Shadow & light"],
  [/^--bs-focus|^--bs-border|^--bs-outline/, "Focus & border"],
  [
    /^--bs-radius|^--bs-control-height|^--bs-part-size|^--bs-size|^--bs-inline-size|^--bs-block-size/,
    "Shape & size",
  ],
  [/^--bs-font|^--bs-line-height|^--bs-tracking|^--bs-letter/, "Typography"],
  [/^--bs-space|^--bs-gap|^--bs-padding|^--bs-margin/, "Spacing"],
  [/^--bs-duration|^--bs-ease|^--bs-motion|^--bs-stagger|^--bs-ripple/, "Motion"],
  [/^--bs-z/, "Stacking"],
];

function tokenFamily(name: string): string {
  const tail = name.replace(/^--bs-/, "");
  return (
    tokenFamilies.find(([pattern]) => pattern.test(`--bs-${tail}`))?.[1] ?? tail.split("-")[0]!
  );
}

const tokenGroups = computed(() => {
  const query = tokenSearch.value.trim().toLowerCase();
  const filtered = availableTokens.value.filter(
    (name) => !query || name.toLowerCase().includes(query),
  );
  const groups = new Map<string, string[]>();
  for (const name of filtered) {
    const family = tokenFamily(name);
    if (!groups.has(family)) groups.set(family, []);
    groups.get(family)!.push(name);
  }
  return [...groups.entries()].map(([label, items]) => ({ label, items }));
});

const modifiedCount = computed(() => Object.keys(overrides.value).length);

function setOverride(name: string, value: string) {
  const fallback = tokenDefaults.value[name]?.trim();
  if (value.trim() && value.trim() !== fallback) overrides.value[name] = value;
  else delete overrides.value[name];
}

function resetOverride(name: string) {
  delete overrides.value[name];
}

function resetOverrides() {
  overrides.value = {};
  customAccent.value = null;
}

onMounted(async () => {
  await applyToHost();
  /* A token the specimen cannot resolve lives inside a component's own
     register; editing it at the page level is a no-op, so the panel only
     offers the variables the dress can actually move. */
  const host = currentHost();
  const style = host ? getComputedStyle(host) : null;
  availableTokens.value = tokenNames().filter(
    (name) => !style || !!style.getPropertyValue(name).trim(),
  );
  captureDefaults();
  accentHexes.value = Object.fromEntries(
    ACCENT_PRESETS.map((accent) => [accent, probeAccentHex(accent)]),
  );
});

function cssBlock(selector: string, mode: DesignMode): string {
  const host = currentHost();
  if (!host) return "";
  const previous = Object.entries(host.dataset);
  applyScene(host, mode);
  const style = getComputedStyle(host);
  const lines = availableTokens.value
    .map(
      (name) =>
        [name, overrides.value[name]?.trim() || style.getPropertyValue(name).trim()] as const,
    )
    .filter(([, value]) => value)
    .map(([name, value]) => `  ${name}: ${value};`);
  for (const [name, value] of previous) {
    if (value) host.dataset[name as never] = value;
    else delete host.dataset[name as never];
  }
  applyScene(host);
  return `${selector} {\n${lines.join("\n")}\n}`;
}

const css = computed(() => {
  if (import.meta.server || !currentHost() || !availableTokens.value.length) return "";
  if (config.value.mode === "system") {
    return [
      "/* Elements — custom scene */",
      cssBlock(":root", "light"),
      cssBlock('[data-theme="dark"]', "dark"),
      "@media (prefers-color-scheme: dark) {\n" +
        cssBlock(':root:not([data-theme="light"])', "dark") +
        "\n}",
    ].join("\n\n");
  }
  const selector = config.value.mode === "dark" ? '[data-theme="dark"]' : ":root";
  return `/* Elements — custom scene */\n${cssBlock(selector, config.value.mode)}`;
});

async function copyCss() {
  await navigator.clipboard.writeText(css.value);
  copied.value = true;
  setTimeout(() => (copied.value = false), 1600);
}

function downloadCss() {
  const url = URL.createObjectURL(new Blob([css.value], { type: "text/css" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "elements-scene.css";
  anchor.click();
  URL.revokeObjectURL(url);
}

defineExpose({ applyToHost });
</script>

<template>
  <div :class="compact ? 'grid min-w-0 content-start gap-(--bs-gap-lg)' : 'contents'">
    <Card :class="compact ? 'min-w-0' : 'xl:col-start-1 xl:row-start-1'">
      <Card.Header>
        <Card.Title as-child
          ><h2>{{ text.panel }}</h2></Card.Title
        >
        <Card.Description>{{ text.lede }}</Card.Description>
      </Card.Header>

      <Card.Content class="grid content-start gap-(--bs-gap-lg)">
        <label
          v-for="row in [
            {
              label: text.controls.mode,
              options: modeOptions,
              value: config.mode,
              set: (v: string) => (config.mode = v as DesignMode),
            },
            {
              label: text.controls.scene,
              options: sceneOptions,
              value: config.scene,
              set: (v: string) => (config.scene = v as ThemeScene),
            },
            {
              label: text.controls.contrast,
              options: contrastOptions,
              value: config.contrast,
              set: (v: string) => (config.contrast = v as ThemeContrast),
            },
            {
              label: text.controls.density,
              options: densityOptions,
              value: config.density,
              set: (v: string) => (config.density = v as ThemeDensity),
            },
          ]"
          :key="row.label"
          class="grid content-start gap-(--bs-gap-xs)"
        >
          <span class="text-sm font-medium">{{ row.label }}</span>
          <Select
            :model-value="row.value"
            :options="row.options"
            :clearable="false"
            @update:model-value="(value: string) => row.set(value)"
          />
        </label>

        <div class="grid content-start gap-(--bs-gap-xs)">
          <span class="text-sm font-medium">{{ text.controls.accent }}</span>
          <div class="flex flex-wrap items-center gap-(--bs-gap-sm)">
            <ColorPicker.Root
              v-if="currentAccentHex"
              class="flex w-full flex-wrap items-center gap-(--bs-gap-sm)"
              :model-value="pickerColor"
              default-format="rgba"
              @value-change="onAccentPick"
            >
              <ColorPicker.Control class="w-full">
                <ColorPicker.ChannelInput channel="hex" class="bs-docs-accent-hex" />
                <ColorPicker.Trigger
                  :aria-label="text.controls.accent"
                  :title="text.controls.accent"
                >
                  <ColorPicker.ValueSwatch />
                </ColorPicker.Trigger>
              </ColorPicker.Control>
              <RadioGroup.Root
                class="bs-docs-theme-swatch-row"
                orientation="horizontal"
                :model-value="config.accent === 'auto' && !customAccent ? 'auto' : config.accent"
                @update:model-value="
                  (v: string) => {
                    config.accent = v as ThemeAccent;
                    customAccent = null;
                  }
                "
              >
                <RadioGroup.Item
                  v-for="a in accentSwatches"
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
              <Teleport to="body">
                <ColorPicker.Positioner>
                  <ColorPicker.Content>
                    <ColorPicker.Area>
                      <ColorPicker.AreaBackground />
                      <ColorPicker.AreaThumb />
                    </ColorPicker.Area>
                    <ColorPicker.ChannelSlider channel="hue">
                      <ColorPicker.ChannelSliderTrack />
                      <ColorPicker.ChannelSliderThumb />
                    </ColorPicker.ChannelSlider>
                  </ColorPicker.Content>
                </ColorPicker.Positioner>
              </Teleport>
              <ColorPicker.HiddenInput />
            </ColorPicker.Root>
          </div>
        </div>
      </Card.Content>
    </Card>

    <Card :class="compact ? 'min-w-0' : 'xl:col-start-3 xl:row-start-1'">
      <Card.Header>
        <Card.Title as-child
          ><h2>{{ text.tokens.title }}</h2></Card.Title
        >
        <Card.Description>
          {{ availableTokens.length }} {{ text.tokens.count }} · {{ modifiedCount }}
          {{ text.tokens.modified }}
        </Card.Description>
      </Card.Header>

      <Card.Content class="grid content-start gap-(--bs-gap-sm)">
        <Input v-model="tokenSearch" type="search" :placeholder="text.tokens.search" />
        <p class="m-0 text-xs text-tertiary">{{ text.tokens.hint }}</p>

        <div
          class="grid content-start gap-(--bs-gap-sm) rounded-md border border-border bg-surface-2 p-(--bs-padding-sm)"
          :class="compact ? 'max-h-[28rem] overflow-y-auto' : 'max-h-[36rem] overflow-y-auto'"
        >
          <details
            v-for="group in tokenGroups"
            :key="group.label"
            :open="!!tokenSearch"
            class="min-w-0"
          >
            <summary class="cursor-pointer select-none py-1 text-sm font-medium">
              {{ group.label }}
              <span class="ml-1 text-xs text-tertiary">{{ group.items.length }}</span>
            </summary>
            <div class="grid content-start gap-(--bs-gap-sm) pt-1">
              <div
                v-for="name in group.items"
                :key="name"
                class="grid min-w-0 content-start gap-1 rounded-sm border border-border bg-surface-0 p-2"
              >
                <div class="flex min-w-0 items-center justify-between gap-(--bs-gap-xs)">
                  <code class="min-w-0 truncate font-mono text-xs text-secondary">{{ name }}</code>
                  <Button
                    v-if="overrides[name]"
                    variant="ghost"
                    size="sm"
                    square
                    :aria-label="`${text.tokens.resetOne}: ${name}`"
                    :title="text.tokens.resetOne"
                    @click="resetOverride(name)"
                  >
                    ×
                  </Button>
                </div>
                <Textarea
                  :model-value="overrides[name] ?? tokenDefaults[name] ?? ''"
                  rows="2"
                  class="font-mono text-xs"
                  :aria-label="`${name} ${text.tokens.value}`"
                  @update:model-value="(value: string) => setOverride(name, value)"
                />
              </div>
            </div>
          </details>
          <p v-if="!tokenGroups.length" class="m-0 text-sm text-tertiary">
            {{ text.tokens.empty }}
          </p>
        </div>

        <Button
          v-if="modifiedCount"
          variant="outline"
          size="sm"
          class="justify-self-start"
          @click="resetOverrides"
        >
          {{ text.tokens.resetAll }}
        </Button>
      </Card.Content>

      <Card.Footer class="grid gap-(--bs-gap-sm)">
        <div class="flex justify-end gap-(--bs-gap-sm)">
          <Button variant="outline" @click="copyCss">
            {{ copied ? text.copied : text.copy }}
          </Button>
          <Button @click="downloadCss">{{ text.download }}</Button>
        </div>
        <p v-if="config.mode === 'system'" class="m-0 text-xs text-tertiary">
          {{ text.systemNote }}
        </p>
      </Card.Footer>
    </Card>
  </div>
</template>
