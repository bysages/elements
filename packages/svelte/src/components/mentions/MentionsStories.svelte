<script lang="ts">
  import { Field } from "../field";
  import { Mentions } from "./index";

  let { story = "basic" }: { story?: "basic" | "custom-trigger" | "with-field" | "groups" } =
    $props();

  const teammates = [
    { label: "Lin Hua", value: "lin" },
    { label: "Mei Chen", value: "mei" },
    { label: "Hong Wei", value: "hong" },
    { label: "Yan Wu", value: "yan" },
    { label: "Zhou Lan", value: "zhou" },
  ];

  let text = $state("");
  let customText = $state("Review with #");
  let fieldText = $state("");
  let groupText = $state("");
</script>

{#if story === "custom-trigger"}
  <Mentions
    items={[
      { label: "Design review", value: "design-review" },
      { label: "Editorial review", value: "editorial-review" },
      { label: "Civic review", value: "civic-review" },
    ]}
    trigger="#"
    placeholder="Tag a review…"
    bind:value={customText}
  />
{:else if story === "with-field"}
  <Field.Root invalid style="max-inline-size: 28rem;">
    <Field.Label>Describe the task</Field.Label>
    <Mentions items={teammates} placeholder="Describe the task and @who should read it…" bind:value={fieldText} />
    <Field.ErrorText>Every task needs a body before it files.</Field.ErrorText>
  </Field.Root>
{:else if story === "groups"}
  <Mentions
    items={[
      {
        label: "Lin Hua",
        value: "lin",
        group: "People",
        description: "Design systems",
        icon: "pencil",
      },
      {
        label: "Mei Chen",
        value: "mei",
        group: "People",
        description: "Editorial",
        icon: "pencil",
      },
      {
        label: "Search web",
        value: "search-web",
        group: "Commands",
        description: "Find current sources",
        icon: "file",
        insertText: "/search-web ",
      },
    ]}
    triggers={["@", "/"]}
    placeholder="Mention @Lin or run /Search…"
    bind:value={groupText}
  />
  <p
    role="status"
    style="margin-block-start: var(--bs-space-4); font-size: var(--bs-font-size-sm); color: var(--bs-color-text-tertiary);"
  >
    {groupText ? `Field holds: ${groupText}` : "Type @ or / to see groups."}
  </p>
{:else}
  <Mentions
    items={teammates}
    placeholder="Describe the task and @who should read it…"
    bind:value={text}
  />
  <p
    role="status"
    style="margin-block-start: var(--bs-space-4); font-size: var(--bs-font-size-sm); color: var(--bs-color-text-tertiary);"
  >
    {text ? `Field holds: ${text}` : "The field is empty."}
  </p>
{/if}
