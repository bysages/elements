<template>
  <!-- The stage an example plays on: one hairline and the vessel radius
       separate the demo from the page that hosts it — an app flush
       against the prose reads as broken layout, not as a product. The
       @container class makes it the containment context examples query
       against. -->
  <div class="@container overflow-clip rounded-lg border border-border bg-surface-0">
    <slot />
  </div>
</template>
