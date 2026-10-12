import { Editable } from ".";

const meta = { title: "Components/Forms/Editable", component: Editable };
export default meta;

/** The facade is the one-tag path. */
export const Basic = {
  render: () => <Editable defaultValue="Hello World" label="Title" placeholder="Enter text…" />,
};
