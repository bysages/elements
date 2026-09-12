import type { Meta } from "@storybook/vue3-vite";
import { h, reactive } from "vue";

import { Field } from "../field/index.js";
import { withState } from "../with-state.js";
import { RatingGroup } from "./index.js";

const meta: Meta = { title: "Components / Rating Group" };
export default meta;

const star = () =>
  h(
    "svg",
    { viewBox: "0 0 24 24", width: 16, height: 16, fill: "currentColor", "aria-hidden": "true" },
    [
      h("path", {
        d: "M12 2.5l2.9 6.1 6.7.9-4.9 4.6 1.2 6.6-5.9-3.2-5.9 3.2 1.2-6.6L2.4 9.5l6.7-.9z",
      }),
    ],
  );

/** A row of stars driven by the machine: label, control, hidden input
 * for forms. */
function scale(rootProps: any, label: string) {
  return h(RatingGroup.Root, rootProps, () => [
    h(RatingGroup.Label, () => label),
    h(RatingGroup.Control, () => [
      h(RatingGroup.Context, null, {
        default: ({ items }: { items: number[] }) =>
          items.map((item) =>
            h(RatingGroup.Item, { key: item, index: item }, { default: () => star() }),
          ),
      }),
      h(RatingGroup.HiddenInput),
    ]),
  ]);
}

export const Basic = {
  render: () => scale({ defaultValue: 3, count: 5 }, "Rating"),
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
  render: () =>
    withState(() => {
      const state = reactive({ value: 0 });
      return () =>
        h("div", { style: { display: "grid", gap: "0.5rem", justifyItems: "start" } }, [
          h(
            RatingGroup.Root,
            {
              count: 5,
              modelValue: state.value,
              onValueChange: (e: { value: number }) => (state.value = e.value),
            } as any,
            () => [
              h(RatingGroup.Label, () => "Controlled"),
              h(RatingGroup.Control, () => [
                h(RatingGroup.Context, null, {
                  default: ({ items }: { items: number[] }) =>
                    items.map((item) =>
                      h(RatingGroup.Item, { key: item, index: item }, { default: () => star() }),
                    ),
                }),
                h(RatingGroup.HiddenInput),
              ]),
            ],
          ),
          h(
            "p",
            { style: { margin: 0, fontSize: "var(--bs-font-size-sm)" } },
            () => `Value: ${state.value}`,
          ),
        ]);
    }),
};

/** A rating inside a field: helper text rides along. */
export const WithField = {
  render: () =>
    h(Field.Root, () => [
      scale({ defaultValue: 4 }, "Satisfaction"),
      h(Field.HelperText, () => "Five stars is the ceiling; honesty is welcome below it."),
    ]),
};
