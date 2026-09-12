/** Document-level guard rules. The machines drive visibility with the
 * `hidden` attribute (select/combobox item indicators), which any author
 * `display` declaration would defeat — so the attribute wins here. */
export const baseCss = /* css */ `
[hidden] {
  display: none !important;
}
`;
