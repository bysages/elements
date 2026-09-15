<script lang="ts">
import { Button } from "../button";
import type { SuggestionProps } from "./props";

let { prompt, onSelect, ...rest }: SuggestionProps = $props();
</script>

<!-- A seal-cut button proposing the next stroke; selection hands back
the prompt. The shared Button in its outline register. -->
<Button variant="outline" size="sm" {...rest} onclick={() => onSelect?.(prompt)}>
  {prompt}
</Button>
