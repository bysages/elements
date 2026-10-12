import { TagsInput } from ".";

const meta = { title: "Components/Forms/Tags Input", component: TagsInput };
export default meta;

/** The facade is the one-tag path. */
export const Basic = {
  render: () => (
    <TagsInput defaultValue={["Qinghua", "Celadon"]} label="Pigments" placeholder="Add pigment" />
  ),
};
