export const checkboxGroupCss = /* css */ `
/* The group stacks its seals by default; the horizontal layout keeps the
   natural reading order and wraps when the container narrows. */
[data-scope="checkbox-group"][data-part="root"] {
  display: grid;
  gap: var(--bs-gap-md);
  max-inline-size: 20rem;
}

[data-scope="checkbox-group"][data-part="root"][data-layout="horizontal"] {
  display: flex;
  flex-wrap: wrap;
  gap: var(--bs-gap-sm) var(--bs-gap-lg);
  max-inline-size: none;
}
`;
