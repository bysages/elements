import { ScrollArea } from ".";

const meta = { title: "Components/Layout/Scroll Area" };
export default meta;

/** Caller content rides in the viewport while quiet lanes frame it. */
export const Basic = {
  render: () => (
    <ScrollArea class="h-30">
      <p>Ink rests on paper.</p>
      <p>Light decides hierarchy.</p>
      <p>Whitespace is breath.</p>
    </ScrollArea>
  ),
};
