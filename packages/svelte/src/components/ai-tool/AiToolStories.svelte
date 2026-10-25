<script lang="ts">
  import { AiTool } from "./index";

  let { story = "basic" }: { story?: "basic" | "structured" | "approval" } = $props();

  let approval = $state<"required" | "approved" | "denied">("required");
</script>

{#if story === "structured"}
  <div style="display: grid; gap: 0.75rem; inline-size: 100%; max-inline-size: 46rem;">
    <AiTool
      name="search_web"
      status="completed"
      defaultOpen
      inputValue={{ query: "paper stock", limit: 5 }}
      outputValue={{ hits: 12, sources: ["catalog", "archive"] }}
    />
  </div>
{:else if story === "approval"}
  <div style="display: grid; gap: 0.75rem; inline-size: 100%; max-inline-size: 46rem;">
    <AiTool
      name="write_file"
      status={approval === "approved" ? "completed" : approval === "denied" ? "denied" : "pending"}
      approval={approval}
      defaultOpen
      inputValue={{ path: "/notes/colophon.md" }}
      onApprove={() => (approval = "approved")}
      onDeny={() => (approval = "denied")}
    />
  </div>
{:else}
  <div style="display: grid; gap: 0.75rem; inline-size: 100%; max-inline-size: 46rem;">
    <AiTool name="search_web" status="running">
      {#snippet input()}{'{"query": "paper stock"}'}{/snippet}
    </AiTool>
    <AiTool name="search_web" status="completed" defaultOpen>
      {#snippet input()}{'{"query": "paper stock"}'}{/snippet}
      {#snippet output()}{'{"hits": 12}'}{/snippet}
    </AiTool>
    <AiTool name="send_fax" status="error">
      {#snippet input()}{'{"to": "+86 …"}'}{/snippet}
      {#snippet output()}Error: line busy{/snippet}
    </AiTool>
    <AiTool name="read_file">
      {#snippet output()}{'{"path": "/etc/colophon"}'}{/snippet}
    </AiTool>
  </div>
{/if}
