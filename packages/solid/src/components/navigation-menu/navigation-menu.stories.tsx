import { NavigationMenu } from ".";

const meta = { title: "Components/Navigation/Navigation Menu" };
export default meta;

/** A quiet rung of destinations; grouped panels stay on the anatomy. */
export const Basic = {
  render: () => (
    <NavigationMenu
      items={[
        { label: "Quick start", href: "#quick-start" },
        { label: "Styling", href: "#styling" },
        { label: "Guides", href: "#guides", current: true },
      ]}
    />
  ),
};
