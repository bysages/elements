export const virtualListCss = /* css */ `
/* The window the ledger scrolls within: a hairline vessel with the
   inset scrollbar on the paper axis. The inner spacer and rows are
   positioned inline — only the vessel carries chrome. */
[data-scope="virtual-list"][data-part="root"] {
  overflow-y: auto;
  overscroll-behavior: contain;
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-md);
  background: var(--bs-color-surface-1);
}
`;
