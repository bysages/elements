import { createSignal, For, Show } from "solid-js";

import { Checkbox } from ".";

const meta = { title: "Components/Forms/Checkbox", component: Checkbox };
export default meta;

function checkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="m5 12.5 5 5L19 7" />
    </svg>
  );
}

function minusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      aria-hidden="true"
    >
      <path d="M6 12h12" />
    </svg>
  );
}

function box(checked: boolean | "indeterminate", label: string, disabled = false) {
  return (
    <Checkbox.Root checked={checked} disabled={disabled}>
      <Checkbox.Control>
        <Show when={checked === "indeterminate"} fallback={checkIcon()}>
          <Checkbox.Indicator indeterminate>{minusIcon()}</Checkbox.Indicator>
        </Show>
      </Checkbox.Control>
      <Checkbox.Label>{label}</Checkbox.Label>
      <Checkbox.HiddenInput />
    </Checkbox.Root>
  );
}

/** The facade is the one-tag path; complex composition stays on the anatomy. */
export const Basic = {
  render: () => (
    <div style={{ display: "grid", gap: "0.75rem", "max-width": "20rem" }}>
      <Checkbox defaultValue={true} label="Ship the register" />
      <Checkbox label="Outline the story" />
      <Checkbox label="Archived" disabled />
    </div>
  ),
};

/** The anatomy is the composition path: Ark's parts stay available when the facade is not enough. */
export const Anatomy = {
  render: () => (
    <div style={{ display: "grid", gap: "0.75rem", "max-width": "20rem" }}>
      {box(true, "Ship the register")}
      {box(false, "Outline the story")}
      {box(false, "Archived", true)}
    </div>
  ),
};

/** The state answers to the caller: the box only mirrors. */
export const Controlled = {
  render: () => {
    const [checked, setChecked] = createSignal(true);
    return (
      <Checkbox.Root checked={checked()} onCheckedChange={setChecked}>
        <Checkbox.Control>
          <Checkbox.Indicator>{checkIcon()}</Checkbox.Indicator>
        </Checkbox.Control>
        <Checkbox.Label>Controlled</Checkbox.Label>
        <Checkbox.HiddenInput />
      </Checkbox.Root>
    );
  },
};

/** The dash posture: some, not all, of the rows below are checked. */
export const Indeterminate = {
  render: () => (
    <div style={{ display: "grid", gap: "0.75rem", "max-width": "20rem" }}>
      {box("indeterminate", "All chapters")}
      {box(true, "Part one")}
      {box(false, "Part two")}
    </div>
  ),
};

/** Under a form name the accepted value rides the hidden input. */
export const WithForm = {
  render: () => (
    <form
      onSubmit={(event) => event.preventDefault()}
      style={{ display: "grid", gap: "0.75rem", "max-width": "20rem" }}
    >
      <Checkbox.Root name="terms" value="accepted">
        <Checkbox.Control>
          <Checkbox.Indicator>{checkIcon()}</Checkbox.Indicator>
        </Checkbox.Control>
        <Checkbox.Label>Accept the terms</Checkbox.Label>
        <Checkbox.HiddenInput />
      </Checkbox.Root>
      <button type="submit">Submit</button>
    </form>
  ),
};

const frameworks = [
  { label: "React", value: "react" },
  { label: "Solid", value: "solid" },
  { label: "Vue", value: "vue" },
];

/** One group, one form name: rows join and leave the submitted value. */
export const Group = {
  render: () => (
    <Checkbox.Group name="framework" defaultValue={["react"]}>
      <For each={frameworks}>
        {(item) => (
          <Checkbox.Root value={item.value}>
            <Checkbox.Control>
              <Checkbox.Indicator>{checkIcon()}</Checkbox.Indicator>
            </Checkbox.Control>
            <Checkbox.Label>{item.label}</Checkbox.Label>
            <Checkbox.HiddenInput />
          </Checkbox.Root>
        )}
      </For>
    </Checkbox.Group>
  ),
};

/** The parent row summarizes its children: checked when all, dashed when
 * some, and its click sweeps the whole group. */
export const GroupWithSelectAll = {
  render: () => {
    const [selected, setSelected] = createSignal(["react"]);
    const all = () => selected().length === frameworks.length;
    const toggleAll = () => setSelected(all() ? [] : frameworks.map((item) => item.value));

    return (
      <div style={{ display: "grid", gap: "0.75rem", "max-width": "20rem" }}>
        {box(all() ? true : selected().length ? "indeterminate" : false, "All frameworks")}
        <div onClick={toggleAll}>{box(false, "Toggle all")}</div>
        <Checkbox.Group value={selected} onValueChange={setSelected}>
          <For each={frameworks}>
            {(item) => (
              <Checkbox.Root value={item.value}>
                <Checkbox.Control>
                  <Checkbox.Indicator>{checkIcon()}</Checkbox.Indicator>
                </Checkbox.Control>
                <Checkbox.Label>{item.label}</Checkbox.Label>
                <Checkbox.HiddenInput />
              </Checkbox.Root>
            )}
          </For>
        </Checkbox.Group>
      </div>
    );
  },
};

/** A ceiling on choices: the third seal can no longer join. */
export const GroupWithMaxSelected = {
  render: () => (
    <Checkbox.Group defaultValue={["react", "solid"]} maxSelectedValues={2}>
      <For each={frameworks}>
        {(item) => (
          <Checkbox.Root value={item.value}>
            <Checkbox.Control>
              <Checkbox.Indicator>{checkIcon()}</Checkbox.Indicator>
            </Checkbox.Control>
            <Checkbox.Label>{item.label}</Checkbox.Label>
            <Checkbox.HiddenInput />
          </Checkbox.Root>
        )}
      </For>
    </Checkbox.Group>
  ),
};

/** The field speaks through every row: invalid paints the whole group. */
export const GroupWithInvalid = {
  render: () => (
    <Checkbox.Group defaultValue={[]} invalid>
      <For each={frameworks}>
        {(item) => (
          <Checkbox.Root value={item.value}>
            <Checkbox.Control>
              <Checkbox.Indicator>{checkIcon()}</Checkbox.Indicator>
            </Checkbox.Control>
            <Checkbox.Label>{item.label}</Checkbox.Label>
            <Checkbox.HiddenInput />
          </Checkbox.Root>
        )}
      </For>
    </Checkbox.Group>
  ),
};
