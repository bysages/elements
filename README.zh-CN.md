# By Sages Elements

[English](./README.md) | 简体中文

[![npm downloads](https://img.shields.io/npm/dm/@bysages/core)](https://www.npmjs.com/package/@bysages/core)
[![GitHub Stars](https://img.shields.io/github/stars/bysages/elements)](https://github.com/bysages/elements/stargazers)
![GitHub License](https://img.shields.io/github/license/bysages/elements)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](https://www.contributor-covenant.org/version/2/1/code_of_conduct/)

> Elements 是 By Sages 的界面组件库：无头交互、完全由**编译为 CSS 变量的设计令牌**驱动样式，靠原生 **CSS 容器查询**响应式布局——一套设计系统，同时交付 React、Vue、Solid 与 Svelte 组件。

[文档站](https://elements.bysages.com) · [AI 集成](https://elements.bysages.com/zh/guide/ai) · [讨论区](https://github.com/bysages/elements/discussions) · [问题反馈](https://github.com/bysages/elements/issues)

⭐ **如果 Elements 对你有用，一个 star 能帮更多开发者发现它。**

## 为什么选择 Elements？

- 🧩 **无头逻辑，我们的视觉** — 交互、状态、无障碍与定位交给久经考验的无头状态机；每一个视觉决定都住在同一层样式里，行为稳固，设计属于我们。
- 💡 **动态光效，而非静态阴影** — 光照引擎把海拔、颜料渗透与光晕计算为 CSS 变量；组件样式只消费光（以光为影）。
- 📐 **容器驱动的响应式** — 组件回应它所处的空间（`@container`），而非视口；同一枚控件在侧栏、卡片或整页中都各得其所。
- 🎨 **令牌贯穿到底** — 调色板、字体、间距、圆角、海拔与密度都是设计令牌，以 CSS 自定义属性暴露。主题（明暗、矿物颜料、对比度分层、密度分层）是数据，绝不是硬编码样式。
- 🖋 **纸与墨（以光为影）** — 界面是温暖的纸，内容是墨，层级由光承载。主操作默认墨色，可切换矿物颜料主题；语义色是固定的传统颜料；控件如印章般方切，器物保持圆润。这套语言 bridging 中式克制（留白）与西方极简，默认清晰易读，对比度与密度分层同时服务年长与年轻用户。
- 🌐 **一套结构契约，贯穿所有框架** — React、Vue、Solid、Svelte 的包装层共享同一份部件契约（`data-scope` / `data-part`），一份样式表、一套心智模型，服务所有框架。
- 🤖 **AI 原生文档** — 文档站为 agent 而生：每一页都以原始 markdown 提供，整站编译为 `llms.txt`，MCP 服务器把文档暴露给任何客户端。

## 包

| 包                                                     | 版本                                                     | 说明                                                       |
| ------------------------------------------------------ | -------------------------------------------------------- | ---------------------------------------------------------- |
| [@bysages/tokens](./packages/tokens/README.md)         | ![npm](https://img.shields.io/npm/v/@bysages/tokens)     | DTCG 设计令牌，经 style-dictionary 4 编译为 CSS 变量与类型 |
| [@bysages/core](./packages/core/README.md)             | ![npm](https://img.shields.io/npm/v/@bysages/core)       | 主题引擎、逐组件样式与光照引擎                             |
| [@bysages/react](./packages/react/README.md)           | ![npm](https://img.shields.io/npm/v/@bysages/react)      | React 组件                                                 |
| [@bysages/vue](./packages/vue/README.md)               | ![npm](https://img.shields.io/npm/v/@bysages/vue)        | Vue 组件                                                   |
| [@bysages/solid](./packages/solid/README.md)           | ![npm](https://img.shields.io/npm/v/@bysages/solid)      | Solid 组件                                                 |
| [@bysages/svelte](./packages/svelte/README.md)         | ![npm](https://img.shields.io/npm/v/@bysages/svelte)     | Svelte 组件                                                |
| [@bysages/charts](./packages/charts/README.md)         | ![npm](https://img.shields.io/npm/v/@bysages/charts)     | 令牌主题的图表                                             |
| [@bysages/workflow](./packages/workflow/README.md)     | ![npm](https://img.shields.io/npm/v/@bysages/workflow)   | 无头流程图协议 + X6 画布编辑器                             |
| [@bysages/nuxt](./packages/nuxt/README.md)             | ![npm](https://img.shields.io/npm/v/@bysages/nuxt)       | 包装 Vue 组件的 Nuxt 模块                                  |
| [@bysages/docs-theme](./packages/docs-theme/README.md) | ![npm](https://img.shields.io/npm/v/@bysages/docs-theme) | 构建文档站的 Nuxt Content 层                               |

## 快速开始

选择你框架的包，连同 core 一起安装：

```bash
pnpm add @bysages/vue @bysages/core
# 或 @bysages/react / @bysages/solid / @bysages/svelte
```

引入一次令牌样式表，然后为主题赋值：

```ts
import "@bysages/tokens/css";
import { applyTheme } from "@bysages/core";

applyTheme({ mode: "system", accent: "ink" });
```

接着使用组件——这里是 Vue；[React](./packages/react/README.md)、[Solid](./packages/solid/README.md) 与 [Svelte](./packages/svelte/README.md) 镜像同一套结构：

```vue
<script setup lang="ts">
import { Button, Dialog } from "@bysages/vue";
</script>

<template>
  <Dialog.Root>
    <Dialog.Trigger>删除条目</Dialog.Trigger>
    <Teleport to="body">
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>删除条目</Dialog.Title>
          <Dialog.Description>此操作无法撤销。</Dialog.Description>
          <Dialog.CloseTrigger>×</Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.Root>
</template>
```

Nuxt 应用通过模块自动导入全部组件族并处理 SSR 样式——见 [@bysages/nuxt](./packages/nuxt/README.md)。[文档站](https://elements.bysages.com)按框架记录安装、主题，以及每个组件族的在线演示。

## AI 集成

文档站为 agent 而生：每一页都有原始 markdown，整站编译为 [`llms.txt`](https://elements.bysages.com/llms.txt)，MCP 服务器把文档暴露给任何 MCP 客户端：

```bash
claude mcp add --transport http elements https://elements.bysages.com/mcp
```

详见 [AI 集成指南](https://elements.bysages.com/zh/guide/ai)。

## 开发

### 环境要求

- **Node.js** 18.x 或更高
- **pnpm** 9.x 或更高（推荐的包管理器）
- **Git** 用于版本控制

### 上手

1. **克隆仓库**：

   ```bash
   git clone https://github.com/bysages/elements.git
   cd elements
   ```

2. **安装依赖**：

   ```bash
   pnpm install
   ```

3. **构建所有包**：

   ```bash
   pnpm build
   ```

### 开发命令

```bash
pnpm build                                  # 构建所有包
cd packages/<pkg> && pnpm build             # 构建单个包
cd packages/<pkg> && pnpm exec vp test run  # 测试单个包
pnpm exec vp check                          # Lint、格式化与类型检查
```

每个包在自己的包根目录用 `vite` 提供组件演示（`cd packages/<pkg> && pnpm dev`）。

## 版本

本项目遵循[语义化版本](https://semver.org/)。主版本号为 `0`（1.0 之前）时，破坏性 API 变更以**次版本**号（`0.x.0`）发布而非补丁号——公开 API 预计会持续演进，直至 `1.0.0` 稳定版。若下游项目需要次版本间的稳定性，请钉住精确版本。

## 参与贡献

欢迎贡献！完整的贡献流程、编码规范与 PR 清单见 [CONTRIBUTING.md](./CONTRIBUTING.md)。

## 支持与社区

- 📫 [问题反馈](https://github.com/bysages/elements/issues)
- 💬 [讨论区](https://github.com/bysages/elements/discussions) — 提问、想法与展示

如果 Elements 对你有用，一个 [⭐ star](https://github.com/bysages/elements/stargazers) 能帮更多开发者发现它。

## 许可

本项目基于 MIT 许可证发布 — 详见 [LICENSE](./LICENSE) 文件。

---

由 [By Sages](https://www.bysages.com/) 用 ❤️ 构建。
