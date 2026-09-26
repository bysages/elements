export const commentCss = /* css */ `
/* A voice on the record: the portrait hangs left, the body carries the
   byline, the ink, and the row of answers — each in its own register,
   so the thread reads at a scan. */
[data-scope="comment"][data-part="root"] {
  display: flex;
  gap: var(--bs-gap-md);
  padding-block: var(--bs-padding-sm);
}

[data-scope="comment"][data-part="avatar"] {
  display: flex;
  flex: none;
}

[data-scope="comment"][data-part="body"] {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--bs-gap-xs);
  min-inline-size: 0;
}

[data-scope="comment"][data-part="header"] {
  display: flex;
  align-items: baseline;
  gap: var(--bs-gap-sm);
}

[data-scope="comment"][data-part="author"] {
  color: var(--bs-color-text-primary);
  font-weight: var(--bs-font-weight-medium);
}

[data-scope="comment"][data-part="datetime"] {
  color: var(--bs-color-text-tertiary);
  font-size: var(--bs-font-size-xs);
}

[data-scope="comment"][data-part="content"] {
  color: var(--bs-color-text-primary);
  line-height: var(--bs-line-height-relaxed);
}

[data-scope="comment"][data-part="actions"] {
  display: flex;
  align-items: center;
  gap: var(--bs-gap-lg);
  margin-block-start: var(--bs-margin-xs);
  font-size: var(--bs-font-size-sm);
}
`;
