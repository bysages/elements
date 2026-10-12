import { createSignal } from "solid-js";

import { Transfer, type TransferItem } from ".";

const meta = { title: "Components/Data/Transfer", component: Transfer };
export default meta;

const LIBRARY: TransferItem[] = [
  { label: "The brush inventory", value: "brush" },
  { label: "Stone seals, catalogued", value: "seals" },
  { label: "Xuan paper samples", value: "xuan", disabled: true },
  { label: "Silk mounting orders", value: "silk" },
  { label: "Ink grind records", value: "ink" },
  { label: "Visitors' inscriptions", value: "visitors" },
];

/** Check on the left, cross the river to the right; the disabled item
 * stays put. */
export const Basic = {
  render: () => {
    const [picked, setPicked] = createSignal(["ink"]);

    return (
      <>
        <Transfer
          value={picked()}
          onValueChange={setPicked}
          data={LIBRARY}
          titles={["In the study", "On exhibition"]}
        />
        <p
          style={{ "font-size": "var(--bs-font-size-sm)", color: "var(--bs-color-text-tertiary)" }}
        >
          target: {JSON.stringify(picked())}
        </p>
      </>
    );
  },
};

/** Each panel gets its filter line. */
export const Searchable = {
  render: () => {
    const [picked, setPicked] = createSignal<string[]>([]);

    return (
      <Transfer
        value={picked()}
        onValueChange={setPicked}
        data={LIBRARY}
        titles={["In the study", "On exhibition"]}
        searchable
      />
    );
  },
};
