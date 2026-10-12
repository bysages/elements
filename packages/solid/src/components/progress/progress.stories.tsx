import { Progress } from ".";

const meta = { title: "Components/Feedback/Progress", component: Progress };
export default meta;

/** The labelled linear groove behind one value. */
export const Basic = {
  render: () => <Progress defaultValue={42} label="Copying the archive" />,
};

/** The three-quarter dial for compact status. */
export const Dashboard = {
  render: () => <Progress defaultValue={68} label="Preparing the ledger" variant="dashboard" />,
};
