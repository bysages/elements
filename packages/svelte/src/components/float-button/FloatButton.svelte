<script lang="ts">
import { setContext } from "svelte";

import { FLOAT_BUTTON_KEY } from "./context";
import type { FloatButtonProps } from "./props";

let {
  open = $bindable(false),
  placement = "bottom-end",
  children,
  ...rest
}: FloatButtonProps = $props();

setContext(FLOAT_BUTTON_KEY, {
  get open() {
    return open;
  },
  toggle: () => (open = !open),
  close: () => (open = false),
});
</script>

<!-- A floating action and its fanned-out alternatives — FAB and speed
dial in one family. The Root moors the group at a page corner and holds
the openness; the Trigger flips it; each Item is a round action with
its name surfacing beside it while the group is open. The buttons are
the shared recipe (vessels here: round); this family owns only the
mooring, the fan and the fold. -->
<div
  {...rest}
  data-scope="float-button"
  data-part="root"
  data-placement={placement}
  data-state={open ? "open" : "closed"}
>
  {@render children?.()}
</div>
