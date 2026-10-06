// @vitest-environment happy-dom
import { Field as ArkField } from "@ark-ui/vue/field";
import { beforeEach, describe, expect, it } from "vitest";
import { createApp, createSSRApp, defineComponent, h, nextTick, ref } from "vue";
import { renderToString } from "vue/server-renderer";

import { CheckboxGroup, type CheckboxOption } from "./index";

const options: CheckboxOption[] = [
  { label: "Ship", value: "ship" },
  { label: "Outline", value: "outline" },
  { label: "Archived", value: "archived", disabled: true },
];

beforeEach(() => {
  document.body.replaceChildren();
});

describe("checkbox group facade", () => {
  it("generates stable unique ids for each group and option", async () => {
    const page = defineComponent({
      render: () => [
        h(CheckboxGroup as never, { options, defaultValue: ["ship"] }),
        h(CheckboxGroup as never, { options, defaultValue: ["outline"], id: "explicit" }),
      ],
    });

    const html = await renderToString(createSSRApp(page));
    const inputs = [...html.matchAll(/id="(bs-checkbox-group-[^"]+:input)"/g)].map(
      (match) => match[1],
    );

    expect(inputs).toHaveLength(options.length);
    expect(new Set(inputs).size).toBe(options.length);
    expect(html).toContain('data-scope="checkbox-group"');
    expect(html).toContain('id="explicit:checkbox:outline:input"');
    expect(html).toContain('id="explicit:checkbox:outline:label"');
  });

  it("lets Ark own uncontrolled selection and reports value changes", async () => {
    const updates: string[][] = [];
    const host = defineComponent({
      render: () =>
        h(CheckboxGroup as never, {
          options,
          defaultValue: ["ship"],
          "onUpdate:modelValue": (value: string[]) => updates.push(value),
        }),
    });
    const container = document.createElement("div");
    document.body.append(container);
    const app = createApp(host);
    app.mount(container);

    const input = container.querySelector<HTMLInputElement>(
      '[id$=":checkbox:outline:input"]',
    ) as HTMLInputElement;

    expect(input.checked).toBe(false);
    input.click();
    await nextTick();

    // happy-dom replays Ark's programmatic checked sync as a second change;
    // the facade's Ark-owned selection is the first emitted value.
    expect(updates[0]).toEqual(["ship", "outline"]);
    app.unmount();
  });

  it("applies controlled model updates from its owner", async () => {
    const value = ref(["ship"]);
    const host = defineComponent({
      render: () => h(CheckboxGroup as never, { options, modelValue: value.value }),
    });
    const container = document.createElement("div");
    document.body.append(container);
    const app = createApp(host);
    app.mount(container);

    const state = (option: string) =>
      container.querySelector('[id$=":checkbox:' + option + '"]')?.getAttribute("data-state");
    expect([state("ship"), state("outline"), state("archived")]).toEqual([
      "checked",
      "unchecked",
      "unchecked",
    ]);

    value.value = ["ship", "outline"];
    await nextTick();

    expect([state("ship"), state("outline"), state("archived")]).toEqual([
      "checked",
      "checked",
      "unchecked",
    ]);
    app.unmount();
  });

  it("receives disabled and invalid state from Ark Field", () => {
    const host = defineComponent({
      render: () =>
        h(ArkField.Root, { disabled: true, invalid: true }, () =>
          h(CheckboxGroup as never, { options }),
        ),
    });
    const container = document.createElement("div");
    document.body.append(container);
    const app = createApp(host);
    app.mount(container);

    const group = container.querySelector('[data-scope="checkbox-group"]');
    const input = container.querySelector<HTMLInputElement>('input[type="checkbox"]');
    expect(group?.hasAttribute("data-invalid")).toBe(true);
    expect(input?.disabled).toBe(true);
    app.unmount();
  });
});
