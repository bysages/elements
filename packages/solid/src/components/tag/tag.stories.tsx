import { For, createSignal } from "solid-js";

import { Tag } from ".";

const meta = { title: "Components/Elements/Tag", component: Tag };
export default meta;

/** The resting seal: a label riding the solemn ink. */
export const Basic = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", "align-items": "center" }}>
      <Tag tone="ink" variant="solid">
        Design
      </Tag>
      <Tag tone="ink" variant="solid">
        Porcelain
      </Tag>
      <Tag tone="ink" variant="solid">
        Kiln work
      </Tag>
    </div>
  ),
};

/** The seal changes pigment with its meaning. */
export const Tones = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", "flex-wrap": "wrap" }}>
      <For each={["ink", "primary", "success", "warning", "danger", "info"] as const}>
        {(tone) => (
          <Tag tone={tone} variant="subtle">
            {tone}
          </Tag>
        )}
      </For>
    </div>
  ),
};

/** How the seal rests: the flat fill, the drawn hairline, the quiet wash. */
export const Variants = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", "flex-wrap": "wrap" }}>
      <For each={["solid", "outline", "subtle"] as const}>
        {(variant) => (
          <Tag tone="primary" variant={variant}>
            {variant}
          </Tag>
        )}
      </For>
    </div>
  ),
};

/** The checkable seal presses into its solid register and holds. */
export const Checkable = {
  render: () => {
    const [states, setStates] = createSignal([true, false]);
    const setChecked = (index: number, checked: boolean) =>
      setStates(states().map((state, stateIndex) => (stateIndex === index ? checked : state)));

    return (
      <div style={{ display: "flex", gap: "0.5rem", "align-items": "center" }}>
        <Tag
          checkable
          variant="outline"
          checked={states()[0]}
          onValueChange={(checked) => setChecked(0, checked)}
        >
          Qinghua
        </Tag>
        <Tag
          checkable
          variant="outline"
          checked={states()[1]}
          onValueChange={(checked) => setChecked(1, checked)}
        >
          Celadon
        </Tag>
      </div>
    );
  },
};

/** The quiet close: removal stays the consumer's state. */
export const Closable = {
  render: () => {
    const [names, setNames] = createSignal(["Paper", "Ink", "Seal"]);
    const remove = (name: string) => setNames(names().filter((item) => item !== name));

    return (
      <div style={{ display: "flex", gap: "0.5rem", "flex-wrap": "wrap" }}>
        <For each={names()}>
          {(name) => (
            <Tag variant="subtle" closable onClose={() => remove(name)}>
              {name}
            </Tag>
          )}
        </For>
      </div>
    );
  },
};

/** A tag that cannot answer: the pressed and removable seals both rest. */
export const Disabled = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", "flex-wrap": "wrap" }}>
      <Tag checkable checked disabled>
        Archived
      </Tag>
      <Tag checkable variant="outline" disabled>
        Locked
      </Tag>
      <Tag variant="subtle" closable disabled>
        Filed
      </Tag>
    </div>
  ),
};
