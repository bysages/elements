import { createSignal } from "solid-js";

import { AutoComplete } from ".";

const meta = {
  title: "Components/Forms/Autocomplete",
  component: AutoComplete,
};
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

/** Type freely — the list narrows; picking or not, the text is the value. */
export const Basic = {
  render: () => {
    const [text, setText] = createSignal("");

    return (
      <div style={{ display: "grid", gap: "0.5rem", "justify-items": "start" }}>
        <AutoComplete
          value={text()}
          onValueChange={setText}
          items={PROVINCES}
          placeholder="Province, or anything else"
        />
        <p
          style={{
            margin: "0",
            "font-size": "var(--bs-font-size-sm)",
            color: "var(--bs-color-text-tertiary)",
          }}
        >
          value: {JSON.stringify(text())}
        </p>
      </div>
    );
  },
};
