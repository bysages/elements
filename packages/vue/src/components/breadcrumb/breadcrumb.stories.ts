import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";

import { Breadcrumb } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Navigation/Breadcrumb" };
export default meta;
type Story = StoryObj<typeof Breadcrumb>;

/** The full trail: quiet links behind, the current page resting in full
 * ink, parted by a whispered slash. */
export const Basic: Story = {
  render: () =>
    withState(
      () => () =>
        h(Breadcrumb.Root as any, () => [
          h(Breadcrumb.List, () => [
            h(Breadcrumb.Item, () => [
              h(Breadcrumb.Link as any, { href: "#home" }, () => "Home"),
              h(Breadcrumb.Separator as any),
            ]),
            h(Breadcrumb.Item, () => [
              h(Breadcrumb.Link as any, { href: "#library" }, () => "Library"),
              h(Breadcrumb.Separator as any),
            ]),
            h(Breadcrumb.Item, () => h(Breadcrumb.Current as any, () => "Archives")),
          ]),
        ]),
    ),
};

/** A deep trail wraps instead of truncating — every waymark stays
 * reachable, the line simply turns. */
export const LongTrail: Story = {
  render: () =>
    withState(
      () => () =>
        h(Breadcrumb.Root as any, { style: { maxInlineSize: "24rem" } }, () => [
          h(Breadcrumb.List, () => [
            ...["Home", "Library", "Letters", "Seals", "Inks", "Papers", "Press"].map((crumb) =>
              h(Breadcrumb.Item, () => [
                h(Breadcrumb.Link as any, { href: `#${crumb.toLowerCase()}` }, () => crumb),
                h(Breadcrumb.Separator as any),
              ]),
            ),
            h(Breadcrumb.Item, () => h(Breadcrumb.Current as any, () => "Archives")),
          ]),
        ]),
    ),
};

/** The separator is a slot: any mark the trail needs, this one a
 * chevron pointing the way forward. */
export const CustomSeparator: Story = {
  render: () =>
    withState(
      () => () =>
        h(Breadcrumb.Root as any, () => [
          h(Breadcrumb.List, () => [
            h(Breadcrumb.Item, () => [
              h(Breadcrumb.Link as any, { href: "#home" }, () => "Home"),
              h(Breadcrumb.Separator as any, () => "›"),
            ]),
            h(Breadcrumb.Item, () => [
              h(Breadcrumb.Link as any, { href: "#library" }, () => "Library"),
              h(Breadcrumb.Separator as any, () => "›"),
            ]),
            h(Breadcrumb.Item, () => h(Breadcrumb.Current as any, () => "Archives")),
          ]),
        ]),
    ),
};
