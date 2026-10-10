<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("float-button");

import { setContext } from "svelte";

import { FLOAT_BUTTON_KEY } from "./context";
import type { FloatButtonProps } from "./props";

let {
  open = $bindable(),
  placement = "bottom-end",
  size = "lg",
  children,
  ...rest
}: FloatButtonProps = $props();

let localOpen = $state(false);
const isOpen = $derived(open ?? localOpen);

function setOpen(value: boolean) {
  if (open !== undefined) open = value;
  else localOpen = value;
}

setContext(FLOAT_BUTTON_KEY, {
  get open() {
    return isOpen;
  },
  get size() {
    return size;
  },
  toggle: () => setOpen(!isOpen),
  close: () => setOpen(false),
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
  data-state={isOpen ? "open" : "closed"}
>
  {@render children?.()}
</div>

