export const checkboxGroupCss = /* css */ `
/* The group stacks its seals by default; the horizontal layout keeps the
   natural reading order and wraps when the container narrows. */
[data-scope="checkbox-group"][data-part="root"] {
  display: grid;
  gap: var(--bs-space-3);
  max-inline-size: 20rem;
}

[data-scope="checkbox-group"][data-part="root"][data-layout="horizontal"] {
  display: flex;
  flex-wrap: wrap;
  gap: var(--bs-space-2) var(--bs-space-4);
  max-inline-size: none;
}
`;
