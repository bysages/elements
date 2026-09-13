import type { Meta } from "@storybook/react-vite";

import { DateInput } from ".";

const meta: Meta = { title: "Components/Forms/Date Input" };
export default meta;

/** Segmented typing — each part of the date is its own arrow-navigable
 * segment; the focused segment takes the ink. */
export const Basic = {
  args: {
    label: "Date of birth",
  },
  render: (args: any) => (
    <DateInput.Root>
      <DateInput.Label>{args.label}</DateInput.Label>
      <DateInput.Control>
        <DateInput.SegmentGroup>
          <DateInput.SegmentContext>
            {(segment) => <DateInput.Segment segment={segment} />}
          </DateInput.SegmentContext>
        </DateInput.SegmentGroup>
      </DateInput.Control>
      <DateInput.HiddenInput />
    </DateInput.Root>
  ),
};

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
