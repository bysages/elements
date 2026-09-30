import type { Meta } from "@storybook/react-vite";

import { Toolbar } from ".";
import { Button } from "../button";

const meta: Meta = { title: "Components/Actions/Toolbar" };
export default meta;

/** The workbench rail: start tools lead, end tools trail. */
export const Basic = {
  render: () => (
    <Toolbar label="Document tools">
      <Button size="sm" variant="outline">
        Save
      </Button>
      <Button size="sm" variant="ghost">
        Preview
      </Button>
      <Button size="sm" variant="solid">
        Publish
      </Button>
    </Toolbar>
  ),
};
