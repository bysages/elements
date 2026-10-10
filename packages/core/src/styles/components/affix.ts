export const affixCss = /* css */ `
/* The nail draws nothing of its own: it is one sticky instruction on a
   carrier the caller sizes and surfaces. */
[data-scope="affix"][data-part="root"] {
  position: sticky;
  top: var(--bs-affix-top, 0px);
  bottom: var(--bs-affix-bottom, auto);
}
`;
