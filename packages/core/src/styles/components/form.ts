export const formCss = /* css */ `
/* The form is a quiet container — fields stack in one column and the
   spacing belongs to the grid, not to each field's margins. */
[data-scope="form"][data-part="root"] {
  display: grid;
  gap: var(--bs-gap-lg);
  max-inline-size: 34rem;
}

/* The FormField's wrapper keeps the field from stretching its own
   content wider than the grid column. */
[data-form-field] {
  min-inline-size: 0;
}
`;
