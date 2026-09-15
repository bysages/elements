<script lang="ts">
import { Collapsible } from "../collapsible";
import type { ReasoningProps } from "./props";

let { label = "Thinking", children, ...rest }: ReasoningProps = $props();
</script>

<!-- The model's thought, folded by the shared collapsible in its quiet
register: bare ink for a trigger, the thought on one hairline. -->
<Collapsible.Root {...rest} data-ai="reasoning">
  <Collapsible.Trigger>
    <span>{label}</span>
    <Collapsible.Indicator>
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M6 4l4 4-4 4"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </Collapsible.Indicator>
  </Collapsible.Trigger>
  <Collapsible.Content>
    <div data-scope="ai" data-part="reasoning-content">
      {@render children?.()}
    </div>
  </Collapsible.Content>
</Collapsible.Root>
