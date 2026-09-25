export const avatarCss = /* css */ `
[data-scope="avatar"][data-part="root"] {
  /* A seal, not a portrait frame: fixed square, cut to a full circle. It
     stands as tall as the largest control, so an avatar rides a row of
     text without stretching it — and scenes retune it for free. */
  --bs-avatar-size: var(--bs-control-height-lg);
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  inline-size: var(--bs-avatar-size);
  block-size: var(--bs-avatar-size);
  border-radius: var(--bs-radius-full);
  background: var(--bs-color-surface-inset);
  color: var(--bs-color-text-secondary);
  font-size: calc(var(--bs-font-size-sm) * 1.125);
  font-weight: var(--bs-font-weight-medium);
  letter-spacing: var(--bs-tracking-label);
  user-select: none;
  vertical-align: top;
}

[data-scope="avatar"][data-part="image"] {
  inline-size: 100%;
  block-size: 100%;
  border-radius: inherit;
  object-fit: cover;
}

/* Initials read as ink on paper: small caps, quietly tracked. */
[data-scope="avatar"][data-part="fallback"] {
  border-radius: inherit;
  line-height: 1;
  text-transform: uppercase;
  font-size: inherit;
  font-weight: inherit;
}

/* Size rungs ride the control heights: the default (large) stands as
   tall as the biggest control; the smaller rungs let a credit line or a
   dense toolbar shrink the seal without re-tuning the variable. */
[data-scope="avatar"][data-part="root"][data-size="sm"] {
  --bs-avatar-size: var(--bs-control-height-sm);
}

[data-scope="avatar"][data-part="root"][data-size="md"] {
  --bs-avatar-size: var(--bs-control-height-md);
}
`;
