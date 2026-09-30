<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("terminal");

import type { TerminalProps } from "./props";

let { lines = [], prompt = "$", placeholder, label, onCommand, ...rest }: TerminalProps = $props();

let draft = $state("");
let scroll: HTMLDivElement | undefined = $state();

$effect(() => {
  const count = lines.length;
  scroll?.scrollTo({ top: scroll.scrollHeight });
});

function submit() {
  const text = draft.trim();
  if (!text) return;
  draft = "";
  onCommand?.(text);
}
</script>

<!-- A quiet console: the transcript above, the prompt line below.
Each entered line leaves as an event and the caller answers through
the lines prop, so history stays theirs to shape. -->
<div {...rest} role="log" aria-label={label} data-scope="terminal" data-part="root">
  <div bind:this={scroll} data-scope="terminal" data-part="scroll">
    {#each lines as line, index (index)}
      <div data-scope="terminal" data-part="line">{line}</div>
    {/each}
  </div>
  <div data-scope="terminal" data-part="entry">
    <span data-scope="terminal" data-part="sigil" aria-hidden="true">{prompt}</span>
    <input
      data-scope="terminal"
      data-part="input"
      bind:value={draft}
      placeholder={placeholder}
      aria-label={label ? `${label} command line` : "Command line"}
      spellcheck="false"
      autocomplete="off"
      onkeydown={(event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          submit();
        }
      }}
    />
  </div>
</div>