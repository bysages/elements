import { createSignal } from "solid-js";

import { SplitButton, type SplitButtonEntry } from ".";

const meta = { title: "Components/Actions/Split Button", component: SplitButton };
export default meta;

const items: SplitButtonEntry[] = [
  { label: "Save as…", value: "save-as" },
  { label: "Export…", value: "export" },
  { label: "Delete draft", value: "delete", danger: true },
];

/** The main button fires, the fitted arrow opens the alternatives;
 * danger rows tint in the vessel like the menu family's. */
export const Basic = {
  render: () => {
    const [status, setStatus] = createSignal("Nothing chosen yet.");

    return (
      <>
        <SplitButton
          label="Save"
          items={items}
          onClick={() => setStatus("Saved.")}
          onSelect={(value) => setStatus(`Chose ${value}`)}
        />
        <p
          role="status"
          style={{
            "margin-block-start": "var(--bs-space-4)",
            "font-size": "var(--bs-font-size-sm)",
            color: "var(--bs-color-text-tertiary)",
          }}
        >
          {status()}
        </p>
      </>
    );
  },
};

/** Both halves keep one register: the outline variant draws the hairline
 * across the seam too. */
export const Outline = {
  render: () => {
    const [status, setStatus] = createSignal("Nothing chosen yet.");

    return (
      <>
        <SplitButton
          label="Export"
          variant="outline"
          size="sm"
          items={[
            { label: "Export as PDF", value: "pdf" },
            { label: "Export as CSV", value: "csv" },
            { label: "Export as JSON", value: "json" },
          ]}
          onClick={() => setStatus("Exported.")}
          onSelect={(value) => setStatus(`Chose ${value}`)}
        />
        <p
          role="status"
          style={{
            "margin-block-start": "var(--bs-space-4)",
            "font-size": "var(--bs-font-size-sm)",
            color: "var(--bs-color-text-tertiary)",
          }}
        >
          {status()}
        </p>
      </>
    );
  },
};
