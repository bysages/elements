import type { Meta } from "@storybook/vue3-vite";
import { h, reactive, Teleport } from "vue";

import { Menu } from "./index.js";

const meta: Meta = { title: "Components / Menu" };
export default meta;

function chevronDown() {
  return h(
    "svg",
    {
      width: 14,
      height: 14,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.75,
      "aria-hidden": true,
    },
    [h("path", { d: "m6 9 6 6 6-6" })],
  );
}

function checkGlyph() {
  return h(
    "svg",
    {
      width: 13,
      height: 13,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 2.5,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "aria-hidden": true,
    },
    [h("path", { d: "m4 12.5 5 5L20 6.5" })],
  );
}

function positioner(children: any) {
  return h(Teleport, { to: "body" }, () => [
    h(Menu.Positioner, () => h(Menu.Content, () => children)),
  ]);
}

/** A file menu: one trigger, one vessel dissolving in, items as rows of
 * light with a hairline between courses. */
export const Basic = {
  render: () =>
    h(Menu.Root, () => [
      h(Menu.Trigger, () => [h("span", () => "File"), h(Menu.Indicator, () => chevronDown())]),
      positioner([
        h(Menu.Item, { value: "new-file" }, () => "New file"),
        h(Menu.Item, { value: "open", disabled: true }, () => "Open…"),
        h(Menu.ItemGroup, () => [
          h(Menu.ItemGroupLabel, () => "Save"),
          h(Menu.Item, { value: "save" }, () => "Save"),
          h(Menu.Item, { value: "save-as" }, () => "Save as…"),
        ]),
        h(Menu.Separator),
        h(Menu.Item, { value: "export" }, () => "Export"),
      ]),
    ]),
};

/** Toggle rows: each carries its own check, independent of the others. */
export const CheckboxItems = {
  render: () =>
    h(Menu.Root, () => [
      h(Menu.Trigger, () => [h("span", () => "View"), h(Menu.Indicator, () => chevronDown())]),
      positioner([
        h(Menu.CheckboxItem as any, { value: "rulers" }, () => [
          h(Menu.ItemIndicator, () => checkGlyph()),
          "Rulers",
        ]),
        h(Menu.CheckboxItem as any, { value: "grid", defaultChecked: true }, () => [
          h(Menu.ItemIndicator, () => checkGlyph()),
          "Grid",
        ]),
        h(Menu.CheckboxItem as any, { value: "guides" }, () => [
          h(Menu.ItemIndicator, () => checkGlyph()),
          "Guides",
        ]),
      ]),
    ]),
};

/** One radio course: exactly one theme holds the ink at a time. */
export const RadioItems = {
  render: () =>
    h(Menu.Root, () => [
      h(Menu.Trigger, () => [h("span", () => "Theme"), h(Menu.Indicator, () => chevronDown())]),
      positioner([
        h(Menu.RadioItemGroup, { value: "qinghua" }, () => [
          h(Menu.RadioItem, { value: "qinghua" }, () => [
            h(Menu.ItemIndicator, () => checkGlyph()),
            "Qinghua cobalt",
          ]),
          h(Menu.RadioItem, { value: "celadon" }, () => [
            h(Menu.ItemIndicator, () => checkGlyph()),
            "Celadon",
          ]),
          h(Menu.RadioItem, { value: "zhusha" }, () => [
            h(Menu.ItemIndicator, () => checkGlyph()),
            "Zhusha cinnabar",
          ]),
        ]),
      ]),
    ]),
};

/** A course that opens another course: trigger rows nest menus to any
 * depth. */
export const Nested = {
  render: () =>
    h(Menu.Root, () => [
      h(Menu.Trigger, () => [h("span", () => "File"), h(Menu.Indicator, () => chevronDown())]),
      positioner([
        h(Menu.Item, { value: "new" }, () => "New file"),
        h(Menu.Separator),
        h(Menu.Root, () => [
          h(Menu.TriggerItem, () => ["Share", h(Menu.Indicator, () => chevronDown())]),
          positioner([
            h(Menu.Item, { value: "email" }, () => "Email"),
            h(Menu.Item, { value: "message" }, () => "Message"),
          ]),
        ]),
        h(Menu.Root, () => [
          h(Menu.TriggerItem, () => ["Export", h(Menu.Indicator, () => chevronDown())]),
          positioner([
            h(Menu.Item, { value: "pdf" }, () => "PDF"),
            h(Menu.Item, { value: "png" }, () => "PNG"),
          ]),
        ]),
      ]),
    ]),
};

/** Rows as honest anchors: the whole row is the link, not a click handler. */
export const Links = {
  render: () =>
    h(Menu.Root, () => [
      h(Menu.Trigger, () => [h("span", () => "Handbook"), h(Menu.Indicator, () => chevronDown())]),
      positioner([
        h(Menu.Item, { value: "start", asChild: true } as any, () =>
          h(
            "a",
            { href: "#getting-started", style: { color: "inherit", textDecoration: "none" } },
            "Getting started",
          ),
        ),
        h(Menu.Item, { value: "install", asChild: true } as any, () =>
          h(
            "a",
            { href: "#installation", style: { color: "inherit", textDecoration: "none" } },
            "Installation",
          ),
        ),
        h(Menu.Item, { value: "ext-ark", asChild: true } as any, () =>
          h(
            "a",
            {
              href: "https://ark-ui.com",
              target: "_blank",
              rel: "noreferrer",
              style: { color: "inherit", textDecoration: "none" },
            },
            "Ark UI ↗",
          ),
        ),
      ]),
    ]),
};

/** The open state answers to the caller — the page controls the vessel. */
export const Controlled = {
  render: () => {
    const state = reactive({ open: false });
    return h(
      Menu.Root,
      {
        open: state.open,
        onOpenChange: (e: { open: boolean }) => {
          state.open = e.open;
        },
      },
      () => [
        h(Menu.Trigger, () => [h("span", () => "Edit"), h(Menu.Indicator, () => chevronDown())]),
        positioner([
          h(Menu.Item, { value: "undo" }, () => "Undo"),
          h(Menu.Item, { value: "redo" }, () => "Redo"),
        ]),
      ],
    );
  },
};

/** The vessel floats where the pointer pressed: a context menu on any
 * right-click inside the framed area. */
export const ContextMenu = {
  render: () =>
    h(Menu.Root, { positioning: { placement: "right-start" } }, () => [
      h(Menu.ContextTrigger, () =>
        h(
          "div",
          {
            style: {
              display: "grid",
              placeItems: "center",
              inlineSize: "20rem",
              blockSize: "10rem",
              border: "1px dashed var(--bs-color-border)",
              borderRadius: "var(--bs-radius-lg)",
              color: "var(--bs-color-text-tertiary)",
              fontSize: "var(--bs-font-size-sm)",
              userSelect: "none",
            },
          },
          "Right click here",
        ),
      ),
      positioner([
        h(Menu.Item, { value: "copy" }, () => "Copy"),
        h(Menu.Item, { value: "paste" }, () => "Paste"),
        h(Menu.Separator),
        h(Menu.Item, { value: "delete", color: "var(--bs-color-danger)" }, () => "Delete"),
      ]),
    ]),
};

/** Two triggers, one menu anatomy — each trigger opens its own vessel. */
export const MultipleTriggers = {
  render: () =>
    h("div", { style: { display: "flex", gap: "0.75rem" } }, [
      h(Menu.Root, () => [
        h(Menu.Trigger, () => "File"),
        positioner([
          h(Menu.Item, { value: "new" }, () => "New file"),
          h(Menu.Item, { value: "open" }, () => "Open…"),
        ]),
      ]),
      h(Menu.Root, () => [
        h(Menu.Trigger, () => "Help"),
        positioner([
          h(Menu.Item, { value: "docs" }, () => "Docs"),
          h(Menu.Item, { value: "about" }, () => "About"),
        ]),
      ]),
    ]),
};
