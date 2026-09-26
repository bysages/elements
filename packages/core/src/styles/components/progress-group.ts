export const progressGroupCss = /* css */ `
/* One bar, several verdicts: the track lays the segments shoulder to
   shoulder, each speaking its own pigment (the badge's --_pigment
   mode), and the legend reads them back beneath. */
[data-scope="progress-group"][data-part="root"] {
  display: flex;
  flex-direction: column;
  gap: var(--bs-gap-sm);
  inline-size: 100%;
  font-size: var(--bs-font-size-sm);
}

[data-scope="progress-group"][data-part="track"] {
  display: flex;
  overflow: hidden;
  block-size: var(--bs-space-2);
  border-radius: var(--bs-radius-xs);
  background: var(--bs-color-surface-inset);
}

:is([data-scope="progress-group"][data-part="segment"], [data-scope="progress-group"][data-part="legend-item"]) {
  --_pigment: var(--bs-color-primary);
}

:is([data-scope="progress-group"][data-part="segment"], [data-scope="progress-group"][data-part="legend-item"])[data-pigment="success"] {
  --_pigment: var(--bs-color-success);
}

:is([data-scope="progress-group"][data-part="segment"], [data-scope="progress-group"][data-part="legend-item"])[data-pigment="warning"] {
  --_pigment: var(--bs-color-warning);
}

:is([data-scope="progress-group"][data-part="segment"], [data-scope="progress-group"][data-part="legend-item"])[data-pigment="danger"] {
  --_pigment: var(--bs-color-danger);
}

:is([data-scope="progress-group"][data-part="segment"], [data-scope="progress-group"][data-part="legend-item"])[data-pigment="info"] {
  --_pigment: var(--bs-color-info);
}

[data-scope="progress-group"][data-part="segment"] {
  overflow: hidden;
  background: var(--_pigment);
  /* The fill flows at the measure's pace — width trails the data like
     the single bar's does. The track's rounded mask rounds the ends;
     the segments themselves stay square so the bar reads as one. */
  transition: inline-size var(--bs-duration-slow) var(--bs-ease-out);
}

[data-scope="progress-group"][data-part="legend"] {
  display: flex;
  flex-wrap: wrap;
  gap: var(--bs-gap-sm) var(--bs-gap-md);
  color: var(--bs-color-text-secondary);
}

[data-scope="progress-group"][data-part="legend-item"] {
  display: inline-flex;
  align-items: center;
  gap: var(--bs-gap-sm);
}

[data-scope="progress-group"][data-part="swatch"] {
  flex: none;
  inline-size: var(--bs-space-2);
  block-size: var(--bs-space-2);
  border-radius: var(--bs-radius-xs);
  background: var(--_pigment);
}

[data-scope="progress-group"][data-part="legend-value"] {
  color: var(--bs-color-text-primary);
  font-variant-numeric: tabular-nums;
}
`;
