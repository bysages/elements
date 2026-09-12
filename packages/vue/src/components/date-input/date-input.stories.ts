import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { DateInput } from "./index.js";

const meta: Meta = { title: "Components / Date Input" };
export default meta;

function segments() {
  return h(DateInput.SegmentContext, null, {
    default: (segment: any) => h(DateInput.Segment, { segment }),
  });
}

/** Segmented typing — each part of the date is its own arrow-navigable
 * segment; the focused segment takes the ink. */
export const Basic = {
  render: () =>
    h(DateInput.Root, () => [
      h(DateInput.Label, () => "Date of birth"),
      h(DateInput.Control, () => h(DateInput.SegmentGroup, () => segments())),
      h(DateInput.HiddenInput),
    ]),
};

/** Time-only granularity — the same field, hours to seconds. */
export const TimeOnly = {
  render: () =>
    h(DateInput.Root, { granularity: "second" }, () => [
      h(DateInput.Label, () => "Departure time"),
      h(DateInput.Control, () => h(DateInput.SegmentGroup, () => segments())),
      h(DateInput.HiddenInput),
    ]),
};
