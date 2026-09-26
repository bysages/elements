export const workflowCss = /* css */ `
[data-scope="workflow"][data-part="canvas"] {
  position: relative;
  inline-size: 100%;
  block-size: 100%;
  overflow: hidden;
  background-color: var(--bs-color-surface-1);
  background-image: radial-gradient(var(--bs-color-border) 1px, transparent 1px);
  background-size: var(--bs-space-4) var(--bs-space-4);
  background-position: calc(var(--bs-space-2) * -1) calc(var(--bs-space-2) * -1);
  border-radius: var(--bs-radius-lg);
  container-type: inline-size;
}

/* The node host fills the cell's bounding box; the inward padding keeps
 * the handles (centered on the box edge) clear of the card. The handle
 * size is the adapter's geometry — it arrives as a variable so this
 * padding can never drift away from it. */
[data-scope="workflow"][data-part="node"] {
  box-sizing: border-box;
  inline-size: 100%;
  block-size: 100%;
  padding: var(--bs-workflow-handle, var(--bs-padding-md));
}

/* The vessel: round, resting on paper, one hairline. State rules below
 * intentionally win over hover — a running node keeps its pigment. */
[data-scope="workflow"][data-part="node"] > .workflow-node-card {
  inline-size: 100%;
  min-block-size: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--bs-gap-sm);
  padding: var(--bs-padding-sm) var(--bs-padding-md);
  background: var(--bs-color-surface-2);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-lg);
  box-shadow: var(--bs-shadow-xs);
  font-family: var(--bs-font-sans);
  font-size: var(--bs-font-size-sm);
  color: var(--bs-color-text-primary);
  transition:
    border-color var(--bs-duration-fast) var(--bs-ease-out),
    box-shadow var(--bs-duration-base) var(--bs-ease-out);
}

[data-scope="workflow"][data-part="node"] > .workflow-node-card:hover {
  border-color: var(--bs-color-border-strong);
}

/* Selected rides primary, and the running/success/error states win
 * over it — a node mid-flight keeps its pigment. The selected rule
 * must also out-rank hover (same specificity, later in the sheet).
 * The x6-*-selected classes are X6's own stamp on the selected views. */
[data-scope="workflow"] .x6-node-selected .workflow-node-card,
[data-scope="workflow"] .x6-node-selected .workflow-node-card:hover {
  border-color: var(--bs-color-primary);
  box-shadow: var(--bs-shadow-xs), 0 0 0 1px var(--bs-color-primary-subtle);
}

/* The seal: a square-cut handle. Geometry rides the SVG attributes; the
 * pigments ride the tokens. The cut is a true right angle at every scene
 * — a seal is square whatever radius the vessels wear. */
[data-scope="workflow"] [data-part="handle"] {
  fill: var(--bs-color-surface-2);
  stroke: var(--bs-color-border-strong);
  stroke-width: 1;
  rx: 0;
  ry: 0;
  cursor: crosshair;
  transition: stroke var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="workflow"] [data-part="handle"][data-dir="in"] {
  fill: var(--bs-color-surface-3);
}

[data-scope="workflow"] [data-part="handle"]:hover {
  stroke: var(--bs-color-primary);
}

/* The ink line. The arrowhead inherits the stroke through
 * context-stroke, so one class carries every state. */
[data-scope="workflow"] .workflow-edge-line {
  fill: none;
  stroke: var(--bs-color-border-strong);
  stroke-width: 2;
  stroke-linecap: round;
  transition: stroke var(--bs-duration-base) var(--bs-ease-out);
}

/* The :hover twins match the plain hover rule's specificity, so the
 * state pigment wins the cascade at the same (0,4,0) rank by order —
 * hovering a mid-flight node never repaints it back to a hairline. */
[data-scope="workflow"] .workflow-node-card[data-state="running"],
[data-scope="workflow"] .workflow-node-card[data-state="running"]:hover {
  border-color: var(--bs-color-primary);
  animation: workflow-breathe var(--bs-duration-slow) var(--bs-ease-in-out) infinite alternate;
}

[data-scope="workflow"] .workflow-node-card[data-state="success"],
[data-scope="workflow"] .workflow-node-card[data-state="success"]:hover {
  border-color: var(--bs-color-success);
}

[data-scope="workflow"] .workflow-node-card[data-state="error"],
[data-scope="workflow"] .workflow-node-card[data-state="error"]:hover {
  border-color: var(--bs-color-danger);
}

[data-scope="workflow"] .x6-edge-selected .workflow-edge-line {
  stroke: var(--bs-color-primary);
}

[data-scope="workflow"] .workflow-edge-line[data-state="running"] {
  stroke: var(--bs-color-primary);
  stroke-dasharray: 6 4;
  animation: workflow-flow var(--bs-duration-slow) linear infinite;
}

[data-scope="workflow"] .workflow-edge-line[data-state="success"] {
  stroke: var(--bs-color-success);
}

[data-scope="workflow"] .workflow-edge-line[data-state="error"] {
  stroke: var(--bs-color-danger);
}

@keyframes workflow-breathe {
  from {
    box-shadow: var(--bs-shadow-xs);
  }
  to {
    box-shadow: 0 0 0 var(--bs-space-2) var(--bs-color-primary-subtle);
  }
}

@keyframes workflow-flow {
  to {
    stroke-dashoffset: -10;
  }
}

/* X6's selection widgets rest inside the canvas — retint them from the
 * hard-coded defaults to the paper-and-ink pigments. */
[data-scope="workflow"] .x6-widget-selection-box {
  border: 1px dashed var(--bs-color-primary);
  box-shadow: none;
}

[data-scope="workflow"] .x6-widget-selection-rubberband {
  background-color: var(--bs-color-primary-subtle);
  border: 1px solid var(--bs-color-primary);
}

/* The minimap lives outside the canvas container (the host hands us its
 * box), so it carries its own part on the container. */
[data-scope="workflow"][data-part="minimap"] .x6-widget-minimap {
  background-color: var(--bs-color-surface-1);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-md);
}

[data-scope="workflow"][data-part="minimap"] .x6-widget-minimap-viewport {
  border: 1px solid var(--bs-color-primary);
  background-color: color-mix(in oklab, var(--bs-color-primary) 12%, transparent);
}

@media (prefers-reduced-motion: reduce) {
  [data-scope="workflow"] .workflow-node-card,
  [data-scope="workflow"] .workflow-edge-line {
    animation: none;
  }
}
`;
