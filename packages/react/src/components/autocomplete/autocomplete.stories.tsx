import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { AutoComplete } from ".";

const meta: Meta = { title: "Components/Forms/Autocomplete" };
export default meta;

const PROVINCES = [
  "Anhui",
  "Fujian",
  "Gansu",
  "Guangdong",
  "Guizhou",
  "Hainan",
  "Hebei",
  "Jiangsu",
  "Shandong",
  "Sichuan",
  "Yunnan",
  "Zhejiang",
];

/** Type freely — the list narrows; picking or not, the text is the
 * value. */
export const Basic = {
  render: () => {
    const [text, setText] = useState("");
    return (
      <>
        <AutoComplete
          value={text}
          onValueChange={setText}
          items={PROVINCES}
          placeholder="Province, or anything else"
          style={{ maxWidth: "18rem" }}
        />
        <p style={{ fontSize: "var(--bs-font-size-sm)", color: "var(--bs-color-text-tertiary)" }}>
          value: {JSON.stringify(text)}
        </p>
      </>
    );
  },
};

/** A custom matcher: here, a prefix match instead of the default
 * substring. */
export const PrefixFilter = {
  render: () => {
    const [text, setText] = useState("");
    return (
      <AutoComplete
        value={text}
        onValueChange={setText}
        items={PROVINCES}
        filter={(item, input) => item.toLowerCase().startsWith(input.toLowerCase())}
        placeholder="Type a prefix…"
        style={{ maxWidth: "18rem" }}
      />
    );
  },
};
