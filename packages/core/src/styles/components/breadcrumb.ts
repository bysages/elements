export const breadcrumbCss = /* css */ `
/* A trail of waymarks: quiet links behind, the current page resting in
   full ink, parted by a whispered slash. Navigation, not a control —
   no boxes anywhere. */
[data-scope="breadcrumb"][data-part="list"] {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--bs-gap-sm);
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: var(--bs-font-size-sm);
}

[data-scope="breadcrumb"][data-part="item"] {
  display: inline-flex;
  align-items: center;
  gap: var(--bs-gap-sm);
}

[data-scope="breadcrumb"][data-part="link"] {
  color: var(--bs-color-text-secondary);
  text-decoration: none;
  transition: color var(--bs-duration-fast) var(--bs-ease-out);
}

[data-scope="breadcrumb"][data-part="link"]:hover {
  color: var(--bs-color-text-primary);
  text-decoration: underline;
  text-decoration-color: var(--bs-color-border-strong);
}

[data-scope="breadcrumb"][data-part="link"]:focus-visible {
  outline: none;
  color: var(--bs-color-text-primary);
  /* Inline parts take the inset ring, like menu items — it hugs the
     text without needing a radius. */
  box-shadow: var(--bs-focus-ring-inset);
}

[data-scope="breadcrumb"][data-part="current"] {
  color: var(--bs-color-text-primary);
  font-weight: var(--bs-font-weight-medium);
}

[data-scope="breadcrumb"][data-part="separator"] {
  color: var(--bs-color-text-tertiary);
  user-select: none;
}
`;
