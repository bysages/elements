import type { Meta } from "@storybook/vue3-vite";
import { h, reactive } from "vue";

import { Highlight } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Elements/Highlight" };
export default meta;

/** The paragraph carries no styling of its own — the query hits are
 * <mark> elements, dressed by the document-wide mark default. */
function text(props: Record<string, unknown>) {
  return h(
    "p",
    {
      style: {
        maxInlineSize: "46ch",
        lineHeight: 1.7,
        fontSize: "var(--bs-font-size-md)",
      },
    },
    [h(Highlight as any, props)],
  );
}

/** The first stroke of pigment on the page. */
export const Basic = {
  args: {
    query: "component",
    text: "Ark UI is a headless component library for building accessible web applications.",
  },
  render: (args: any) => withState(() => () => text(args)),
};

/** The query rides a live input: every keystroke re-inks the page. */
export const DynamicQuery = {
  render: () =>
    withState(() => {
      const state = reactive({ query: "component" });
      return () =>
        h("div", { style: { display: "grid", gap: "1rem", justifyItems: "start" } }, [
          h("input", {
            value: state.query,
            type: "text",
            placeholder: "Search text...",
            "aria-label": "Search text",
            onInput: (e: Event) => (state.query = (e.target as HTMLInputElement).value),
            style: {
              font: "inherit",
              padding: "0.375rem 0.625rem",
              border: "1px solid var(--bs-color-border)",
              borderRadius: "var(--bs-radius-sm)",
              background: "var(--bs-color-surface-2)",
              color: "var(--bs-color-text-primary)",
            },
          }),
          text({
            query: state.query,
            text: "With Ark UI, you can build accessible, custom components. Each component is fully typed and works seamlessly with React, Solid, Svelte, and Vue.",
          }),
        ]);
    }),
};

/** Whole words only: "box" stops matching inside "checkbox". */
export const ExactMatch = {
  render: () =>
    h("div", { style: { display: "grid", gap: "1.25rem" } }, [
      h("div", { style: { display: "grid", gap: "0.375rem" } }, [
        h(
          "span",
          {
            style: { fontSize: "var(--bs-font-size-sm)", color: "var(--bs-color-text-secondary)" },
          },
          "Partial match",
        ),
        text({
          query: "box",
          text: "The checkbox component renders a box element. Use combobox for autocomplete.",
          matchAll: true,
        }),
      ]),
      h("div", { style: { display: "grid", gap: "0.375rem" } }, [
        h(
          "span",
          {
            style: { fontSize: "var(--bs-font-size-sm)", color: "var(--bs-color-text-secondary)" },
          },
          "Exact match",
        ),
        text({
          query: "box",
          text: "The checkbox component renders a box element. Use combobox for autocomplete.",
          exactMatch: true,
          matchAll: true,
        }),
      ]),
    ]),
};

/** Case stops mattering: TypeScript and typescript both take the ink. */
export const IgnoreCase = {
  render: () =>
    text({
      query: "typescript",
      text: "TypeScript provides static type checking. Using typescript helps catch errors early in development.",
      ignoreCase: true,
      matchAll: true,
    }),
};

/** Every occurrence, or only the first impression. */
export const MatchAll = {
  render: () =>
    h("div", { style: { display: "grid", gap: "1.25rem" } }, [
      h("div", { style: { display: "grid", gap: "0.375rem" } }, [
        h(
          "span",
          {
            style: { fontSize: "var(--bs-font-size-sm)", color: "var(--bs-color-text-secondary)" },
          },
          "Match all",
        ),
        text({
          query: "component",
          text: "Each component follows WAI-ARIA guidelines. Every component is rigorously tested to ensure accessibility.",
          matchAll: true,
        }),
      ]),
      h("div", { style: { display: "grid", gap: "0.375rem" } }, [
        h(
          "span",
          {
            style: { fontSize: "var(--bs-font-size-sm)", color: "var(--bs-color-text-secondary)" },
          },
          "Match first only",
        ),
        text({
          query: "component",
          text: "Each component follows WAI-ARIA guidelines. Every component is rigorously tested to ensure accessibility.",
          matchAll: false,
        }),
      ]),
    ]),
};

/** Several queries at once: React and Vue share the same pigment. */
export const Multiple = {
  render: () =>
    text({
      query: ["React", "Vue"],
      text: "Ark UI provides React, Solid, Vue, and Svelte components that are accessible and customizable.",
    }),
};
