import { Carousel } from ".";

const meta = { title: "Components/Media/Carousel" };
export default meta;

/** Arrows, progress, slides, and indicators share one lane. */
export const Basic = {
  render: () => (
    <Carousel
      items={["Chapter One", "Chapter Two", "Chapter Three"]}
      defaultValue={1}
      label="Chapters"
    />
  ),
};
