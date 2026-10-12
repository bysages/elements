import { Listbox } from ".";

const meta = { title: "Components/Forms/Listbox", component: Listbox };
export default meta;

/** The facade is the one-tag path for the common completion. */
export const Basic = {
  render: () => (
    <Listbox
      options={[
        { label: "Qinghua cobalt", value: "qinghua" },
        { label: "Celadon", value: "celadon" },
        { label: "Zhusha cinnabar", value: "zhusha" },
      ]}
      defaultValue="qinghua"
      label="Accent"
    />
  ),
};
