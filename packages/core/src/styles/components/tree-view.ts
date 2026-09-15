import { labelCss } from "./shared";

export const treeViewCss =
  labelCss("tree-view") +
  /* css */ `
[data-scope="tree-view"][data-part="root"] {
  /* The indent system: depth comes from the machine as --depth per node;
     every offset below derives from these three knobs. */
  --bs-tree-indent: 1rem;
  --bs-tree-icon: 1rem;
  --bs-tree-row-block: var(--bs-space-2);
  display: flex;
  flex-direction: column;
  gap: var(--bs-space-2);
}

[data-scope="tree-view"][data-part="tree"] {
  display: flex;
  flex-direction: column;
  color: var(--bs-color-text-primary);
  font-size: var(--bs-font-size-sm);
}

/* Rows are quiet: no hairlines, no shadows — selection and hover are pure
   light on the paper. */
[data-scope="tree-view"][data-part="branch-control"],
[data-scope="tree-view"][data-part="item"] {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--bs-space-2);
  /* No page reset may be assumed: 100% must count the row's own padding. */
  box-sizing: border-box;
  inline-size: 100%;
  padding-block: var(--bs-tree-row-block);
  padding-inline-end: var(--bs-padding-md);
  border: none;
  border-radius: var(--bs-radius-sm);
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: start;
  cursor: pointer;
  user-select: none;
  --bs-tree-depth: calc(var(--depth, 1) - 1);
  --bs-tree-offset: calc(
    var(--bs-tree-indent) * var(--bs-tree-depth) + var(--bs-tree-icon) * 0.5 * var(--depth, 1)
  );
  padding-inline-start: calc(var(--bs-tree-offset) + var(--bs-padding-md));
  transition: background-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="tree-view"][data-part="tree"] svg {
  inline-size: var(--bs-tree-icon);
  block-size: var(--bs-tree-icon);
  flex-shrink: 0;
}

[data-scope="tree-view"][data-part="branch-control"]:hover:not([data-disabled]),
[data-scope="tree-view"][data-part="item"]:hover:not([data-disabled]) {
  background: var(--bs-color-surface-0);
}

[data-scope="tree-view"][data-part="branch-control"]:focus-visible,
[data-scope="tree-view"][data-part="item"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring-inset);
}

[data-scope="tree-view"][data-part="branch-control"][data-selected],
[data-scope="tree-view"][data-part="item"][data-selected] {
  background: var(--bs-color-primary-subtle);
  color: var(--bs-color-primary-subtle-text);
}

[data-scope="tree-view"][data-part="branch-control"][data-disabled],
[data-scope="tree-view"][data-part="item"][data-disabled] {
  color: var(--bs-color-text-disabled);
  cursor: not-allowed;
}

[data-scope="tree-view"][data-part="branch-trigger"] {
  display: inline-flex;
  align-items: center;
}

[data-scope="tree-view"][data-part="branch-text"],
[data-scope="tree-view"][data-part="item-text"] {
  flex: 1;
  display: inline-flex;
  align-items: center;
  gap: var(--bs-space-2);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* The chevron swings open on the spring — puppets have strings. */
[data-scope="tree-view"][data-part="branch-indicator"] {
  display: inline-flex;
  align-items: center;
  color: var(--bs-color-text-tertiary);
  transform-origin: center;
  transition: transform 200ms var(--bs-ease-spring);
}

[data-scope="tree-view"][data-part="branch-indicator"][data-state="open"] {
  transform: rotate(90deg);
}

[data-scope="tree-view"][data-part="item-indicator"] {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  color: var(--bs-color-primary);
}

/* Expansion animates height from the machine's measured --height; both
   keyframes fade so the branch dissolves rather than snaps. */
[data-scope="tree-view"][data-part="branch-content"] {
  position: relative;
}

[data-scope="tree-view"][data-part="branch-content"][data-state="open"] {
  animation:
    bs-tree-expand var(--bs-duration-base) var(--bs-ease-out),
    bs-tree-fade-in var(--bs-duration-base) var(--bs-ease-out);
}

[data-scope="tree-view"][data-part="branch-content"][data-state="closed"] {
  animation:
    bs-tree-collapse var(--bs-duration-base) var(--bs-ease-out),
    bs-tree-fade-out var(--bs-duration-base) var(--bs-ease-out);
}

/* The plumb line of the hierarchy — one hairline per depth. */
[data-scope="tree-view"][data-part="branch-indent-guide"] {
  position: absolute;
  inset-block: 0;
  inline-size: 1px;
  background: var(--bs-color-border);
  z-index: 1;
  --bs-tree-depth: calc(var(--depth, 1) - 1);
  --bs-tree-offset: calc(
    var(--bs-tree-indent) * var(--bs-tree-depth) + var(--bs-tree-icon) * 0.5 * var(--depth, 1)
  );
  inset-inline-start: calc(var(--bs-tree-offset) + var(--bs-padding-md));
}

[data-scope="tree-view"][data-part="node-checkbox"] {
  inline-size: 1rem;
  block-size: 1rem;
  appearance: none;
  margin: 0;
  border: 1px solid var(--bs-color-border-strong);
  border-radius: var(--bs-radius-xs);
  background: var(--bs-color-surface-2);
  cursor: pointer;
  transition: background-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="tree-view"][data-part="node-checkbox"]:hover:not([data-disabled]) {
  border-color: var(--bs-color-border-strong);
}

[data-scope="tree-view"][data-part="node-checkbox"]:focus-visible {
  outline: none;
  box-shadow: var(--bs-focus-ring);
}

[data-scope="tree-view"][data-part="node-checkbox"][data-state="checked"],
[data-scope="tree-view"][data-part="node-checkbox"]:indeterminate {
  border-color: var(--bs-color-primary);
  background: var(--bs-color-primary);
}

[data-scope="tree-view"][data-part="node-checkbox"][data-disabled] {
  background: var(--bs-color-surface-inset);
  border-color: var(--bs-color-border);
  cursor: not-allowed;
}

[data-scope="tree-view"][data-part="node-rename-input"] {
  box-sizing: border-box;
  block-size: var(--bs-control-height-sm);
  padding: 0 var(--bs-space-2);
  border: 1px solid var(--bs-color-primary);
  border-radius: var(--bs-radius-sm);
  background: var(--bs-color-surface-2);
  color: var(--bs-color-text-primary);
  font: inherit;
  font-size: var(--bs-font-size-sm);
  outline: none;
  box-shadow: var(--bs-focus-ring);
}

@keyframes bs-tree-expand {
  from {
    height: var(--collapsed-height, 0);
  }
  to {
    height: var(--height);
  }
}

@keyframes bs-tree-collapse {
  from {
    height: var(--height);
  }
  to {
    height: var(--collapsed-height, 0);
  }
}

@keyframes bs-tree-fade-in {
  from {
    opacity: 0;
  }
}

@keyframes bs-tree-fade-out {
  to {
    opacity: 0;
  }
}
`;
