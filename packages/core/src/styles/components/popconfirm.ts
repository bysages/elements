export const popconfirmCss = /* css */ `
/* The popconfirm rides the popover vessel for its paper, hairline and
   elevation; these rules only lay out the question and its answers.
   The extra class out-specifies any part-level popover padding so the
   panel reads as one tight question, not a floating card. */
.bs-popconfirm {
  max-inline-size: 18rem;
  padding: var(--bs-padding-md);
}

.bs-popconfirm [data-part="message"] {
  margin: 0 0 var(--bs-margin-md);
  color: var(--bs-color-text-primary);
  font-size: var(--bs-font-size-sm);
  line-height: var(--bs-line-height-relaxed);
}

.bs-popconfirm [data-part="actions"] {
  display: flex;
  justify-content: flex-end;
  gap: var(--bs-gap-sm);
}
`;
