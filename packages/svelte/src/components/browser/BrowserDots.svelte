<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
import type { HTMLAttributes } from "svelte/elements";

injectComponentStyle("browser");

type Props = HTMLAttributes<HTMLDivElement>;

let { ...rest }: Props = $props();
const tones = ["danger", "warning", "success"];
</script>

<!-- The three lamps are the system's own fixed pigments — the same
     semantics reserved for danger, warning, and success. -->
<div {...rest} data-scope="browser" data-part="dots">
  {#each tones as tone (tone)}
    <span data-scope="browser" data-part="dot" data-tone={tone}></span>
  {/each}
</div>

