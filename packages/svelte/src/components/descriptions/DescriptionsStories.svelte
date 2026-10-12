<script lang="ts">
import { Descriptions } from "./index";

let { story }: { story: "anatomy" | "vertical" | "bordered" } = $props();

const pairs = [
  ["Calligrapher", "Lin Wanzhi"],
  ["Ink", "Qinghua cobalt, first grinding"],
  ["Paper", "Jingxian xuan, raw edge"],
  ["Seal", "方寸为章 — square-cut, 6 mm"],
];
</script>

{#if story === "anatomy"}
  <Descriptions.Root>
    {#each pairs as [term, detail] (term)}
      <Descriptions.Item>
        <Descriptions.Term>{term}</Descriptions.Term>
        <Descriptions.Detail>{detail}</Descriptions.Detail>
      </Descriptions.Item>
    {/each}
  </Descriptions.Root>
{:else if story === "vertical"}
  <Descriptions.Root layout="vertical" style="max-inline-size: 16rem">
    <Descriptions.Item>
      <Descriptions.Term>Edition</Descriptions.Term>
      <Descriptions.Detail>First, two hundred copies</Descriptions.Detail>
    </Descriptions.Item>
    <Descriptions.Item>
      <Descriptions.Term>Binding</Descriptions.Term>
      <Descriptions.Detail>Thread-sewn, wrapped in paper</Descriptions.Detail>
    </Descriptions.Item>
  </Descriptions.Root>
{:else}
  <Descriptions.Root bordered column={2}>
    {#each pairs as [term, detail] (term)}
      <Descriptions.Item>
        <Descriptions.Term>{term}</Descriptions.Term>
        <Descriptions.Detail>{detail}</Descriptions.Detail>
      </Descriptions.Item>
    {/each}
  </Descriptions.Root>
{/if}
