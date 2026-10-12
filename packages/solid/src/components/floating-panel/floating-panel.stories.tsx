import { FloatingPanel } from ".";

const meta = {
  title: "Components/Overlay/Floating Panel",
  component: FloatingPanel,
};
export default meta;

/** The common sheet: a trigger, a movable title bar, and body copy. */
export const Basic = {
  render: () => (
    <FloatingPanel
      trigger="Open panel"
      label="Notes"
      content="A sheet of paper you can move: drag the header, pull the rim."
    />
  ),
};
