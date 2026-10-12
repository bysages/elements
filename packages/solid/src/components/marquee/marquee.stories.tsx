import { Marquee } from ".";

const meta = { title: "Components/Media/Marquee", component: Marquee };
export default meta;

/** The complete ribbon behind a list of short marks. */
export const Basic = {
  render: () => (
    <Marquee
      items={["Qinghua", "Celadon", "Zhusha", "Ultramarine", "Gamboge", "Indigo"]}
      spacing="1.5rem"
      label="Pigments"
    />
  ),
};
