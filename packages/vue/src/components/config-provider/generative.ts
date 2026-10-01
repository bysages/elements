import { h } from "vue";
import { z } from "zod";

import { defineEntry, slotted } from "../../generative/shared";
import { ConfigProvider } from "./index";

/** Pins the scene and pigment for everything beneath it. */
export default defineEntry({
  ConfigProvider: {
    props: z.object({ scene: z.string().optional() }),
    slots: ["default"],
    description: "Pins the scene and pigment for everything beneath it.",
    component: ({ props, children }) =>
      h(ConfigProvider, { scene: props.scene } as never, () => slotted(children)),
  },
});
