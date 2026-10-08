<script lang="ts">
import { TagsInput as ArkTagsInput } from "@ark-ui/svelte/tags-input";

import TagsInputRoot from "./TagsInputRoot.svelte";
  import { iconHtml } from "../../internal/icon";

let {
  value = $bindable(),
  defaultValue,
  label,
  placeholder,
  disabled = false,
  invalid = false,
  required = false,
  clearable = true,
  children,
  ...rest
}: {
  value?: string[];
  defaultValue?: string[];
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  /** Show the clear-all control when values exist. */
  clearable?: boolean;
  children?: import("svelte").Snippet;
} & import("./props").TagsInputRootProps = $props();
</script>

<TagsInputRoot bind:value {defaultValue} {disabled} {invalid} {required} {...rest}>
  {#if label}<ArkTagsInput.Label>{label}</ArkTagsInput.Label>{/if}
  <ArkTagsInput.Control>
    <ArkTagsInput.Context>
      {#snippet render(tagsInput)}
        {#each tagsInput().value as tag, index (`${tag}-${index}`)}
          <ArkTagsInput.Item index={index} value={tag}>
            <ArkTagsInput.ItemPreview>
              <ArkTagsInput.ItemText>{tag}</ArkTagsInput.ItemText>
              <ArkTagsInput.ItemDeleteTrigger aria-label="Remove">{@html iconHtml("x")}</ArkTagsInput.ItemDeleteTrigger>
            </ArkTagsInput.ItemPreview>
            <ArkTagsInput.ItemInput />
          </ArkTagsInput.Item>
        {/each}
      {/snippet}
    </ArkTagsInput.Context>
    <ArkTagsInput.Input {placeholder} />
    {#if clearable}<ArkTagsInput.ClearTrigger aria-label="Clear">{@html iconHtml("x")}</ArkTagsInput.ClearTrigger>{/if}
  </ArkTagsInput.Control>
  <ArkTagsInput.HiddenInput />
  {@render children?.()}
</TagsInputRoot>