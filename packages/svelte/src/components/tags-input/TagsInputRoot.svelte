<script lang="ts">
import { TagsInput as ArkTagsInput } from "@ark-ui/svelte/tags-input";
import type { TagsInputRootProps } from "./props";

let { size = "md", children, ...rest }: TagsInputRootProps = $props();
</script>

<ArkTagsInput.Root {...rest} data-size={size}>
  {@render children?.()}
</ArkTagsInput.Root>
