<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("tags-input");

import { TagsInput as ArkTagsInput } from "@ark-ui/svelte/tags-input";
import { useElementId } from "../../internal/id";
import type { TagsInputRootProps } from "./props";

let { size = "md", children, ...rest }: TagsInputRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("tags-input", generatedId, rest.id));
</script>

<ArkTagsInput.Root {...rest} {id} data-size={size}>
  {@render children?.()}
</ArkTagsInput.Root>
