import { useJsonTreeView } from "@ark-ui/react/json-tree-view";
import type { Meta } from "@storybook/react-vite";

import { JsonTreeView } from ".";

const meta: Meta = { title: "Components/Data/Json Tree View" };
export default meta;

const data = {
  name: "John Doe",
  age: 30,
  email: "john.doe@example.com",
  tags: ["tag1", "tag2", "tag3"],
  address: {
    street: "123 Main St",
    city: "Anytown",
    state: "CA",
    zip: "12345",
  },
};

function chevron() {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden="true"
    >
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}

function tree(extraProps: Record<string, any> = {}) {
  return <JsonTreeView.Tree {...extraProps} arrow={chevron()} />;
}

/** The object as a ledger: branches fold, values read as tabular
 * types. */
export const Basic = {
  args: {
    defaultExpandedDepth: 1,
  },
  render: (args: any) => (
    <JsonTreeView.Root data={data} defaultExpandedDepth={args.defaultExpandedDepth}>
      {tree()}
    </JsonTreeView.Root>
  ),
};

/** Arrays of every temper: dense, sparse, and carrying hidden
 * non-enumerable properties. */
export const ArrayData = {
  render: () => {
    const testArray = [1, 2, 3, 4, 5];
    Object.defineProperties(testArray, {
      customProperty: { value: "custom value", enumerable: false, writable: false },
      anotherProperty: { value: 42, enumerable: false, writable: false },
    });
    const sparse = [] as any[];
    sparse[0] = "first";
    sparse[5] = "sixth";
    return (
      <JsonTreeView.Root
        defaultExpandedDepth={1}
        data={{
          normalArray: [1, 2, 3],
          arrayWithNonEnumerableProperties: testArray,
          sparseArray: sparse,
        }}
      >
        {tree()}
      </JsonTreeView.Root>
    );
  },
};

/** An error stands revealed: message, stack, and cause as rows. */
export const Errors = {
  render: () => (
    <JsonTreeView.Root data={new Error("Something failed")} defaultExpandedDepth={1}>
      {tree()}
    </JsonTreeView.Root>
  ),
};

/** Two levels open at rest; deeper branches wait folded. */
export const ExpandLevel = {
  render: () => (
    <JsonTreeView.Root data={data} defaultExpandedDepth={2}>
      {tree()}
    </JsonTreeView.Root>
  ),
};

/** Functions keep their shape: name, arity, async, and generator. */
export const Functions = {
  render: () => (
    <JsonTreeView.Root
      defaultExpandedDepth={1}
      data={[
        function sum(a: number, b: number) {
          return a + b;
        },
        async (promises: Promise<any>[]) => await Promise.all(promises),
        function* generator(a: number) {
          while (a > 0) {
            yield a - 1;
          }
        },
      ]}
    >
      {tree()}
    </JsonTreeView.Root>
  ),
};

/** Maps, sets, bigints, undefined: the types JSON never carried. */
export const MapAndSet = {
  render: () => (
    <JsonTreeView.Root
      defaultExpandedDepth={1}
      data={
        new Map<string, any>([
          ["name", "ark-ui-json-tree"],
          ["license", "MIT"],
          ["elements", new Set(["ark-ui", 123, false, true, null, undefined, 456n])],
          [
            "nested",
            new Map<string, any>([
              [
                "taglines",
                new Set([
                  { name: "ark-ui", feature: "headless components" },
                  { name: "ark-ui", feature: "framework agnostic" },
                  { name: "ark-ui", feature: "accessible by default" },
                ]),
              ],
            ]),
          ],
        ])
      }
    >
      {tree()}
    </JsonTreeView.Root>
  ),
};

/** A value may render as itself: email addresses become links through
 * the renderValue slot. */
export const RenderValue = {
  render: () => {
    const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    return (
      <JsonTreeView.Root
        defaultExpandedDepth={2}
        data={{ name: "John Doe", age: 30, email: "john.doe@example.com", NaN: Number.NaN }}
      >
        <JsonTreeView.Tree
          arrow={chevron()}
          renderValue={(node: any) => {
            if (node.type === "text" && typeof node.value === "string") {
              const email = node.value.replace(/^"(.*)"$/, "$1");
              if (isEmail(email)) {
                return (
                  <a href={`mailto:${email}`} style={{ color: "var(--bs-color-primary)" }}>
                    {email}
                  </a>
                );
              }
            }
          }}
        />
      </JsonTreeView.Root>
    );
  },
};

/** Regular expressions read as literals, not strings. */
export const Regex = {
  render: () => (
    <JsonTreeView.Root
      defaultExpandedDepth={1}
      data={{
        regex: /^[a-z0-9]+/g,
        case_insensitive: /^(?:[a-z0-9]+)foo.*?/i,
      }}
    >
      {tree()}
    </JsonTreeView.Root>
  ),
};

/** The machine answers outside its anatomy: the provider owns the
 * tree. */
export const RootProvider = {
  render: () => {
    const jsonTreeView = useJsonTreeView({ defaultExpandedDepth: 1, data });
    return <JsonTreeView.RootProvider value={jsonTreeView}>{tree()}</JsonTreeView.RootProvider>;
  },
};
