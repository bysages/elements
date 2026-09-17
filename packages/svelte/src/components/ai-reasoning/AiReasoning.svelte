<script lang="ts">
import { Collapsible } from "../collapsible";
import ChevronIcon from "../ai/ChevronIcon.svelte";
import type { ReasoningProps } from "./props";

let { label = "Thinking", children, ...rest }: ReasoningProps = $props();
</script>

<!-- The model's thought, folded by the shared collapsible in its quiet
register: bare ink for a trigger, the thought on one hairline. -->
<Collapsible.Root {...rest} data-ai="reasoning">
  <Collapsible.Trigger>
    <span>{label}</span>
    <Collapsible.Indicator>
      <ChevronIcon />
    </Collapsible.Indicator>
  </Collapsible.Trigger>
  <Collapsible.Content>
    <div data-scope="ai" data-part="reasoning-content">
      {@render children?.()}
    </div>
  </Collapsible.Content>
</Collapsible.Root>
