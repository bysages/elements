import { Toc } from ".";

const meta = { title: "Components/Navigation/Toc" };
export default meta;

const items = [
  { value: "intro", depth: 2, label: "Introduction" },
  { value: "getting-started", depth: 2, label: "Getting Started" },
  { value: "usage", depth: 2, label: "Usage" },
];

/** A page of prose beside its rail: scroll and the active stroke follows. */
export const Basic = {
  render: () => (
    <div style={{ display: "flex", gap: "1.5rem", "align-items": "flex-start" }}>
      <div style={{ width: "12rem", flex: "none" }}>
        <Toc items={items} scrollEl={() => document.getElementById("toc-basic-content")} />
      </div>
      <Toc.Content
        id="toc-basic-content"
        style={{ height: "18rem", overflow: "auto", "padding-right": "1rem" }}
      >
        {items.map((item) => (
          <section id={item.value} style={{ "margin-bottom": "1.5rem" }}>
            <h3>{item.label}</h3>
            <p>Warm paper, ink that reads, hierarchy carried by light.</p>
          </section>
        ))}
      </Toc.Content>
    </div>
  ),
};
