import type { Meta } from "@storybook/react-vite";

import { VirtualList } from ".";

const meta: Meta = { title: "Components/Data/Virtual List" };
export default meta;

const MANY = Array.from({ length: 10000 }, (_, index) => `Row ${index + 1}`);

/** Ten thousand rows on stage: the DOM holds only the window the
 * viewport can see — scroll, and the window slides. */
export const Basic = {
  render: () => (
    <VirtualList
      items={MANY}
      itemHeight={36}
      height={288}
      renderItem={(item, index) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            blockSize: "100%",
            paddingInline: "var(--bs-padding-md)",
            borderBottom: "1px solid var(--bs-color-border)",
            fontSize: "var(--bs-font-size-sm)",
            color: index % 2 ? "var(--bs-color-text-secondary)" : "var(--bs-color-text-primary)",
          }}
        >
          {String(item)}
        </div>
      )}
    />
  ),
};
