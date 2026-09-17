export const stackCss = /* css */ `
/* The spacing primitive: the wrapper points --bs-stack-gap at a step of
   the space ramp, and the flex gap carries it — the distance is one
   named token, never an ad-hoc margin between siblings. */
[data-scope="stack"][data-part="root"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-stack-gap, var(--bs-space-3));
}

[data-scope="stack"][data-part="root"][data-direction="row"] {
  flex-direction: row;
}
`;
