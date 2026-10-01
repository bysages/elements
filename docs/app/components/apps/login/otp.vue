<script setup lang="ts">
import { Button, PinInput } from "@bysages/vue";
import { computed, onUnmounted, ref } from "vue";

const { locale } = useI18n();

const copy = {
  en: {
    title: "Two-step verification",
    lede: "Enter the 6-digit code sent to user@songyan.press.",
    resend: "Resend code",
    resendIn: (n: number) => `Resend in ${n}s`,
    verify: "Verify",
    verified: "Verified — welcome back.",
    back: "Use another account",
  },
  zh: {
    title: "两步验证",
    lede: "输入发送到 user@songyan.press 的 6 位验证码。",
    resend: "重新发送",
    resendIn: (n: number) => `${n} 秒后可重新发送`,
    verify: "验证",
    verified: "验证通过，欢迎回来。",
    back: "换个账户登录",
  },
} as const;

const text = computed(() => copy[locale.value as "en" | "zh"]);

const code = ref<string[]>([]);
const verified = ref(false);

// The resend door opens on a clock: thirty seconds from mount or from
// the last send, whichever happened more recently.
const wait = ref(30);
let timer: ReturnType<typeof setInterval> | undefined;
onMounted(() => {
  timer = setInterval(() => {
    if (wait.value > 0) wait.value -= 1;
  }, 1000);
});
onUnmounted(() => clearInterval(timer));

function resend() {
  wait.value = 30;
  verified.value = false;
}

function submit() {
  if (code.value.join("").length === 6) verified.value = true;
}
</script>

<template>
  <div class="grid min-h-[34rem] place-items-center p-(--bs-padding-xl) sm:p-10">
    <div class="w-full max-w-sm text-center">
      <div v-if="verified" class="grid place-items-center gap-(--bs-gap-md)">
        <span
          class="grid size-12 place-items-center rounded-full bg-primary text-primary-text"
          aria-hidden="true"
        >
          <Icon name="i-lucide-check" />
        </span>
        <p class="m-0 text-sm text-secondary">{{ text.verified }}</p>
      </div>

      <div v-else class="grid justify-items-center gap-(--bs-gap-lg)">
        <div class="grid gap-(--bs-gap-xs)">
          <h2 class="m-0 font-serif text-2xl">{{ text.title }}</h2>
          <p class="m-0 text-sm text-secondary">{{ text.lede }}</p>
        </div>

        <PinInput.Root
          v-model="code"
          :length="6"
          type="numeric"
          otp
          select-on-focus
          @complete="submit"
        >
          <PinInput.Label class="sr-only">{{ text.title }}</PinInput.Label>
          <PinInput.Control>
            <PinInput.Input v-for="(v, i) in [0, 1, 2, 3, 4, 5]" :key="i" :index="i" />
          </PinInput.Control>
          <PinInput.HiddenInput />
        </PinInput.Root>

        <Button variant="ghost" size="sm" :disabled="wait > 0" @click="resend">
          {{ wait > 0 ? text.resendIn(wait) : text.resend }}
        </Button>

        <Button class="w-full!" :disabled="code.join('').length !== 6" @click="submit">
          {{ text.verify }}
        </Button>
      </div>

      <a
        v-if="!verified"
        href="#"
        class="mt-(--bs-margin-lg) inline-block text-xs text-tertiary no-underline hover:text-secondary"
        >{{ text.back }}</a
      >
    </div>
  </div>
</template>
