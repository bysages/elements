export const avatarGroupCss = /* css */ `
/* A stack of seals: each later avatar tucks under the previous one, so
   the pile reads as overlapping paper cuts rather than a merged blob. */
[data-scope="avatar-group"][data-part="root"] {
  display: flex;
  align-items: center;
}

[data-scope="avatar-group"][data-part="root"] > * + * {
  /* The overlap rides each member's own font-size, so the reveal stays
     proportional whether the avatars are 24px or 48px. */
  margin-inline-start: -0.5em;
}

/* The page-colored ring keeps each member's edge legible over its
   neighbor. */
[data-scope="avatar-group"][data-part="root"] > * {
  flex: none;
  box-shadow: 0 0 0 2px var(--bs-color-surface-1);
}
`;
