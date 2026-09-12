import type { Meta } from "@storybook/react-vite";

import { DateInput } from "./index.js";

const meta: Meta = { title: "Components / Date Input" };
export default meta;

/** Segmented typing — each part of the date is its own arrow-navigable
 * segment; the focused segment takes the ink. */
export function Basic() {
  return (
    <DateInput.Root>
      <DateInput.Label>Date of birth</DateInput.Label>
      <DateInput.Control>
        <DateInput.SegmentGroup>
          <DateInput.SegmentContext>
            {(segment) => <DateInput.Segment segment={segment} />}
          </DateInput.SegmentContext>
        </DateInput.SegmentGroup>
      </DateInput.Control>
      <DateInput.HiddenInput />
    </DateInput.Root>
  );
}

/** Time-only granularity — the same field, hours to seconds. */
export function TimeOnly() {
  return (
    <DateInput.Root granularity="second">
      <DateInput.Label>Departure time</DateInput.Label>
      <DateInput.Control>
        <DateInput.SegmentGroup>
          <DateInput.SegmentContext>
            {(segment) => <DateInput.Segment segment={segment} />}
          </DateInput.SegmentContext>
        </DateInput.SegmentGroup>
      </DateInput.Control>
      <DateInput.HiddenInput />
    </DateInput.Root>
  );
}
