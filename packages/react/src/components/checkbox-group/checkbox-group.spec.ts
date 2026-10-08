// @vitest-environment happy-dom
import { Field as ArkField } from "@ark-ui/react/field";
import { act, createElement as h, Fragment } from "react";
import { createRoot } from "react-dom/client";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it } from "vitest";

import { CheckboxGroup, type CheckboxOption } from "./index";

const options: CheckboxOption[] = [
  { label: "Ship", value: "ship" },
  { label: "Outline", value: "outline" },
  { label: "Archived", value: "archived", disabled: true },
];

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  document.body.replaceChildren();
});

describe("checkbox group facade", () => {
  it("generates stable unique ids for each group and option", () => {
    const html = renderToStaticMarkup(
      h(
        Fragment,
        null,
        h(CheckboxGroup as never, { options, defaultValue: ["ship"] }),
        h(CheckboxGroup as never, { options, defaultValue: ["outline"], id: "explicit" }),
      ),
    );
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
    const container = document.createElement("div");
    document.body.append(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(
        h(CheckboxGroup as never, {
          options,
          defaultValue: ["ship"],
          onValueChange: (value: string[]) => updates.push(value),
        }),
      );
    });

    const input = container.querySelector<HTMLInputElement>(
      '[id$=":checkbox:outline:input"]',
    ) as HTMLInputElement;

    expect(input.checked).toBe(false);
    await act(async () => {
      input.click();
    });

    expect(updates).toEqual([["ship", "outline"]]);
    await act(async () => {
      root.unmount();
    });
  });

  it("applies controlled value updates from its owner", async () => {
    const container = document.createElement("div");
    document.body.append(container);
    const root = createRoot(container);
    const render = async (value: string[]) => {
      await act(async () => {
        root.render(h(CheckboxGroup as never, { options, value }));
        await new Promise((resolve) => setTimeout(resolve, 0));
      });
      await act(async () => {});
    };
    const state = (value: string) =>
      container.querySelector('[id$=":checkbox:' + value + '"]')?.getAttribute("data-state");

    await render(["ship"]);
    expect([state("ship"), state("outline"), state("archived")]).toEqual([
      "checked",
      "unchecked",
      "unchecked",
    ]);

    await render(["ship", "outline"]);
    expect([state("ship"), state("outline"), state("archived")]).toEqual([
      "checked",
      "checked",
      "unchecked",
    ]);

    await act(async () => {
      root.unmount();
    });
  });

  it("receives disabled and invalid state from Ark Field", async () => {
    const container = document.createElement("div");
    document.body.append(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(
        h(ArkField.Root, { disabled: true, invalid: true }, h(CheckboxGroup as never, { options })),
      );
    });

    const group = container.querySelector('[data-scope="checkbox-group"]');
    const input = container.querySelector<HTMLInputElement>('input[type="checkbox"]');
    expect(group?.hasAttribute("data-invalid")).toBe(true);
    expect(input?.disabled).toBe(true);
    await act(async () => {
      root.unmount();
    });
  });
});
