import type { Meta } from "@storybook/react-vite";

import { Toolbar } from ".";
import { Button } from "../button";

const meta: Meta = { title: "Components/Actions/Toolbar" };
export default meta;

/** The workbench rail: start tools lead, end tools trail. */
export const Basic = {
  render: () => (
    <Toolbar
      label="Document tools"
      start={
        <>
          <Button size="sm" variant="outline">
            Save
          </Button>
          <Button size="sm" variant="ghost">
            Preview
          </Button>
        </>
      }
      end={
        <Button size="sm" variant="solid">
          Publish
        </Button>
      }
    />
  ),
};

/** A rail holding only what the default slot gives: everything lands at
 * the leading edge. */
export const StartOnly = {
  render: () => (
    <Toolbar label="Feather tools">
      <Button size="sm" variant="ghost">
        Bold
      </Button>
      <Button size="sm" variant="ghost">
        Italic
      </Button>
      <Button size="sm" variant="ghost">
        Underline
      </Button>
    </Toolbar>
  ),
};
