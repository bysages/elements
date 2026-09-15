<script setup lang="ts">
import { Select, createListCollection } from "@bysages/vue";

const { locales, locale, switchLocalePath, t } = useDocsI18n();

// One locale needs no switcher.
const many = computed(() => locales.value.length > 1);

// The machine wants a collection, not a bare items array.
const collection = computed(() =>
  createListCollection({ items: locales.value.map((l) => l.code) }),
);

const nameOf = (code: string) => locales.value.find((l) => l.code === code)?.name ?? code;

/** Docus's language-to-country map, spoken in regional-indicator emoji;
 * zh is missing upstream, so Chinese maps to its own flag here. */
const LANGUAGE_TO_COUNTRY: Record<string, string> = {
  ar: "sa",
  bn: "bd",
  ca: "es",
  ckb: "iq",
  cs: "cz",
  da: "dk",
  de: "de",
  el: "gr",
  en: "gb",
  es: "es",
  et: "ee",
  fr: "fr",
  he: "il",
  hi: "in",
  hy: "am",
  id: "id",
  it: "it",
  ja: "jp",
  kk: "kz",
  km: "kh",
  ko: "kr",
  ky: "kg",
  lb: "lu",
  ms: "my",
  nb: "no",
  nl: "nl",
  pt: "pt",
  ru: "ru",
  sl: "si",
  sv: "se",
  tr: "tr",
  uk: "ua",
  ur: "pk",
  vi: "vn",
  zh: "cn",
};

function flagOf(code: string): string {
  const baseLanguage = code.split("-")[0]?.toLowerCase() || code;
  const country = LANGUAGE_TO_COUNTRY[baseLanguage] ?? code.replace(/^.*-/, "").slice(0, 2);
  return country
    .toUpperCase()
    .split("")
    .map((char) => String.fromCodePoint(0x1f1a5 + char.charCodeAt(0)))
    .join("");
}

// Select hands over the chosen code directly (unlike combobox's details).
function pick(value: unknown) {
  const code = Array.isArray(value) ? value[0] : value;
  if (typeof code !== "string" || code === locale.value) return;
  // Route records that opted out of i18n — the locale roots — have no
  // localized twin, so switchLocalePath comes back empty there.
  navigateTo(switchLocalePath(code) || `/${code}`);
}
</script>

<template>
  <Select.Root
    v-if="many"
    :collection="collection"
    :model-value="locale"
    @update:model-value="pick"
  >
    <Select.Trigger
      class="bs-docs-language-trigger"
      :aria-label="t('docs.language')"
      :title="t('docs.language')"
    >
      <span class="bs-docs-language-flag">{{ flagOf(locale) }}</span>
    </Select.Trigger>
    <Select.Positioner class="bs-docs-language-positioner">
      <Select.Content class="bs-docs-language-menu">
        <Select.Item v-for="l in locales" :key="l.code" :item="l.code">
          <Select.ItemText>{{ nameOf(l.code) }}</Select.ItemText>
          <span class="bs-docs-language-flag">{{ flagOf(l.code) }}</span>
        </Select.Item>
      </Select.Content>
    </Select.Positioner>
  </Select.Root>
</template>
