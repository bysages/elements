import { FloatingPanel as ArkFloatingPanel } from "@ark-ui/vue/floating-panel";
import { injectComponentStyle } from "@bysages/core";

/** Ark's FloatingPanel, dressed in the paper-and-ink system: the shared
 * popup vessel let loose — a draggable, resizable sheet whose header is the
 * handle. The API is Ark's own — Root, Trigger, Positioner, Content, Header,
 * Title, Control, DragTrigger, StageTrigger, CloseTrigger, ResizeTrigger,
 * Body. */
export const FloatingPanel = ArkFloatingPanel;

injectComponentStyle("floating-panel");
