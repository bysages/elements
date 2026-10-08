import { beforeEach, describe, expect, it } from "vitest";
// @vitest-environment happy-dom
import { createApp, createSSRApp, defineComponent, h, nextTick, ref } from "vue";
import { renderToString } from "vue/server-renderer";

import { Select, type NativeSelectOption } from "./index";

const options: NativeSelectOption[] = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
];

beforeEach(() => {
  document.body.replaceChildren();
});

describe("select facade SSR", () => {
  it("generates a different machine id for each instance", async () => {
    const page = defineComponent({
      render: () => [
        h(Select, { options, modelValue: "vue", label: "Framework" }),
        h(Select, { options, modelValue: ["vue"], multiple: true, label: "Frameworks" }),
      ],
    });

    const html = await renderToString(createSSRApp(page));
    const ids = [...html.matchAll(/id="select:(bs-select-[^"]+:control)"/g)].map(
      (match) => match[1],
    );

    expect(ids).toHaveLength(2);
    expect(new Set(ids).size).toBe(2);
    expect(html).toContain('value="vue"');
  });

  it("honors an explicit id", async () => {
    const page = defineComponent({
      render: () => h(Select, { options, modelValue: "vue", label: "Framework", id: "explicit" }),
    });

    const html = await renderToString(createSSRApp(page));

    expect(html).toContain('id="select:explicit:control"');
  });

  it("keeps HiddenSelect ids stable through hydration", async () => {
    const page = defineComponent({
      render: () =>
        h(Select, { options, modelValue: "vue", label: "Framework", name: "framework" }),
    });

    const html = await renderToString(createSSRApp(page));
    const container = document.createElement("div");
    container.innerHTML = html;
    document.body.append(container);
    const before = [...container.querySelectorAll('select[name="framework"]')].map(
      (node) => node.id,
    );

    createSSRApp(page).mount(container);
    const after = [...container.querySelectorAll('select[name="framework"]')].map(
      (node) => node.id,
    );

    expect(before).toHaveLength(1);
    expect(new Set(after)).toEqual(new Set(before));
    container.remove();
  });

  it("passes ids.hiddenSelect to the hidden native select", async () => {
    const page = defineComponent({
      render: () =>
        h(Select, {
          options,
          modelValue: "vue",
          label: "Framework",
          ids: { hiddenSelect: "named-hidden-select" },
        }),
    });

    const html = await renderToString(createSSRApp(page));

    expect(html).toContain('id="named-hidden-select"');
  });
});

type FacadeValue = string | string[] | undefined;

type ComponentInstance = {
  type: { name?: string };
  parent?: ComponentInstance;
  vnode: { props?: Record<string, unknown> };
  props: Record<string, unknown>;
};

function selectRootInstance(container: HTMLElement) {
  const root = container.querySelector('[data-part="root"]') as
    | (HTMLElement & { __vueParentComponent?: ComponentInstance })
    | null;
  let instance = root?.__vueParentComponent;

  while (instance && instance.type.name !== "SSelectRoot") {
    instance = instance.parent;
  }
  if (!instance) throw new Error("select root instance is missing");

  return instance;
}
describe("select facade model conversion", () => {
  function mountSelect(multiple = false, initial: FacadeValue = multiple ? ["react"] : "react") {
    const updates: FacadeValue[] = [];
    const value = ref<string | string[]>(initial as string | string[]);
    const host = defineComponent({
      render: () =>
        h(Select, {
          options,
          modelValue: value.value,
          multiple,
          label: "Framework",
          "onUpdate:modelValue": (next: FacadeValue) => {
            updates.push(next);
            value.value = next as string | string[];
          },
        }),
    });
    const container = document.createElement("div");
    document.body.append(container);
    const app = createApp(host);
    app.mount(container);

    return {
      app,
      container,
      updates,
      async emitArkValue(next: string[]) {
        const root = selectRootInstance(container);
        const handler = root.vnode.props?.["onUpdate:modelValue"];
        if (typeof handler !== "function") throw new Error("update handler is missing");
        (handler as (value: string[]) => void)(next);
        await nextTick();
      },
    };
  }

  it("normalizes an empty scalar model to selection list", () => {
    const select = mountSelect(false, "");

    expect(selectRootInstance(select.container).vnode.props?.modelValue).toEqual([]);
    select.app.unmount();
  });

  it("reduces Ark's single-value list to a scalar", async () => {
    const select = mountSelect();
    await select.emitArkValue(["vue"]);

    expect(select.updates).toEqual(["vue"]);
    select.app.unmount();
  });

  it("keeps selection list for multiple selection", async () => {
    const select = mountSelect(true);
    await select.emitArkValue(["react", "vue"]);

    expect(select.updates).toEqual([["react", "vue"]]);
    select.app.unmount();
  });
});
