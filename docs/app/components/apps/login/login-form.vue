<script setup lang="ts">
import { Avatar, Button, Checkbox, Field, Separator } from "@bysages/vue";
import { computed, ref } from "vue";

const { locale } = useI18n();

const copy = {
  en: {
    title: "Welcome back",
    lede: "Sign in to your workbench.",
    email: "Email",
    emailPlaceholder: "you@example.com",
    password: "Password",
    passwordPlaceholder: "••••••••",
    remember: "Remember me",
    forgot: "Forgot password?",
    submit: "Sign in",
    or: "Or continue with",
    magic: "Magic link",
    footer: "No account?",
    signup: "Sign up",
    signedAs: "Signed in as",
    signOut: "Sign out",
  },
  zh: {
    title: "欢迎回来",
    lede: "登录你的工作台。",
    email: "邮箱",
    emailPlaceholder: "you@example.com",
    password: "密码",
    passwordPlaceholder: "••••••••",
    remember: "记住我",
    forgot: "忘记密码？",
    submit: "登录",
    or: "或通过以下方式继续",
    magic: "邮箱魔法链接",
    footer: "还没有账户？",
    signup: "注册",
    signedAs: "已登录为",
    signOut: "退出登录",
  },
} as const;

const text = computed(() => copy[locale.value as "en" | "zh"]);

// The ledger is local: "signing in" swaps the form for its success
// face — enough to show the states without a server.
const email = ref("");
const password = ref("");
const remember = ref(true);
const signedIn = ref(false);

const initial = computed(() => (email.value || "s").slice(0, 1).toUpperCase());
</script>

<template>
  <div class="grid w-full gap-5">
    <div v-if="signedIn" class="grid place-items-center gap-4 text-center">
      <Avatar.Root class="size-12">
        <Avatar.Fallback>{{ initial }}</Avatar.Fallback>
      </Avatar.Root>
      <p class="m-0 text-sm text-secondary">
        {{ text.signedAs }}
        <span class="font-medium text-primary">{{ email }}</span>
      </p>
      <Button variant="outline" @click="signedIn = false">{{ text.signOut }}</Button>
    </div>

    <template v-else>
      <div class="grid gap-1 text-center">
        <h2 class="m-0 font-serif text-2xl">{{ text.title }}</h2>
        <p class="m-0 text-sm text-secondary">{{ text.lede }}</p>
      </div>

      <form class="grid gap-4" @submit.prevent="signedIn = true">
        <Field.Root>
          <Field.Label>{{ text.email }}</Field.Label>
          <Input v-model="email" type="email" required :placeholder="text.emailPlaceholder" />
        </Field.Root>
        <Field.Root>
          <div class="flex items-baseline justify-between gap-3">
            <Field.Label>{{ text.password }}</Field.Label>
            <a href="#" class="text-xs text-tertiary no-underline hover:text-secondary">{{
              text.forgot
            }}</a>
          </div>
          <Input
            v-model="password"
            type="password"
            required
            :placeholder="text.passwordPlaceholder"
          />
        </Field.Root>

        <Checkbox.Root v-model:checked="remember">
          <Checkbox.Control>
            <Checkbox.Indicator>
              <Icon name="i-lucide-check" />
            </Checkbox.Indicator>
          </Checkbox.Control>
          <Checkbox.Label>{{ text.remember }}</Checkbox.Label>
          <Checkbox.HiddenInput />
        </Checkbox.Root>

        <Button type="submit" class="w-full!">{{ text.submit }}</Button>
      </form>

      <div class="flex items-center gap-3 text-xs text-tertiary">
        <Separator orientation="horizontal" class="flex-1!" />
        {{ text.or }}
        <Separator orientation="horizontal" class="flex-1!" />
      </div>

      <div class="grid grid-cols-2 gap-3">
        <Button variant="outline">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true">
            <path
              d="M8 .2a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38l-.01-1.49c-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.42 7.42 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48l-.01 2.2c0 .21.15.46.55.38A8 8 0 0 0 8 .2Z"
            />
          </svg>
          GitHub
        </Button>
        <Button variant="outline">
          <Icon name="i-lucide-mail" />
          {{ text.magic }}
        </Button>
      </div>

      <p class="m-0 text-center text-xs text-tertiary">
        {{ text.footer }}
        <a href="#" class="font-medium text-primary no-underline hover:underline">{{
          text.signup
        }}</a>
      </p>
    </template>
  </div>
</template>
