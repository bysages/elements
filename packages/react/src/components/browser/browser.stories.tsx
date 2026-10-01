import type { Meta } from "@storybook/react-vite";

import { Browser } from ".";

const meta: Meta = { title: "Components/Media/Browser" };
export default meta;

/** A browser window as a vessel: the three lamps, the address well,
 * and a body that carries whatever the site hangs in it. */
export const Basic = {
  render: () => (
    <Browser style={{ inlineSize: "26rem" }}>
      <Browser.TitleBar>
        <Browser.Dots />
        <Browser.UrlBar>https://elements.bysages.com</Browser.UrlBar>
      </Browser.TitleBar>
      <Browser.Body
        style={{
          blockSize: "10rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.875rem",
          color: "var(--bs-color-text-tertiary)",
        }}
      >
        Whatever the site hangs in the window
      </Browser.Body>
    </Browser>
  ),
};
