<script lang="ts">
  import { Button } from "../button";
  import { Layout } from "./index";

  let { story = "basic" }: { story?: "basic" | "controlled-collapse" } = $props();

  let collapsed = $state(false);
  let width = $state("16rem");

  const stops = [
    { label: "Overview", icon: "overview" },
    { label: "Ledger", icon: "ledger" },
    { label: "Archive", icon: "archive" },
    { label: "Settings", icon: "settings" },
  ];

  // The rail answers the fold without a single hard cut — every change
  // rides a transition that runs at the same pace as the rail itself
  // (the new-york register's icon mode works the same way: width, padding and label
  // opacity animate in parallel, so nothing snaps while the edge moves).
  // The stops shrink toward a centered seal while their labels fold into
  // nothing.
  const railTransition =
    "inline-size var(--bs-duration-slow) var(--bs-ease-out), padding-inline var(--bs-duration-slow) var(--bs-ease-out)";

  function navRailStyle(isCollapsed: boolean) {
    return [
      "justify-content: flex-start",
      `inline-size: ${isCollapsed ? "2rem" : "100%"}`,
      `padding-inline: ${isCollapsed ? "0.5rem" : "var(--bs-padding-sm)"}`,
      "gap: var(--bs-gap-sm)",
      "white-space: nowrap",
      "overflow: hidden",
      `transition: ${railTransition}`,
    ].join("; ");
  }

  // The label folds away by width and opacity — never by
  // display, which cannot animate — so the glyph glides to
  // its centered rest while the edge still moves.
  function labelStyle(isCollapsed: boolean) {
    return [
      `max-inline-size: ${isCollapsed ? "0" : "100%"}`,
      `opacity: ${isCollapsed ? "0" : "1"}`,
      "overflow: hidden",
      "transition: max-inline-size var(--bs-duration-slow) var(--bs-ease-out), opacity var(--bs-duration-fast) var(--bs-ease-out)",
    ].join("; ");
  }
</script>

{#snippet railIcon(kind: string)}
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.75"
    stroke-linecap="square"
    aria-hidden="true"
    style="flex: none;"
  >
    {#if kind === "overview"}
      <rect x="4" y="4" width="7" height="7" />
      <rect x="13" y="4" width="7" height="7" />
      <rect x="4" y="13" width="7" height="7" />
      <rect x="13" y="13" width="7" height="7" />
    {:else if kind === "ledger"}
      <path d="M4 6h16M4 12h16M4 18h10" />
    {:else if kind === "archive"}
      <rect x="4" y="5" width="16" height="4" />
      <path d="M6 9v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V9M10 13h4" />
    {:else}
      <circle cx="12" cy="12" r="3" />
      <path
        d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"
      />
    {/if}
  </svg>
{/snippet}

{#snippet rail(isCollapsed: boolean)}
  <div
    style="display: grid; gap: var(--bs-gap-xs); padding: var(--bs-padding-sm); justify-items: center;"
  >
    {#each stops as stop (stop.label)}
      <Button
        variant="ghost"
        aria-label={isCollapsed ? stop.label : undefined}
        style={navRailStyle(isCollapsed)}
      >
        {@render railIcon(stop.icon)}
        <span style={labelStyle(isCollapsed)}>{stop.label}</span>
      </Button>
    {/each}
  </div>
{/snippet}

{#snippet page()}
  <Layout.Header>
    <strong style="font-size: var(--bs-font-size-lg);">The workbench</strong>
  </Layout.Header>
  <Layout.Content>
    <div style="display: grid; gap: var(--bs-gap-md); max-inline-size: 72ch;">
      <p style="margin: 0;">
        The content area takes the flow's full measure and holds it to a readable column.
        Sections rise onto surfaces; the skeleton only decides where they stand.
      </p>
      <p style="margin: 0;">
        Below the flow the footer rests at the foot of the grid, however little content there
        is — the middle track stretches, the frame does not collapse.
      </p>
    </div>
  </Layout.Content>
  <Layout.Footer>
    <p style="margin: 0; color: var(--bs-color-text-tertiary);">
      By Sages Elements — the paper-and-ink system.
    </p>
  </Layout.Footer>
{/snippet}

{#if story === "controlled-collapse"}
  <div style="display: grid; gap: var(--bs-space-4);">
    <Button
      variant="ghost"
      style="justify-self: start;"
      onclick={() => (collapsed = !collapsed)}
    >
      {collapsed ? "Expand the rail" : "Fold the rail"}
    </Button>
    <Layout.Root sider="start" style="min-block-size: 32rem;">
      <Layout.Sider bind:collapsed bind:width resizable>
        {#snippet children({ collapsed: siderCollapsed })}
          {@render rail(siderCollapsed)}
        {/snippet}
      </Layout.Sider>
      {@render page()}
    </Layout.Root>
  </div>
{:else}
  <Layout.Root sider="start">
    <Layout.Sider>{@render rail(false)}</Layout.Sider>
    {@render page()}
  </Layout.Root>
{/if}
