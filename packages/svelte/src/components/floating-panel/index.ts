import { FloatingPanel as ArkFloatingPanel } from "@ark-ui/svelte/floating-panel";

import { defineFamily } from "../../internal/family";
import FloatingPanelFacade from "./FloatingPanel.svelte";
import FloatingPanelRoot from "./FloatingPanelRoot.svelte";

/** Ark's FloatingPanel, dressed in the paper-and-ink system: the shared
 * popup vessel let loose — a draggable, resizable sheet whose header is the
 * handle. The API is Ark's own — Root, Trigger, Positioner, Content, Header,
 * Title, Control, DragTrigger, StageTrigger, CloseTrigger, ResizeTrigger,
 * Body. */
export const FloatingPanel: typeof FloatingPanelFacade &
  Omit<typeof ArkFloatingPanel, "Root"> & {
    Root: typeof FloatingPanelRoot;
  } = defineFamily(FloatingPanelFacade, {
  ...ArkFloatingPanel,
  Root: FloatingPanelRoot,
});
