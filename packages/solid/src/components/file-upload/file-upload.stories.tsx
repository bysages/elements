import { FileUpload } from ".";

const meta = { title: "Components/Forms/File Upload", component: FileUpload };
export default meta;

/** The facade is the one-tag path. */
export const Basic = {
  render: () => (
    <FileUpload label="Attachments" placeholder="Drag files here or choose" maxFiles={5} />
  ),
};
