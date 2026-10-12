<script lang="ts">
import { Tag } from "./index";
import type { TagProps } from "./props";

let {
  story = "basic",
  tone = "ink",
  variant = "solid",
}: {
  story?: "basic" | "tones" | "variants" | "checkable" | "closable" | "disabled";
  tone?: NonNullable<TagProps["tone"]>;
  variant?: NonNullable<TagProps["variant"]>;
} = $props();

const qinghua = $state(true);
const celadon = $state(false);
let names = $state(["Paper", "Ink", "Seal"]);

function remove(name: string) {
  names = names.filter((entry) => entry !== name);
}
</script>

{#if story === "tones"}
  <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
    {#each ["ink", "primary", "success", "warning", "danger", "info"] as const as entry (entry)}
      <Tag tone={entry} variant="subtle">{entry}</Tag>
    {/each}
  </div>
{:else if story === "variants"}
  <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
    {#each ["solid", "outline", "subtle"] as const as entry (entry)}
      <Tag tone="primary" variant={entry}>{entry}</Tag>
    {/each}
  </div>
{:else if story === "checkable"}
  <div style="display: flex; gap: 0.5rem; align-items: center;">
    <Tag checkable variant="outline" bind:checked={qinghua}>Qinghua</Tag>
    <Tag checkable variant="outline" bind:checked={celadon}>Celadon</Tag>
  </div>
{:else if story === "closable"}
  <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
    {#each names as name (name)}
      <Tag variant="subtle" closable onClose={() => remove(name)}>{name}</Tag>
    {/each}
  </div>
{:else if story === "disabled"}
  <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
    <Tag checkable checked disabled>Archived</Tag>
    <Tag checkable variant="outline" disabled>Locked</Tag>
    <Tag variant="subtle" closable disabled>Filed</Tag>
  </div>
{:else}
  <div style="display: flex; gap: 0.5rem; align-items: center;">
    <Tag {tone} {variant}>Design</Tag>
    <Tag {tone} {variant}>Porcelain</Tag>
    <Tag {tone} {variant}>Kiln work</Tag>
  </div>
{/if}
