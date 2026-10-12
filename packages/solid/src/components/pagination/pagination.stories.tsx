import { Pagination } from ".";

const meta = { title: "Components/Navigation/Pagination", component: Pagination };
export default meta;

/** Simple trades the ladder for prev, the count, and next. */
export const Simple = {
  render: () => <Pagination count={120} pageSize={10} defaultValue={4} variant="simple" />,
};
