---
title: Elements
---

::page-hero
#title
Set your docs in paper and ink.

#description
Elements is the UI component library of By Sages — warm paper, ink that reads, hierarchy carried by light. One token system dresses every control; one anatomy contract carries every framework.

#links
  :::button-link{to="/en/guide/introduction"}
  Get started
  :::

  :::button-link{to="/en/reference/button" variant="outline"}
  Browse the reference
  :::
::

::page-section
#title
Everything a product needs

#description
Seventy components over one token system — interaction from headless state machines, every visual decision from the paper-and-ink layer.

#cards
  :::page-card
  #icon
  <Icon name="i-lucide-swatch-book" />

  #title
  A token system, not a stylesheet

  #description
  Colors, spacing, radius, elevation, and motion resolve from `--bs-*` custom properties. Light and dark, accent pigments, contrast and density tiers — themes are data, never hardcoded styles.
  :::

  :::page-card
  #icon
  <Icon name="i-lucide-layout-grid" />

  #title
  70+ components

  #description
  Actions, forms, overlays, navigation, and data — one stylesheet serves every framework from the same anatomy of `data-scope` and `data-part`.
  :::

  :::page-card
  #icon
  <Icon name="i-lucide-table-2" />

  #title
  Data layers

  #description
  A DataTable for dense information work — sorting, pinning, tree, drag reorder, virtual windows — and Charts painted straight from the tokens.
  :::

  :::page-card
  #icon
  <Icon name="i-lucide-bot-message-square" />

  #title
  AI primitives

  #description
  Conversation, reasoning, tools, and sources as first-class parts — the same ink, in conversation with your model.
  :::

  :::page-card
  #icon
  <Icon name="i-lucide-frame" />

  #title
  Container-driven responsive

  #description
  Components answer to the space they are given, not the viewport — the same control composes correctly in a sidebar, a card, or a full page.
  :::

  :::page-card
  #icon
  <Icon name="i-lucide-sun-medium" />

  #title
  Light as shadow

  #description
  A lighting engine computes the shade — source, elevation, pigment bleed — and writes it to variables the styles merely consume. Motion obeys the same grammar: light needs time; ink bleeds.
  :::
::

::page-section{orientation="horizontal" reverse}
#title
Up and running in a minute

#description
The wrappers bring the theme engine with them — install, apply the theme once, and every control speaks the same paper. Pick your framework; the components read identically.

#links
  :::button-link{to="/en/guide/introduction" size="sm" variant="outline"}
  Follow the guide
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
    <Button>Write in ink</Button>
  </template>
  ```

  ```tsx [React]
  import { applyTheme } from "@bysages/core";
  import { Button } from "@bysages/react";

  applyTheme({ mode: "light" });

  export default function App() {
    return <Button>Write in ink</Button>;
  }
  ```

  ```tsx [Solid]
  import { render } from "solid-js/web";
  import { applyTheme } from "@bysages/core";
  import { Button } from "@bysages/solid";

  applyTheme({ mode: "light" });

  render(() => <Button>Write in ink</Button>, document.getElementById("root"));
  ```

  ```svelte [Svelte]
  <script>
  import { onMount } from "svelte";
  import { applyTheme } from "@bysages/core";
  import { Button } from "@bysages/svelte";

  onMount(() => applyTheme({ mode: "light" }));
  </script>

  <Button>Write in ink</Button>
  ```
  ::
::

::page-section
#title
Now begin

#description
The introduction walks the layers; the reference documents every part of every component.

#cards
  :::page-card{to="/en/guide/introduction"}
  #title
  Read the introduction

  #description
  One premise, one style layer, one source of truth — how the pieces fit.
  :::

  :::page-card{to="/en/reference/button"}
  #title
  Browse the reference

  #description
  Props, emits, and anatomy for every component, straight from the source.
  :::
::
