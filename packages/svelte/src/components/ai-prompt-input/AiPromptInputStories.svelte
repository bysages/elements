<script lang="ts">
  import { createListCollection } from "@ark-ui/svelte/collection";

  import { AiAttachment, AiAttachments } from "../ai-attachments";
  import { Button } from "../button";
  import { Menu } from "../menu";
  import { Select } from "../select";
  import { Toggle } from "../toggle";
  import { AiPromptInput } from "./index";

  let { story = "basic" }: { story?: "basic" | "compose" | "mentions" | "triggers" } = $props();

  const models = createListCollection({
    items: [
      { label: "Hunyuan", value: "hunyuan" },
      { label: "Qinghua", value: "qinghua" },
      { label: "Celadon", value: "celadon" },
    ],
    itemToString: (item) => item.label,
    itemToValue: (item) => item.value,
  });

  let attachCount = 0;

  // Basic
  let prompt = $state("");
  let sent = $state("");

  // Compose
  let composePrompt = $state("");
  let composeBusy = $state(false);
  let composeModel = $state("hunyuan");
  let composeWebSearch = $state(false);
  let composeSent = $state("");
  let composeFiles = $state<Array<{ name: string; size: number; status: "ready" | "uploading" }>>([
    { name: "colophon.png", size: 48213, status: "ready" },
    { name: "notes.md", size: 1024, status: "uploading" },
  ]);

  function attachCompose(name: string) {
    composeFiles = [...composeFiles, { name, size: 2048, status: "uploading" }];
    setTimeout(() => {
      const file = composeFiles.find((entry) => entry.name === name);
      if (file) file.status = "ready";
    }, 1000);
  }

  function composeSend() {
    composeBusy = true;
    composeSent = "";
    setTimeout(() => {
      composeBusy = false;
    }, 2000);
  }

  // Mentions
  let mentionsPrompt = $state("");
  let mentionsSent = $state("");
  const team = [
    { label: "Lin Hua", value: "lin" },
    { label: "Mei Chen", value: "mei" },
    { label: "Hong Wei", value: "hong" },
  ];

  // Triggers
  let triggersPrompt = $state("");
  let triggersChosen = $state("");
  const triggerItems = [
    { label: "Lin Hua", value: "lin" },
    {
      label: "Search web",
      value: "search-web",
      group: "Commands",
      description: "Find current sources",
    },
  ];
</script>

{#snippet plusIcon()}
  <svg
    viewBox="0 0 16 16"
    width="14"
    height="14"
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="square"
  >
    <path d="M8 3.5v9M3.5 8h9" />
  </svg>
{/snippet}

{#snippet globeIcon()}
  <svg
    viewBox="0 0 16 16"
    width="14"
    height="14"
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="square"
  >
    <circle cx="8" cy="8" r="5.5" />
    <path d="M2.5 8h11M8 2.5c-3.2 3.4-3.2 7.6 0 11M8 2.5c3.2 3.4 3.2 7.6 0 11" />
  </svg>
{/snippet}

{#snippet chevronIcon()}
  <svg
    viewBox="0 0 16 16"
    width="14"
    height="14"
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="square"
  >
    <path d="m4 6 4 4 4-4" />
  </svg>
{/snippet}

{#if story === "compose"}
  <div style="display: grid; gap: 0.75rem; inline-size: 100%; max-inline-size: 46rem;">
    <AiPromptInput
      bind:value={composePrompt}
      busy={composeBusy}
      onSubmit={composeSend}
      onStop={() => (composeBusy = false)}
    >
      {#snippet header()}
        <AiAttachments>
          {#each composeFiles as file (file.name)}
            <AiAttachment
              name={file.name}
              size={file.size}
              status={file.status}
              onRemove={() =>
                (composeFiles = composeFiles.filter((entry) => entry.name !== file.name))}
            />
          {/each}
        </AiAttachments>
      {/snippet}
      {#snippet footer()}
        <Menu.Root>
          <Menu.Trigger>
            {#snippet asChild(triggerProps)}
              <Button {...triggerProps()} variant="ghost" square aria-label="Attach">
                {@render plusIcon()}
              </Button>
            {/snippet}
          </Menu.Trigger>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item
                value="image"
                onSelect={() => attachCompose(`image-${++attachCount}.png`)}
              >
                <Menu.ItemText>Upload image</Menu.ItemText>
              </Menu.Item>
              <Menu.Item value="file" onSelect={() => attachCompose(`notes-${++attachCount}.md`)}>
                <Menu.ItemText>Upload file</Menu.ItemText>
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>
        <Toggle.Root
          type="button"
          pressed={composeWebSearch}
          onPressedChange={(pressed) => (composeWebSearch = pressed)}
        >
          {@render globeIcon()}
          <span>Web search</span>
        </Toggle.Root>
      {/snippet}
      {#snippet footerEnd()}
        <Select.Root
          collection={models}
          value={[composeModel]}
          onValueChange={(details) => (composeModel = details.value[0] ?? composeModel)}
        >
          <Select.Control>
            <Select.Trigger type="button" aria-label="Model">
              <Select.ValueText placeholder="Model" />
              <Select.Indicator>{@render chevronIcon()}</Select.Indicator>
            </Select.Trigger>
          </Select.Control>
          <Select.Positioner>
            <Select.Content>
              {#each models.items as item (item.value)}
                <Select.Item item={item}>
                  <Select.ItemText>{item.label}</Select.ItemText>
                  <Select.ItemIndicator>✓</Select.ItemIndicator>
                </Select.Item>
              {/each}
            </Select.Content>
          </Select.Positioner>
        </Select.Root>
      {/snippet}
    </AiPromptInput>
    <p
      style="margin: 0; color: var(--bs-color-text-tertiary); font-size: var(--bs-font-size-sm);"
    >
      {composeBusy
        ? "Working — the seal is a stop now; Enter holds its breath."
        : composeSent
          ? `Sent: ${composeSent}`
          : "Attach, pick a model, type and press Enter."}
    </p>
  </div>
{:else if story === "mentions"}
  <div style="display: grid; gap: 0.75rem; inline-size: 100%; max-inline-size: 46rem;">
    <AiPromptInput
      bind:value={mentionsPrompt}
      placeholder="Ask the room — @who should weigh in…"
      mentions={{ items: team }}
      onSubmit={(value) => {
        mentionsSent = value;
        mentionsPrompt = "";
      }}
    />
    <p
      role="status"
      style="font-size: var(--bs-font-size-sm); color: var(--bs-color-text-tertiary);"
    >
      {mentionsSent
        ? `Sent: ${mentionsSent}`
        : "Type @ and a name; Enter sends only after the vessel closes."}
    </p>
  </div>
{:else if story === "triggers"}
  <div style="display: grid; gap: 0.75rem; inline-size: 100%; max-inline-size: 46rem;">
    <AiPromptInput
      bind:value={triggersPrompt}
      placeholder="Type @ to mention or / to command…"
      mentions={{ items: triggerItems, triggers: ["@", "/"], insertOnSelect: false }}
      onSelect={(entry) => (triggersChosen = entry.label)}
    />
    <p
      role="status"
      style="font-size: var(--bs-font-size-sm); color: var(--bs-color-text-tertiary);"
    >
      {triggersChosen
        ? `Selected: ${triggersChosen}`
        : "The text stays untouched after selection."}
    </p>
  </div>
{:else}
  <div style="display: grid; gap: 0.75rem; inline-size: 100%; max-inline-size: 46rem;">
    <AiPromptInput
      bind:value={prompt}
      onSubmit={(value) => (sent = value)}
    />
    <p
      style="margin: 0; color: var(--bs-color-text-tertiary); font-size: var(--bs-font-size-sm);"
    >
      {sent ? `Sent: ${sent}` : "Type and press Enter."}
    </p>
  </div>
{/if}
