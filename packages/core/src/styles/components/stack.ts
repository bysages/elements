export const stackCss = /* css */ `
/* The spacing primitive: the wrapper points --bs-stack-gap at a step of
   the space ramp, and the flex gap carries it — the distance is one
   named token, never an ad-hoc margin between siblings. */
[data-scope="stack"][data-part="root"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-stack-gap, var(--bs-gap-md));
  align-items: var(--bs-stack-align, normal);
  justify-content: var(--bs-stack-justify, normal);
  flex-wrap: var(--bs-stack-wrap, nowrap);
}

[data-scope="stack"][data-part="root"][data-direction="row"] {
  flex-direction: row;
}

/* A column stretches its children to the measure — vessels and fields
   want the fill. The control register hugs its content instead: a
   button or a seal pulled across the column reads as broken. */
[data-scope="stack"][data-part="root"][data-direction="column"] > [data-scope="avatar"][data-part="root"],
[data-scope="stack"][data-part="root"][data-direction="column"] > [data-scope="badge"][data-part="root"],
[data-scope="stack"][data-part="root"][data-direction="column"] > [data-scope="button"][data-part="root"],
[data-scope="stack"][data-part="root"][data-direction="column"] > [data-scope="checkbox"][data-part="root"],
[data-scope="stack"][data-part="root"][data-direction="column"] > [data-scope="spinner"][data-part="root"],
[data-scope="stack"][data-part="root"][data-direction="column"] > [data-scope="switch"][data-part="root"] {
  align-self: flex-start;
}
`;
