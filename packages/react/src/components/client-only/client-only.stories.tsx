import type { Meta } from "@storybook/react-vite";

import { ClientOnly } from ".";

const meta: Meta = { title: "Components/Elements/ClientOnly" };
export default meta;

/** Children mount after hydration — the escape hatch for browser-only
 * widgets inside server-rendered pages. */
export const Basic = {
  render: () => (
    <ClientOnly>
      <p style={{ margin: 0, fontSize: "0.875rem" }}>This sentence exists only on the client.</p>
    </ClientOnly>
  ),
};
