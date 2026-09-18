import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { RatingGroup } from ".";
import { Field } from "../field";

const meta: Meta = { title: "Components/Forms/Rating Group" };
export default meta;

const star = () => (
  <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor" aria-hidden="true">
    <path d="M12 2.5l2.9 6.1 6.7.9-4.9 4.6 1.2 6.6-5.9-3.2-5.9 3.2 1.2-6.6L2.4 9.5l6.7-.9z" />
  </svg>
);

/** A row of stars driven by the machine: label, control, hidden input
 * for forms. */
function scale(rootProps: any, label: string) {
  return (
    <RatingGroup.Root {...rootProps}>
      <RatingGroup.Label>{label}</RatingGroup.Label>
      <RatingGroup.Control>
        <RatingGroup.Context>
          {({ items }: { items: number[] }) =>
            items.map((item) => (
              <RatingGroup.Item key={item} index={item}>
                {star()}
              </RatingGroup.Item>
            ))
          }
        </RatingGroup.Context>
        <RatingGroup.HiddenInput />
      </RatingGroup.Control>
    </RatingGroup.Root>
  );
}

export const Basic = {
  args: {
    label: "Rating",
    count: 5,
    disabled: false,
  },
  render: (args: any) =>
    scale({ defaultValue: 3, count: args.count, disabled: args.disabled }, args.label),
};

/** Half measures count: the star under the pointer fills by its left
 * half. */
export const HalfStar = {
  render: () => scale({ defaultValue: 2.5, allowHalf: true } as any, "Precision"),
};

/** The whole scale rests: clicks pass through, nothing lights up. */
export const Disabled = {
  render: () => scale({ defaultValue: 3, disabled: true } as any, "Frozen"),
};

/** A taller ladder: ten rungs for fine-grained judgements. */
export const Count = {
  render: () => scale({ defaultValue: 7, count: 10 }, "Ten rungs"),
};

/** The value answers to the caller — the stars only mirror. */
export const Controlled = {
  render: () => {
    const [value, setValue] = useState(0);
    return (
      <div style={{ display: "grid", gap: "0.5rem", justifyItems: "start" }}>
        <RatingGroup.Root
          count={5}
          value={value}
          onValueChange={(e: { value: number }) => setValue(e.value)}
        >
          <RatingGroup.Label>Controlled</RatingGroup.Label>
          <RatingGroup.Control>
            <RatingGroup.Context>
              {({ items }: { items: number[] }) =>
                items.map((item) => (
                  <RatingGroup.Item key={item} index={item}>
                    {star()}
                  </RatingGroup.Item>
                ))
              }
            </RatingGroup.Context>
            <RatingGroup.HiddenInput />
          </RatingGroup.Control>
        </RatingGroup.Root>
        <p style={{ margin: 0, fontSize: "var(--bs-font-size-sm)" }}>Value: {value}</p>
      </div>
    );
  },
};

/** A rating inside a field: helper text rides along. */
export const WithField = {
  render: () => (
    <Field.Root>
      {scale({ defaultValue: 4 }, "Satisfaction")}
      <Field.HelperText>Five stars is the ceiling; honesty is welcome below it.</Field.HelperText>
    </Field.Root>
  ),
};
