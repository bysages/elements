import { JsonTreeView } from ".";

const meta = { title: "Components/Data/Json Tree View" };
export default meta;

/** The object as a ledger: branches fold, values read as tabular types. */
export const Basic = {
  render: () => <JsonTreeView data={{ title: "Paper & Ink", tags: ["paper", "ink"] }} />,
};
