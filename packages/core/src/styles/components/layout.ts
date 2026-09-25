export const layoutCss = /* css */ `
/* The application skeleton: a full-height grid that holds the header on
   top, the footer at the foot, and the flow between them. When a sider
   is declared a fixed rail joins the columns; the minmax(0, 1fr) — not
   a bare 1fr — keeps a wide child from stretching its track and
   shoving every sibling aside. */
[data-scope="layout"][data-part="root"] {
  display: grid;
  min-block-size: 100dvh;
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: auto minmax(0, 1fr) auto;
  grid-template-areas:
    "header"
    "content"
    "footer";
}

/* With a sider the rail owns one whole row span, so the header and the
   footer reach it only on the flow side. */
[data-scope="layout"][data-part="root"][data-sider="start"] {
  grid-template-columns: auto minmax(0, 1fr);
  grid-template-areas:
    "sider header"
    "sider content"
    "sider footer";
}

[data-scope="layout"][data-part="root"][data-sider="end"] {
  grid-template-columns: minmax(0, 1fr) auto;
  grid-template-areas:
    "header sider"
    "content sider"
    "footer sider";
}

[data-scope="layout"][data-part="header"] {
  display: flex;
  align-items: center;
  gap: var(--bs-space-3);
  grid-area: header;
  padding: var(--bs-padding-md) var(--bs-padding-xl);
  border-block-end: 1px solid var(--bs-color-border);
}

[data-scope="layout"][data-part="footer"] {
  display: flex;
  align-items: center;
  gap: var(--bs-space-3);
  grid-area: footer;
  padding: var(--bs-padding-md) var(--bs-padding-xl);
  border-block-start: 1px solid var(--bs-color-border);
}

/* The rail: its own quiet slot. Navigation is a tool the eye visits,
   not the content it rests on — the rail leans a step below the page,
   blended from ground toward inset, while vessels rise above the
   ground. The blend keeps the step perceptible but subordinated: a
   full inset rung turns the rail into the page's loudest surface. The
   inline size rides the variable the wrapper writes — a layout
   parameter, not a visual token — so the collapse animates by
   re-pointing it, and the resizable rail's floor and ceiling clamp it
   between the caller's bounds. */
[data-scope="layout"][data-part="sider"] {
  position: relative;
  grid-area: sider;
  inline-size: clamp(
    var(--bs-layout-sider-min, 12rem),
    var(--bs-layout-sider-width, 16rem),
    var(--bs-layout-sider-max, 24rem)
  );
  overflow: hidden;
  background: color-mix(in oklab, var(--bs-color-surface-0) 60%, var(--bs-color-surface-inset));
  border-inline-end: 1px solid var(--bs-color-border);
  transition: inline-size var(--bs-duration-slow) var(--bs-ease-out);
}

/* The hand leads: while dragging, the rail follows the pointer without
   the easing catching up behind it. */
[data-scope="layout"][data-part="sider"][data-dragging] {
  transition: none;
}

/* The resize hairline: a generous hit strip at the flow edge whose ink
   answers to the hand — quiet until hovered, primary while gripped or
   keyed. It stays inside the rail, whose overflow clips anything that
   pokes out — the strip and its ink both live inboard of the border. */
[data-scope="layout"][data-part="sider-resize"] {
  position: absolute;
  inset-block: 0;
  inset-inline-end: 0;
  inline-size: var(--bs-space-2);
  cursor: ew-resize;
  touch-action: none;
}

[data-scope="layout"][data-part="sider-resize"]::before {
  content: "";
  position: absolute;
  inset-block: 0;
  inset-inline-end: calc(var(--bs-space-2) / 2);
  inline-size: 1px;
  background: var(--bs-color-border);
  transition: background-color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="layout"][data-part="sider-resize"]:hover::before,
[data-scope="layout"][data-part="sider-resize"]:focus-visible::before,
[data-scope="layout"][data-part="sider-resize"][data-dragging]::before {
  background: var(--bs-color-primary);
}

[data-scope="layout"][data-part="sider-resize"]:focus-visible {
  outline: none;
}

/* An end-side rail wears its handle on the other edge, and the pull
   toward the flow points the other way — the wrapper already mirrors
   the arithmetic. */
[data-scope="layout"][data-part="root"][data-sider="end"]
  [data-scope="layout"][data-part="sider-resize"] {
  inset-inline-end: auto;
  inset-inline-start: 0;
}

[data-scope="layout"][data-part="root"][data-sider="end"]
  [data-scope="layout"][data-part="sider-resize"]::before {
  inset-inline-end: auto;
  inset-inline-start: calc(var(--bs-space-2) / 2);
}

/* The hairline always faces the flow, so an end sider wears it on its
   other edge. */
[data-scope="layout"][data-part="root"][data-sider="end"]
  [data-scope="layout"][data-part="sider"] {
  border-inline-end: none;
  border-inline-start: 1px solid var(--bs-color-border);
}

/* A resizable rail retires its own border: the resize hairline that
   rides the flow edge is the one line — the border would draw a second
   one beside it. */
[data-scope="layout"][data-part="root"][data-sider="start"]
  [data-scope="layout"][data-part="sider"][data-resizable] {
  border-inline-end: none;
}

[data-scope="layout"][data-part="root"][data-sider="end"]
  [data-scope="layout"][data-part="sider"][data-resizable] {
  border-inline-start: none;
}

[data-scope="layout"][data-part="content"] {
  grid-area: content;
  padding: var(--bs-padding-xl);
}
`;
