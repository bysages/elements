import type { Meta } from "@storybook/react-vite";

import { Breadcrumb } from ".";

const meta: Meta = { title: "Components/Navigation/Breadcrumb" };
export default meta;

export const Basic = {
  render: () => (
    <Breadcrumb.Root>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#home">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#library">Library</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Current>Components</Breadcrumb.Current>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  ),
};

export const LongTrail = {
  render: () => (
    <Breadcrumb.Root>
      <Breadcrumb.List>
        {["Home", "Library", "Navigation", "Waymarks"].map((label) => (
          <Breadcrumb.Item key={label}>
            <Breadcrumb.Link href="#way">{label}</Breadcrumb.Link>
          </Breadcrumb.Item>
        ))}
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Current>Here</Breadcrumb.Current>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  ),
};

/** The separator is a slot: any mark the trail needs, this one a
 * chevron pointing the way forward. */
export const CustomSeparator = {
  render: () => (
    <Breadcrumb.Root>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#home">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator>›</Breadcrumb.Separator>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#library">Library</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator>›</Breadcrumb.Separator>
        <Breadcrumb.Item>
          <Breadcrumb.Current>Archives</Breadcrumb.Current>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  ),
};
