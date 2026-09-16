---
title: Elements
---

::page-hero
#title
纸墨为器，以光为影

#description
Elements 是 By Sages 的界面组件库——温暖的纸、可读的墨、由光承载的层级。一套令牌装点所有控件，一份结构契约贯穿所有框架。

#links
  :::button-link{to="/zh/guide/introduction"}
  开始阅读
  :::

  :::button-link{to="/zh/reference/button" variant="outline"}
  浏览组件参考
  :::
::

::page-section
#title
产品所需，一应俱全

#description
Ark 的每一个组件共享同一套令牌——交互来自无头状态机，每一个视觉决定都出自纸墨样式层。

#cards
  :::page-card
  #icon
  <Icon name="i-lucide-swatch-book" />

  #title
  令牌系统，而非样式表

  #description
  颜色、间距、圆角、海拔与动效都由 `--bs-*` 自定义属性解析。明暗两态、矿物主题、对比度与密度分层——主题是数据，绝无硬编码的样式。
  :::

  :::page-card
  #icon
  <Icon name="i-lucide-layout-grid" />

  #title
  Ark 全量组件

  #description
  动作、表单、浮层、导航与数据——同一份样式表，凭 `data-scope` 与 `data-part` 的同一套结构契约服务所有框架。
  :::

  :::page-card
  #icon
  <Icon name="i-lucide-table-2" />

  #title
  数据层

  #description
  面向密集信息的 DataTable——排序、固定、树形、拖拽重排、虚拟窗口——以及直接由令牌绘制的图表。
  :::

  :::page-card
  #icon
  <Icon name="i-lucide-bot-message-square" />

  #title
  人工智能基元

  #description
  对话、推理、工具与来源皆是一等部件——同一笔墨，与你的模型交谈。
  :::

  :::page-card
  #icon
  <Icon name="i-lucide-frame" />

  #title
  容器驱动的响应式

  #description
  组件回应它所处的空间，而非视口——同一枚控件，在侧栏、卡片或整页中都各得其所。
  :::

  :::page-card
  #icon
  <Icon name="i-lucide-sun-medium" />

  #title
  以光为影

  #description
  光照引擎计算阴影——光源、海拔、颜料渗透——写入样式层仅需消费的变量。动效遵循同一文法：光需要时间，墨会晕染。
  :::
::

::page-section{orientation="horizontal" reverse}
#title
一分钟跑起来

#description
包装层自带主题引擎——安装、应用一次主题，所有控件便说同一种纸墨。任选框架，组件表现如一。

#links
  :::button-link{to="/zh/guide/introduction" size="sm" variant="outline"}
  跟随指南
  :::

#body
  ```bash
  pnpm add @bysages/vue @bysages/core
  ```

  ::code-group
  ```vue [Vue]
  <script setup>
  import { applyTheme } from "@bysages/core";
  import { Button } from "@bysages/vue";

  applyTheme({ mode: "light" });
  </script>

  <template>
    <Button>以墨落笔</Button>
  </template>
  ```

  ```tsx [React]
  import { applyTheme } from "@bysages/core";
  import { Button } from "@bysages/react";

  applyTheme({ mode: "light" });

  export default function App() {
    return <Button>以墨落笔</Button>;
  }
  ```

  ```tsx [Solid]
  import { render } from "solid-js/web";
  import { applyTheme } from "@bysages/core";
  import { Button } from "@bysages/solid";

  applyTheme({ mode: "light" });

  render(() => <Button>以墨落笔</Button>, document.getElementById("root"));
  ```

  ```svelte [Svelte]
  <script>
  import { onMount } from "svelte";
  import { applyTheme } from "@bysages/core";
  import { Button } from "@bysages/svelte";

  onMount(() => applyTheme({ mode: "light" }));
  </script>

  <Button>以墨落笔</Button>
  ```
  ::
::

::page-section
#title
现在开始

#description
《简介》带你走过各层架构；组件参考记录每个组件、每个部件的细节。

#cards
  :::page-card{to="/zh/guide/introduction"}
  #title
  阅读简介

  #description
  一个前提、一层样式、一处真相——各部分如何咬合。
  :::

  :::page-card{to="/zh/reference/button"}
  #title
  浏览组件参考

  #description
  每个组件的属性、事件与结构，直接源自源码。
  :::
::
