<script setup lang="ts">
import { Button, Card, List, NavigationMenu, Slider } from "@bysages/vue";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";

const { locale } = useI18n();

type Track = { title: { en: string; zh: string }; length: number };
type Album = {
  glyph: string;
  title: { en: string; zh: string };
  artist: { en: string; zh: string };
  year: number;
  tracks: Track[];
};

const copy = {
  en: {
    albums: "Albums",
    nowPlaying: "Now playing",
    queue: "Tracks",
    pause: "Pause",
    play: "Play",
    next: "Next track",
    prev: "Previous track",
    volume: "Volume",
  },
  zh: {
    albums: "专辑",
    nowPlaying: "正在播放",
    queue: "曲目",
    pause: "暂停",
    play: "播放",
    next: "下一首",
    prev: "上一首",
    volume: "音量",
  },
} as const;

const text = computed(() => copy[locale.value as "en" | "zh"]);

const albums: Album[] = [
  {
    glyph: "墨",
    title: { en: "Twelve Inks", zh: "十二墨色" },
    artist: { en: "Songyan Ensemble", zh: "松烟社" },
    year: 2024,
    tracks: [
      { title: { en: "Qinghua, first wash", zh: "青花，初染" }, length: 214 },
      { title: { en: "Celadon breaks", zh: "青瓷裂片" }, length: 187 },
      { title: { en: "Zhusha at dusk", zh: "朱砂向晚" }, length: 243 },
    ],
  },
  {
    glyph: "纸",
    title: { en: "Sheets & Seasons", zh: "纸与四时" },
    artist: { en: "Huizhou Room", zh: "徽州房" },
    year: 2023,
    tracks: [
      { title: { en: "Three hundred grams", zh: "三百克" }, length: 196 },
      {
        title: { en: "Drying line in March", zh: "三月的晾纸杆" },
        length: 228,
      },
      { title: { en: "Coarse twist", zh: "粗帘纹" }, length: 175 },
      { title: { en: "White on white", zh: "白上之白" }, length: 259 },
    ],
  },
  {
    glyph: "光",
    title: { en: "Light as Shadow", zh: "以光为影" },
    artist: { en: "Songyan Ensemble", zh: "松烟社" },
    year: 2022,
    tracks: [
      { title: { en: "Hairline", zh: "发丝线" }, length: 203 },
      {
        title: { en: "Halo, arriving at once", zh: "光晕，一次到来" },
        length: 236,
      },
      { title: { en: "Slow bleed", zh: "墨慢慢洇" }, length: 281 },
    ],
  },
  {
    glyph: "器",
    title: { en: "Vessels", zh: "器物" },
    artist: { en: "Letter Room Trio", zh: "字房三重奏" },
    year: 2021,
    tracks: [
      { title: { en: "Composing stick", zh: "手托" }, length: 192 },
      { title: { en: "Galley proof", zh: "长条校样" }, length: 221 },
    ],
  },
];

const albumIndex = ref(0);
const trackIndex = ref(0);
const playing = ref(false);
const elapsed = ref(0);
const volume = ref([70]);

const album = computed(() => albums[albumIndex.value]!);
const track = computed(() => album.value.tracks[trackIndex.value]!);

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

function openTrack(a: number, t: number) {
  albumIndex.value = a;
  trackIndex.value = t;
  elapsed.value = 0;
  playing.value = true;
}

function step(delta: number) {
  const tracks = album.value.tracks;
  let t = trackIndex.value + delta;
  if (t < 0) t = tracks.length - 1;
  if (t >= tracks.length) t = 0;
  trackIndex.value = t;
  elapsed.value = 0;
}

// The clock only runs on the client, and only while the record turns.
let timer: ReturnType<typeof setInterval> | undefined;
onMounted(() => {
  timer = setInterval(() => {
    if (!playing.value) return;
    elapsed.value += 1;
    if (elapsed.value >= track.value.length) step(1);
  }, 1000);
});
onUnmounted(() => clearInterval(timer));

watch(albumIndex, () => {
  trackIndex.value = 0;
  elapsed.value = 0;
});
</script>

<template>
  <Card.Root>
    <Card.Content
      class="grid gap-(--bs-gap-xl) p-(--bs-padding-xl)! lg:grid-cols-[13rem_1fr_20rem]"
    >
      <!-- Albums: the shelf. -->
      <div class="grid content-start gap-(--bs-gap-sm)">
        <p class="m-0 text-xs uppercase tracking-label text-tertiary">
          {{ text.albums }}
        </p>
        <NavigationMenu.Root orientation="vertical">
          <NavigationMenu.List>
            <NavigationMenu.Item v-for="(a, i) in albums" :key="a.glyph">
              <NavigationMenu.Link
                href="#"
                class="h-auto! py-(--bs-padding-xs)!"
                :current="albumIndex === i"
                @click.prevent="albumIndex = i"
              >
                <span
                  class="grid size-10 shrink-0 place-items-center rounded-sm bg-primary font-serif text-lg text-primary-text"
                  aria-hidden="true"
                  >{{ a.glyph }}</span
                >
                <span class="min-w-0">
                  <span class="block truncate text-sm font-medium">{{ a.title[locale] }}</span>
                  <span class="block truncate text-xs text-tertiary">{{ a.year }}</span>
                </span>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
      </div>

      <!-- Tracks: the queue of the chosen album. -->
      <div class="min-w-0">
        <p class="m-0 text-xs uppercase tracking-label text-tertiary">
          {{ text.queue }}
        </p>
        <h3 class="m-0 mt-(--bs-margin-xs) font-serif text-2xl">
          {{ album.title[locale] }}
        </h3>
        <p class="m-0 mb-(--bs-margin-md) text-sm text-tertiary">
          {{ album.artist[locale] }}
        </p>
        <List.Root bordered hoverable>
          <List.Item
            v-for="(t, i) in album.tracks"
            :key="i"
            role="button"
            tabindex="0"
            :aria-current="i === trackIndex ? 'true' : undefined"
            class="cursor-pointer"
            :class="i === trackIndex ? 'bg-primary-subtle text-primary-subtle-text' : ''"
            @click="openTrack(albumIndex, i)"
            @keydown.enter.prevent="openTrack(albumIndex, i)"
            @keydown.space.prevent="openTrack(albumIndex, i)"
          >
            <List.Leading>
              <span class="w-4 text-xs tabular-nums text-tertiary">{{ i + 1 }}</span>
            </List.Leading>
            <List.Content>
              <template #title>
                <span
                  class="truncate text-sm"
                  :class="i === trackIndex ? 'font-medium text-primary' : ''"
                  >{{ t.title[locale] }}</span
                >
              </template>
            </List.Content>
            <List.Actions>
              <Icon
                v-if="i === trackIndex && playing"
                name="i-lucide-volume-2"
                class="text-primary"
              />
              <span class="text-xs tabular-nums text-tertiary">{{ fmt(t.length) }}</span>
            </List.Actions>
          </List.Item>
        </List.Root>
      </div>

      <!-- Now playing: the turntable face. -->
      <div class="grid content-start gap-(--bs-gap-lg) rounded-md bg-surface-1 p-(--bs-padding-lg)">
        <p class="m-0 text-xs uppercase tracking-label text-tertiary">
          {{ text.nowPlaying }}
        </p>
        <span
          class="grid aspect-square w-full place-items-center rounded-md bg-primary font-serif text-6xl text-primary-text"
          aria-hidden="true"
          >{{ album.glyph }}</span
        >
        <div>
          <p class="m-0 truncate text-sm font-medium">
            {{ track.title[locale] }}
          </p>
          <p class="m-0 truncate text-xs text-tertiary">
            {{ album.artist[locale] }}
          </p>
        </div>

        <div class="grid gap-(--bs-gap-xs)">
          <Slider.Root
            :model-value="[elapsed]"
            :min="0"
            :max="track.length"
            :step="1"
            @value-change="(v: number[]) => (elapsed = v[0] ?? 0)"
          >
            <Slider.Control>
              <Slider.Track>
                <Slider.Range />
              </Slider.Track>
              <Slider.Thumb :index="0">
                <Slider.HiddenInput />
              </Slider.Thumb>
            </Slider.Control>
          </Slider.Root>
          <div class="flex justify-between text-xs tabular-nums text-tertiary">
            <span>{{ fmt(elapsed) }}</span>
            <span>{{ fmt(track.length) }}</span>
          </div>
        </div>

        <div class="flex items-center justify-center gap-(--bs-gap-sm)">
          <Button variant="ghost" size="sm" square :aria-label="text.prev" @click="step(-1)">
            <Icon name="i-lucide-skip-back" />
          </Button>
          <Button
            size="sm"
            square
            :aria-label="playing ? text.pause : text.play"
            @click="playing = !playing"
          >
            <Icon :name="playing ? 'i-lucide-pause' : 'i-lucide-play'" />
          </Button>
          <Button variant="ghost" size="sm" square :aria-label="text.next" @click="step(1)">
            <Icon name="i-lucide-skip-forward" />
          </Button>
        </div>

        <div class="flex items-center gap-(--bs-gap-md)">
          <Icon name="i-lucide-volume-2" class="shrink-0 text-tertiary" />
          <Slider.Root v-model="volume" :min="0" :max="100" :step="1" class="flex-1">
            <Slider.Control>
              <Slider.Track>
                <Slider.Range />
              </Slider.Track>
              <Slider.Thumb :index="0">
                <Slider.HiddenInput />
              </Slider.Thumb>
            </Slider.Control>
          </Slider.Root>
        </div>
      </div>
    </Card.Content>
  </Card.Root>
</template>
