import { h } from "vue";
import { z } from "zod";

import { defineEntry, slotted } from "../../generative/shared";
import { Browser } from "./index";

/** A browser window frame: lamps, url bar, and the page body. */
export default defineEntry({
  Browser: {
    props: z.object({ url: z.string().optional() }),
    slots: ["default"],
    description: "A browser window frame: lamps, url bar, and the page body.",
    component: ({ props, children }) =>
      h(Browser.Root, () => [
        h(Browser.TitleBar, () => [
          h(Browser.Dots),
          h(Browser.UrlBar, () => props.url ?? "https://elements.bysages.com"),
        ]),
        h(Browser.Body, () => slotted(children)),
      ]),
  },
});
